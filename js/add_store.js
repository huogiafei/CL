function entry_addStore() {
    console.log('p:as');
    $(function () {
        /**
         * INIT
         */

        var app = new Vue({
            el: '#addApp',
            data: {
                map: {},
                curStep: '',
                isLoading:true, //init loading
                stepper: {
                    title: ['basic info', 'address', 'about us', 'contact', 'done'],
                },
                step1: {
                    storeName: '',
                    tel: '',
                    email: '',
                    categoryId: '',
                    subCategoryId: '',
                    subCategoryId2: '',
                    businessType: '',
                    website: '',
                    chainStore: '',
                    cache: false,
                    categoryList: {
                        list: [],
                    },
                    subCategoryList: {
                        list: [],
                    },
                    businessTypeList: {
                        list: [
                            {
                                id: '1',
                                title: "I Have A Store/Office Customers Can Visit"
                            },
                            {
                                id: '2',
                                title: "On-site service"
                            },
                            {
                                id: '3',
                                title: "Online only"
                            },
                        ]
                    }
                },

                step2: {
                    fullAddress: '',
                    street: '',
                    suburb: '',
                    state: '',
                    postcode: '',
                    geo: {
                        //default: capital
                        lng: 149.124417,
                        lat: -35.3075,
                    },
                    openType: 1,
                    time: [
                        {
                            name: 'Monday',
                            short: 'Mon',
                            open: '9:00',
                            close: '17:00',
                            isOpen: true
                        },
                        {
                            name: 'Tuesday',
                            short: 'Tue',
                            open: '',
                            close: '',
                            isOpen: true
                        },
                        {
                            name: 'Wednesday',
                            short: 'Wed',
                            open: '',
                            close: '',
                            isOpen: true

                        },
                        {
                            name: 'Thursday',
                            short: 'Thu',
                            open: '',
                            close: '',
                            isOpen: true
                        },
                        {
                            name: 'Friday',
                            short: 'Fri',
                            open: '',
                            close: '',
                            isOpen: true
                        },
                        {
                            name: 'Saturday',
                            short: 'Sat',
                            open: '',
                            close: '',
                            isOpen: false
                        },
                        {
                            name: 'Sunday',
                            short: 'Sun',
                            open: '',
                            close: '',
                            isOpen: false
                        }
                    ],
                    cache: false,
                    picker: {
                        hour: '9',
                        min: '00',
                        curDay: {
                            index: '',
                            type: ''
                        }
                    }
                },

                step3: {
                    logo: {
                        id: '',
                        src: '',
                    },
                    imgsLimit: 8,
                    currentReplaceIndex: '',
                    imgs: [],
                    slogan: '',
                    about: '',
                    services: [],
                    products: [],
                    specialist: [],
                    serviceAreas: [],
                    cache: false
                },

                step4: {
                    facebook: '',
                    twitter: '',
                    pinterest: '',
                    instagram: '',
                    google: '',
                    linkedin: '',
                    fax: '',
                    cache: false
                }
            },

            mounted: function () {
                getCurStep();
                this.map = initMap(this.step2.geo);
                $('.tooltipped').tooltip({
                    position:'right',
                    delay:50,
                    tooltip:'Maximum size of 1MB jpg, png, gif'
                })
            },

            computed: {
                isAppt: {
                    get: function () {
                        return this.step2.openType == 1 ? false : true
                    },
                    set: function (val) {
                        this.step2.openType = val ? 0 : 1
                    }

                },
                timeFormat: function () {
                    var h = this.step2.picker.hour;
                    var m = this.step2.picker.min;
                    return h + ':' + m;
                },
                storeImgs: function () {
                    var arr = [];
                    if (this.step3.imgs.length > 0) {
                        for (var i = 0; i < this.step3.imgs.length; i++) {
                            arr.push(this.step3.imgs[i].id);
                        }
                    }
                    return arr;
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
                /*STEPPER*/
                stepHandler: function (num) {
                    var current = this.curStep + num;

                    //next
                    if (num > 0) {
                        setStore(this.curStep);
                        console.log(current)
                        if (current < 5 && !this['step' + current].cache) {
                            console.log('get')
                            getStore(current);
                        }
                    }

                    //prev
                    else {
                        if (!this['step' + current].cache) {
                            getStore(current);
                        }
                        this.curStep += num;
                        $("body").scrollTop(0);
                    }
                },
                /*TIME PICKER*/
                timePick: function (type, i) {
                    this.step2.picker.curDay = {
                        index: i,
                        type: type
                    };
                    $("#timePickerModal").openModal({
                        ready: function () {
                            $('html').css('overflow', 'hidden');
                        },
                        complete: function () {
                            $('html').css('overflow', '');
                        }
                    });
                },
                timeConfirm: function () {
                    var day = this.step2.picker.curDay;
                    this.step2.time[day.index][day.type] = this.timeFormat;
                    $('html').css('overflow', '');
                    $("#timePickerModal").closeModal();
                },
                applyAll: function () {
                    var open = this.step2.time[0].open;
                    var close = this.step2.time[0].close;
                    for (var i = 1; i < this.step2.time.length; i++) {
                        if (this.step2.time[i].isOpen) {
                            this.step2.time[i].open = open;
                            this.step2.time[i].close = close;
                        }
                    }
                },
            },

            directives: {
                imgUpload: {
                    bind: function (el, binding) {
                        var type = binding.arg;
                        setTimeout(function () {
                            $(el).uploadifive({
                                auto: true,
                                method: 'post',
                                buttonClass: 'btn as-upload-btn',
                                buttonText: 'upload',
                                fileObjName: 'file',
                                fileSizeLimit: 1024,
                                /*fileType: 'image/!*',*/
                                formData: {
                                    'type': type
                                },
                                multi: false,
                                uploadScript: 'http://dev.yeep.com.au/api/img',

                                onUpload: function (filesToUpload) {
                                    console.log('upload', type);
                                },
                                onUploadComplete: function (file, data) {
                                    var result = JSON.parse(data);
                                    if (result.statusCode == 1) {
                                        switch (type) {
                                            case 'logo':
                                                app.step3.logo.id = result.data.imgID;
                                                app.step3.logo.src = result.data.imgSrc;
                                                break;
                                            case 'store':
                                                var object = {
                                                    id: result.data.imgID,
                                                    src: result.data.imgSrc
                                                }
                                                console.log(app.step3.currentReplaceIndex)
                                                //replace or add
                                                if (app.step3.currentReplaceIndex !== '') {
                                                    app.step3.imgs.splice(app.step3.currentReplaceIndex, 1, object);
                                                }
                                                else {
                                                    app.step3.imgs.push(object);
                                                }
                                                break;
                                        }
                                    }
                                    else {
                                        Materialize.toast('Minimum size of 1MB jpg, png, gif', 4000);
                                    }
                                },
                                'onError': function (errorType) {
                                    //alert('The error was: ' + errorType);
                                    var str = ''
                                    switch (errorType) {
                                        case 'FILE_SIZE_LIMIT_EXCEEDED': {
                                            str = 'Minimum size of 1MB jpg, png, gif';
                                            break;
                                        }
                                    }
                                    Materialize.toast(str, 4000);
                                }
                            })
                        }, 30)
                        ;
                    }
                }
            },

            components: {
                'add-list': {
                    template: '#addListTemp',
                    props: ['list', 'item'],
                    data: function () {
                        return {
                            newTodo: ''
                        }
                    },
                    methods: {
                        add: function (event) {
                            /*var val = event.target.value;
                             console.log(val);*/
                            if(this.newTodo.trim() != ""){
                                this.list.push(this.newTodo.trim())
                                this.newTodo = '';
                            }
                            $(event.target).parent().siblings('input').focus();
                        },
                        del: function (index) {
                            this.list.splice(index, 1);
                        }
                    }
                },
                'img-upload': {
                    template: '#imgTemp',
                    props: ['src', 'id', 'type', 'index'],
                    data: function () {
                        return {
                            type: this.type,
                            id: this.id,
                            isActive: false,
                            index: this.index
                        }
                    },
                    methods: {
                        menuToggle: function () {
                            this.isActive = !this.isActive
                        },
                        replace: function () {
                            switch (this.type) {
                                case 'logo':
                                    $("#logo-upload").siblings(":last").click();
                                    this.isActive = !this.isActive
                                    break;
                                case 'store':
                                    app.step3.currentReplaceIndex = this.index;
                                    $("#store-upload").siblings(":last").click();
                                    this.isActive = !this.isActive
                                    break;
                            }
                        },
                        del: function () {
                            //console.log(this.index,this.type,this.id);
                            switch (this.type) {
                                case 'logo':
                                    app.step3.logo.id = '';
                                    app.step3.logo.src = '';
                                    break;
                                case 'store':
                                    app.step3.imgs.splice(this.index, 1);
                            }
                            this.isActive = false;
                        }
                    }
                }

            }
        })

        function getCurStep() {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'store/step',
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    /*app.curStep = 4;*/
                    app.curStep = parseInt(data.data.step);
                    if (data.data.editStatus == 'add' && data.data.step == 1) {
                        //edit 1 step
                        getCategory();
                    }
                    else if (data.data.editStatus == 'add') {
                        //edit
                        getStore(app.curStep);
                    }
                    else {
                        //change status
                        getStore(app.curStep);
                    }
                }
            })
        }

        function setStore(step) {
            switch (step) {
                case 1://step1: Basic Info
                    if (app.step1.storeName != ''
                        && app.step1.tel != ''
                        && app.step1.email != ''
                        && !$("#step1 input").hasClass('invalid')) {
                        setStoreStep1();
                        app.curStep += 1;
                        $("body").scrollTop(0);
                    }
                    break;
                case 2://step2: Address
                    if (app.step2.postcode != '') {
                        setStoreStep2();
                        app.curStep += 1;
                        $("body").scrollTop(0);
                    }

                    break;
                case 3://step3: About us
                    setStoreStep3();
                    app.curStep += 1;
                    $("body").scrollTop(0);
                    break;
                case 4://step4: Contact
                    setStoreStep4()
                    app.curStep += 1;
                    $("body").scrollTop(0);
                    break;
            }
        }

        function getStore(step) {
            switch (step) {
                case 1: {
                    getStoreStep1();
                    break;
                }
                case 2: {
                    getStoreStep2();
                    break;
                }
                case 3: {
                    getStoreStep3();
                    break;
                }
                case 4: {
                    getStoreStep4();
                    break;
                }
            }
        }

        /**
         * STEP 1 : Basic info
         */
        //step1 get
        function getCategory() {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'store/category',
            }).done(function (data) {
                if (data.statusCode == 1) {
                    getSubCategory(app.step1.categoryId || data.list[0].id);
                    app.step1.categoryList.list = data.list;
                    setTimeout(function () {
                        var $obj = $("#category");
                        $obj.material_select();
                        app.step1.categoryId = $obj.val();
                        $obj.on('change', function () {
                            if ($obj.val() != app.step1.categoryId) {
                                app.step1.categoryId = $obj.val();
                                app.step1.subCategoryId = 0;
                                app.step1.subCategoryId2 = 0;
                                getSubCategory(app.step1.categoryId)
                            }
                        })
                    }, 10)
                }
            })
        }

        function getSubCategory(parentId) {
            $.ajax({
                type: 'post',
                data: {
                    parentID: parentId
                },
                dataType: 'json',
                url: API_DOMAIN + 'store/subCategory',
            }).done(function (data) {
                if (data.list.length > 0) {
                    app.step1.subCategoryList.list = data.list;
                    app.step1.subCategoryId = data.list[0].id;
                    setTimeout(function () {
                        $("#subCategory1,#subCategory2").material_select();
                        $("#subCategory1").val(data.list[0].id);
                        app.step1.subCategoryId = data.list[0].id;

                        $("#subCategory1").on('change', function () {
                            app.step1.subCategoryId = $(this).val();
                        })
                        $("#subCategory2").on('change', function () {
                            app.step1.subCategoryId2 = $(this).val();
                        })
                    }, 10)
                }
            });
        }

        function getBusinessType() {
            setTimeout(function () {
                $("#businessType").material_select();
                $("#businessType").on('change', function () {
                    app.step1.businessType = $(this).val();
                })
            }, 20)
        }

        /*step1*/
        function setStoreStep1() {
            console.log('set step1');
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'store/basic',
                data: {
                    'storeName': app.step1.storeName,
                    'tel': app.step1.tel,
                    'email': app.step1.email,
                    'categoryID': JSON.stringify([app.step1.subCategoryId,
                        app.step1.subCategoryId2]),
                    'businessType': app.step1.businessType,
                    'website': app.step1.website,
                    'chainStore': app.step1.chainStore
                }
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step1.cache = true;
                }
            })
        }

        function getStoreStep1() {
            console.log('get step1');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'store/basic',
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step1.storeName = data.data.storeName;
                    app.step1.tel = data.data.tel;
                    app.step1.email = data.data.email;
                    app.step1.categoryId = parseInt(data.data.categoryID);
                    app.step1.subCategoryId = parseInt(data.data.subCategoryID[0]);
                    app.step1.subCategoryId2 = parseInt(data.data.subCategoryID[1]);

                    //businessType = ''
                    var typeTemp = parseInt(data.data.businessType)
                    app.step1.businessType = typeTemp ? typeTemp : 1;

                    app.step1.website = data.data.website;
                    app.step1.chainStore = data.data.chainStore;
                    console.log(app.step1.businessType)
                    getCategory();
                    getBusinessType();


                    setTimeout(function () {
                        Materialize.updateTextFields();
                    }, 10)

                    app.step1.cache = true;
                    app.isLoading = false;
                }
            })
        }

        /**
         * STEP 2
         * map/address & opentime
         */
        function setStoreStep2() {
            console.log('set step2');
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'store/address_opentime',
                data: {
                    "street": app.step2.street,
                    "suburb": app.step2.suburb,
                    "state": app.step2.state,
                    "postcode": app.step2.postcode,
                    "lng": app.step2.geo.lng,
                    "lat": app.step2.geo.lat,
                    "openType": app.step2.openType,
                    "time": setTimeFormat()
                }
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step2.cache = true;
                }
            })

            function setTimeFormat() {
                if (app.step2.openType == 1) {
                    var days = app.step2.time;
                    var timeArray = [];
                    var timeStr = '';
                    for (var i = 0; i < days.length; i++) {
                        var timeStr = days[i].isOpen
                        && (days[i].open != '' || days[i].close != '') ?
                        days[i].open + ' - ' + days[i].close : '';
                        timeArray.push(timeStr);
                    }
                    return JSON.stringify(timeArray);
                }
                else {
                    return "";
                }
            }
        }

        function getStoreStep2() {
            console.log('get step2');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'store/address_opentime',
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step2.street = data.data.street;
                    app.step2.suburb = data.data.suburb;
                    app.step2.state = data.data.state;
                    app.step2.postcode = data.data.postcode;
                    app.step2.geo.lng = parseFloat(data.data.lng);
                    app.step2.geo.lat = parseFloat(data.data.lat);
                    app.step2.openType = data.data.openType;
                    getTimeFormat(data.data.time);

                    console.log(app.step2.geo)
                    app.map.setCenter(app.step2.geo)

                    app.step2.cache = true;
                    app.isLoading = false;
                }
            })

            function getTimeFormat(time) {
                if (app.step2.openType == 1) {
                    for (var i = 0; i < app.step2.time.length; i++) {
                        //open
                        var day = app.step2.time[i].name;
                        if (time[day].length > 0) {
                            app.step2.time[i].isOpen = true;
                            app.step2.time[i].open = time[day][0];
                            app.step2.time[i].close = time[day][1];
                        }
                        //closed
                        else {
                            app.step2.time[i].isOpen = false;
                            app.step2.time[i].open = '';
                            app.step2.time[i].close = '';
                        }

                    }
                }
            }
        }


        /**
         * STEP 3
         * About us
         */
        function setStoreStep3() {
            console.log('set step3');
            console.log(app.step3.services);
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'store/about',
                data: {
                    "logo": app.step3.logo.id,
                    "imgs": JSON.stringify(app.storeImgs),
                    "slogan": app.step3.slogan,
                    "about": app.step3.about.replace(/\n/g,"<br>"),
                    "services": JSON.stringify(app.step3.services),
                    "products": JSON.stringify(app.step3.products),
                    "specialist": JSON.stringify(app.step3.specialist),
                    "serviceAreas": JSON.stringify(app.step3.serviceAreas),
                }
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step3.cache = true;
                }
            })
        }

        function getStoreStep3() {
            console.log('get step3');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'store/about',
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step3.logo = data.data.logo;
                    app.step3.imgs = data.data.imgs;
                    app.step3.slogan = data.data.slogan;
                    app.step3.about = data.data.about;
                    app.step3.services = data.data.services;
                    app.step3.products = data.data.products;
                    app.step3.specialist = data.data.specialist;
                    app.step3.serviceAreas = data.data.serviceAreas;

                    setTimeout(function () {
                        Materialize.updateTextFields();
                    }, 10)

                    app.step3.cache = true;
                    app.isLoading = false;
                }
            })
        }

        /**
         * STEP 4
         * Store Img & Connect Info
         */

        function setStoreStep4() {
            console.log('set step4')
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'store/contact',
                data: {
                    "facebook": app.step4.facebook,
                    "twitter": app.step4.twitter,
                    "pinterest": app.step4.pinterest,
                    "instagram": app.step4.instagram,
                    "fax": app.step4.fax,
                    "google": app.step4.google,
                    "linkedin": app.step4.linkedin

                }
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step4.cache = true;
                }
            })
        }

        function getStoreStep4() {
            console.log('get step4');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'store/contact',
            }).done(function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    app.step4.facebook = data.data.facebook;
                    app.step4.twitter = data.data.twitter;
                    app.step4.pinterest = data.data.pinterest;
                    app.step4.instagram = data.data.instagram;
                    app.step4.fax = data.data.fax;
                    app.step4.google = data.data.google;
                    app.step4.linkedin = data.data.linkedin;

                    setTimeout(function () {
                        Materialize.updateTextFields();
                    }, 10)

                    app.step4.cache = true;
                    app.isLoading = false;
                }
            })
        }


        /**
         * Map google map component
         */
        function initMap(geo) {
            console.log('map init');
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: parseFloat(geo.lat), lng: parseFloat(geo.lng)},
                zoom: 17,
                mapTypeControl: false,
            });

            /*address paras*/
            var componentForm = {
                street_number: 'short_name',
                route: 'short_name',
                locality: 'short_name',
                administrative_area_level_1: 'short_name',
                postal_code: 'short_name'
            }

            var input = document.getElementById('pac-input');

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            autocomplete.addListener('place_changed', function () {
                console.log('place change');
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace({
                    placeId: place.place_id,
                    location: place.geometry.location
                });
                marker.setVisible(true);

                for (var i = 0, streetNo; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        switch (addressType) {
                            case 'street_number':
                                streetNo = val;
                                break;
                            case 'route':
                                app.step2.street = streetNo + " " + val;
                                break;
                            case 'locality':
                                app.step2.suburb = val;
                                break;
                            case 'administrative_area_level_1':
                                app.step2.state = val;
                                break;
                            case 'postal_code':
                                app.step2.postcode = val;
                        }
                    }
                }
                app.step2.geo.lat = place.geometry.location.lat();
                app.step2.geo.lng = place.geometry.location.lng();

                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                    place.formatted_address);
                infowindow.open(map, marker);
            });
            return map;
        }
    })
}