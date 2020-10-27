onLogin = () => {


    $('#submitLogin').attr('disabled', true);
    $('#submitLogin').html('<i class="fa fa-circle-o-notch fa-spin"></i>Loading');
    var data = {};
    var user = $('#user').val();
    var pass = $('#password').val();


    data.username = user;
    data.password = pass;
    var datares = JSON.parse(JSON.stringify(data));


    $.ajax({
        url: '../Login/LoginMe',
        type: 'POST',
        data: datares,
        dataType: 'json',
        success: function (response) {
            var res = JSON.parse(response);
            if (res.response == "1") {

                window.location.href = '../Home';

            } else {
                alert(res.message);
            }
            $('#submitLogin').attr('disabled', false);
            $('#submitLogin').html('Login');






        }
        , error: function (aaa, ddd, bbb) {
            alert(aaa.responseJSON.response + " " + aaa.responseJSON.message);
            $('#submitLogin').attr('disabled', false);
            $('#submitLogin').html('Login');
        }


    })
}