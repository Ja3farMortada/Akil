module.exports = (server, db) => {

    function getAssets(res) {
        let query = `SELECT assets FROM assets`;
        db.query(query, function(err, results) {
            if (err) {
                res.status(400).end(err);
            } else {
                res.send(results)
            }
        });
    }
    server.get('/getAssets', (req, res) => {
        getAssets(res);
    });

    server.get('/getTodaysTotalPayments', (req, res) => {
        let date = req.query.date;
        let query = `SELECT SUM(amount) AS payments FROM payments WHERE date = '${date}'`;
        db.query(query, function(err, results) {
            if (err) {
                res.status(400).end(err);
            } else {
                res.send(results)
            }
        });
    });

    server.post('/addMoney', (req, res) => {
        let amount = req.body.amount;
        let query = `UPDATE assets SET assets = assets + ?`;
        db.query(query, amount, function(err, results) {
            if (err) {
                res.status(400).end(err);
            } else {
                getAssets(res);
            }
        });
    });

    server.post('/addPayment', (req, res) => {
        let data = req.body;
        let query = `INSERT INTO payments SET ?`;
        db.query(query, data, function(err) {
            if (err) {
                res.status(400).end(err);
            } else {
                // update assets
                let query = `UPDATE assets SET assets = assets - ?`;
                db.query(query, data.amount, function(err) {
                    if (err) {
                        res.status(400).end(err);
                    } else {
                        getAssets(res);
                    }
                })
            }
        });
    });

    server.get('/getPayments', (req, res) => {
        let date1 = req.query.date1;
        let date2 = req.query.date2;
        let query = `SELECT * FROM payments WHERE date >= '${date1}' AND date <= '${date2}'`;
        db.query(query, function(err, results) {
            if (err) {
                res.status(400).end(err);
            } else {
                res.send(results)
            }
        });
    });
}