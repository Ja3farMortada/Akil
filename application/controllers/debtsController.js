app.controller('debtsController', ['$scope', 'DebtsFactory', 'customersFactory', 'DateService', 'NotificationService', function ($scope, DebtsFactory, customersFactory, DateService, NotificationService) {

    // $scope.customerDebts = customersFactory.customers;
    // $scope.selectedDetails = DebtsFactory.selectedDebtsDetails;
    // $scope.selectedPaymentDetails = DebtsFactory.selectedPaymentDetails;
    // $scope.selectedInvoiceDetails = [];
    // $scope.activeRow = DebtsFactory.activeRow;


    // $scope.isActive = ID => {
    //     let index = $scope.customerDebts.findIndex(index => index.customer_ID == ID);
    //     return $scope.activeRow === index;
    // };

    // // sorting in table
    // $scope.sortData = DebtsFactory.sortData;

    // $scope.sort = keyname => {
    //     DebtsFactory.sort(keyname);
    // }
    // // $scope.sort = function (keyname) {
    // //     $scope.sortKey = keyname;
    // //     $scope.reverse = !$scope.reverse;
    // // };

    // // get selected customer details
    // $scope.getDetails = function (ID) {
    //     let index = $scope.customerDebts.findIndex(index => index.customer_ID == ID);
    //     DebtsFactory.activeRow = index;
    //     $scope.activeRow = DebtsFactory.activeRow;
    //     DebtsFactory.getDebtsDetails({
    //         ID: ID
    //     });
    //     DebtsFactory.getPaymentDetails({
    //         ID: ID
    //     });
    // };

    // // tab selection
    // $scope.tabSelected = 1;
    // $scope.selectTab = function (tab) {
    //     DebtsFactory.getDebtsDetails({
    //         ID: $scope.customerDebts[$scope.activeRow]['customer_ID']
    //     });
    //     if ($scope.tabSelected !== tab) {
    //         $scope.tabSelected = tab;
    //     }
    // };

    // // open payment modal
    // $scope.receivePaymentModal = () => {
    //     $scope.paymentData = {
    //         "customer_ID_FK": $scope.customerDebts[$scope.activeRow].customer_ID,
    //         "payment_amount": null,
    //         "payment_date": DateService.getDate(),
    //         "payment_time": DateService.getTime(),
    //         "dollar_exchange": $scope.exchangeRate.exchange_rate,
    //         "payment_notes": ''
    //     };
    //     $('#receivePaymentModal').on('shown.bs.modal', function () {
    //         $(this).find('[autofocus]').trigger('focus');
    //     });
    //     $('#receivePaymentModal').modal('show');
    // };
    // $scope.submitPayment = () => {
    //     DebtsFactory.submitPayment($scope.paymentData).then(function (response) {
    //         if (response) {
    //             $scope.selectedPaymentDetails.unshift(response);
    //             customersFactory.fetchCustomers();
    //         }
    //     });
    // };

    // // declate edit payment modal
    // $scope.editPaymentModal = data => {
    //     $scope.paymentData = {
    //         "customer_ID_FK": $scope.customerDebts[$scope.activeRow].customer_ID,
    //         "payment_ID": data.payment_ID,
    //         "payment_amount": data.payment_amount,
    //         "old_payment_amount": data.payment_amount,
    //         "payment_notes": data.payment_notes
    //     };
    //     $('#editPaymentModal').on('shown.bs.modal', function () {
    //         $(this).find('[autofocus]').trigger('focus');
    //     });
    //     $('#editPaymentModal').modal('show');
    // };
    // // submit edit payment
    // $scope.editPayment = () => {
    //     DebtsFactory.editPayment($scope.paymentData).then(function (response) {
    //         if (response) {
    //             let index = $scope.selectedPaymentDetails.findIndex(x => x.payment_ID == $scope.paymentData.payment_ID);
    //             angular.copy(response, $scope.selectedPaymentDetails[index]);
    //             customersFactory.fetchCustomers();
    //         }
    //     });
    // };
    // // delete payment
    // $scope.deletePayment = () => {
    //     NotificationService.showWarning().then(ok => {
    //         if (ok) {
    //             DebtsFactory.deletePayment($scope.paymentData).then(function () {
    //                 let index = $scope.selectedPaymentDetails.findIndex(x => x.payment_ID == $scope.paymentData.payment_ID);
    //                 $scope.selectedPaymentDetails.splice(index, 1);
    //                 customersFactory.fetchCustomers();
    //             });
    //         }
    //     });

    // };


    // $scope.getInvoiceDetails = (data, type) => {
    //     $scope.selectedInvoiceDetails = JSON.parse(data);
    //     $('#invoiceDetailsModal').modal('show');
    // };

}]);