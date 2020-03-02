import Vue from 'vue';
import alert from 'sweetalert2';

alert.setDefaults({
    width: '400px'
});

Vue.prototype.$alert = alert;

Vue.prototype.$confirm = (msg, okLabel, cancelLabel) => {
    return new Promise((resolve, reject) => {
        alert({
            title: 'Confirm',
            text: msg,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#4cae4c',
            confirmButtonText: okLabel || 'Ok',
            cancelButtonText: cancelLabel || 'Cancel',
        }).then((res) => {
            if (res.value) {
                return resolve();
            }
        });
    });
}


Vue.prototype.$message = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: type || 'success',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}


Vue.prototype.$success = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: 'success',
            title: msg || '',
            showConfirmButton: false,
            timer: 2000
        });
    });
}

Vue.prototype.$error = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: 'error',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}

Vue.prototype.$info = (msg, type) => {
    return new Promise((resolve, reject) => {
        alert({
            type: 'info',
            title: msg || '',
            showConfirmButton: false,
            timer: 1500
        });
    });
}