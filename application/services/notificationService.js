app.service('NotificationService', ['$timeout', function ($timeout) {

    let successAudio = new Audio('../assets/ding-sound.mp3');
    let cashAudio = new Audio('../assets/cash-sound.mp3');
    let error1Audio = new Audio('../assets/error-1.mp3');
    let error2Audio = new Audio('../assets/error-2.wav');

    this.showSuccess = () => {
        successAudio.play();
        swal({
            title: 'Success',
            text: 'Process Completed Successfully!',
            icon: 'success',
            timer: 1200,
            buttons: false
        });
    };

    this.showError = error => {
        swal({
            title: 'ERROR!',
            text: `${error.data.sqlMessage}`,
            icon: 'error',
            dangerMode: true
        });
    };

    this.showErrorText = text => {
        swal({
            title: 'ERROR!',
            text: text,
            icon: 'error',
            dangerMode: true
        });
    }

    this.showWarning = () => {
        return swal({
            title: "WARNING",
            text: "Are you sure you want to proceed?",
            icon: "error",
            buttons: true,
            dangerMode: true
        });
    };

    this.showSuccessToast = () => {
        $('#successToast').toast('show');
        successAudio.play();
    };

    this.showSuccessCash = () => {
        $('#successToast').toast('show');
        cashAudio.play();
    };

    this.showErrorToast = () => {
        $('#errorToast').toast('show');
    };

    this.playErrorSound = () => {
        error2Audio.play();
    };

}]);