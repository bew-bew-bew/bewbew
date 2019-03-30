function initEvents() {
    loadData();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }
    if ('indexedDB' in window) {
        initDatabase();
    }
    else {
        console.log('This browser doesn\'t support IndexedDB');
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