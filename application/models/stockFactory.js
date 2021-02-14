app.factory('stockFactory', function ($http, NotificationService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.items = [];
    model.totalStock = {};
    model.isDollar = false;

    // toggle to dollar
    model.toggleCurrency = () => {
        model.isDollar = !model.isDollar;
    };

    // cached data function
    const getItems = function () {
        return $http.get(`${url}/getItems`).then(function (response) {
            angular.copy(response.data, model.items);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getItems = getItems(); // expose the function to the outer execution context

    // fetch real-time data function
    model.fetchItems = function () {
        return $http.get(`${url}/getItems`).then(function (response) {
            angular.copy(response.data, model.items);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // Get Total Stock Data
    const getTotalStock = function() {
        return $http.get(`${url}/getTotalStock`).then(function (response) {
            angular.copy(response.data[0], model.totalStock);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getTotalStock = getTotalStock();

    model.fetchTotalStock = function () {
        return $http.get(`${url}/getTotalStock`).then(function (response) {
            angular.copy(response.data[0], model.totalStock);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // Add Items
    model.addItem = function (item) {
        return $http.post(`${url}/addItem`, item).then(function (response) {
            model.fetchTotalStock();
            $('#itemModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // Edit Items
    model.editItem = function (item) {
        return $http.post(`${url}/editItem`, item).then(function () {
            model.fetchTotalStock();
            $('#itemModal').modal('toggle');
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // Delete Items
    model.deleteItem = function (ID) {
        return $http.post(`${url}/deleteItem`, ID).then(function () {
            model.fetchTotalStock();
            $('#itemModal').modal('toggle');
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    return model;
});