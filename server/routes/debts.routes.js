module.exports = (server, db) => {

    server.get('/getCustomerDebts', (req, res) => {
        let query = "SELECT customer_ID_FK as customer_ID, customers.customer_name, SUM(remaining) as remaining FROM debts INNER JOIN customers ON customer_ID_FK = customer_ID WHERE debt_status = 1 GROUP BY customers.customer_ID ORDER BY customers.customer_name ASC";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/getDebtsDetails', (req, res) => {
        let ID = req.body.ID;
        let query = `SELECT 'stock' AS table_name, inv_ID, inv_date, inv_time, inv_total_price, invoice_details FROM invoice WHERE customer_ID_FK = ${ID} AND inv_status = 1 UNION SELECT 'service' AS table_name, ser_inv_ID, ser_inv_date, ser_inv_time, ser_inv_total_price, invoice_details FROM services_invoice WHERE customer_ID_FK = ${ID} AND ser_inv_status = 1 ORDER BY inv_date DESC, inv_time DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/getPaymentsDetails', (req, res) => {
        let ID = req.body.ID;
        let query = `SELECT * FROM customer_payments WHERE customer_ID_FK = ${ID} AND payment_status = true ORDER BY payment_ID DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    });

    // server.post('/getInvoiceDetails', (req, res) => {
    //     let ID = req.body.ID;
    //     let type = req.body.type;
    //     let query;
    //     if(type == 'stock') {
    //         query = `SELECT inv_id, stock.item_name as name, inv_det_quantity as quantity, inv_det_cost, inv_det_price as price FROM invoice_details INNER JOIN stock ON inv_det_IID = IID WHERE inv_id = ${ID}`;
    //     } else if (type == 'service') {
    //         query = `SELECT ser_inv_id, services.service_name as name, ser_inv_quantity as quantity, ser_inv_cost, ser_inv_price as price FROM ser_inv_details INNER JOIN services ON ser_inv_SID = SID WHERE ser_inv_id = ${ID}`;
    //     };

    //     db.query(query, function (error, results) {
    //         if (error) {
    //             res.status(400).end(error);
    //         } else {
    //             res.send(results);
    //         }
    //     });
    // });

    server.post('/submitCustomerPayment', (req, res) => {
        let data = req.body;
        let query = `INSERT INTO customer_payments SET ?`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let sql = `UPDATE customers SET customer_debit = customer_debit - ${data.payment_amount} WHERE customer_ID = ${data.customer_ID_FK}`;
                db.query(sql, function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let sql = `SELECT * FROM customer_payments WHERE payment_ID = ${results.insertId}`;
                        db.query(sql, function (error, result) {
                            if (error) {
                                result.status(400).send(error);
                            } else {
                                res.send(result[0]);
                            }
                        });
                    }
                });
            }
        })
    });

    server.post('/editCustomerPayment', (req, res) => {
        let data = req.body;
        let query = `UPDATE customer_payments SET payment_amount = ${data.payment_amount}, payment_notes = '${data.payment_notes}' WHERE payment_ID = ${data.payment_ID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let sql = `UPDATE customers SET customer_debit = customer_debit - (${data.payment_amount} - ${data.old_payment_amount}) WHERE customer_ID = ${data.customer_ID_FK}`;
                db.query(sql, function (error) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        let sql = `SELECT * FROM customer_payments WHERE payment_ID = ${data.payment_ID} AND payment_status = true`;
                        db.query(sql, function (error, result) {
                            if (error) {
                                result.status(400).send(error);
                            } else {
                                res.send(result[0]);
                            }
                        });
                    }
                });
            }
        })
    });

    server.post('/deletePayment', (req, res) => {
        let data = req.body;
        let query = `UPDATE customer_payments SET payment_status = false WHERE payment_ID = ${data.payment_ID}`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                let sql = `UPDATE customers SET customer_debit = customer_debit + ${data.payment_amount} WHERE customer_ID = ${data.customer_ID_FK}`;
                db.query(sql, function (error, results) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send('');
                    }
                });
            }
        });
    });

    server.get('/getTotalDebts', (req, res) => {
        let query = `SELECT SUM(remaining) AS remaining FROM debts WHERE item_type = 'Stock' AND debt_status = 1 UNION SELECT SUM(remaining) FROM debts WHERE item_type = 'Service' AND debt_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/updateCustomerDebit', (req, res) => {
        let ID = req.body.customer_ID;
        let debitAmount = req.body.debitAmount;
        let method = req.body.method;
        let query;
        switch (method) {
            case 'add':
                query = `UPDATE customers SET customer_debit = customer_debit + ${debitAmount} WHERE customer_ID = ${ID}`;
                break;
            case 'substract':
                query = `UPDATE customers SET customer_debit = customer_debit - ${debitAmount} WHERE customer_ID = ${ID}`;
        }
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query = `SELECT * FROM customers WHERE customer_status = true`;
                db.query(query, function (error, results) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send(results);
                    }
                });
            }
        });
    });

}