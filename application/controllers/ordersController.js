app.controller('ordersController', ['$scope', 'ordersFactory', 'customersFactory', 'driversFactory', 'DateService', function ($scope, ordersFactory, customersFactory, driversFactory, DateService) {

    $('#search').trigger('focus');

    // bind model and controller
    $scope.searchVal = ordersFactory.searchVal;
    $scope.orders = ordersFactory.orders;
    $scope.customers = customersFactory.customers;
    $scope.drivers = driversFactory.drivers;
    let towns = ordersFactory.towns;


    // Items per page initial value and set function
    ordersFactory.getOrders.then(function () {
        $scope.options = ordersFactory.setItemsPerPage();
        $scope.itemsPerPage = ordersFactory.itemsPerPage;
    });

    // autocompleter function
    let input = document.getElementById("townInput");

    function autoCompleter() {
        autocomplete({
            input: input,
            fetch: function (text, update) {
                text = text.toLowerCase();
                var suggestions = towns.filter(n => n.label.toLowerCase().startsWith(text))
                update(suggestions);
            },
            onSelect: function (item) {
                $scope.$digest($scope.orderDetails.destination_town = item.label);
            },
            showOnFocus: true
            // preventSubmit: true
        });
    }

    // select elements for update
    let selectedIndex;
    $scope.toggleSelection = ID => {
        $('.btn-outline-secondary').trigger('blur');
        selectedIndex = $scope.orders.findIndex(index => index.order_ID == ID);
        $scope.orders[selectedIndex]['selected'] = !$scope.orders[selectedIndex]['selected'];
    }

    // open choose driver for exporting orders
    $scope.exportOrders = () => {
        $scope.orderInvoice = {
            driver_ID_FK: null,
            pickup_date: DateService.getDate(),
            pickup_time: DateService.getTime(),
            total_value: null
        };
        $('#chooseDriver').modal('show');
    }
    $scope.submitExport = () => {
        if ($scope.orderInvoice.driver_ID_FK) {
            let orderIDArray = [];
            let invoiceTotalValue = 0;
            for (let i = 0; i < $scope.orders.length; i++) {
                if ($scope.orders[i]['selected']) {
                    invoiceTotalValue += ($scope.orders[i]['order_value'] + $scope.orders[i]['delivery_fee']);
                    orderIDArray.push($scope.orders[i]['order_ID']);
                }
            }
            if (invoiceTotalValue > 0) {
                $scope.orderInvoice.total_value = invoiceTotalValue;
                ordersFactory.exportOrders([orderIDArray, $scope.orderInvoice]);
            }
        }
    }

    // New Order Modal
    $scope.openNewOrderModal = () => {
        $scope.selectedModal = 'add';
        $scope.modalTitle = 'Add New Order';
        $scope.orderDetails = {
            customer_ID_FK: null,
            track_number: null,
            order_date: DateService.getDate(),
            order_time: DateService.getTime(),
            destination_province: null,
            destination_district: null,
            destination_town: null,
            destination_address: null,
            recipient_name: null,
            recipient_phone: null,
            order_value: null,
            delivery_fee: 10000,
            order_status: 'office',
            order_notes: null
        };
        $('#orderModal').modal('show');
        $('#orderModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
        autoCompleter();
    };

    // select on focus for new customer name
    $scope.select = () => {
        $('#choose').trigger('select');
    };
    // validate phone number
    $scope.validate = () => {
        $scope.isValid = true;
    };
    // define datepicker value
    function datepicker() {
        $('#modelDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#modelDatepicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                $scope.$digest($scope.orderDetails.order_date = d);
            }
        }).datepicker("setDate", "0");
        // driver datepicker
        $('#driverDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: 0,
            onSelect: function () {
                var d = $('#driverDatepicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                $scope.$digest($scope.orderInvoice.pickup_date = d);
            }
        }).datepicker("setDate", "0");
    };
    datepicker();

    let orderIndex;
    $scope.openEditOrderModal = ID => {
        $scope.selectedModal = 'edit';
        $scope.modalTitle = 'Edit Order';
        orderIndex = $scope.orders.findIndex(index => index.order_ID == ID);
        $scope.orderDetails = {};
        angular.copy($scope.orders[orderIndex], $scope.orderDetails);
        $('#orderModal').modal('show');
        $('#orderModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
        autoCompleter();
    };

    $scope.openInfoModal = ID => {
        orderIndex = $scope.orders.findIndex(index => index.order_ID == ID);
        $scope.orderInfo = {};
        angular.copy($scope.orders[orderIndex], $scope.orderInfo);
        $('#infoModal').modal('show');
    }

    function addOrder() {
        var index = null;
        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i]['customer_phone'] === $scope.orderDetails.customer_phone) {
                index = i;
                break;
            }
        }
        if (index != null) {
            $scope.orderDetails.customer_ID_FK = $scope.customers[index]['customer_ID'];
            delete $scope.orderDetails["customer_name"];
            delete $scope.orderDetails["customer_phone"];
            ordersFactory.addOrder($scope.orderDetails).then(function (response) {
                if (response) {
                    $scope.orders.push(response);
                }
            });
        } else {
            $scope.isValid = false;
            $scope.select();
        }
    };

    function editOrder() {
        var index = null;
        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i]['customer_phone'] === $scope.orderDetails.customer_phone) {
                index = i;
                break;
            }
        }
        if (index != null) {
            $scope.orderDetails.customer_ID_FK = $scope.customers[index]['customer_ID'];
            delete $scope.orderDetails["customer_name"];
            delete $scope.orderDetails["customer_phone"];
            delete $scope.orderDetails["selected"];
            ordersFactory.editOrder($scope.orderDetails).then(function (response) {
                angular.copy(response[0], $scope.orders[orderIndex]);
            });
        } else {
            $scope.isValid = false;
            $scope.select();
        }
    };

    $scope.submit = () => {
        switch ($scope.selectedModal) {
            case 'add':
                addOrder();
                break;
            case 'edit':
                editOrder();
                break;
        }
    };

    // var index = null;
    //     for (var i = 0; i < $scope.customers.length; i++) {
    //         if ($scope.customers[i]['name'] === $scope.newDebt.customer_name) {
    //             index = i;
    //             break;
    //         }
    //     }
    //     if (index != null) {

    // } else {
    //     $scope.isValid = false;
    //     $scope.select();
    // }

}]);