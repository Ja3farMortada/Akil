app.controller('ordersController', ['$scope', 'ordersFactory', 'customersFactory', 'DateService', function ($scope, ordersFactory, customersFactory, DateService) {

    // get customers
    $scope.customers = customersFactory.customers;
    $scope.orders = ordersFactory.orders

    // var countries = [{
    //         label: 'United Kingdom'
    //     },
    //     {
    //         label: 'United States'
    //     }
    // ];

    // var input = document.getElementById("fname");

    // autocomplete({
    //     input: input,
    //     fetch: function (text, update) {
    //         text = text.toLowerCase();
    //         // you can also use AJAX requests instead of preloaded data
    //         var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
    //         update(suggestions);
    //     },
    //     onSelect: function (item) {
    //         input.value = item.label;
    //     }
    // });


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
    };
    datepicker();

    let index;
    $scope.openEditOrderModal = ID => {
        $scope.selectedModal = 'edit';
        $scope.modalTitle = 'Edit Order';
        index = $scope.orders.findIndex(index => index.order_ID == ID);
        $scope.orderDetails = {};
        angular.copy($scope.orders[index], $scope.orderDetails);
        $('#orderModal').modal('show');
        $('#orderModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
    };

    function addOrder() {
        var index = null;
        for (var i = 0; i < $scope.customers.length; i++) {
            if ($scope.customers[i]['customer_name'] === $scope.orderDetails.customer_name) {
                index = i;
                break;
            }
        }
        if (index != null) {
            $scope.orderDetails.customer_ID_FK = $scope.customers[index]['customer_ID'];
            console.log($scope.orderDetails)
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
        ordersFactory.editOrder($scope.orderDetails).then(function (response) {
            angular.copy(response[0], $scope.orders[index]);
        })
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