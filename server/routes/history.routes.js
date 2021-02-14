module.exports = (server, db) => {

    server.get('/getStockInvoices', (req, res) => {
        let date = req.query.date;
        let query = `SELECT * FROM invoice WHERE inv_date = '${date}' AND inv_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/getServicesInvoices', (req, res) => {
        let date = req.query.date;
        let query = `SELECT * FROM services_invoice WHERE ser_inv_date = '${date}' AND ser_inv_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/getTotalServices', (req, res) => {
        let date = req.query.date;
        let query = `SELECT SUM(ser_inv_total_cost) AS totalCost, SUM(ser_inv_total_price) AS totalPrice FROM services_invoice WHERE ser_inv_date = '${date}' AND ser_inv_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    });

    server.get('/totalStockInvoices', (req, res) => {
        let date = req.query.date;
        let query = `SELECT SUM(inv_total_cost) AS totalCost, SUM(inv_total_price) AS totalPrice FROM invoice WHERE inv_date = '${date}' AND inv_status = 1`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
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
                        res.status(400).end(error);
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
                        res.status(400).end(error);
                    } else {
                        res.send('');
                    }
                });
                break;
        }
    });
};