const {
    ipcRenderer
} = require("electron");

app.controller('pickupController', ['$scope', '$timeout', 'pickupFactory', 'customersFactory', 'DriversFactory', 'DateService', 'NotificationService', function ($scope, $timeout, pickupFactory, customersFactory, DriversFactory, DateService, NotificationService) {

    // bind with model
    $scope.customers = customersFactory.customers;
    $scope.drivers = DriversFactory.drivers;

    $scope.invoices = pickupFactory.invoices;
    $scope.invoiceDetails = pickupFactory.invoiceDetails;
    $scope.activeRow = pickupFactory.activeRow;

    // define datepicker value
    function datepicker() {
        $('#invoiceDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#invoiceDatepicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                $scope.$digest($scope.pickupInvoice.pickup_date = d);
            }
        }).datepicker("setDate", "0");
        // driver datepicker
        // $('#driverDatepicker').datepicker({
        //     dateFormat: 'yy-mm-dd',
        //     minDate: 0,
        //     onSelect: function () {
        //         var d = $('#driverDatepicker').datepicker({
        //             dateFormat: 'yy-mm-dd'
        //         }).val();
        //         $scope.$digest($scope.orderInvoice.pickup_date = d);
        //     }
        // }).datepicker("setDate", "0");
    };
    datepicker();

    $scope.newPickupInvoice = () => {
        $scope.pickupInvoice = {
            driver_ID_FK: null,
            pickup_date: DateService.getDate(),
            pickup_time: DateService.getTime(),
            total_value: 0
            // total_value_dollar: 0
        }
        $('#pickupInvoiceModal').modal('show');
    }

    // Add order function
    $scope.submitInvoice = () => {
        pickupFactory.addPickupInvoice($scope.pickupInvoice).then(function (response) {
            $scope.invoices.push(response)
        })
    };

    // show invoice details
    $scope.showInvoiceDetails = ID => {
        pickupFactory.activeRow = ID;
        $scope.activeRow = ID;
        pickupFactory.showInvoiceDetails(ID);
    }
    $scope.isActive = ID => {
        return $scope.activeRow === ID;
    };

    // new order modal
    $scope.newOrderModal = () => {
        $scope.selectedModal = 'add';
        $scope.pickupDetails = {
            pickup_ID_FK: $scope.activeRow,
            customer_ID_FK: null,
            customer_phone: null,
            order_count: null,
            total_paid: null
        }
        $('#pickupOrderModal').modal('show');
        $('#pickupOrderModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
    }

    function addPickupOrder() {
        var index = null;
        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i]['customer_phone'] === $scope.pickupDetails.customer_phone) {
                index = i;
                break;
            }
        }
        if (index != null) {
            $scope.pickupDetails.customer_ID_FK = $scope.customers[index]['customer_ID'];
            delete $scope.pickupDetails["customer_phone"];
            pickupFactory.addPickupOrder($scope.pickupDetails).then(function (response) {
                if (response) {
                    $scope.invoiceDetails.push(response[0]);
                    pickupFactory.fetchPickupInvoices();
                }
            });
        } else {
            $scope.isValid = false;
            $scope.select();
        }
    }

    // edit order modal
    let orderIndex;
    $scope.editOrderModal = ID => {
        $scope.selectedModal = 'edit';
        orderIndex = $scope.invoiceDetails.findIndex(index => index.map_ID == ID);
        $scope.pickupDetails = {};
        angular.copy($scope.invoiceDetails[orderIndex], $scope.pickupDetails);
        $('#pickupOrderModal').modal('show');
        $('#pickupOrderModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
    }

    function editPickupOrder() {
        // $scope.pickupDetails.customer_ID_FK = $scope.customers[index]['customer_ID'];
        delete $scope.pickupDetails["customer_name"];
        delete $scope.pickupDetails["customer_phone"];
        delete $scope.pickupDetails["customer_province"];
        delete $scope.pickupDetails["customer_district"];
        delete $scope.pickupDetails["customer_town"];
        delete $scope.pickupDetails["customer_address"];
        pickupFactory.editPickupOrder($scope.pickupDetails).then(function (response) {
            if (response) {
                angular.copy(response[0], $scope.invoiceDetails[orderIndex]);
                pickupFactory.fetchPickupInvoices();
            }
        });
    }

    // delete order
    $scope.removeOrder = (mapID, pickupID, value) => {
        NotificationService.showWarning().then(ok => {
            if (ok) {
                pickupFactory.removeOrder(mapID, pickupID, value).then(function () {
                    let indexToRemove = $scope.invoiceDetails.findIndex(x => x.map_ID == mapID);
                    $scope.invoiceDetails.splice(indexToRemove, 1);
                    pickupFactory.fetchPickupInvoices();
                });
            }
        });
    }

    $scope.deliver = () => {
        // console.log($scope.invoiceDetails)
        NotificationService.showWarning().then(ok => {
            if (ok) {
                pickupFactory.deliverPickup($scope.activeRow, $scope.invoiceDetails).then(function (response) {
                    let indexToDeliver = $scope.invoices.findIndex(x => x.pickup_ID == $scope.activeRow);
                    $scope.invoices.splice(indexToDeliver, 1);
                    for (let i = 0; i < response.length; i++) {
                        customersFactory.submitPayment(response[i]);
                    }
                    $timeout( function () {
                        customersFactory.fetchCustomers();
                        // customersFactory.getPaymentDetails(customersFactory.activeRow);
                    }, 1500);
                });
            }
        });
    }


    // select on focus
    $scope.select = () => {
        $('#choose').trigger('select');
    };
    // validate phone number
    $scope.validate = () => {
        $scope.isValid = true;
    };

    // sorting in table
    $scope.sortData = {
        key: ['customer_province', 'customer_district', 'customer_town'],
        reverse: true
    };
    $scope.sort = keyname => {
        $scope.sortData.key = keyname;
        $scope.sortData.reverse = !$scope.sortData.reverse;
    }

    $scope.submitOrder = () => {
        switch ($scope.selectedModal) {
            case 'add':
                addPickupOrder();
                break;
            case 'edit':
                editPickupOrder();
                break;
        }
    };

    // print
    $scope.print = () => {
        let index = $scope.invoices.findIndex(x => x.pickup_ID == $scope.activeRow)
        ipcRenderer.send('printPickup', [$scope.invoices[index], $scope.invoiceDetails, $scope.sortData]);
    }

}]);