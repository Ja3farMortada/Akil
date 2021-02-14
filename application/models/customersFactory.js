app.factory('customersFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.selectedTab = 'statement';
    model.customers = [];
    // model.customerDebts = [];
    model.selectedDebtsDetails = [];
    model.selectedPaymentDetails = [];
    model.totalDebts = [];
    model.activeRow = null;
    model.sortData = {
        key: 'total',
        reverse: false
    }

    model.sort = keyname => {
        model.sortData.key = keyname;
        model.sortData.reverse = !model.sortData.reverse;
    }

    // const getCustomerDebts = function () {
    //     return $http.get(`${url}/getCustomerDebts`).then(function (response) {
    //         angular.copy(response.data, model.customerDebts);
    //     }, function (error) {
    //         NotificationService.showError(error);
    //     });
    // };
    // model.getCustomerDebts = getCustomerDebts();

    model.getDebtsDetails = ID => {
        return $http.post(`${url}/getDebtsDetails`, ID).then(function (response) {
            angular.copy(response.data, model.selectedDebtsDetails);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.getPaymentDetails = ID => {
        return $http.post(`${url}/getPaymentsDetails`, ID).then(function (response) {
            angular.copy(response.data, model.selectedPaymentDetails);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    const getTotalDebts = function () {
        return $http.get(`${url}/getTotalDebts`).then(function (response) {
            angular.copy(response.data, model.totalDebts);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getTotalDebts = getTotalDebts();

    model.submitPayment = function (data) {
        return $http.post(`${url}/submitCustomerPayment`, data).then(function (response) {
            $('#receivePaymentModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.editPayment = function (data) {
        return $http.post(`${url}/editCustomerPayment`, data).then(function (response) {
            $('#editPaymentModal').modal('hide');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.deletePayment = function (data) {
        return $http.post(`${url}/deletePayment`, data).then(function (response) {
            $('#editPaymentModal').modal('hide');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.updateCustomerDebit = function (data) {
        return $http.post(`${url}/updateCustomerDebit`, data).then(function (response) {
            angular.copy(response.data, customersFactory.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // tab selection
    model.selectTab = function (tab) {
        if (this.selectedTab != tab) {
            switch (tab) {
                case 'statement':
                    this.selectedTab = 'statement';
                    break;

                case 'details':
                    this.selectedTab = 'details';
                    break;
            }
        }
    }

    const getCustomers = function () {
        return $http.get(`${url}/getCustomers`).then(function (response) {
            angular.copy(response.data, model.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getCustomers = getCustomers();

    model.fetchCustomers = function () {
        return $http.get(`${url}/getCustomers`).then(function (response) {
            angular.copy(response.data, model.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.addCustomer = function (data) {
        return $http.post(`${url}/addCustomer`, data).then(response => {
            model.customers.push(response.data);
            $('#customerModal').modal('hide');
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        })
    };

    model.editCustomer = function (data) {
        return $http.post(`${url}/editCustomer`, data).then(response => {
            $('#customerModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    model.deleteCustomer = function (data) {
        return $http.post(`${url}/deleteCustomer`, data).then(res => {
            const index = model.customers.findIndex((cus => cus.customer_ID == res.data.customer_ID));
            model.customers.splice(index, 1);
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    return model;
});