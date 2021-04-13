app.factory('DriversFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};

    model.selectedDriverID = null;
    model.drivers = [];
    model.driverOrders = [];
    model.liraStatement = {};
    model.dollarStatement = {};

    // get driver orders
    model.getDriverOrders = ID => {
        return $http.post(`${url}/getDriverOrders`, {
            driver_ID: ID
        }).then(function (response) {
            angular.copy(response.data, model.driverOrders);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // getDriverStatement
    model.getTotalLira = ID => {
        return $http.post(`${url}/getTotalLira`, {
            driver_ID: ID
        }).then(function (response) {
            angular.copy(response.data, model.liraStatement);
        }, function (error) {
            NotificationService.showError(error);
        });
    }
    model.getTotalDollar = ID => {
        return $http.post(`${url}/getTotalDollar`, {
            driver_ID: ID
        }).then(function (response) {
            angular.copy(response.data, model.dollarStatement);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // deliver order
    model.deliverOrder = ID => {
        return $http.post(`${url}/deliverOrder`, {
            order_ID: ID
        }).then(function () {
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
    }
    // remove order
    model.removeOrder = ID => {
        return $http.post(`${url}/removeOrderFromDriver`, {
            order_ID: ID
        }).then(function () {
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
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
            const index = model.drivers.findIndex((x => x.driver_ID == res.data.driver_ID));
            model.drivers.splice(index, 1);
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    return model;
});