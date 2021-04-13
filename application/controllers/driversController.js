app.controller('driversController', ['$scope', 'DriversFactory', function ($scope, DriversFactory) {

    $scope.drivers = DriversFactory.drivers;
    $scope.driverOrders = DriversFactory.driverOrders;
    $scope.selectedDriverID = DriversFactory.selectedDriverID;
    $scope.liraStatement = DriversFactory.liraStatement;
    $scope.dollarStatement = DriversFactory.dollarStatement;
    $scope.orderInfo = {};

    // get driver orders
    $scope.getDriverOrders = () => {
        DriversFactory.selectedDriverID = $scope.selectedDriverID;
        DriversFactory.getDriverOrders($scope.selectedDriverID);
        DriversFactory.getTotalLira($scope.selectedDriverID);
        DriversFactory.getTotalDollar($scope.selectedDriverID);
    }

    $scope.openInfoModal = data => {
        angular.copy(data, $scope.orderInfo);
        $('#infoModal').modal('show');
    }

    // deliver order
    $scope.deliverOrder = ID => {
        Swal.fire({
            title: "Confirmation!",
            text: "Are you sure you want to mark order as delivered?",
            icon: "success",
            showCancelButton: true,
            showConfirmButton: true,
            focusCancel: true,
            returnFocus: false,
            confirmButtonText: `Yes`,
        })
        .then((result) => {
            if (result.isConfirmed) {
                DriversFactory.deliverOrder(ID).then(function () {
                    DriversFactory.getDriverOrders($scope.selectedDriverID);
                    DriversFactory.getTotalLira($scope.selectedDriverID);
                    DriversFactory.getTotalDollar($scope.selectedDriverID);
                });
            }
        });
    }

    // remove order
    $scope.removeOrder = ID => {
        Swal.fire({
            title: "WARNING",
            text: "Are you sure you want to remove order?",
            icon: "error",
            showCancelButton: true,
            showConfirmButton: true,
            focusCancel: true,
            returnFocus: false,
            confirmButtonText: `Yes`,
        })
        .then((result) => {
            if (result.isConfirmed) {
                DriversFactory.removeOrder(ID).then(function () {
                    DriversFactory.getDriverOrders($scope.selectedDriverID);
                    DriversFactory.getTotalLira($scope.selectedDriverID);
                    DriversFactory.getTotalDollar($scope.selectedDriverID);
                });
            }
        });
    }
}]);