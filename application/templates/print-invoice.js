var $ = jQuery = require('jquery');
var angular = require('angular');
const {
    ipcRenderer
} = require('electron');

const app = angular.module('printApp', []);

app.controller('printController', function ($scope) {

    ipcRenderer.on('printDocument', function (event, data) {
        $scope.$digest($scope.invoice = data[0]);
        $scope.$digest($scope.totalPrice = data[1]);
        // $scope.$digest($scope.invoiceType = data[3]);
        $scope.$digest($scope.date = getDate());
        print();
    });

    function getDate() {
        var d = new Date();
        months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        return d.getDate() + '-' + months[d.getMonth()] + '-' + d.getFullYear();
    };

});