module.exports = (server, db) => {

    //get reminders function
    function getReminders(res) {
        let query = `SELECT * FROM reminders WHERE reminder_status = true`;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    }

    // get reminders API
    server.get('/getReminders', (req, res) => {
        getReminders(res);
    });

    // add reminder API
    server.post('/addReminder', (req, res) => {
        let data = req.body;
        let query = `INSERT INTO reminders SET ?`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                getReminders(res);
            }
        });
    });

    // edit reminder API
    server.post('/editReminder', (req, res) => {
        let data = req.body;
        let query = `UPDATE reminders SET ? WHERE reminder_ID = ${data.reminder_ID}`;
        db.query(query, data, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                getReminders(res);
            }
        });
    });

    // remove reminder
    server.post('/removeReminder', (req, res) => {
        let ID = req.body.ID;
        let query = `UPDATE reminders SET reminder_status = false WHERE reminder_ID = ?`;
        db.query(query, ID, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                getReminders(res);
            }
        });
    });
}