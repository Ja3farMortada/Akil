app.factory('DebtsFactory', function ($http, NotificationService, customersFactory) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.customerDebts = [];
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

    const getCustomerDebts = function () {
        return $http.get(`${url}/getCustomerDebts`).then(function (response) {
            angular.copy(response.data, model.customerDebts);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };
    // model.getCustomerDebts = getCustomerDebts();

    model.getDebtsDetails = ID => {
        return $http.post(`${url}/getDebtsDetails`, ID).then(function (response) {
            angular.copy(response.data, model.selectedDebtsDetails);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    model.getPaymentDetails = ID => {
        return $http.post(`${url}/getPaymentsDetails`, ID).then(function (response) {
            angular.copy(response.data, model.selectedPaymentDetails);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    const getTotalDebts = function () {
        return $http.get(`${url}/getTotalDebts`).then(function (response) {
            angular.copy(response.data, model.totalDebts);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };
    model.getTotalDebts = getTotalDebts();

    model.submitPayment = function (data) {
        return $http.post(`${url}/submitCustomerPayment`, data).then(function (response) {
            $('#receivePaymentModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    model.editPayment = function (data) {
        return $http.post(`${url}/editCustomerPayment`, data).then(function (response) {
            $('#editPaymentModal').modal('hide');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    model.deletePayment = function (data) {
        return $http.post(`${url}/deletePayment`, data).then(function (response) {
            $('#editPaymentModal').modal('hide');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    model.updateCustomerDebit = function (data) {
        return $http.post(`${url}/updateCustomerDebit`, data).then(function (response) {
            angular.copy(response.data, customersFactory.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    return model;
});