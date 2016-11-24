function entry_forgetPassword() {
    $(function () {
        var ERROR = {
            'NULL': 'please enter your email',
            'NOT_EXIST': 'email account does not exist'
        }
        var forgetPwdApp = new Vue({
            el: "#forgetPwdApp",
            data: {
                email: '',
                emailError: ERROR.NULL
            },
            methods: {
                emailSend: function () {
                    if (this.email == '') {
                        $('#email').addClass('invalid').focus
                    }
                    else if (!$('#email').hasClass('invalid')) {
                        resetPassword(this.email)
                    }
                },
                edit: function () {
                    this.emailError = ERROR.NULL
                }
            }
        })

        function resetPassword(email) {
            NProgress.start();
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'resetPasswordEmail',
                data: {
                    email: email
                }
            }).done(function (data) {
                NProgress.done();
                console.log(data)
                if (data.statusCode == 0) {
                    forgetPwdApp.emailError = ERROR.NOT_EXIST
                    $('#email').addClass('invalid').focus()
                }
                else {
                    $("#forgotStep1").hide();
                    $('#forgotStep2').show()
                }
            })
        }
    })
}


