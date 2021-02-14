app.controller('servicesController', ['$scope', '$http', 'servicesFactory', 'DateService', 'NotificationService', 'DebtsFactory', 'customersFactory', function ($scope, $http, servicesFactory, DateService, NotificationService, DebtsFactory, customersFactory) {

    // bind scope with model factory
    $scope.services = servicesFactory.services;

    // fetch services
    servicesFactory.getServices;

    // Get Customers
    $scope.customers = customersFactory.customers;

    // define server path
    const url = `http://${keys.host}:${keys.port}`;

    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // initialize empty invoice
    $scope.invoice = servicesFactory.invoice;

    // watch for invoice changes and calculate invoice's total cost and price
    $scope.$watch('invoice', function () {
        $scope.totalCost = servicesFactory.total()[0];
        $scope.totalPrice = servicesFactory.total()[1];
    }, true);

    // tab selection
    $scope.tabSelected = servicesFactory.tabSelected;
    $scope.selectService = index => {
        servicesFactory.selectTab(index);
        $scope.tabSelected = servicesFactory.tabSelected;
    };

    // add service
    $scope.openAddServiceModal = function () {
        let type;
        switch ($scope.tabSelected) {
            case 0:
                type = 'touch';
                break;

            case 1:
                type = 'alfa';
                break;

            case 2:
                type = 'internet';
                break;

            case 3:
                type = 'steam';
                break;
        };
        $scope.newService = {
            service_name: null,
            service_type: type,
            service_cost: null,
            service_price: null
        };
        $('#addServiceModal').modal('show');
        $('#addServiceModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').focus();
        });
    };
    // add service function
    $scope.addService = function () {
        servicesFactory.addService($scope.newService).then(function (response) {
            if (response) $scope.services.push(response);
        });
    };

    // edit service
    let index;
    $scope.openEditServiceModal = function (ID) {
        index = $scope.services.findIndex(index => index.SID == ID);
        $scope.selectedService = {};
        angular.copy($scope.services[index], $scope.selectedService);
        $('#editServiceModal').modal('show');
    };
    // update function
    $scope.updateService = function () {
        servicesFactory.editService($scope.selectedService).then(function () {
            $scope.services[index] = $scope.selectedService;
        });
    };

    // delete service
    $scope.deleteService = function () {
        let item = {
            ID: $scope.selectedService.SID
        };
        NotificationService.showWarning().then(ok => {
            if (ok) {
                servicesFactory.deleteService(item).then(function () {
                    $scope.services.splice(index, 1);
                });
            }
        });
    };

    $scope.selectQuantity = function (index) {
        $('#input' + index).select();
    };

    // add to invoice
    let selectedIndex;
    $scope.addToInvoice = function (ID) {
        selectedIndex = $scope.services.findIndex(index => index.SID == ID);
        let found = false;
        for (let i = 0; i < $scope.invoice.length; i++) {
            if ($scope.services[selectedIndex]['SID'] === $scope.invoice[i]['ID']) {
                $scope.invoice[i]['quantity'] += 1;
                found = true;
                break;
            }
        }
        if (!found) {
            $scope.invoice.push({
                ID: $scope.services[selectedIndex]['SID'],
                name: $scope.services[selectedIndex]['service_name'],
                type: 'service',
                cost: $scope.services[selectedIndex]['service_cost'],
                quantity: 1,
                price: $scope.services[selectedIndex]['service_price']
            });
        }
    };

    // bill functions
    $scope.payBill = async function (type) {
        $scope.billAmount = null;
        let index = $scope.services.findIndex(index => index.service_type === type);
        $scope.bill = $scope.services[index];
        $('#payBillModal').modal('show');
        $('#payBillModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').focus();
        });
    };
    $scope.addBillToInvoice = function () {
        if ($scope.billAmount) {
            $scope.invoice.push({
                ID: $scope.bill.SID,
                name: $scope.bill.service_name,
                type: 'bill',
                cost: $scope.billAmount - 750,
                quantity: 1,
                price: $scope.billAmount
            });
            $('#payBillModal').modal('toggle');
        }
    };

    // delete a row from invoice view
    $scope.deleteRow = function (index) {
        servicesFactory.removeFromInvoice(index);
    };

    $scope.checkout = function () {
        $scope.selectedCustomer = null;
        $scope.cashReceived = null;
        $scope.validated = true;
        $('#selectCustomer').modal('show');
        $('#selectCustomer').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').focus();
        });
    };
    $scope.validate = () => {
        $scope.validated = true;
    };
    // Confirm Order button clicked!
    $scope.confirmOrderClicked = function () {
        if (!$scope.selectedCustomer && $scope.cashReceived == null) {
            $scope.cashReceived = 0;
            $('#cashInput').select();
        } else if (!$scope.selectedCustomer) {
            swal({
                title: `Change: ${($scope.cashReceived - $scope.totalPrice).toLocaleString()} L.L`,
                icon: "info",
            }).then((ok) => {
                if (ok) {
                    confirmOrder(null);
                } else {
                    $('#cashInput').focus();
                }
            });
        } else {
            $scope.validated = false;
            let customerID;
            for (let i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].customer_name == $scope.selectedCustomer) {
                    $scope.validated = true;
                    customerID = $scope.customers[i].customer_ID;
                    break;
                } else {
                    $('#choose').select();
                }
            }
            if ($scope.validated) {
                swal({
                    title: $scope.selectedCustomer,
                    text: "Are you sure you want to continue?",
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                }).then((ok) => {
                    if (ok) {
                        confirmOrder(customerID);
                    } else {
                        $('#choose').focus();
                    }
                });
            }
        }
    };

    async function confirmOrder(ID) {
        $('#selectCustomer').modal('toggle');
        let date = DateService.getDate();
        let time = DateService.getTime();
        let invoiceTotalCost = $scope.totalCost;
        let invoiceTotalPrice = $scope.totalPrice;
        $http.post(`${url}/addServiceInvoice`, {
            "items": $scope.invoice,
            "invoice": {
                "customer_ID_FK": ID,
                "ser_inv_date": date,
                "ser_inv_time": time,
                "ser_inv_total_cost": invoiceTotalCost,
                "ser_inv_total_price": invoiceTotalPrice
            }
        }).then(function () {
            NotificationService.showSuccessCash();
            servicesFactory.clearInvoice();
            $scope.invoice = servicesFactory.invoice;
            $('#itemsDataList').focus();
            if (ID) {
                DebtsFactory.updateCustomerDebit({
                    "customer_ID": ID,
                    "debitAmount": invoiceTotalPrice,
                    "method": "add"
                });
            }
        }, function (error) {
            NotificationService.showError(error);
        });
    };

    $scope.cancelOrder = function () {
        swal({
            title: "WARNING",
            text: "Are you sure you want to cancel order?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                servicesFactory.clearInvoice();
                $scope.$digest($scope.invoice = servicesFactory.invoice);
                $('#cancelOrder').blur();
            }
        });
    };

    // **** EDIT PRICE ****
    // open edit price modal
    $scope.openEditPriceModal = function (index) {
        if ($scope.invoice[index]['type'] == 'service') {
            $scope.newPrice = null;
            $('#editPriceModal').modal('show');
            $('#editPriceModal').on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus();
            });
            $scope.selectedIndex = index;
            $scope.selectedRowCost = $scope.invoice[index]['cost'].toLocaleString();
            $scope.selectedRowPrice = $scope.invoice[index]['price'].toLocaleString();
        }
    };
    // edit price function
    $scope.editPrice = function () {
        if ($scope.newPrice) {
            $scope.invoice[$scope.selectedIndex]['price'] = $scope.newPrice;
            $('#editPriceModal').modal('hide');
        }
    };

}]);