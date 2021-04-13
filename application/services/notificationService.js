app.service('NotificationService', ['$timeout', function ($timeout) {

    let successAudio = new Audio('../assets/ding-sound.mp3');
    let cashAudio = new Audio('../assets/cash-sound.mp3');
    let error1Audio = new Audio('../assets/error-1.mp3');
    let error2Audio = new Audio('../assets/error-2.wav');

    this.showSuccess = () => {
        successAudio.play();
        Swal.fire({
            title: ' ',
            text: 'Process Completed Successfully!',
            icon: 'success',
            position: 'bottom-end',
            toast: true,
            background: 'green',
            timer: 2000,
            showConfirmButton: false
        });
    };

    this.showError = error => {
        Swal.fire({
            title: 'ERROR!',
            text: `${error.data.sqlMessage}`,
            icon: 'error'
        });
    };

    // this.showWarning = () => {
    //     return swal({
    //         title: "WARNING",
    //         text: "Are you sure you want to proceed?",
    //         icon: "error",
    //         buttons: true,
    //         dangerMode: true
    //     });
    // };

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