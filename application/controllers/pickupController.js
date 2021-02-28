app.controller('pickupController', ['$scope', 'pickupFactory', 'customersFactory', 'driversFactory', 'DateService', function ($scope, pickupFactory, customersFactory, driversFactory, DateService) {

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
    // select on focus for new customer name
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
                editOrder();
                break;
        }
    };
    

}]);