// require jQuery and jquery datepicker
var $ = jQuery = require('jquery');
var datepicker = require('jquery-ui/ui/widgets/datepicker');

// require angular and angular-route
var angular = require('angular');
var ngRoute = require('angular-route');

var moment = require('moment');
moment().format();

// require sweetalert
var swal = require('sweetalert');

// require bootstrap 4
// require('popper.js');
// require('bootstrap')
require('../../node_modules/bootstrap/dist/js/bootstrap.bundle');

// require chart.js
var Chart = require('chart.js');

// require fontawesome
require('@fortawesome/fontawesome-free');

require('angular-animate');
require('angular-messages');
require('angular-material');

// require md5 
var md5 = require('md5');

//require autocompleter widget
var autocomplete = require('autocompleter');

// Barcode generator
var JsBarcode = require('jsbarcode');

const keys = require('../../keys.json');

require('angular-utils-pagination');

const {
    ipcRenderer
} = require('electron');

// Main angular app
const app = angular.module('mainApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'angularUtils.directives.dirPagination']);

// configure routes
app.config(function ($routeProvider) {

    $routeProvider

        .when('/orders', {
            templateUrl: 'orders.html',
            controller: 'ordersController'
        })

        .when('/invoices', {
            templateUrl: 'invoices.html',
            controller: 'invoicesController'
        })

        .when('/pickup', {
            templateUrl: 'pickup.html',
            controller: 'pickupController'
        })

        .when('/history', {
            templateUrl: 'history.html',
            controller: 'historyController'
        })

        .when('/customers', {
            templateUrl: 'customers.html',
            controller: 'customersController'
        })

        .when('/debts', {
            templateUrl: 'debts.html',
            controller: 'debtsController'
        })

        .when('/payments', {
            templateUrl: 'payments.html',
            controller: 'paymentsController'
        })

        .when('/reports', {
            templateUrl: 'reports.html',
            controller: 'reportsController'
        })

        .when('/reminders', {
            templateUrl: 'reminders.html',
            controller: 'remindersController'
        })

        .when('/settings', {
            templateUrl: 'settings.html',
            controller: 'settingsController'
        })

        .otherwise({
            redirectTo: '/orders'
        });

});


// get and set methods for logged in user
// app.factory('LoggedInUser', function () {
//     var user = JSON.parse(localStorage.getItem('setting'));
//     return {
//         get: function () {
//             return user;
//         },
//         set: function (obj) {
//             user = obj;
//             return user;
//         }
//     }
// });

// Main Controller
app.controller('mainController', function ($scope, $timeout, $http, $interval, remindersFactory) {
    const package = require('../../package.json');

    // count reminders
    // $scope.remindersCount = remindersFactory.reminders;



    angular.element(document).ready(() => {
        $scope.check();
        // $scope.getLiveRate();
    });


    $('#successToast').toast('show');
    $('#errorToast').toast('show');

    $timeout(function () {
        $('#successToast').toast('hide');
        $('#errorToast').toast('hide');
    }, 150);

    // get version
    $scope.package = package;

    // get logged in user
    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // check if logged in
    $scope.check = async () => {
        if ($scope.loggedInUser.type != 'admin' && $scope.loggedInUser.type != 'user') {
            await window.location.replace('login.html');
        };
    };

    $scope.about = function () {
        $('#aboutModal').modal('show');
    };



    $scope.checked = false;
    $scope.showSpinner = false;
    $scope.download = false;
    $scope.downloaded = false;
    $scope.downloading = false;

    $scope.openUpdateModal = function () {
        $scope.text = null;
        $('#updateModal').modal('show');
    };
    $scope.checkForUpdates = function () {
        $scope.checked = true;
        $scope.text = null;
        ipcRenderer.send('update');
    };
    $scope.downloadUpdate = function () {
        $scope.download = false;
        $scope.showSpinner = true;
        ipcRenderer.send('download');
    }

    // render messages from server
    ipcRenderer.on('checking-for-update', function (event, data) {
        $scope.$digest($scope.showSpinner = true);
        $scope.$digest($scope.text = data);
    });
    ipcRenderer.on('update-available', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.download = true);
        $scope.$digest($scope.text = `version ${data.version} is available.`);
    });
    ipcRenderer.on('up-to-date', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.checked = false);
        $scope.$digest($scope.text = `your current version is up-to-date.`);
        console.log(data);
    });
    ipcRenderer.on('error', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.checked = false);
        $scope.$digest($scope.download = false);
        $scope.$digest($scope.text = `an error has occured!.`);
        console.log(data);
    });
    ipcRenderer.on('downloading', function (event, data) {
        $scope.$digest($scope.showSpinner = false);
        $scope.$digest($scope.download = false);
        $scope.$digest($scope.downloading = true);
        $scope.$digest($scope.data = data);
        $scope.$digest($scope.text = `Downloading: ${data.percent.toFixed(2)}%`)
        $('#progressBar').css("width", data.percent + "%");
        console.log(data);
    });
    ipcRenderer.on('downloaded', function (event, data) {
        $scope.$digest($scope.downloading = false);
        $scope.$digest($scope.downloaded = true);
        $scope.$digest($scope.download = false);
        $scope.$digest($scope.text = `Ready to install version ${data.version} of size ${((data.files[0]['size'])/1000000).toFixed(2)} MB.`)
    });

    $scope.applyUpdate = function () {
        ipcRenderer.send('applyUpdate');
    };

    $scope.logout = function () {
        swal({
                title: "WARNING",
                text: "Are you sure you want to logout?",
                icon: "",
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.removeItem('setting');
                    window.location.replace('login.html');
                }
            });
    };
});

