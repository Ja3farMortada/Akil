module.exports = (server, db) => {

    server.get('/getCustomers', (req, res) => {
        let query = "SELECT * FROM customers WHERE customer_status = 1";
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    server.post('/addCustomer', (req, res) => {
        let data = req.body;
        let query = "INSERT INTO customers SET ?";
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                let sql = `SELECT * FROM customers WHERE customer_ID = ?`;
                db.query(sql, results.insertId, function (error, result) {
                    if (error) {
                        res.status(400).send(error);
                    } else {
                        res.send(result[0])
                    }
                });
            }
        });
    });

    server.post('/editCustomer', (req, res) => {
        let data = req.body;
        let query = `UPDATE customers SET ? WHERE customer_ID = ${data.customer_ID}`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                let query = `SELECT * FROM customers WHERE customer_ID = ${data.customer_ID}`;
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

    server.post('/deleteCustomer', (req, res) => {
        let query = "UPDATE customers SET customer_status = 0 WHERE ?";
        db.query(query, [req.body.ID], function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send({
                    customer_ID: req.body.ID
                });
            }
        });
    });

    server.post('/getOrdersArchive', (req, res) => {
        let ID = req.body.ID;
        let query = `SELECT * FROM orders WHERE customer_ID_FK = ${ID} AND order_isDeleted = 0 ORDER BY order_date DESC, order_time DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });

    // server.get('/getTotalDue', (req, res) => {
    //     let query = `SELECT SUM(remaining) AS remaining FROM debts WHERE item_type = 'Stock' AND debt_status = 1 UNION SELECT SUM(remaining) FROM debts WHERE item_type = 'Service' AND debt_status = 1`;
    //     db.query(query, function (error, results) {
    //         if (error) {
    //             res.status(400).send(error);
    //         } else {
    //             res.send(results);
    //         }
    //     });
    // });

    server.post('/getPaymentsDetails', (req, res) => {
        let ID = req.body.ID;
        let query = `SELECT * FROM customer_payments WHERE customer_ID_FK = ${ID} AND payment_status = true ORDER BY payment_ID DESC`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results);
            }
        });
    });


    server.post('/submitCustomerPayment', (req, res) => {
        let data = req.body;
        let query = `INSERT INTO customer_payments SET ?`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                let sql = `UPDATE customers SET customer_due = customer_due - ${data.payment_amount} WHERE customer_ID = ${data.customer_ID_FK}`;
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
        db.query(query, function (error) {
            if (error) {
                res.status(400).send(error);
            } else {
                let sql = `UPDATE customers SET customer_due = customer_due - (${data.payment_amount} - ${data.old_payment_amount}) WHERE customer_ID = ${data.customer_ID_FK}`;
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
                res.status(400).send(error);
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