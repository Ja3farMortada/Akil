app.factory('pickupFactory', function ($http, NotificationService) {

    // define url
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.invoices = [];
    model.invoiceDetails = [];
    model.activeRow = 0;

    // get invoices cached function
    const getPickupInvoices = () => {
        return $http.get(`${url}/getPickupInvoices`).then(function (response) {
            angular.copy(response.data, model.invoices);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getPickupInvoices = getPickupInvoices();

    // fetch orders for updates
    model.fetchPickupInvoices = () => {
        return $http.get(`${url}/getPickupInvoices`).then(function (response) {
            angular.copy(response.data, model.invoices);
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    //add pickup invoice
    model.addPickupInvoice = data => {
        return $http.post(`${url}/addPickupInvoice`, data).then(function (response) {
            NotificationService.showSuccessToast();
            $('#pickupInvoiceModal').modal('hide');
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // get invoice details
    model.showInvoiceDetails = ID => {
        return $http.get(`${url}/getPickupInvoiceDetails`, {
            params: {
                "pickup_ID": ID
            }
        }).then(function (response) {
            angular.copy(response.data, model.invoiceDetails);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    // add order
    model.addPickupOrder = data => {
        return $http.post(`${url}/addPickupOrder`, data).then(function (response) {
            $('#pickupOrderModal').modal('toggle');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // edit order
    model.editPickupOrder = data => {
        return $http.post(`${url}/editPickupOrder`, data).then(function (response) {
            $('#pickupOrderModal').modal('toggle');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    // remove order
    model.removeOrder = (mapID, pickupID, value) => {
        return $http.post(`${url}/removeOrder`, {
            map_ID: mapID,
            pickup_ID: pickupID,
            value: value
        }).then(function () {
            NotificationService.showSuccessToast();
        }, function (error) {
            NotificationService.showError(error);
        });
    }

    return model;
});