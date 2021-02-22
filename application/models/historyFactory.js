app.factory('historyFactory', ['$http', 'NotificationService', 'DateService', function ($http, NotificationService, DateService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.tabSelected = 0;
    model.datePickerValue = DateService.getDate();
    model.driversInvoice = [];
    model.invoiceDetails = [];
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
    model.getInvoiceDetails = (invoiceID) => {
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

    // delete invoice
    model.deleteInvoice = (invoice, tab, date) => {
        data = {
            'invoice': invoice,
            'tab': tab
        };
        return $http.post(`${url}/deleteInvoice`, data).then(function () {
            if(invoice.customer_ID_FK) {
                if(invoice.inv_ID) {
                    DebtsFactory.updateCustomerDebit({
                        "customer_ID": invoice.customer_ID_FK,
                        "debitAmount": invoice.inv_total_price,
                        "method": "substract"
                    });
                } else if (invoice.ser_inv_ID) {
                    DebtsFactory.updateCustomerDebit({
                        "customer_ID": invoice.customer_ID_FK,
                        "debitAmount": invoice.ser_inv_total_price,
                        "method": "substract"
                    });
                }
            }
            if (tab == 0) {
                model.fetchServicesInvoices(date);
                model.fetchTotalServices(date);
            } else {
                model.fetchStockInvoices(date);
                model.fetchTotalStock(date);
            }
            NotificationService.showSuccessToast();
        }, function (error) {
            NotificationService.showError(error.status);
        })
    };

    // fetch total services invoice
    model.fetchTotalServices = date => {
        return $http.get(`${url}/getTotalServices`, {
            params: {
                "date": date
            }
        }).then(function(response) {
            angular.copy(response.data, model.totalServices);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // fetch total stock invoice
    model.fetchTotalStock = date => {
        return $http.get(`${url}/totalStockInvoices`, {
            params: {
                "date": date
            }
        }).then(function(response) {
            angular.copy(response.data, model.totalStock);
        }, function (error) {
            NotificationService.showError(error);
        });
    };



    return model;
}]);