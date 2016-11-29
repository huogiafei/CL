$(function () {
    var ERROR = {
        email: {
            'NULL': 'enter your email',
            'NOT_EXIST': 'account does not exist',
            'NOT_ACTIVATED': 'account not activated, please check your email,',
            'REGISTERED': 'email has registered',
        },
        password: {
            'NULL': 'enter your password',
            'WRONG': 'email or password wrong'
        }
    }
    var loginApp = new Vue({
        el: '#loginApp',
        data: {
            login: {
                email: '',
                password: '',
                remember: false,
                error: {
                    email: ERROR.email.NULL,
                    password: ERROR.password.NULL
                }
            },

            signup: {
                fullName: '',
                email: '',
                password: '',
                pwdIsShow:false,
                phone: '',
                error: {
                    email: ERROR.email.NULL
                },
                isFinish:false

            }
        },
        methods: {
            checkNull: function (event) {
                var obj = event.target;
                if (obj.value == '') {
                    $(obj).addClass('invalid');
                    $(obj).next().addClass('active')
                }
                else {
                    $(obj).removeClass('invalid')
                }
            },

            emailCheck: function(event){
                if(!$('#signEmail').hasClass('invalid')){
                    emailCheck(this.signup.email);
                }
            },

            loginSubmit: function () {
                var email = this.login.email;
                var password = this.login.password;
                var remember = this.login.remember;

                if (email == '') {
                    $('#loginEmail').addClass('invalid').next().addClass('active');
                }
                if (password == '') {
                    $('#loginPwd').addClass('invalid').next().addClass('active');
                }
                if (!$('#loginEmail').hasClass('invalid')) {
                    loginSubmit(email, password, remember);
                }
            },

            pwdToggle:function () {
                this.signup.pwdIsShow =
                    !this.signup.pwdIsShow;
            },

            signSubmit: function () {
                var fullName = this.signup.fullName;
                var email = this.signup.email;
                var password = this.signup.password;
                var phone = this.signup.phone;

                if (fullName == '') {
                    $('#signName').addClass('invalid').next().addClass('active');
                }
                if (email == '') {
                    $('#signEmail').addClass('invalid').next().addClass('active');
                }
                if (password == '') {
                    $('#signPwd').addClass('invalid').next().addClass('active');
                }
                if (phone == '') {
                    $('#signPhone').addClass('invalid').next().addClass('active');
                }
                else if(!$('#signInBox input').hasClass('invalid')){
                    signUp(fullName,email,password,phone);
                }
            }

        },
        mounted: function () {
            //Tabs init
            var type = location.search.substr(1);
            if (type == 'signup') {
                $(".login-tabs .tab a").removeClass()
                    .eq(1).addClass('active');
                $("#loginBox").hide();
                $("#signInBox").show();
            }
            $('ul.tabs').tabs();
        }

    })

    function loginSubmit(email, password, remember) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API_DOMAIN + 'login',
            data: {
                email: email,
                password: md5(password), //md5
                remember: remember
            },
        }).done(function (data) {
            console.log(data);
            switch (data.statusCode) {
                case 0: { //account not exsit.
                    loginApp.login.error.email = ERROR.email.NOT_EXIST;
                    $("#loginEmail").addClass('invalid').focus();
                    break;
                }
                case 1: { //success
                    //todo: back to index
                    break;
                }
                case 2: { //password wrong.
                    loginApp.login.error.password = ERROR.password.WRONG;
                    $("#loginPwd").addClass('invalid').focus();
                    break;
                }
                case 3: { //not activated.
                    loginApp.login.error.email = ERROR.email.NOT_ACTIVATED;
                    $("#loginEmail").addClass('invalid').focus();
                    break;
                }
            }
        })
    }

    function emailCheck(email){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API_DOMAIN + 'emailCheck',
            data: {
                email: email,
            },
        }).done(function (data) {
            console.log(data);
            if(data.statusCode != 1){
                loginApp.signup.error.email = ERROR.email.REGISTERED;
                $('#signEmail').addClass('invalid')
            }
        })
    }

    function signUp(fullName,email,password,phone){
        console.log('sign');
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: API_DOMAIN + 'register',
            data: {
                fullName:fullName,
                email:email,
                password:md5(password),
                phone:phone
            },
        }).done(function (data) {
            console.log(data);
            if(data.statusCode == 1){
                loginApp.signup.isFinish = true;
            }
        })
    }
})