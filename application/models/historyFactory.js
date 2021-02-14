app.factory('historyFactory', ['$http', 'NotificationService', 'DateService', 'DebtsFactory', function ($http, NotificationService, DateService, DebtsFactory) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.tabSelected = 0;
    model.datePickerValue = DateService.getDate();
    model.servicesInvoices = [];
    model.stockInvoices = [];
    model.totalServices = [];
    model.totalStock = [];

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
    const getServicesInvoices = () => {
        return $http.get(`${url}/getServicesInvoices`, {
            params: {
                "date": model.datePickerValue
            }
        }).then(function (response) {
            angular.copy(response.data, model.servicesInvoices);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };
    model.getServicesInvoices = getServicesInvoices(); // expose function to the outer execution context

    // fetch services invoices
    model.fetchServicesInvoices = date => {
        return $http.get(`${url}/getServicesInvoices`, {
            params: {
                "date": date
            }
        }).then(function (response) {
            angular.copy(response.data, model.servicesInvoices);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    // get cached stock invoices function
    const getStockInvoices = () => {
        return $http.get(`${url}/getStockInvoices`, {
            params: {
                "date": model.datePickerValue
            }
        }).then(function (response) {
            angular.copy(response.data, model.stockInvoices);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };
    model.getStockInvoices = getStockInvoices(); // expose function to the outer execution context

    // fetch stock invoices
    model.fetchStockInvoices = date => {
        return $http.get(`${url}/getStockInvoices`, {
            params: {
                "date": date
            }
        }).then(function (response) {
            angular.copy(response.data, model.stockInvoices);
        }, function (error) {
            NotificationService.showError(error.status);
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
            NotificationService.showError(error.status);
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
            NotificationService.showError(error.status);
        });
    };



    return model;
}]);