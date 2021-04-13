module.exports = (server, db) => {


    // getDriverOrders
    server.post('/getDriverOrders', (req, res) => {
        let ID = req.body.driver_ID;
        let query = `SELECT driver_orders.operation_ID, driver_orders.op_date, driver_orders.op_time, orders.*, customers.customer_name FROM driver_orders INNER JOIN orders ON order_ID_FK = order_ID INNER JOIN customers ON customer_ID_FK = customer_ID WHERE driver_orders.driver_ID_FK = ${ID} AND orders.order_isDeleted = 0 AND orders.order_status = 'driver'`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    // getDriverStatement
    server.post('/getTotalLira', (req, res) => {
        let ID = req.body.driver_ID;
        let query = `SELECT SUM(order_value) AS total_lira, SUM(delivery_fee) AS total_delivery FROM orders WHERE order_ID IN (SELECT order_ID_FK FROM driver_orders WHERE driver_ID_FK = ${ID}) AND order_currency = 'lira' AND order_status = 'driver'`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results[0]);
            }
        });
    });
    server.post('/getTotalDollar', (req, res) => {
        let ID = req.body.driver_ID;
        let query = `SELECT SUM(order_value) AS total_dollar, SUM(delivery_fee) AS total_delivery FROM orders WHERE order_ID IN (SELECT order_ID_FK FROM driver_orders WHERE driver_ID_FK = ${ID}) AND order_currency = 'dollar' AND order_status = 'driver'`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results[0]);
            }
        });
    });

    // deliver order
    server.post('/deliverOrder', (req, res) => {
        let ID = req.body.order_ID;
        let query = `UPDATE orders SET order_status = 'delivered' WHERE order_ID = ${ID}`;
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send('');
            }
        });
    });
    // deliver order
    server.post('/removeOrderFromDriver', (req, res) => {
        let ID = req.body.order_ID;
        let query = `UPDATE orders SET order_status = 'office' WHERE order_ID = ${ID}`;
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `DELETE FROM driver_orders WHERE order_ID_FK = ${ID}`;
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


    // Drivers methods
    server.get('/getDrivers', (req, res) => {
        let query = "SELECT * FROM drivers WHERE driver_status != false";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/addDriver', (req, res) => {
        let data = req.body;
        let query = "INSERT INTO drivers SET ?";
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                let sql = `SELECT * FROM drivers WHERE driver_ID = ?`;
                db.query(sql, results.insertId, function (error, result) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send(result[0]);
                    }
                });
            }
        });
    });

    server.post('/editDriver', (req, res) => {
        let data = req.body;
        let query = `UPDATE drivers SET ? WHERE driver_ID = ${data.driver_ID}`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query = `SELECT * FROM drivers WHERE driver_ID = ${data.driver_ID}`;
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

    server.post('/deleteDriver', (req, res) => {
        let query = "UPDATE drivers SET driver_status = 0 WHERE ?";
        db.query(query, [req.body.ID], function (err, results) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send({
                    driver_ID: req.body.ID
                });
            }
        });
    });

};