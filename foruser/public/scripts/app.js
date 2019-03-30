function initEvents() {
    loadData();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }

}

function loadData() {
    $.ajax({
        url: '/events',
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
            console.log(data);
        },
        error: function (data) {

        }
    })
}

function loginEvent() {
    var username = 'wang';
    var password = '123';
    var data = {"username": username, 'password': password};
    $.post({
        url: '/login',
        type: 'POST',
        data: data,
        success: function (data, status) {
            if (status == 'success') {
                alert('success');
                location.href = 'index';
            }
        },
        error: function (data, status, e) {
            if (status == "error") {
                location.href = 'login';
            }
        }
    })

}