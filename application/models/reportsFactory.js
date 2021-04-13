app.factory('reportsFactory', ['$http', 'NotificationService', function ($http, NotificationService) {
    // define URL
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.reports = [];

    model.getReports = dates => {
        return $http.post(`${url}/getReports`, dates).then(function (response) {
            angular.copy(response.data, model.reports);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    return model;
}]);