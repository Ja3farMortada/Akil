app.factory('servicesFactory', function ($http, NotificationService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.services = [];
    model.invoice = [];
    model.tabSelected = 0;

    // tab selection
    model.selectTab = function (tab) {
        if (this.tabSelected != tab) {
            switch (tab) {
                case 0:
                    this.tabSelected = 0;
                    break;

                case 1:
                    this.tabSelected = 1;
                    break;

                case 2:
                    this.tabSelected = 2;
                    break;

                case 3:
                    this.tabSelected = 3;
                    break;
            }
        }
    };

    // get services cached function
    const getServices = () => {
        return $http.get(`${url}/getServices`).then(function (response) {
            angular.copy(response.data, model.services);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };
    model.getServices = getServices(); // expose function to the outer excution context

    // add to invoice
    model.addToInvoice = function (item) {
        this.invoice.push(item);
    };
    // remove from invoice
    model.removeFromInvoice = function (index) {
        this.invoice.splice(index, 1);
    };
    // total cost and price
    model.total = function () {
        return this.invoice.reduce(function (memo, item) { // memo is the reduced value initialized by array with two zeros [0,0]
            return [memo[0] + (item.quantity * item.cost), memo[1] + (item.quantity * item.price)];
        }, [0, 0]);
    };
    // clear invoice
    model.clearInvoice = function () {
        this.invoice = [];
    };


    model.addService = function (item) {
        return $http.post(`${url}/addService`, item).then(function (response) {
            $('#addServiceModal').modal('toggle');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    model.editService = function (item) {
        return $http.post(`${url}/editService`, item).then(function () {
            $('#editServiceModal').modal('toggle');
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    model.deleteService = ID => {
        return $http.post(`${url}/deleteService`, ID).then(function () {
            $('#editServiceModal').modal('toggle');
            NotificationService.showSuccess();
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };

    return model;
});