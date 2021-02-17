app.factory('ordersFactory', function ($http, NotificationService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.searchVal = {
        value: null
    };
    model.itemsPerPage = {
        value: 10
    };
    model.orders = [];
    model.invoice = [];
    model.towns = [];


    model.setItemsPerPage = () => {
        return options = [{
                name: "10",
                value: 10
            },
            {
                name: "20",
                value: 20
            },
            {
                name: "50",
                value: 50
            },
            {
                name: "All",
                value: model.orders.length
            },
        ]
    }

    // get services cached function
    const getOrders = () => {
        return $http.get(`${url}/getOrders`).then(function (response) {
            angular.copy(response.data, model.orders);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getOrders = getOrders();

    // fetch orders for updates
    model.fetchOrders = () => {
        return $http.get(`${url}/getOrders`).then(function (response) {
            angular.copy(response.data, model.orders);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    //fetch towns for autocomplete feature
    const fetchTowns = () => {
        return $http.get(`${url}/fetchTowns`).then(function (response) {
            angular.copy(response.data, model.towns);
        }, function (error) {
            NotificationService.showError(error);
        });
    }
    model.fetchTowns = fetchTowns();


    model.addOrder = function (item) {
        return $http.post(`${url}/addOrder`, item).then(function (response) {
            $('#orderModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.editOrder = function (item) {
        return $http.post(`${url}/editOrder`, item).then(function (response) {
            $('#orderModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // model.deleteService = ID => {
    //     return $http.post(`${url}/deleteService`, ID).then(function () {
    //         $('#editServiceModal').modal('toggle');
    //         NotificationService.showSuccess();
    //     }, function (error) {
    //         NotificationService.showError(error.status);
    //     });
    // };


    model.exportOrders = function (item) {
        return $http.post(`${url}/exportOrders`, item).then(function (response) {
            $('#chooseDriver').modal('toggle');
            // return response.data;
            model.fetchOrders();
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    return model;
});