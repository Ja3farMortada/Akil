app.factory('ordersFactory', function ($http, NotificationService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.searchVal = {
        value: null
    };
    model.itemsPerPage = {
        value: 15
    };
    model.orders = [];
    model.towns = [];
    model.sortData = {
        key: 'order_ID',
        reverse: true
    }

    // sorting table
    model.sort = keyname => {
        model.sortData.key = keyname;
        model.sortData.reverse = !model.sortData.reverse;
    }

    // items per page
    model.setItemsPerPage = () => {
        return options = [{
                name: "10",
                value: 10
            },
            {
                name: "15",
                value: 15
            },
            {
                name: "30",
                value: 30
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

    // add order
    model.addOrder = item => {
        return $http.post(`${url}/addOrder`, item).then(function (response) {
            $('#orderModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // edit order
    model.editOrder = item => {
        return $http.post(`${url}/editOrder`, item).then(function (response) {
            $('#orderModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // delete order
    // model.deleteOrder = ID => {
    //     return $http.post(`${url}/deleteOrder`, ID).then(function () {
    //         $('#editServiceModal').modal('toggle');
    //         NotificationService.showSuccess();
    //     }, function (error) {
    //         NotificationService.showError(error.status);
    //     });
    // };

    // export orders
    model.exportOrders = item => {
        return $http.post(`${url}/exportOrders`, item).then(function (response) {
            $('#chooseDriver').modal('toggle');
            model.fetchOrders();
            NotificationService.showSuccess();
            return (response.data)
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // add to invoice
    model.addToInvoice = data => {
        return $http.post(`${url}/addToInvoice`, data).then(function () {
            $('#chooseInvoice').modal('toggle');
            model.fetchOrders();
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error);
        });
    };


    return model;
});