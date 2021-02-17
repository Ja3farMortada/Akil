app.directive('driversSettings', function (driversFactory) {
    return {
        restrict: 'E',
        templateUrl: '../templates/driversSettings.html',
        scope: {

        },
        link: function (scope) {

            scope.drivers = driversFactory.drivers;

            scope.openNewDriverModal = () => {
                scope.selectedModal = 'add';
                scope.modalTitle = 'Add New Driver';
                scope.driverDetails = {
                    driver_name: null,
                    driver_phone: null,
                    driver_address: null
                };

                $('#driverModal').modal('show');
                $('#driverModal').on('shown.bs.modal', function () {
                    $(this).find('[autofocus]').trigger('focus');
                });
            };

            let index;
            scope.openEditDriverModal = ID => {
                scope.selectedModal = 'edit';
                scope.modalTitle = 'Edit Driver';
                index = scope.drivers.findIndex(index => index.driver_ID == ID);
                scope.driverDetails = {};
                angular.copy(scope.drivers[index], scope.driverDetails);
                $('#driverModal').modal('show');
                $('#driverModal').on('shown.bs.modal', function () {
                    $(this).find('[autofocus]').trigger('focus');
                });
            };

            function addDriver() {
                driversFactory.addDriver(scope.driverDetails);
            };

            function editDriver() {
                driversFactory.editDriver(scope.driverDetails).then(function (response) {
                    angular.copy(response[0], scope.drivers[index]);
                })
            };

            scope.submit = () => {
                switch (scope.selectedModal) {
                    case 'add':
                        addDriver();
                        break;
                    case 'edit':
                        editDriver();
                        break;
                }
            };
        }
    }
});