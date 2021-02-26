const { ipcRenderer } = require("electron");

app.controller('invoicesController', ['$scope', 'invoiceFactory', function ($scope, invoiceFactory) {

    angular.element(document).ready(function () {
        $('#barcodeInput').trigger('focus');
    });

    // bind variables with model
    $scope.invoice = invoiceFactory.invoice;
    $scope.orders = invoiceFactory.orders;

    // sorting in table
    $scope.sortData ={
        key: ['destination_province', 'destination_district', 'destination_town'],
        reverse: true
    };
    $scope.sort = keyname => {
        $scope.sortData.key = keyname;
        $scope.sortData.reverse = !$scope.sortData.reverse; 
    }

    // submit barcode input
    $scope.submitBarcode = () => {
        if ($scope.barcode) {
            invoiceFactory.getScannedInvoice($scope.barcode);
            invoiceFactory.getScannedInvoiceOrders($scope.barcode)
            $scope.barcode = null;
        }
    }

    // deliver invoice
    $scope.deliverInvoice = () => {
        swal({
            title: "WARNING",
            text: "Are you sure you want to proceed?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                let data = {
                    array: [],
                    invoice_ID: $scope.invoice[0].invoice_ID
                }
                for (let i = 0; i < $scope.orders.length; i++) {
                    data.array.push($scope.orders[i]['order_ID']);
                }
                invoiceFactory.deliverInvoice(data);
                $('#barcodeInput').trigger('focus');
            }
        });
    }

    // remove order from invoice
    $scope.removeOrder = function (ID, value) {
        swal({
            title: "WARNING",
            text: "Are you sure you want to remove order?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                invoiceFactory.removeOrder(ID, value);
            }
        });
    }

    //print
    $scope.print = () => {
        // console.log([$scope.invoice[0], $scope.orders])
        ipcRenderer.send('printDocument', [$scope.invoice[0], $scope.orders, $scope.sortData]);
    }

}]);