function entry_contact(){
    $(function () {
        var contactApp = new Vue({
            el: '#contactApp',
            data: {
                curTopicType: 0,
                fullName: '',
                email: '',
                subject: '',
                message: '',

                /*type 1,2*/
                storeName: '',
                storeSuburb: '',

                /*type 4*/
                os: '',
                browser: '',
                /*type 5*/
                partnerName: '',
                partnerTel: '',

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
                sendHandler: function () {
                    console.log('save')
                    if(this.fullName == ""){
                        $("#fullName").addClass('invalid').next().addClass('active');
                    }
                    if(this.email == ""){
                        $("#email").addClass('invalid').next().addClass('active');
                    }
                    if(this.subject == ""){
                        $("#subject").addClass('invalid').next().addClass('active');
                    }
                    if(this.message == ""){
                        $("#message").addClass('invalid').next().addClass('active');
                    }
                    if(!$('#contactForm input').hasClass('invalid')){
                        messageSend();
                    }

                }
            },

            mounted: function () {
                initMap();
                $('#topic').material_select();
                $('#topic').change(function () {
                    contactApp.curTopicType = $(this).val()
                })
            }
        })

        function initMap() {
            var mapDOM = document.getElementById('contactMap');
            if (mapDOM) {
                var map = new google.maps.Map(mapDOM, {
                    center: {lat: -37.97766880, lng: 145.14701840},
                    zoom: 16,
                    mapTypeControlOptions: {
                        mapTypeIds: []
                    }
                });
            }

            var marker = new google.maps.Marker({
                position: {lat: -37.97766880, lng: 145.14701840},
                map: map,
                title: ''
            });
        }

        function messageSend() {
            NProgress.start();
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'contact',
                data: {
                    /*main*/
                    type: contactApp.curTopicType,
                    email: contactApp.email,
                    fullName: contactApp.fullName,
                    subject: contactApp.subject,
                    message: contactApp.message.replace(/\n/g,"<br>"),
                    /*type 1,2*/
                    storeName: contactApp.storeName,
                    storeAddress: contactApp.storeSuburb,
                    /*type 4*/
                    os: contactApp.os,
                    browser: contactApp.browser,
                    /*type 5*/
                    partnerName: contactApp.partnerName,
                    partnerTel: contactApp.partnerTel
                }
            }).done(function (data) {
                NProgress.done();
                console.log(data);
                $(".contact-main-content").hide();
                $('.contact-success').show()
            })
        }
    })
}

