module.exports = (server, db) => {

    server.get('/getInvoices', (req, res) => {
        let query = `SELECT drivers_invoice.*, driver_name FROM drivers_invoice INNER JOIN drivers ON driver_ID_FK = driver_ID WHERE invoice_isDelivered = 0`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/getScannedInvoice', (req, res) => {
        let data = req.query;
        let query = `SELECT drivers_invoice.*, drivers.driver_name FROM drivers_invoice INNER JOIN drivers ON driver_ID_FK = driver_ID WHERE invoice_ID = ${data.invoice_ID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/getScannedInvoiceOrders', (req, res) => {
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

    server.post('/removeOrderFromInvoice', (req, res) => {
        let orderID = req.body.orderID;
        let orderValue = req.body.orderValue;
        let invoiceID = req.body.invoiceID
        let query = `DELETE FROM invoice_map WHERE order_ID_FK = ${orderID}`;
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `UPDATE drivers_invoice SET total_value = total_value - ${orderValue} WHERE invoice_ID = ${invoiceID}`;
                db.query(query2, function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let query3 = `UPDATE orders SET order_status = 'office' WHERE order_ID = ${orderID}`;
                        db.query(query3, function (error) {
                            if (error) {
                                res.status(400).send(error);
                            } else {
                                res.send('')
                            }
                        });
                    }
                });
            }
        });
    });

    server.post('/deliverInvoice', (req, res) => {
        let array = req.body.array;
        let invoiceID = req.body.invoice_ID
        let query = `UPDATE drivers_invoice SET invoice_isDelivered = true WHERE invoice_ID = ${invoiceID}`;
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query2 = `UPDATE orders SET order_status = 'delivered' WHERE order_ID IN (?)`;
                db.query(query2, [array], function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send('');
                    }
                });
            }
        });
    });

};