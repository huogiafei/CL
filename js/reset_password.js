function entry_resetPassword() {
    $(function () {
        var resetPwdApp = new Vue({
            el: "#resetPwdApp",
            data: {
                password1: '',
                password2: '',
                resetDone: false
            },
            methods: {
                reset: function () {
                    if (this.password1 == '') {
                        $("#password").addClass('invalid').next().addClass('active');
                    }

                    if (this.password2 == '' ||
                        this.password2 !== this.password1) {
                        $("#password2").addClass('invalid').next().addClass('active')
                    }

                    else if (this.password1 === this.password2
                        && !$("#resetStep1 input").hasClass('invalid')) {
                        resetPassword(this.password2)
                    }
                }
            }
        })

        function resetPassword(pwd) {
            console.log('reset');
            NProgress.start();
            $.ajax({
                type: 'post',
                dataType: 'json',
                data: {
                    password: md5(pwd)
                },
                url: API_DOMAIN + 'resetPassword',
            }).done(function (data) {
                NProgress.done();
                resetPwdApp.resetDone = true
            })
        }
    })
}


