module.exports = (server, db) => {

    server.get('/getDriversInvoice', (req, res) => {
        let date = req.query.date;
        let query = `SELECT drivers_invoice.*, driver_name FROM drivers_invoice INNER JOIN drivers ON driver_ID_FK = driver_ID WHERE pickup_date = '${date}' AND invoice_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    // fetchDriverOrders
    server.get('/fetchDriverOrders', (req, res) => {
        let date = req.query.date;
        let query = `SELECT driver_orders.operation_ID, driver_orders.op_date, driver_orders.op_time, drivers.driver_name, orders.*, customers.customer_name FROM driver_orders INNER JOIN orders ON order_ID_FK = order_ID INNER JOIN customers ON customer_ID_FK = customer_ID INNER JOIN drivers ON driver_orders.driver_ID_FK = drivers.driver_ID WHERE driver_orders.op_date = '${date}' AND orders.order_isDeleted = 0 ORDER BY drivers.driver_name DESC, orders.order_status DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/getInvoiceDetails', (req, res) => {
        let data = req.query;
        let query = `SELECT orders.*, customers.customer_name, customers.customer_phone FROM orders INNER JOIN customers ON customer_ID_FK = customer_ID WHERE order_ID IN (SELECT order_ID_FK FROM invoice_map WHERE invoice_ID_FK = ${data.invoice_ID})`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });


    server.post('/deleteInvoice', (req, res) => {
        let tab = req.body.tab;
        switch (tab) {
            case 0:
                let serviceInvoiceID = req.body.invoice.ser_inv_ID;
                let query = `UPDATE services_invoice SET ser_inv_status = 0 WHERE ser_inv_ID = ${serviceInvoiceID}`;
                db.query(query, function (error, results) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send(results);
                    }
                });
                break;

            case 1:
                let invoiceID = req.body.invoice.inv_ID;
                let query2 = `UPDATE invoice SET inv_status = 0 WHERE inv_ID = ${invoiceID}`;
                db.query(query2, function (error, results) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send('');
                    }
                });
                break;
        }
    });
};