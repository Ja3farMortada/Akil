module.exports = (server, db) => {

    function getDate() {
        var d = new Date();
        months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return d.getFullYear() + '-' + months[d.getMonth()] + '-' + d.getDate();
    }

    function getTime() {
        var d = new Date();
        return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }

    server.get('/getPickupInvoices', (req, res) => {
        let query = `SELECT pickup_invoice.*, driver_name FROM pickup_invoice INNER JOIN drivers ON driver_ID_FK = driver_ID WHERE pickup_isCompleted = 0`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/addPickupInvoice', (req, res) => {
        let data = req.body;
        let query = `INSERT INTO pickup_invoice SET ?`;
        db.query(query, data, function (error, result) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `SELECT pickup_invoice.*, driver_name FROM pickup_invoice INNER JOIN drivers ON driver_ID_FK = driver_ID WHERE pickup_ID = ${result.insertId}`;
                db.query(query2, function (error, results) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send(results[0]);
                    }
                })
            }
        });
    });

    server.get('/getPickupInvoiceDetails', (req, res) => {
        let ID = req.query.pickup_ID;
        let query = `SELECT pickup_map.*, customers.customer_name, customers.customer_phone, customers.customer_province, customers.customer_district, customers.customer_town, customers.customer_address FROM pickup_map INNER JOIN customers ON customer_ID_FK = customer_ID WHERE pickup_ID_FK = ${ID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/addPickupOrder', (req, res) => {
        let data = req.body;
        let query = `INSERT INTO pickup_map SET ?`;
        db.query(query, data, function (error, result) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `UPDATE pickup_invoice SET total_value = total_value + ${data.total_paid} WHERE pickup_ID = ${data.pickup_ID_FK}`;
                db.query(query2, function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let query3 = `SELECT pickup_map.*, customers.customer_name, customers.customer_phone, customers.customer_province, customers.customer_district, customers.customer_town, customers.customer_address FROM pickup_map INNER JOIN customers ON customer_ID_FK = customer_ID WHERE map_ID = ${result.insertId}`;
                        db.query(query3, function (error, results) {
                            if (error) {
                                res.status(400).send(error);
                            } else {
                                res.send(results)
                            }
                        });
                    }
                })
            }
        });
    });

    server.post('/editPickupOrder', (req, res) => {
        let data = req.body;
        let query = `UPDATE pickup_invoice SET total_value = total_value + ${data.total_paid} - (SELECT total_paid FROM pickup_map WHERE map_ID = ${data.map_ID}) WHERE pickup_ID = ${data.pickup_ID_FK}`;
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `UPDATE pickup_map SET ? WHERE map_ID = ${data.map_ID}`;
                db.query(query2, data, function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let query3 = `SELECT pickup_map.*, customers.customer_name, customers.customer_phone, customers.customer_province, customers.customer_district, customers.customer_town, customers.customer_address FROM pickup_map INNER JOIN customers ON customer_ID_FK = customer_ID WHERE map_ID = ${data.map_ID}`;
                        db.query(query3, function (error, results) {
                            if (error) {
                                res.status(400).send(error);
                            } else {
                                res.send(results);
                            }
                        })
                    }
                });
            }
        });
    });

    server.post('/removeOrder', (req, res) => {
        let data = req.body;
        let query = `DELETE FROM pickup_map WHERE map_ID = ${data.map_ID}`;
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `UPDATE pickup_invoice SET total_value = total_value - ${data.value} WHERE pickup_ID = ${data.pickup_ID}`;
                db.query(query2, function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send('');
                    }
                })
            }
        });
    });

    server.post('/deliverPickup', (req, res) => {
        console.log(req.body)
        // let pickup_ID = req.body.pickup_ID;
        // let data = req.body.details;
        // let query = `UPDATE pickup_invoice SET pickup_isCompleted = true WHERE pickup_ID = ${pickup_ID}`;
        // db.query(query, function (error) {
        //     if (error) {
        //         res.status(400).send(error);
        //     } else {
        //         let list = Array.from(data).map(function (customer) {
        //             return {
        //                 customer_ID_FK: customer.customer_ID_FK,
        //                 payment_amount: customer.total_paid,
        //                 payment_date: getDate(),
        //                 payment_time: getTime()
        //             }
        //         });
        //         res.send(list);
        //     }
        // });
    });
}