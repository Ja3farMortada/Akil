app.controller('paymentsController', ['$scope', 'paymentsFactory', 'DateService', function ($scope, paymentsFactory, DateService) {

    // bind data with model factory
    $scope.assets = paymentsFactory.assets;
    $scope.todaysTotalPayments = paymentsFactory.todaysTotalPayments;
    $scope.payments = paymentsFactory.payments;
    $scope.totalSum = paymentsFactory.totalSum;
    paymentsFactory.createChart();

    // tab selection
    $scope.selectedTab = paymentsFactory.selectedTab;
    $scope.selectTab = type => {
        paymentsFactory.selectTab(type);
        $scope.selectedTab = paymentsFactory.selectedTab;
    };

    // logged in user
    $scope.loggedInUser = JSON.parse(localStorage.getItem('setting'));

    // open Add Money Modal
    $scope.openAddMoneyModal = function () {
        $scope.amountOfMoney = null;
        $('#addMoneyModal').modal('show');
        $('#addMoneyModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger("focus");
        });
    };
    // ++ Add Money Function
    $scope.addMoney = function () {
        // if ($scope.amountOfMoney != null) {
        paymentsFactory.addMoney({
            amount: $scope.amountOfMoney
        }).then(function () {
            $('#addMoneyModal').modal('toggle');
        });
    };

    // ++++ open add payments modal ++++
    $scope.openAddPaymentModal = function () {
        $scope.newPayment = {
            "payment_title": null,
            "category": null,
            "amount": null,
            "date": DateService.getDate(),
            "time": DateService.getTime(),
            "notes": null
        };
        $('#addPaymentModal').modal('show');
        $('#addPaymentModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger("focus");
        });
    };
    // Insert function
    $scope.addPayment = function () {
        paymentsFactory.addPayment($scope.newPayment).then(function () {
            $('#addPaymentModal').modal('toggle');
        });
    };

    // define datepicker value
    $scope.datePicker1 = paymentsFactory.datePicker1;
    $scope.datePicker2 = paymentsFactory.datePicker2;

    function datepicker() {
        // datepicker 1
        $('#datePicker1').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#datePicker1').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                paymentsFactory.datePicker1 = d;
                $scope.$digest($scope.datePicker1 = d);
            }
        }).datepicker("setDate", paymentsFactory.datePicker1);
        // datepicker 2
        $('#datePicker2').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#datePicker2').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                paymentsFactory.datePicker2 = d;
                $scope.$digest($scope.datePicker2 = d);
            }
        }).datepicker("setDate", paymentsFactory.datePicker2);
    };
    datepicker();

    // **** get payments ****
    $scope.getPayments = function () {
        $('#check').trigger('blur');
        paymentsFactory.getPayments().then(function () {
            $scope.totalSum = {
                totalWhish: calcSum('WHISH'),
                totalTalaco: calcSum('TALACO'),
                totalMhabib: calcSum('MOHAMAD HABIB'),
                totalRent: calcSum('RENT'),
                totalBills: calcSum('BILLS'),
                totalMwazafin: calcSum('MWAZAFIN'),
                totalOther: calcSum('OTHER')
            }
            paymentsFactory.totalSum = $scope.totalSum;
            paymentsFactory.createChart();
        });
    };

    // function to calculate categories sum
    function calcSum(category) {
        return $scope.payments.filter(function (obj) {
            return obj.category === category;
        }).reduce((total, record) => {
            return total + record.amount;
        }, 0)
    };


    $scope.$watchGroup(['todaysTotalPayments.payments', 'assets.assets '], function () {
        if ($scope.todaysTotalPayments != undefined && $scope.assets) {
            if (typeof globalChart !== 'undefined') {
                globalChart.destroy();
            };
            var ctx = $('#myChart');
            globalChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        "Today's Total Payments",
                        "Assets",
                    ],
                    datasets: [{
                        // label: "my first chart",
                        backgroundColor: [
                            '#343a40', // bootstrap dark
                            // '#ffc107', // bootstrap warning
                            '#28a745' // bootstrab success
                        ],
                        // borderColor: 'rgb(255, 99, 132)',
                        data: [
                            paymentsFactory.todaysTotalPayments.payments,
                            paymentsFactory.assets.assets
                        ]
                    }]
                }

            });
        }
    });

}]);