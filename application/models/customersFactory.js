app.factory('customersFactory', function ($http, NotificationService, ordersFactory) {

    // define URL
    const url = `http://${keys.host}:${keys.port}`;

    var model = {};
    model.selectedTab = 'statement';
    model.customers = [];
    model.selectedArchive = [];
    model.selectedPaymentDetails = [];
    model.activeRow = null;
    model.sortDueData = {
        key: 'customer_due',
        reverse: true
    }

    model.sortDue = keyname => {
        model.sortDueData.key = keyname;
        model.sortDueData.reverse = !model.sortDueData.reverse;
    }

    model.getOrdersArchive = ID => {
        return $http.post(`${url}/getOrdersArchive`, ID).then(function (response) {
            angular.copy(response.data, model.selectedArchive);
        }, function (error) {
            NotificationService.showError(error.status);
        });
    };



    model.submitPayment = data => {
        return $http.post(`${url}/submitCustomerPayment`, data).then(function (response) {
            $('#receivePaymentModal').modal('hide');
            NotificationService.showSuccess();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.editPayment = data => {
        return $http.post(`${url}/editCustomerPayment`, data).then(function (response) {
            $('#editPaymentModal').modal('hide');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.deletePayment = data => {
        return $http.post(`${url}/deletePayment`, data).then(function (response) {
            $('#editPaymentModal').modal('hide');
            NotificationService.showSuccessToast();
            return response.data;
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.updateCustomerDebit = data => {
        return $http.post(`${url}/updateCustomerDebit`, data).then(function (response) {
            angular.copy(response.data, customersFactory.customers);
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

    const getCustomers = function () {
        return $http.get(`${url}/getCustomers`).then(function (response) {
            angular.copy(response.data, model.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };
    model.getCustomers = getCustomers();

    model.fetchCustomers = function () {
        return $http.get(`${url}/getCustomers`).then(function (response) {
            angular.copy(response.data, model.customers);
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    model.addCustomer = function (data) {
        return $http.post(`${url}/addCustomer`, data).then(response => {
            model.customers.push(response.data);
            $('#customerModal').modal('hide');
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        })
    };

    model.editCustomer = function (data) {
        return $http.post(`${url}/editCustomer`, data).then(response => {
            $('#customerModal').modal('hide');
            NotificationService.showSuccess();
            ordersFactory.fetchOrders();
            return response.data;
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    model.deleteCustomer = function (data) {
        return $http.post(`${url}/deleteCustomer`, data).then(res => {
            const index = model.customers.findIndex((cus => cus.customer_ID == res.data.customer_ID));
            model.customers.splice(index, 1);
            NotificationService.showSuccess();
        }, function (err) {
            NotificationService.showError(err);
        });
    };

    return model;
});