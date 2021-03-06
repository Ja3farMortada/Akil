app.controller('remindersController', ['$scope', 'remindersFactory', 'NotificationService', 'DateService', function ($scope, remindersFactory, NotificationService, DateService) {

    // bind reminders to application model
    $scope.reminders = remindersFactory.reminders;

    // bind moment function with a scope to use it in view
    $scope.moment = moment;

    // open add reminder modal
    $scope.openReminderModal = function (type, ID) {
        switch (type) {
            case 'add':
                addReminderModal();
                break;
            case 'edit':
                editReminderModal(ID);
                break;
        }
    }

    function datepicker() {
        $('#reminderDatePicker').datepicker({
            dateFormat: 'yy-mm-dd',
            onSelect: function () {
                var d = $('#reminderDatePicker').datepicker({
                    dateFormat: 'yy-mm-dd'
                }).val();
                // historyFactory.datePickerValue = d;
                $scope.$digest($scope.data.due_date = d);
            }
        }).datepicker("setDate", null);
    };
    datepicker();

    function addReminderModal() {
        $scope.modalTitle = 'Add Reminder';
        $scope.data = {
            reminder_title: null,
            reminder_text: null,
            reminder_type: 'task',
            due_date: null,
            due_time: null,
            repeat_reminder: null
        }
        $('#remindersModal').modal('show');
        $('#remindersModal').on('shown.bs.modal', function () {
            $(this).find('[autofocus]').trigger('focus');
        });
    }

    // open edit reminder modal
    let index;

    function editReminderModal(ID) {
        $scope.modalTitle = 'Edit Reminder';
        index = $scope.reminders.findIndex(index => index.reminder_ID == ID);
        $scope.data = {};
        angular.copy($scope.reminders[index], $scope.data);
        $('#remindersModal').modal('show');
    }

    $scope.submit = function () {
        switch ($scope.modalTitle) {
            case 'Add Reminder':
                submitAddReminder();
                break;
            case 'Edit Reminder':
                submitEditReminder()
                break;
        }
    }

    // submit add reminder function
    function submitAddReminder() {
        // console.log(moment($scope.data.due_time).format('HH:mm:ss'))
        // $scope.data.due_time = moment($scope.data.due_time).format('HH:mm:ss');
        console.log($scope.data.due_time)
        // remindersFactory.addReminder($scope.data);
    }
    //submint edit reminder function
    function submitEditReminder() {
        if ($scope.data.reminder_type == 'task') {
            $scope.data.due_date = null;
            $scope.data.due_time = null;
        }
        remindersFactory.editReminder($scope.data);
    }

    $scope.removeReminder = ID => {
        NotificationService.showWarning().then(ok => {
            if (ok) {
                remindersFactory.removeReminder(ID).then(function (index) {
                    $scope.reminders.splice(index, 1);
                });
            }
        });
    }

}]);