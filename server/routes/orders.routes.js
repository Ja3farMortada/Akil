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
                        db.query(query3, [array], function (error) {
                            if (error) {
                                res.status(400).send(error);
                            } else {
                                res.send(`${results.insertId}`);
                            }
                        });
                    }
                });
            }
        });
    });

    server.post('/addToInvoice', (req, res) => {
        let array = req.body[0];
        let data = req.body[1];
        let query = `UPDATE drivers_invoice SET total_value = total_value + ${data.total_value} WHERE invoice_ID = ${data.invoice_ID}`;
        db.query(query, data, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `INSERT INTO invoice_map (invoice_ID_FK, order_ID_FK) VALUES ?`;
                db.query(query2, [Array.from(array).map(function (OID) {
                    return [data.invoice_ID, OID]
                })], function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let query3 = `UPDATE orders SET order_status = 'driver' WHERE order_ID IN (?)`;
                        db.query(query3, [array], function (error) {
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
    });

}