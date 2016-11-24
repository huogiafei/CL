function entry_accountSetting() {
    console.log('p:acs');
    $(function () {
        var app = new Vue({
            el: "#accountApp",
            data: {
                profile: {
                    fullName: "",
                    phone: "",
                    headerId: 0,
                },
                cp: {
                    old: '',
                    new: '',
                    new2: '',
                    loading: false
                }
            },
            methods: {
                checkOld: function () {
                    if(this.cp.old){
                        checkOldPwd(this.cp.old);
                    }
                },
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

                profileChange: function (event) {
                    if (this.profile.fullName == "") {
                        $('#userFullName').addClass('invalid').next().addClass('active');
                    }
                    if (this.profile.phone == "") {
                        $('#userPhone').addClass('invalid').next().addClass('active');
                    }
                    else {
                        setProfile(this.profile.headerId, this.profile.fullName, this.profile.phone);
                    }
                },

                confirmPwd: function (event) {
                    var obj = event.target;
                    if (this.cp.new !== this.cp.new2) {
                        $(obj).addClass('invalid');
                        $(obj).next().addClass('active')
                        return false;
                    }
                    else {
                        $(obj).removeClass('invalid');
                        return true
                    }
                },
                passwordChange: function () {
                    if (this.cp.old == "") {
                        $('#oldPwd').addClass('invalid').next().addClass('active');
                    }
                    if (this.cp.new == "") {
                        $('#newPwd').addClass('invalid').next().addClass('active');
                    }
                    if (this.cp.new2 == "") {
                        $('#newPwd2').addClass('invalid').next().addClass('active');
                    }
                    if (!$('#passwordForm input').hasClass('invalid')) {
                        setPassword(this.cp.old, this.cp.new);
                    }
                },
            },
            mounted: function () {
                //set user avatar
                $(".ep-head").attr('src', $(".head-access-head").attr('src'));
            }
        })

        $('#upload').uploadifive({
            auto: true,
            method: 'post',
            fileObjName: 'file',
            buttonClass: 'ep-avatar',
            buttonText: '',
            formData: {
                'type': 'avatar'
            },
            multi: false,
            uploadScript: API_DOMAIN + 'img',

            onUpload: function (filesToUpload) {
                console.log('upload');
                NProgress.start();
            },
            onUploadComplete: function (file, data) {
                var result = JSON.parse(data)
                if (result.statusCode == 1) {
                    NProgress.done();
                    $(".ep-head").attr('src', result.data.imgSrc);
                    app.profile.headerId = result.data.imgID;
                }
            },
        });

        function setProfile(headerId, fullName, phone) {
            NProgress.start();
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'profile',
                data: {
                    headerId: headerId,
                    fullName: fullName,
                    phone: phone
                },
            }).done(function (data) {
                console.log(data);
                NProgress.done();
                if (data.statusCode == 1) {

                    //todo :location.href = '';
                }
            })
        }

        function setPassword(oldPwd, newPwd) {
            NProgress.start();
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'password',
                data: {
                    oldPassword: md5(oldPwd),
                    newPassword: md5(newPwd),
                },
            }).done(function (data) {
                NProgress.done();
                app.cp.loading = false;
                if (data.statusCode == 1) {
                    //todo :location.href = '';
                }
            })
        }

        function checkOldPwd(pwd) {
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'password/old',
                data: {
                    oldPassword: md5(pwd),
                },
            }).done(function (data) {
                console.log(data);
                //old password wrong
                if (data.statusCode == 0) {
                    $("#oldPwd").addClass('invalid').next().addClass('active');
                }
            })
        }
    });
}