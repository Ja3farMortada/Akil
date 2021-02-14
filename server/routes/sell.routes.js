module.exports = (server, db) => {

    server.post('/addInvoice', (req, res) => {
        let items = req.body.items;
        let order = req.body.invoice;
        let invoice_details = [];
        for (let i = 0; i < items.length; i++) {
            invoice_details[i] = {
                item_ID: items[i]['ID'],
                item_name: items[i]['name'],
                qty: items[i]['quantity'],
                item_cost: items[i]['cost'],
                item_price: items[i]['price']
            }
        }
        order.invoice_details = JSON.stringify(invoice_details);
        // place new order
        let orderQuery = `INSERT INTO invoice SET ?`;
        db.query(orderQuery, order, function (error, result) {
            if (error) {
                console.log(error);
                res.status(400).end(error);
            } else {
                // update stock quantity
                for (let i = 0; i < items.length; i++) {
                    var ID = items[i]['ID'];
                    var quantity = items[i]['quantity'];
                    let updateQuantityQuery = `UPDATE stock SET item_qty = (item_qty - ${quantity}) WHERE IID = ${ID}`;
                    db.query(updateQuantityQuery, function (er) {
                        if (er) {
                            console.log('error 3003');
                            console.log(er)
                            res.status(400).end(er);
                        }
                    });
                }
                res.send('');
            }
        });
    });
};