const express = require('express');
const server = express();
// const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login.routes');
const ordersRoutes = require('./routes/orders.routes');
const driversRoutes = require('./routes/drivers.routes');
const invoicesRoutes = require('./routes/invoices.routes');
const pickupRoutes = require('./routes/pickup.routes');
const historyRoutes = require('./routes/history.routes');
const customersRoutes = require('./routes/customers.routes');
const reportsRoutes = require('./routes/reports.routes');
const paymentsRoutes = require('./routes/payments.routes');
const remindersRoutes = require('./routes/reminders.routes');
const settingsRoutes = require('./routes/settings.routes');

var connection = require('./database');


server.use(express.urlencoded({
    extended: false
}));
server.use(express.json());

loginRoutes(server, connection);
ordersRoutes(server, connection);
driversRoutes(server, connection);
invoicesRoutes(server, connection);
pickupRoutes(server, connection);
historyRoutes(server, connection);
customersRoutes(server, connection);
reportsRoutes(server, connection);
paymentsRoutes(server, connection);
remindersRoutes(server, connection);
settingsRoutes(server, connection);

module.exports = server;