var $ = jQuery = require('jquery');
var angular = require('angular');
const {
    ipcRenderer
} = require('electron');

// Barcode generator
var JsBarcode = require('jsbarcode');

const app = angular.module('printApp', []);

app.controller('printController', function ($scope) {

    ipcRenderer.on('printPickup', function (event, data) {
        $scope.$digest($scope.invoice = data[0]);
        $scope.$digest($scope.data = data[1]);
        $scope.$digest($scope.sortData = data[2]);
        console.log($scope.sortData)
    });

    function getDate() {
        var d = new Date();
        months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        return d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear();
    };

});