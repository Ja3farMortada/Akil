const { ipcRenderer } = require("electron");

app.controller('customersController', ['$scope', 'customersFactory', 'DateService', 'NotificationService', function ($scope, customersFactory, DateService, NotificationService) {

    // tab selection
    $scope.selectedTab = customersFactory.selectedTab;
    $scope.selectTab = type => {
        customersFactory.selectTab(type);
        $scope.selectedTab = customersFactory.selectedTab;
    };

    $scope.customers = customersFactory.customers;
    $scope.selectedArchive = customersFactory.selectedArchive;
    $scope.selectedPaymentDetails = customersFactory.selectedPaymentDetails;
    $scope.selectedInvoiceDetails = [];
    $scope.activeRow = customersFactory.activeRow;


    $scope.isActive = ID => {
        let index = $scope.customers.findIndex(index => index.customer_ID == ID);
        return $scope.activeRow === index;
    };

    // sorting in table
    $scope.sortDueData = customersFactory.sortDueData;

    $scope.sortDue = keyname => {
        customersFactory.sortDue(keyname);
    }

    // get selected customer details
    $scope.getDetails = ID => {
        let index = $scope.customers.findIndex(index => index.customer_ID == ID);
        customersFactory.activeRow = index;
        $scope.activeRow = customersFactory.activeRow;
        customersFactory.getOrdersArchive({
            ID: ID
        });
        customersFactory.getPaymentDetails({
            ID: ID
        });
    };
    if ($scope.activeRow) {
        customersFactory.getOrdersArchive({
            ID: $scope.customers[$scope.activeRow].customer_ID
        });
    }

    // sub-tab selection
    $scope.subTabSelected = 1;
    $scope.selectSubTab = function (tab) {
        customersFactory.getOrdersArchive({
            ID: $scope.customers[$scope.activeRow]['customer_ID']
        });
        if ($scope.subTabSelected !== tab) {
            $scope.subTabSelected = tab;
        }
    };

    // Print Statement
    $scope.printStatementModal = customer => {
        $scope.printDetails = {
            customer_ID: customer.customer_ID,
            start_date: moment().clone().startOf('month').format('YYYY-MM-DD'),
            end_date: moment().format('YYYY-MM-DD')
        }
        // start datepicker
        $('#startDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            maxDate: $scope.printDetails.end_date,
            onSelect: function (selected) {
                var d = $('#startDatepicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                $scope.$digest($scope.printDetails.start_date = d);
                $('#endDatepicker').datepicker("option","minDate", selected)
            }
        }).datepicker();

        // end datepicker
        $('#endDatepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            minDate: $scope.printDetails.start_date,
            onSelect: function (selected) {
                var d = $('#endDatepicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                $scope.$digest($scope.printDetails.end_date = d);
                $('#startDatepicker').datepicker("option","maxDate", selected)
            }
        }).datepicker();

        // open Modal
        $('#printStatementModal').modal('show')
    }
    $scope.print = () => {
        customersFactory.printStatement($scope.printDetails).then(function (response) {
            if (response) {
                // console.log(response)
                ipcRenderer.send('printStatement', [$scope.customers[$scope.activeRow] ,response, $scope.printDetails]);
                $('#printStatementModal').modal('hide');
            }
        })
    }

    // open payment modal
    $scope.receivePaymentModal = () => {
        $scope.paymentData = {
            "customer_ID_FK": $scope.customers[$scope.activeRow].customer_ID,
            "payment_currency": 'lira',
            "payment_amount": null,
            "payment_date": DateService.getDate(),
            "payment_time": DateService.getTime(),
            "payment_notes": null
        };
        $('#receivePaymentModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
        $('#receivePaymentModal').modal('show');
    };
    $scope.submitPayment = () => {
        customersFactory.submitPayment($scope.paymentData).then(function (response) {
            if (response) {
                $scope.selectedPaymentDetails.unshift(response);
                customersFactory.fetchCustomers();
            }
        });
    };

    // declate edit payment modal
    $scope.editPaymentModal = data => {
        $scope.paymentData = {};
        angular.copy(data, $scope.paymentData);
        $scope.paymentData.old_payment_amount = data.payment_amount;
        $('#editPaymentModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
        $('#editPaymentModal').modal('show');
    };
    // submit edit payment
    $scope.editPayment = () => {
        customersFactory.editPayment($scope.paymentData).then(function (response) {
            if (response) {
                let index = $scope.selectedPaymentDetails.findIndex(x => x.payment_ID == $scope.paymentData.payment_ID);
                angular.copy(response, $scope.selectedPaymentDetails[index]);
                customersFactory.fetchCustomers();
            }
        });
    };
    // delete payment
    $scope.deletePayment = () => {
        NotificationService.showWarning().then(ok => {
            if (ok) {
                customersFactory.deletePayment($scope.paymentData).then(function () {
                    let index = $scope.selectedPaymentDetails.findIndex(x => x.payment_ID == $scope.paymentData.payment_ID);
                    $scope.selectedPaymentDetails.splice(index, 1);
                    customersFactory.fetchCustomers();
                });
            }
        });

    };

    // order details modal
    $scope.openOrderDetails = data => {
        $scope.selectedOrderDetails = {};
        angular.copy(data, $scope.selectedOrderDetails);
        $('#orderDetailsModal').modal('show');
    };

    // *********************************************************************************
    // ***************************  CUSTOMERS DETAILS TAB ******************************
    // *********************************************************************************

    // await get customers promise
    customersFactory.getCustomers.then(function () {
        $scope.options = setItemsPerPage();
        angular.element(document.querySelector('#search')).trigger('focus');
    });

    // sorting in table
    $scope.sortKey = 'ID';
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    // Items per page initial value and set function
    $scope.itemsPerPage = 10;

    function setItemsPerPage() {
        return options = [{
                name: "10",
                value: 10
            },
            {
                name: "20",
                value: 20
            },
            {
                name: "50",
                value: 50
            },
            {
                name: "All",
                value: $scope.customers.length
            },
        ]
    };

    $scope.openNewCustomerModal = () => {
        $scope.selectedModal = 'add';
        $scope.modalTitle = 'Add New Customer';
        $scope.customerDetails = {
            customer_name: null,
            customer_phone: null,
            customer_province: null,
            customer_district: null,
            customer_town: null,
            customer_address: null,
            customer_due: 0
        };

        $('#customerModal').modal('show');
        $('#customerModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
    };

    let index;
    $scope.openEditCustomerModal = ID => {
        $scope.selectedModal = 'edit';
        $scope.modalTitle = 'Edit Customer';
        index = $scope.customers.findIndex(index => index.customer_ID == ID);
        $scope.customerDetails = {};
        angular.copy($scope.customers[index], $scope.customerDetails);
        $('#customerModal').modal('show');
        $('#customerModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
    };

    function addCustomer() {
        customersFactory.addCustomer($scope.customerDetails);
    };

    function editCustomer() {
        customersFactory.editCustomer($scope.customerDetails).then(function (response) {
            angular.copy(response[0], $scope.customers[index]);
        })
    };

    $scope.submit = () => {
        switch ($scope.selectedModal) {
            case 'add':
                addCustomer();
                break;
            case 'edit':
                editCustomer();
                break;
        }
    };

}]);