app.factory('driversFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.selectedTab = 'statement';
    model.drivers = [];
    // model.driverDebts = [];
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

    // const getDriverDebts = function () {
    //     return $http.get(`${url}/getDriverDebts`).then(function (response) {
    //         angular.copy(response.data, model.driverDebts);
    //     }, function (error) {
    //         NotificationService.showError(error);
    //     });
    // };
    // model.getDriverDebts = getDriverDebts();

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
        return $http.post(`${url}/submitDriverPayment`, data).then(function (response) {
            $('#receivePaymentModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.editPayment = function (data) {
        return $http.post(`${url}/editDriverPayment`, data).then(function (response) {
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

    model.updateDriverDebit = function (data) {
        return $http.post(`${url}/updateDriverDebit`, data).then(function (response) {
            angular.copy(response.data, driversFactory.drivers);
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

    const getDrivers = function () {
        return $http.get(`${url}/getDrivers`).then(function (response) {
            angular.copy(response.data, model.drivers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getDrivers = getDrivers();

    model.fetchDrivers = function () {
        return $http.get(`${url}/getDrivers`).then(function (response) {
            angular.copy(response.data, model.drivers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.addDriver = function (data) {
        return $http.post(`${url}/addDriver`, data).then(response => {
            model.drivers.push(response.data);
            $('#driverModal').modal('hide');
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        })
    };

    model.editDriver = function (data) {
        return $http.post(`${url}/editDriver`, data).then(response => {
            $('#driverModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    model.deleteDriver = function (data) {
        return $http.post(`${url}/deleteDriver`, data).then(res => {
            const index = model.drivers.findIndex((cus => cus.driver_ID == res.data.driver_ID));
            model.drivers.splice(index, 1);
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    return model;
});