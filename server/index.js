const server = require('express')();
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login.routes');
const ordersRoutes = require('./routes/orders.routes');
const invoicesRoutes = require('./routes/invoices.routes');
const stockRoutes = require('./routes/stock.routes');
const historyRoutes = require('./routes/history.routes');
const customersRoutes = require('./routes/customers.routes');
const paymentsRoutes = require('./routes/payments.routes');
const remindersRoutes = require('./routes/reminders.routes');
const settingsRoutes = require('./routes/settings.routes');

var connection = require('./database');

server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json());

loginRoutes(server, connection);
ordersRoutes(server, connection);
invoicesRoutes(server, connection);
stockRoutes(server, connection);
historyRoutes(server, connection);
customersRoutes(server, connection);
paymentsRoutes(server, connection);
remindersRoutes(server, connection);
settingsRoutes(server, connection);

module.exports = server;