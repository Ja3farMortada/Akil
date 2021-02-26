var $ = jQuery = require('jquery');
var angular = require('angular');
const {
    ipcRenderer
} = require('electron');

// Barcode generator
var JsBarcode = require('jsbarcode');

const app = angular.module('printApp', []);

app.controller('printController', function ($scope) {

    ipcRenderer.on('printDocument', function (event, data) {
        $scope.$digest($scope.invoice = data[0]);
        $scope.$digest($scope.orders = data[1]);
        $scope.$digest($scope.sortData = data[2]);
        // $scope.$digest($scope.invoiceType = data[3]);
        $scope.$digest($scope.date = getDate());
        JsBarcode('#barcode', $scope.invoice.invoice_ID, {

        })
        print();
    });

    function getDate() {
        var d = new Date();
        months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        return d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear();
    };

});