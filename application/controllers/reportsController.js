app.controller('reportsController', ['$scope', 'reportsFactory', function ($scope, reportsFactory) {

    $scope.reports = reportsFactory.reports;

    // dates input model
    $scope.dates = {
        start_date: moment().clone().startOf('month').format('YYYY-MM-DD'),
        end_date: moment().format('YYYY-MM-DD')
    }

    // start datepicker
    $('#startDatepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        maxDate: $scope.dates.end_date,
        onSelect: function (selected) {
            var d = $('#startDatepicker').datepicker({
                dateFormat: 'yy-mm-dd'
            }).val();
            $scope.$digest($scope.dates.start_date = d);
            $('#endDatepicker').datepicker("option", "minDate", selected)
        }
    }).datepicker();

    // end datepicker
    $('#endDatepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: $scope.dates.start_date,
        onSelect: function (selected) {
            var d = $('#endDatepicker').datepicker({
                dateFormat: 'yy-mm-dd'
            }).val();
            $scope.$digest($scope.dates.end_date = d);
            $('#startDatepicker').datepicker("option", "maxDate", selected)
        }
    }).datepicker();

    // get reports function
    $scope.getReports = () => {
        reportsFactory.getReports($scope.dates).then(function () {
            console.log($scope.reports)
        });
    }

}]);