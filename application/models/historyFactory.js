app.factory('historyFactory', ['$http', 'NotificationService', 'DateService', function ($http, NotificationService, DateService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.tabSelected = 0;
    model.datePickerValue = DateService.getDate();
    model.driversInvoice = [];
    model.invoiceDetails = [];
    model.activeRow = 0;
    // model.totalServices = [];
    // model.totalStock = [];

    //tab selection
    model.selectTab = function (tab) {
        if (this.tabSelected != tab) {
            switch (tab) {
                case 0:
                    this.tabSelected = 0;
                    break;

                case 1:
                    this.tabSelected = 1;
                    break;
            };
        }
    };

    // get cached services invoices function
    const getDriversInvoice = () => {
        return $http.get(`${url}/getDriversInvoice`, {
            params: {
                "date": model.datePickerValue
            }
        }).then(function (response) {
            angular.copy(response.data, model.driversInvoice);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getDriversInvoice = getDriversInvoice(); // expose function to the outer execution context

    // fetch services invoices
    model.fetchDriversInvoice = date => {
        return $http.get(`${url}/getDriversInvoice`, {
            params: {
                "date": date
            }
        }).then(function (response) {
            angular.copy(response.data, model.driversInvoice);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // fetch stock invoices
    model.getInvoiceDetails = invoiceID => {
        return $http.get(`${url}/getInvoiceDetails`, {
            params: {
                "invoice_ID": invoiceID
            }
        }).then(function (response) {
            angular.copy(response.data, model.invoiceDetails);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    return model;
}]);