function login() {
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