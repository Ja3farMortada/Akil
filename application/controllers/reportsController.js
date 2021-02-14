app.config(function ($mdDateLocaleProvider) {

    $mdDateLocaleProvider.formatDate = function (date) {
        return date ? moment(date).format('MMMM YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function (dateString) {
        var m = moment(dateString, 'MM YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.isDateComplete = function (dateString) {
        dateString = dateString.trim();
        // Look for two chunks of content (either numbers or text) separated by delimiters.
        var re = /^(([a-zA-Z]{3,}|[0-9]{1,4})([ .,]+|[/-]))([a-zA-Z]{3,}|[0-9]{1,4})/;
        return re.test(dateString);
    };
});

app.controller('reportsController', ['$scope', '$http', '$mdDateLocale', function ($scope, $http, $mdDateLocale) {
    // define Server URI
    $scope.url = `${keys.phpServer}`;

    angular.element(document).ready(function () {
        $scope.monthDateChanged();
        $scope.yearDateChanged();
        // $scope.getYearReportGraph();
        $scope.clearReportValues();
    });

    $scope.tabSelected = 'reports';
    $scope.selectTab = tab => {
        if ($scope.tabSelected != tab) {
            switch (tab) {
                case 'salesReports':
                    $scope.tabSelected = 'salesReports';
                    break;

                case 'servicesReports':
                    $scope.tabSelected = 'servicesReports';
                    $scope.serviceMonthChanged();
                    if ($scope.servicesReportGraphCalled == undefined)
                        $scope.getYearServicesReportGraph();
                    break;

                case 'reports':
                    $scope.tabSelected = 'reports';
                    // $scope.clearReportValues();
                    $scope.startDatePicker();
                    $scope.endDatePicker();
                    break;
            }
        }
    };

    $scope.monthDatepicker = new Date();
    $scope.monthDateChanged = () => {
        $scope.monthSelected = moment($scope.monthDatepicker).format('MM');
        $scope.yearSelected = moment($scope.monthDatepicker).format('YYYY');
    };

    $scope.serviceMonthDatepicker = new Date();
    $scope.serviceMonthChanged = () => {
        $scope.serviceMonthSelected = moment($scope.serviceMonthDatepicker).format('MM');
        $scope.serviceYearSelected = moment($scope.serviceMonthDatepicker).format('YYYY');
    };

    $scope.yearDatepicker = new Date();
    $scope.yearFilter = function (date) {
        var month = date.getMonth();
        return month === 11;
    };
    $scope.locale = {
        formatDate: function (date) {
            var m = moment(date);
            return m.isValid() ? m.format('YYYY') : '';
        }
    };
    $scope.yearDateChanged = () => {
        $scope.selectedYear = moment($scope.yearDatepicker).format('YYYY');
    };

    // Monthly report Graph function
    $scope.getMonthlyReportGraph = async (month, year) => {
        var numberOfDays = new Date(year, month, 0).getDate();
        $scope.dailySales = [];
        $scope.dailyProfit = [];
        await $http({
            url: `${$scope.url}/reports.php`,
            method: "GET",
            params: {
                "function": "getMonthlyReportGraph",
                "month": $scope.monthSelected,
                "year": $scope.yearSelected,
                "numberOfDays": numberOfDays
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.dailySales.push(response.data[i]['totalSell']);
                $scope.dailyProfit.push(response.data[i]['totalSell'] - response.data[i]['totalCost']);
            }
        }, function (error) {
            swal({
                title: 'Error',
                text: 'JSON Error ' + error.status
            })
        });
    };

    // monthly report total data
    $scope.getMonthlyReport = () => {
        $http({
            url: `${$scope.url}/reports.php`,
            method: "GET",
            params: {
                "function": "getMonthlyReport",
                "month": $scope.monthSelected,
                "year": $scope.yearSelected,
            }
        }).then(function (response) {
            $scope.monthlyTotalSells = parseInt(response.data[0]['totalSellPrice']) || 0;
            $scope.monthlyTotalProfit = ($scope.monthlyTotalSells - response.data[0]['totalCost']).toLocaleString();
            $scope.monthlyTotalSells = $scope.monthlyTotalSells.toLocaleString();
        }, function (error) {
            swal({
                title: 'Error',
                text: 'JSON Error ' + error.status
            })
        });
    };

    $scope.getServiceMonthlyReport = () => {
        $http({
            url: `${$scope.url}/reports.php`,
            method: "GET",
            params: {
                "function": "getServiceMonthlyReport",
                "month": $scope.serviceMonthSelected,
                "year": $scope.serviceYearSelected,
            }
        }).then(function (response) {
            $scope.serviceMonthlyTotalSells = parseInt(response.data.totalServicePrice) || 0;
            $scope.ServiceMonthlyTotalProfit = ($scope.serviceMonthlyTotalSells - response.data.totalCost).toLocaleString();
            $scope.serviceMonthlyTotalSells = $scope.serviceMonthlyTotalSells.toLocaleString();
        }, function (error) {
            swal({
                title: 'Error',
                text: 'JSON Error ' + error.status
            })
        });
    };

    // Monthly Sales Graph creation
    $scope.$watchGroup(['monthSelected', 'yearSelected'], async function () {
        if ($scope.monthSelected != undefined && $scope.yearSelected != undefined) {
            $scope.getMonthlyReport();
            await $scope.getMonthlyReportGraph($scope.monthSelected, $scope.yearSelected);
            if (typeof monthlyChart !== 'undefined') {
                var data = {
                    labels: getSelectedMonthDays($scope.monthSelected, $scope.yearSelected),
                    datasets: [{
                        label: "Sales",
                        fill: false,
                        backgroundColor: '#343a40', // bootstrap dark                    
                        borderColor: '#343a40',
                        data: $scope.dailySales
                    }, {
                        label: 'profit',
                        fill: false,
                        backgroundColor: '#28a745', // bootstrap success
                        borderColor: '#28a745',
                        data: $scope.dailyProfit
                    }]
                }
                monthlyChart.data = data;
                monthlyChart.update();
            } else {
                var ctx = $('#monthlyReportChart');
                monthlyChart = new Chart(ctx, {
                    type: 'bar',
                    options: {
                        maintainAspectRatio: false,
                    },
                    data: {
                        labels: getSelectedMonthDays($scope.monthSelected, $scope.yearSelected),
                        datasets: [{
                            label: "Sales",
                            fill: false,
                            backgroundColor: '#343a40', // bootstrap dark                    
                            borderColor: '#343a40',
                            data: $scope.dailySales
                        }, {
                            label: 'profit',
                            fill: false,
                            backgroundColor: '#28a745', // bootstrap success
                            borderColor: '#28a745',
                            data: $scope.dailyProfit
                        }]
                    }
                });
            }
        }
    });

    // Year Sales Graph
    $scope.$watch('selectedYear', async function () {
        if ($scope.selectedYear != undefined) {
            if (typeof yearlyChart !== 'undefined') {
                yearlyChart.destroy();
            };
            await $scope.getYearReportGraph()
            var ctx = $('#yearReportChart');
            yearlyChart = new Chart(ctx, {
                type: 'bar',
                options: {
                    maintainAspectRatio: false
                },
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: "Sales",
                        fill: false,
                        backgroundColor: '#343a40', // bootstrap dark                    
                        borderColor: '#343a40',
                        data: $scope.monthlySales
                    }, {
                        label: 'profit',
                        fill: false,
                        backgroundColor: '#28a745', // bootstrap success
                        borderColor: '#28a745',
                        data: $scope.monthlyProfit
                    }]
                }
            });
        }
    })
    $scope.getYearReportGraph = async () => {
        $scope.monthlySales = [];
        $scope.monthlyProfit = [];
        await $http({
            url: `${$scope.url}/reports.php`,
            method: "GET",
            params: {
                "function": "getYearReport",
                "year": $scope.selectedYear,
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.monthlySales.push(response.data[i]['totalSell']);
                $scope.monthlyProfit.push(response.data[i]['totalSell'] - response.data[i]['totalCost']);
            }
        }, function (error) {
            swal({
                title: 'Error',
                text: 'JSON Error ' + error.status
            })
        });

    };


    // Monthly services Graph
    $scope.getMonthlyServiceReportGraph = async (month, year) => {
        var numberOfDays = new Date(year, month, 0).getDate();
        $scope.serviceDailySales = [];
        $scope.serviceDailyProfit = [];
        await $http({
            url: `${$scope.url}/reports.php`,
            method: "GET",
            params: {
                "function": "getServiceMonthlyReportGraph",
                "month": $scope.serviceMonthSelected,
                "year": $scope.serviceYearSelected,
                "numberOfDays": numberOfDays
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.serviceDailySales.push(response.data[i]['totalSell']);
                $scope.serviceDailyProfit.push(response.data[i]['totalSell'] - response.data[i]['totalCost']);
            }
        }, function (error) {
            swal({
                title: 'Error',
                text: 'JSON Error ' + error.status
            })
        });
    };

    // Year Services Graph 
    $scope.getYearServicesReportGraph = async () => {
        $scope.servicesReportGraphCalled = true;
        $scope.monthlyServiceSales = [];
        $scope.monthlyServiceProfit = [];
        await $http({
            url: `${$scope.url}/reports.php`,
            method: "GET",
            params: {
                "function": "getYearServiceReport",
                "year": '2019',
            }
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.monthlyServiceSales.push(response.data[i]['totalSell']);
                $scope.monthlyServiceProfit.push(response.data[i]['totalSell'] - response.data[i]['totalCost']);
            }
        }, function (error) {
            swal({
                title: 'Error',
                text: 'JSON Error ' + error.status
            })
        });
        if (typeof yearlyServiceChart !== 'undefined') {
            yearlyServiceChart.destroy();
        };
        var ctx = $('#yearServiceReportChart');
        yearlyServiceChart = new Chart(ctx, {
            type: 'bar',
            options: {
                maintainAspectRatio: false
            },
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: "Sales",
                    fill: false,
                    backgroundColor: '#007bff',
                    borderColor: '#007bff',
                    data: $scope.monthlyServiceSales
                }, {
                    label: 'profit',
                    fill: false,
                    backgroundColor: '#FF1493',
                    borderColor: '#FF1493',
                    data: $scope.monthlyServiceProfit
                }]
            }
        });
    };

    // Services Report Chart
    $scope.$watchGroup(['serviceMonthSelected', 'serviceYearSelected'], async function () {
        if ($scope.serviceMonthSelected && $scope.serviceYearSelected) {
            $scope.getServiceMonthlyReport();
            await $scope.getMonthlyServiceReportGraph($scope.serviceMonthSelected, $scope.serviceYearSelected);
            if (typeof serviceMonthlyChart !== 'undefined') {
                serviceMonthlyChart.destroy();
            };
            var ctx = $('#monthlyServiceReportChart');
            serviceMonthlyChart = new Chart(ctx, {
                type: 'bar',
                options: {
                    maintainAspectRatio: false
                },
                data: {
                    labels: getSelectedMonthDays($scope.serviceMonthSelected, $scope.serviceYearSelected),
                    datasets: [{
                            label: "Sales",
                            fill: false,
                            backgroundColor: '#007bff',
                            // ff6384 pink
                            // 36a2eb blue                
                            // borderColor: '#343a40',
                            data: $scope.serviceDailySales
                        },
                        {
                            label: 'profit',
                            fill: false,
                            backgroundColor: '#FF1493',
                            borderColor: '#FF1493',
                            data: $scope.serviceDailyProfit
                        }
                    ]
                }
            });
        }
    });

    // define Reports Datepicker
    $scope.startDatePicker = () => {
        if ($scope.startDateInput === null) {
            $scope.startDateInput = moment().startOf('month').format('YYYY-MM-DD');
        }
        $scope.startDateInput = moment($scope.startDateInput).format('YYYY-MM-DD');

        $mdDateLocale.formatDate = function (date) {
            return moment(date).format('YYYY-MM-DD');
        };
        $scope.getReport();
    };

    $scope.endDatePicker = () => {
        if ($scope.endDateInput === null) {
            $scope.endDateInput = getDate();
        }
        $scope.endDateInput = moment($scope.endDateInput).format('YYYY-MM-DD');
        $scope.getReport();
    };

    $scope.clearReportValues = function () {
        $scope.startDateInput = null;
        $scope.endDateInput = null;
        $scope.totalSells = null;
        $scope.totalProfit = null;
        $scope.totalServicesSells = null;
        $scope.totalServicesProfit = null;
        if (typeof overallChart !== 'undefined') {
            overallChart.destroy();
        };
        $scope.stockSales = null;
        $scope.servicesSales = null;
        $scope.overallSales = null;
        $scope.overallProfit = null;
    };

    // get reports function
    $scope.getReport = async function () {
        if ($scope.startDateInput && $scope.endDateInput) {
            if ($scope.startDateInput <= $scope.endDateInput) {
                await $http({
                    url: `${$scope.url}/reports.php`,
                    method: "GET",
                    params: {
                        "function": "getReports",
                        "startDate": $scope.startDateInput,
                        "endDate": $scope.endDateInput
                    }
                }).then(function successCallback(response) {
                    $scope.totalSells = parseInt(response.data.totalSellPrice) || 0;
                    $scope.totalProfit = $scope.totalSells - parseInt(response.data.totalCost) || 0;

                    $scope.totalServicesSells = parseInt(response.data.totalServicesPrice) || 0;
                    $scope.totalServicesProfit = $scope.totalServicesSells - parseInt(response.data.totalServicesCost) || 0;

                    $scope.overallSales = $scope.totalSells + $scope.totalServicesSells;
                    $scope.overallProfit = $scope.totalProfit + $scope.totalServicesProfit;

                    $scope.totalPayments = parseInt(response.data.totalPayments) || 0;
                    $scope.netProfit = $scope.overallProfit - $scope.totalPayments;

                    // OVERALL CHART
                    if (typeof overallChart !== 'undefined') {
                        overallChart.destroy();
                    };
                    var overallCTX = $('#overallReport');
                    overallChart = new Chart(overallCTX, {
                        type: 'bar',
                        data: {
                            labels: ['Sales', 'Payments', 'Total Earnings', 'Net Profit'],
                            datasets: [{
                                backgroundColor: [
                                    '#343a40', // bootstrap dark
                                    '#dc3545', // bootstrap danger
                                    '#ffc107', // bootstrap warning
                                    // '#007bff', // bootstrap primary
                                    '#28a745' // bootstrab success
                                ],
                                data: [
                                    $scope.overallSales,
                                    $scope.totalPayments,
                                    $scope.overallProfit,
                                    $scope.netProfit
                                ]
                            }]
                        },
                        options: {
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    barThickness: 40
                                }]
                            }
                            // cutoutPercentage: 60
                        },
                    });

                    $scope.totalSells = $scope.totalSells.toLocaleString();
                    $scope.totalProfit = $scope.totalProfit.toLocaleString();
                    $scope.totalServicesSells = $scope.totalServicesSells.toLocaleString();
                    $scope.totalServicesProfit = $scope.totalServicesProfit.toLocaleString();
                    $scope.overallSales = $scope.overallSales.toLocaleString();
                    $scope.overallProfit = $scope.overallProfit.toLocaleString();

                }, function errorCallback(response) {
                    swal({
                        title: 'Error',
                        text: 'JSON Error ' + response.status
                    });
                });

                // get stock top sales
                $http({
                    url: `${$scope.url}/reports.php`,
                    method: "GET",
                    params: {
                        "function": "getStockCount",
                        "startDate": $scope.startDateInput,
                        "endDate": $scope.endDateInput
                    }
                }).then(async function successCallback(response) {
                        $scope.stockSales = response.data;
                    },
                    function errorCallback(response) {
                        swal({
                            title: 'Error',
                            text: 'JSON Error ' + response.status
                        });
                    });

                // get services top sales
                $http({
                    url: `${$scope.url}/reports.php`,
                    method: "GET",
                    params: {
                        "function": "getServicesCount",
                        "startDate": $scope.startDateInput,
                        "endDate": $scope.endDateInput
                    }
                }).then(async function successCallback(response) {
                        $scope.servicesSales = response.data;
                    },
                    function errorCallback(response) {
                        swal({
                            title: 'Error',
                            text: 'JSON Error ' + response.status
                        });
                    });

            } else {
                swal({
                    title: 'Error',
                    text: 'Start date cannot be greater than End date!',
                    icon: 'error'
                });
            }
        }
    };


    // ***** GET DATE AND TIME *****
    function getDate() {
        var d = new Date();
        var minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes();
        var hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours();
        var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        return d.getFullYear() + '-' + months[d.getMonth()] + '-' + d.getDate();
    };

    function getTime() {
        var d = new Date();
        return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    };

    function getSelectedMonthDays(month, year) {
        var numberOfDays = new Date(year, month, 0).getDate();
        var days = [];
        for (var i = 1; i <= numberOfDays; i++) {
            days.push(`${i}`);
        }
        return days;
    };

}]);