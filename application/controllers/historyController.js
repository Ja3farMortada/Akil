app.controller('historyController', ['$scope', 'historyFactory', 'DateService', 'NotificationService', function ($scope, historyFactory, DateService, NotificationService) {

    // get logged in user type
    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // bind invoices with model factory
    $scope.driversInvoice = historyFactory.driversInvoice;
    $scope.invoiceDetails = historyFactory.invoiceDetails;
    $scope.activeRow = historyFactory.activeRow;

    // Tabs selection
    $scope.tabSelected = historyFactory.tabSelected;
    $scope.selectTab = tab => {
        if (tab != historyFactory.tabSelected) {
            historyFactory.selectTab(tab);
            $scope.tabSelected = historyFactory.tabSelected;
        }
    };

    // define datepicker value
    $scope.datePickerValue = historyFactory.datePickerValue;

    function datepicker() {
        $('#invoiceDatePicker').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#invoiceDatePicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                historyFactory.datePickerValue = d;
                $scope.$digest($scope.datePickerValue = d);
            }
        }).datepicker("setDate", historyFactory.datePickerValue);
    };
    datepicker();

    // set today's date function
    $scope.today = () => {
        historyFactory.datePickerValue = DateService.getDate();
        $scope.datePickerValue = historyFactory.datePickerValue;
        datepicker();
    };


    // watch for datepicker value change and get invoices
    $scope.$watch('datePickerValue', function (newValue, oldValue) {
        if (newValue !== oldValue) {
            historyFactory.fetchDriversInvoice($scope.datePickerValue);
        }
    });

    // how invoice details 
    $scope.getInvoiceDetails = (invoiceID) => {
        historyFactory.activeRow = invoiceID;
        $scope.activeRow = invoiceID;
        historyFactory.getInvoiceDetails(invoiceID);
    };

    // delete invoice
    // $scope.deleteInvoice = function () {
    //     NotificationService.showWarning().then(ok => {
    //         if (ok) {
    //             historyFactory.deleteInvoice(selectedInvoice, $scope.tabSelected, $scope.datePickerValue).then(function () {
    //                 $scope.activeRow = null;
    //                 $scope.items = null
    //             });
    //         }
    //     });
    // };


    $scope.isActive = ID => {
        return $scope.activeRow === ID;
    };

    // print function
    // $scope.print = function () {
    //     let itemsForPrint = [];
    //     if ($scope.tabSelected === 0) {
    //         for (let i = 0; i < $scope.items.length; i++) {
    //             itemsForPrint[i] = {
    //                 ID: selectedInvoice.ser_inv_ID,
    //                 name: $scope.items[i]['service_name'],
    //                 price: $scope.items[i]['service_price'],
    //                 quantity: $scope.items[i]['qty']
    //             }
    //         }
    //     } else {
    //         for (let i = 0; i < $scope.items.length; i++) {
    //             itemsForPrint[i] = {
    //                 ID: selectedInvoice.inv_ID,
    //                 name: $scope.items[i]['item_name'],
    //                 price: $scope.items[i]['item_price'],
    //                 quantity: $scope.items[i]['qty']
    //             }
    //         }
    //     }
    //     ipcRenderer.send('printDocument', [itemsForPrint, $scope.totalPrice]);
    // };

}]);