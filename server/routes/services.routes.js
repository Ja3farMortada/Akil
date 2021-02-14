module.exports = (server, db) => {
    // const https = require('https');
    // https.get('https://lirarate.com/wp-json/lirarate/v2/rates?currency=LBP&_ver=t20207317', (res) => {
    //     res.setEncoding('utf8') 
    //     res.on('data', (data) => {
    //         console.log(data)
    //     })
    // })

    server.get('/getServices', (req, res) => {
        let query = "SELECT `SID`, `service_name`, `service_type`, `service_cost`, `service_price` FROM `services` WHERE `service_status` = true ";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end('Error in query: ' + error);
            } else {
                res.send(results);
            }
        });
    });


    server.post('/addService', (req, res) => {
        let item = req.body;
        item.service_status = true;

        let query = `INSERT INTO services SET ?`;
        db.query(query, item, function (error, results) {
            if (error) {
                res.status(400).end('Error in query: ' + error);
            } else {
                let sql = "SELECT `SID`, `service_name`, `service_type`, `service_cost`, `service_price` FROM `services` WHERE `SID` = ? ";
                db.query(sql, results.insertId, function (error, results) {
                    if (error) {
                        console.log(error)
                        results.status(400).end('Error in query: ' + error);
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