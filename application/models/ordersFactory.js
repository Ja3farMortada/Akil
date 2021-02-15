app.factory('ordersFactory', function ($http, NotificationService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.orders = [];
    model.invoice = [];


    // get services cached function
    const getOrders = () => {
        return $http.get(`${url}/getOrders`).then(function (response) {
            angular.copy(response.data, model.orders);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getOrders = getOrders();


    model.addOrder = function (item) {
        return $http.post(`${url}/addOrder`, item).then(function (response) {
            $('#orderModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // model.editService = function (item) {
    //     return $http.post(`${url}/editService`, item).then(function () {
    //         $('#editServiceModal').modal('toggle');
    //         NotificationService.showSuccess();
    //     }, function (error) {
    //         NotificationService.showError(error.status);
    //     });
    // };

    // model.deleteService = ID => {
    //     return $http.post(`${url}/deleteService`, ID).then(function () {
    //         $('#editServiceModal').modal('toggle');
    //         NotificationService.showSuccess();
    //     }, function (error) {
    //         NotificationService.showError(error.status);
    //     });
    // };

    return model;
});