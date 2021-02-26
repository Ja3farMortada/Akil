app.factory('invoiceFactory', ['$http', 'NotificationService', 'ordersFactory', function ($http, NotificationService, ordersFactory) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.invoice = [];
    model.orders = [];
    model.invoices = [];
    
    // get invoices for reference
    const getInvoices = () => {
        return $http.get(`${url}/getInvoices`).then(function (response) {
            angular.copy(response.data, model.invoices);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getInvoices = getInvoices();

    // fetch invoices for updates
    model.fetchInvoices = () => {
        return $http.get(`${url}/getInvoices`).then(function (response) {
            angular.copy(response.data, model.invoices);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // barcode scan for invoice
    model.getScannedInvoice = invoiceID => {
        return $http.get(`${url}/getScannedInvoice`, {
            params: {
                "invoice_ID": invoiceID
            }
        }).then(function (response) {
            angular.copy(response.data, model.invoice);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // barcode scan for orders
    model.getScannedInvoiceOrders = invoiceID => {
        return $http.get(`${url}/getScannedInvoiceOrders`, {
            params: {
                "invoice_ID": invoiceID
            }
        }).then(function (response) {
            angular.copy(response.data, model.orders);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // remove order from selected invoice
    model.removeOrder = (ID, value) => {
        return $http.post(`${url}/removeOrderFromInvoice`, {
            orderID: ID,
            orderValue: value,
            invoiceID: model.invoice[0]['invoice_ID']
        }).then(function() {
            NotificationService.showSuccessToast();
            model.getScannedInvoice(model.invoice[0]['invoice_ID']);
            model.getScannedInvoiceOrders(model.invoice[0]['invoice_ID']);
            model.fetchInvoices();
            ordersFactory.fetchOrders();
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    model.deliverInvoice = data => {
        return $http.post(`${url}/deliverInvoice`, data).then(function() {
            NotificationService.showSuccess();
            model.getScannedInvoice(model.invoice[0]['invoice_ID']);
            model.getScannedInvoiceOrders(model.invoice[0]['invoice_ID']);
            model.fetchInvoices();
            ordersFactory.fetchOrders();
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    return model;

}]);