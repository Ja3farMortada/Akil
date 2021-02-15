module.exports = (server, db) => {
    // const https = require('https');
    // https.get('https://lirarate.com/wp-json/lirarate/v2/rates?currency=LBP&_ver=t20207317', (res) => {
    //     res.setEncoding('utf8') 
    //     res.on('data', (data) => {
    //         console.log(data)
    //     })
    // })

    server.get('/getOrders', (req, res) => {
        let query = "SELECT * FROM `orders` WHERE `order_isDeleted` = false ";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });


    server.post('/addOrder', (req, res) => {
        let order = req.body;

        let query = `INSERT INTO orders SET ?`;
        db.query(query, order, function (error, results) {
            if (error) {
                res.status(400).send( error);
            } else {
                let sql = "SELECT * FROM `orders` WHERE `order_ID` = ? ";
                db.query(sql, results.insertId, function (error, results) {
                    if (error) {
                        results.status(400).send(error);
                    } else {
                        res.send(results[0]);
                    }
                });
            }
        });
    });

    server.post('/editService', (req, res) => {
        let item = req.body;
        let query = `UPDATE services SET ? WHERE SID = ${item.SID}`;
        db.query(query, item, function (error, results) {
            if (error) {
                res.status(400).end('Error in query: ' + error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/deleteService', (req, res) => {
        let ID = req.body.ID;
        let query = `UPDATE services SET service_status = false where SID = ?`;
        db.query(query, ID, function(error, results) {
            if(error) {
                res.status(400).end('Error in query: ' + error);
            } else {
                res.send(results);
            }
        });
    });

    // Add Invoice
    server.post('/addServiceInvoice', (req, res) => {
        let items = req.body.items;
        let order = req.body.invoice;
        let invoice_details = [];
        for (let i = 0; i < items.length; i++) {
            invoice_details[i] = {
                service_ID: items[i]['ID'],
                service_name: items[i]['name'],
                qty: items[i]['quantity'],
                service_cost: items[i]['cost'],
                service_price: items[i]['price']
            }
        }
        order.invoice_details = JSON.stringify(invoice_details);
        // place new order
        let orderQuery = `INSERT INTO services_invoice SET ?`;
        db.query(orderQuery, order, function (error, result) {
            if (error) {
                console.log(error)
                res.status(400).end('Error in query: ' + error);
            } else {
                res.send('');
            }
        })
    });
}