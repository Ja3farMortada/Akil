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

        .when('/services', {
            templateUrl: 'services.html',
            controller: 'servicesController'
        })

        .when('/sell', {
            templateUrl: 'sell.html',
            controller: 'sellController'
        })

        .when('/stock', {
            templateUrl: 'stock.html',
            controller: 'stockController'
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
            redirectTo: '/services'
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
    $scope.remindersCount = remindersFactory.reminders;

    // live dollar rate
    $('#liveDollarRate').tooltip({
        title: "click here to refresh!",
        trigger: "hover"
    });

    // let buyPrice;
    // let sellPrice;
    // $scope.checking = false;
    // $scope.getLiveRate = function () {
    //     $scope.checking = true;
    //     let headers = {
    //         headers: {
    //             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbGlyYXJhdGUuY29tIiwiaWF0IjoxNTkzMDI3NzQ2LCJuYmYiOjE1OTMwMjc3NDYsImV4cCI6MTYyNTE2ODU0NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMiJ9fX0.cVv8n9ZLnrv02rgqTUSM_eOOtnsEN5ITHFxXqmjgYwo'
    //         }
    //     };
    //     $http.get(`https://lirarate.com/wp-json/lirarate/v2/rates?currency=LBP`, headers).then(function (response) {
    //         $scope.checking = false;
    //         buyPrice = response.data.buy;
    //         sellPrice = response.data.sell;
    //         $scope.buyPrice = `${buyPrice[buyPrice.length - 1][1]} L.L `;
    //         $scope.sellPrice = `${sellPrice[sellPrice.length - 1][1]} L.L `;
    //         if (buyPrice[buyPrice.length - 1][1] > buyPrice[buyPrice.length - 2][1]) {
    //             $scope.trackBuy = 'up';
    //         } else if (buyPrice[buyPrice.length - 1][1] = buyPrice[buyPrice.length - 2][1]) {
    //             $scope.trackBuy = 'equal';
    //         } else if (buyPrice[buyPrice.length - 1][1] < buyPrice[buyPrice.length - 2][1]) {
    //             $scope.trackBuy = 'down';
    //         };

    //         if (sellPrice[sellPrice.length - 1][1] > sellPrice[sellPrice.length - 2][1]) {
    //             $scope.trackSell = 'up';
    //         } else if (sellPrice[sellPrice.length - 1][1] = sellPrice[sellPrice.length - 2][1]) {
    //             $scope.trackSell = 'equal';
    //         } else if (sellPrice[sellPrice.length - 1][1] < sellPrice[sellPrice.length - 2][1]) {
    //             $scope.trackSell = 'down';
    //         }

    //         updateLastUpdated(buyPrice[buyPrice.length - 1][0]);
    //     }, function (error) {
    //         console.log(error);
    //     });
    // };

    // function updateLastUpdated(lastUpdated) {
    //     let latestTimestamp = new Date(lastUpdated);
    //     let current = new Date();
    //     let timeDiff = timeDifference(current, latestTimestamp);
    //     let latestUpdated = (timeDiff < 0) ? '' : 'Updated ' + timeDiff;
    //     $scope.latestUpdated = latestUpdated;

    //     let h = latestTimestamp.getHours(),
    //         m = latestTimestamp.getMinutes();
    //     let _time = (h > 12) ? (h - 12 + ':' + m + 'pm') : (h + ':' + m + 'am');
    //     let dateString = _time;
    //     $scope.dateString = dateString;
    // };

    // function timeDifference(current, previous) {

    //     let msPerMinute = 60 * 1000;
    //     let msPerHour = msPerMinute * 60;
    //     let msPerDay = msPerHour * 24;
    //     let msPerMonth = msPerDay * 30;
    //     let msPerYear = msPerDay * 365;

    //     let elapsed = current - previous;

    //     if (elapsed < 0) {
    //         console.log('time difference is negative');
    //         console.log(elapsed);
    //         return elapsed;
    //     }

    //     if (elapsed < msPerMinute) {
    //         return 'a minute ago';
    //     } else if (elapsed < msPerHour) {
    //         return Math.round(elapsed / msPerMinute) + ' minutes ago';
    //     } else if (elapsed < msPerDay) {
    //         return Math.round(elapsed / msPerHour) + ' hours ago';
    //     } else if (elapsed < msPerMonth) {
    //         return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    //     } else if (elapsed < msPerYear) {
    //         return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    //     } else {
    //         return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    //     }
    // };


    angular.element(document).ready(() => {
        $scope.check();
        // $scope.getLiveRate();
    });

    // $interval(function () {
    //     $scope.getLiveRate();
    // }, (10 * 60000));


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
require('../controllers/servicesController');
require('../controllers/sellController');
require('../controllers/stockController');
require('../controllers/historyController');
require('../controllers/customersController');
require('../controllers/debtsController');
require('../controllers/paymentsController');
require('../controllers/reportsController');
require('../controllers/remindersController');
require('../controllers/settingsController');


// require SPA Models
require('../models/servicesFactory');
require('../models/sellFactory');
require('../models/stockFactory');
require('../models/historyFactory');
require('../models/debtsFactory');
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