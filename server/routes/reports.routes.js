module.exports = (server, db) => {

    server.post('/getReports', (req, res) => {
        let start_date = req.body.start_date;
        let end_date = req.body.end_date;

        let query = `SELECT COUNT(delivery_fee) as count, sum(delivery_fee) as sum, 'delivered' as status FROM orders WHERE order_status = 'delivered' AND order_date >= '${start_date}' AND order_date <= '${end_date}' 
        UNION ALL
        SELECT COUNT(delivery_fee), sum(delivery_fee), 'driver' FROM orders WHERE order_status = 'driver'  AND order_date >= '${start_date}' AND order_date <= '${end_date}' 
        UNION ALL
         SELECT COUNT(delivery_fee), sum(delivery_fee), 'office' FROM orders WHERE order_status = 'office' AND order_date >= '${start_date}' AND order_date <= '${end_date}'
          UNION ALL
           SELECT COUNT(amount), SUM(amount), 'payment' FROM payments WHERE payments.date >= '${start_date}' AND payments.date <= '${end_date}' `;
        db.query(query, function (error, results) {
            if (error) {
                res.status(400).end(error);
            } else {
                res.send(results);
            }
        });
    });
}