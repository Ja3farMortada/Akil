module.exports = (server, db) => {

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
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.send(results[0])
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

}