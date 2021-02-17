app.factory('driversFactory', function ($http, NotificationService) {

    // define URL
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
   
    model.drivers = [];
    

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