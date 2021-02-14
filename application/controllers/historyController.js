app.controller('historyController', ['$scope', 'historyFactory', 'DateService', 'NotificationService', function ($scope, historyFactory, DateService, NotificationService) {

    // get logged in user type
    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // Tabs selection
    $scope.tabSelected = historyFactory.tabSelected;
    $scope.selectTab = tab => {
        if (tab != historyFactory.tabSelected) {
            historyFactory.selectTab(tab);
            $scope.tabSelected = historyFactory.tabSelected;
            $scope.items = null;
            $scope.activeRow = null;
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

    // bind invoices with model factory
    $scope.servicesInvoices = historyFactory.servicesInvoices;
    $scope.stockInvoices = historyFactory.stockInvoices;
    $scope.totalServices = historyFactory.totalServices;
    $scope.totalStock = historyFactory.totalStock;


    // watch for datepicker value change and get invoices
    $scope.$watch('datePickerValue', function () {
        $scope.items = null;
        $scope.activeRow = null;
        historyFactory.fetchServicesInvoices($scope.datePickerValue);
        historyFactory.fetchStockInvoices($scope.datePickerValue);
        historyFactory.fetchTotalServices($scope.datePickerValue);
        historyFactory.fetchTotalStock($scope.datePickerValue);
    });

    // show invoice details 
    let selectedInvoice;
    $scope.showInvoiceDetails = (ID, totalPrice) => {
        $scope.totalPrice = totalPrice;
        switch ($scope.tabSelected) {
            case 0:
                let index = $scope.servicesInvoices.findIndex(index => index.ser_inv_ID == ID);
                selectedInvoice = $scope.servicesInvoices[index];
                $scope.items = JSON.parse($scope.servicesInvoices[index]['invoice_details']);
                $scope.activeRow = ID;
                break;

            case 1:
                let index2 = $scope.stockInvoices.findIndex(index2 => index2.inv_ID == ID);
                selectedInvoice = $scope.stockInvoices[index2];
                $scope.items = JSON.parse($scope.stockInvoices[index2]['invoice_details']);
                $scope.activeRow = ID;
                break;
        }
    };

    // delete invoice
    $scope.deleteInvoice = function () {
        NotificationService.showWarning().then(ok => {
            if (ok) {
                historyFactory.deleteInvoice(selectedInvoice, $scope.tabSelected, $scope.datePickerValue).then(function () {
                    $scope.activeRow = null;
                    $scope.items = null
                });
            }
        });
    };


    $scope.isActive = ID => {
        return $scope.activeRow === ID;
    };

    // print function
    $scope.print = function () {
        let itemsForPrint = [];
        if ($scope.tabSelected === 0) {
            for (let i = 0; i < $scope.items.length; i++) {
                itemsForPrint[i] = {
                    ID: selectedInvoice.ser_inv_ID,
                    name: $scope.items[i]['service_name'],
                    price: $scope.items[i]['service_price'],
                    quantity: $scope.items[i]['qty']
                }
            }
        } else {
            for (let i = 0; i < $scope.items.length; i++) {
                itemsForPrint[i] = {
                    ID: selectedInvoice.inv_ID,
                    name: $scope.items[i]['item_name'],
                    price: $scope.items[i]['item_price'],
                    quantity: $scope.items[i]['qty']
                }
            }
        }
        ipcRenderer.send('printDocument', [itemsForPrint, $scope.totalPrice]);
    };

}]);