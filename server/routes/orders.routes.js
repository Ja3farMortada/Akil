module.exports = (server, db) => {
    // const https = require('https');
    // https.get('https://lirarate.com/wp-json/lirarate/v2/rates?currency=LBP&_ver=t20207317', (res) => {
    //     res.setEncoding('utf8') 
    //     res.on('data', (data) => {
    //         console.log(data)
    //     })
    // })

    server.get('/fetchTowns', (req, res) => {
        let query = "SELECT DISTINCT destination_town AS label FROM orders";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/getOrders', (req, res) => {
        let query = "SELECT orders.*, customers.customer_name, customers.customer_phone FROM orders INNER JOIN customers ON customer_ID_FK = customer_ID WHERE order_isDeleted = false AND order_status = 'office'";
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
                res.status(400).send(error);
            } else {
                let sql = "SELECT orders.*, customers.customer_name, customers.customer_phone FROM orders INNER JOIN customers ON customer_ID_FK = customer_ID WHERE order_ID = ? ";
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

    server.post('/editOrder', (req, res) => {
        let order = req.body;
        // let order = [3,4,5,6];
        let query = `UPDATE orders SET ? WHERE order_ID = ${order.order_ID}`;
        // let query = `UPDATE orders SET order_status = 'test' WHERE order_ID IN (?)`;
        db.query(query, order, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query = `SELECT orders.*, customers.customer_name, customers.customer_phone FROM orders INNER JOIN customers ON customer_ID_FK = customer_ID WHERE order_ID = ${order.order_ID}`;
                db.query(query, function (error, result) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send(result);
                    }
                });
            }
        });
    });

    server.post('/exportOrders', (req, res) => {
        let array = req.body[0];
        let data = req.body[1];
        let query = 'INSERT INTO drivers_invoice SET ?';
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `INSERT INTO invoice_map (invoice_ID_FK, order_ID_FK) VALUES ?`;
                db.query(query2, [Array.from(array).map(function (OID) {
                    return [results.insertId, OID]
                })], function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let query3 = `UPDATE orders SET order_status = 'driver' WHERE order_ID IN (?)`;
                        db.query(query3, [array], function(error) {
                            if (error) {
                                res.status(400).send(error);
                            } else {
                                res.send('');
                            }
                        });
                    }
                });
            }
        });


        // let query = `UPDATE orders SET ? WHERE order_ID = ${order.order_ID}`;
        // // let query = `UPDATE orders SET order_status = 'test' WHERE order_ID IN (?)`;
        // db.query(query, order, function (error) {
        //     if (error) {
        //         res.status(400).send(error);
        //     } else {
        //         let query = `SELECT orders.*, customers.customer_name, customers.customer_phone FROM orders INNER JOIN customers ON customer_ID_FK = customer_ID WHERE order_ID = ${order.order_ID}`;
        //         db.query(query, function (error, result) {
        //             if (error) {
        //                 res.status(400).send(error);
        //             } else {
        //                 res.send(result);
        //             }
        //         });
        //     }
        // });
    });

    // server.post('/deleteService', (req, res) => {
    //     let ID = req.body.ID;
    //     let query = `UPDATE services SET service_status = false where SID = ?`;
    //     db.query(query, ID, function(error, results) {
    //         if(error) {
    //             res.status(400).send(error);
    //         } else {
    //             res.send(results);
    //         }
    //     });
    // });


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