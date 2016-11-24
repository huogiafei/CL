'use strict';
var API_DOMAIN = 'http://dev.yeep.com.au/api/';
var isMobile = $(window).width() < 700;
var GEO = {};
$(function () {
    var prv =
    getGeoPlace();

    /**
     * Search Auto Complete
     */
    $("input.auto-what,input.auto-where").on({
        keyup: function () {
            var type = $(this).attr('data-type');
            autoCompleteHandler($(this).val(), type, $(this));

            if ($(this).val().length > 0) {
                $(this).siblings('.search-clear').fadeIn();
            }
            else {
                $(this).siblings('.search-clear').fadeOut();
            }
        },
        blur: function () {
            $(this).siblings('.search-clear').fadeOut();
        },
        focus: function () {
            if ($(this).val().length > 0) {
                $(this).siblings('.search-clear').fadeIn();
            }
            else {
                $(this).siblings('.search-clear').fadeOut();
            }
        }
    });

    function autoCompleteHandler(keyword, type, obj) {
        var num = isMobile ? 5 : 10;
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: API_DOMAIN + 'autoSearch',
            data: {
                keyword: keyword,
                limit: num,
                type: type
            },
        }).done(function (data) {
            if (data.statusCode == 1) {
                var temp = autoDataTransform(data.data.list)
                obj.autocomplete({
                    data: temp
                });
            }
        })
    }

    function autoDataTransform(arr) {
        var obj = {};
        if (arr != null) {
            for (var i = 0; i < arr.length; i++) {
                obj[arr[i]] = null
            }
            return obj;
        }
    }

    /*clear search value*/
    $(".search-clear").click(function () {
        $(this).siblings("input[type='text']").val('')
    })


    /**
     * Login
     */
    var loginStatus = {
        email: {
            'NULL': 'please enter your email',
            'NOT_EXIST': 'account does not exist',
            'NOT_ACTIVATED': 'account not activated, please check your email,'
        },
        password: {
            'NULL': 'please enter your password',
            'WRONG': 'email or password wrong'
        }
    }

    $("#loginSubmit").click(function () {
        var email = $("#loginEmail").val();
        var password = $('#loginPwd').val();
        var remember = $('#RememberMe').prop('checked');

        if (email != '' && password != '') {
            loginSubmit(email, password, remember)
        }
        else if (email == '') {
            $("#loginEmailLabel").attr('data-error', loginStatus.email['NULL']);
            $("#loginEmail").addClass('invalid').focus();

        }
        else if (password == '') {
            $("#loginPwdLabel").attr('data-error', loginStatus.password['NULL']);
            $("#loginEmail").addClass('invalid').focus();
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
                    $("#loginPwdLabel").attr('data-error', loginStatus.password['NOT_EXIST']);
                    $("#loginEmail").addClass('invalid').focus();
                    break;
                }
                case 1: { //success
                    /*TEMP*/
                    $(".head-login-btn").addClass('hide');
                    $(".head-access").removeClass('hide');
                    $('#loginModal').closeModal();
                    location.href += '#/my_stores';
                    break;
                }
                case 2: { //password wrong.
                    $("#loginPwdLabel").attr('data-error', loginStatus.password['WRONG']);
                    $("#loginPwd").addClass('invalid').focus();
                    break;
                }
                case 3: { //password wrong.
                    $("#loginEmailLabel").attr('data-error', loginStatus.email['NOT_ACTIVATED']);
                    $("#loginEmail").addClass('invalid').focus();
                    break;
                }
            }
        })
    }

    //key:enter
    $('body').on('keyup', function (event) {
        if (event.keyCode == 13) {
            if (!$('#loginBox').is(':hidden')) {
                $("#loginSubmit").click();
            }
        }
    })

    /**
     * Mobile Popup & Slide
     */
    $('.modal-login-trigger,.modal-search-trigger').leanModal({
        ready: function () {
            $('html').css('overflow', 'hidden');
        },
        complete: function () {
            $('html').css('overflow', '');
        }
    });

    $(".button-collapse").sideNav({
        menuWidth: 260,
        closeOnClick: true
    });


    /**
     * Header  & BackTop
     */
    $(window).scroll(function () {
        var top = $('body').scrollTop();

        //header shadow
        if (top > $("#header").height()) {
            $("#header").addClass('float');
        }
        else {
            $("#header").removeClass('float');
        }

        //home: header search box toggle
        if ($("#pagePosition").val() == 'home') {
            if (top > $(".home-main").offset().top / 2) {
                $(".head-search-box").addClass('active');
            }
            else {
                $(".head-search-box").removeClass('active');
            }
        }

        //back to top
        if (top > 300 && !isMobile) {
            $("#backTop").fadeIn();
        }
        else {
            $("#backTop").fadeOut();
        }
    })

    /*header menu toggle*/
    $('.head-access').click(function (e) {
        e.stopPropagation();
        $(".head-access").toggleClass('active');
        $("body").not($(".head-access")).click(function () {
            $(".head-access").removeClass('active');
        })
    })

    if ($("#pagePosition").val() != 'home') {
        $(".head-search-box").addClass('active');
    }

    $("#backTop").click(function () {
        $('html, body').animate({scrollTop: 0});
        return false;
    })

    /**
     * HOME
     */
    //popular tab
    $(".cat-tab").click(function () {
        var index = $(this).index();
        $(this).siblings().removeClass('active').end().addClass('active');
        //tab content
        $(".category-content").removeClass('active').eq(index).addClass('active');
    })

    /**
     * Window Resize
     */
    $(window).resize(function () {
        isMobile = $(window).width() < 700;
    })

    /**
     * Google Map Geo Service
     */
    function getGeoPlace() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(pos.lat, pos.lng);
                GEO.lat = pos.lat;
                GEO.lng = pos.lng;
                //-27.931415,153.387824
                $.getJSON('https://maps.google.com/maps/api/geocode/json?latlng='
                    + pos.lat + ',' + pos.lng + '&&sensor=true', function (data) {
                    if (data.results.length > 0) {
                        var place = data.results[0].address_components;
                        var suburb, state;
                        for (var i = 0; i < place.length; i++) {
                            if (place[i].types[0] == 'locality') {
                                suburb = place[i].short_name;
                            }
                            else if (place[i].types[0] == 'administrative_area_level_1') {
                                state = place[i].short_name;
                            }
                        }
                        //console.log(suburb, state);
                        $('#where,#bannerWhere').val(suburb + ' , ' + state)
                    }
                })
            })
        }
        //default place
        else{
            GEO.lat = -35.3075;
            GEO.lng = 149.124417;
            $('#where,#bannerWhere').val('Canberra , ACT')
        }
    }
})