// Theming for AngularJS Materials
app.config(function ($mdThemingProvider) {
    // red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
    $mdThemingProvider.theme('default')
        .primaryPalette('grey', {
            'default': 'A400', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        .accentPalette('indigo', {
            'default': '800' // use shade 200 for default, and keep all other shades the same
        })
        .warnPalette('green', {
            'default': '800'
        });
});

// require SPA controllers
require('../controllers/ordersController');
require('../controllers/invoicesController');
require('../controllers/pickupController');
require('../controllers/historyController');
require('../controllers/customersController');
// require('../controllers/debtsController');
require('../controllers/paymentsController');
require('../controllers/reportsController');
require('../controllers/remindersController');
require('../controllers/settingsController');


// require SPA Models
require('../models/ordersFactory');
require('../models/invoicesFactory');
require('../models/pickupFactory');
require('../models/historyFactory');
require('../models/reportsFactory');
require('../models/paymentsFactory');
require('../models/remindersFactory');
require('../models/settingsFactory');
require('../models/accountFactory');
require('../models/generalFactory');
require('../models/customersFactory');
require('../models/driversFactory');
require('../models/stockModel');

//require Application Services
require('../services/notificationService');
require('../services/dateService');

//require Directives
require('../directives/generalSettings');
require('../directives/accountSettings');
require('../directives/driversSettings');
require('../directives/stockSettings');


//                             *** Very useful javaScript methods ***

// includes(): checks for an existence of a string in an array and returns boolean, it is case sensitive

// some(): same as includes() but it takes function as an argument not a string

// every(): same as some() but it requires that all elements has the condition true 

// filter(): it creates a new array with elements that met a specified condition

// map(): it creates a new array with modified value of each element

// reduce(): it loops through the array and converts it to something else according to a given conditions and parameters, for example it is used to calculate the sum of prices in an array of objects

// PRINTS THE NUMBER OF WATCHERS PER PAGE
// (function () { 
//     var root = $(document.getElementsByTagName('body'));
//     var watchers = [];

//     var f = function (element) {
//         if (element.data().hasOwnProperty('$scope')) {
//             angular.forEach(element.data().$scope.$$watchers, function (watcher) {
//                 watchers.push(watcher);
//             });
//         }

//         angular.forEach(element.children(), function (childElement) {
//             f($(childElement));
//         });
//     };

//     f(root);

//     console.log(watchers.length);
// })();