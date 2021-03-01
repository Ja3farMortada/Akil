app.controller('pickupController', ['$scope', 'pickupFactory', 'customersFactory', 'driversFactory', 'DateService', 'NotificationService', function ($scope, pickupFactory, customersFactory, driversFactory, DateService, NotificationService) {

    // bind with model
    $scope.customers = customersFactory.customers;
    $scope.drivers = driversFactory.drivers;

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

    let orderIndex;
    // edit order modal
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
        // NotificationService.showWarning().then(ok => {
        //     if (ok) {
        //         pickupFactory.deliver($scope.activeRow).then(function () {
        //             let indexToDeliver = $scope.invoiceDetails.findIndex(x => x.map_ID == mapID);
        //             $scope.invoices.splice(indexToDeliver, 1);
        //             // pickupFactory.fetchPickupInvoices();
        //         });
        //     }
        // });
    }


    // select on focus
    $scope.select = () => {
        $('#choose').trigger('select');
    };
    // validate phone number
    $scope.validate = () => {
        $scope.isValid = true;
    };

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


}]);