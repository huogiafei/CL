function entry_searchList() {
    console.log('p:sl');
    $(function () {
        var map, infowindow, marker;
        var place = $('#slPlace').val();
        var keyword = $('#slKeyword').val();

        var slApp = new Vue({
            el: '#slApp',
            data: {
                isLoading: true,
                FILTER: ['pop', 'distance', 'openTime'],
                curFilterId: 0,
                place: place ? place.trim() : '',
                keyword: keyword ? keyword.trim() : '',
                stores: '',
                page: {
                    curPage: 0,
                    itemPos: [],
                    total: 0,
                    isEnd: false,
                    isLock: false
                },
                activeStoreIndex: 0,
            },
            methods: {
                filterHandler: function (i) {
                    this.curFilterId = i;
                    storesGet('init');
                },

                storeLinkHandler: function (event) {
                    event.stopPropagation();
                },

                storeClickHandler: function (i) {
                    if (!isMobile) {
                        var lat = this.stores[i].coordinate.lat - 0;
                        var lng = this.stores[i].coordinate.lng - 0;
                        var name = this.stores[i].name;
                        mapSet(lat, lng, name);
                        this.activeStoreIndex = i;
                    }
                    else {
                        location.href = this.stores[i].storeLink;
                    }
                }
            },
            mounted: function () {
                mapConfig();
                scrollLoad();
                mapFloat();
                $('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrain_width: false,
                        hover: true,
                        gutter: 0,
                        belowOrigin: false,
                        alignment: 'left'
                    }
                );
            }
        });

        storesGet('init');

        /**
         * Store Map
         */
        function mapConfig() {
            var dom = $("#sl-map")[0];
            if (dom) {
                map = new google.maps.Map(dom, {
                    zoom: 14,
                });

                infowindow = new google.maps.InfoWindow();

                marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            }
        }

        //init map
        function mapInit() {
            var lat = slApp.stores[0].coordinate.lat - 0;
            var lng = slApp.stores[0].coordinate.lng - 0;
            var name = slApp.stores[0].name;
            mapSet(lat, lng, name);
        }

        //set map
        function mapSet(lat, lng, title) {
            var myLatLng = {lat: lat, lng: lng};
            map.panTo(myLatLng);
            marker.setPosition(myLatLng);
            infowindow.setContent(title);
        }

        //SL right side float
        function mapFloat() {
            $(window).scroll(function () {
                var curScrollTop = $(document).scrollTop();
                var rsTop = $(".sl-main").offset().top;
                if (curScrollTop > rsTop - 70) {
                    rsFloat(true);
                }
                else {
                    rsFloat(false);
                }
            });
            function rsFloat(isFloat) {
                var width = $(".sl-left").outerWidth();
                if (isFloat) {
                    $(".sl-right").css({
                        'position': 'fixed',
                        'width': width + 'px',
                        'top': '70px',
                        'left': '50%',
                        'z-index': 10
                    })
                }
                else {
                    $(".sl-right").css({
                        'position': 'relative',
                        'width': '50%',
                        'left': 'auto',
                        'top': 'auto'
                    })
                }
            }
        }

        /*stores data get */
        function storesGet(type) {
            NProgress.start();
            var filter = slApp.FILTER[slApp.curFilterId];
            var geo = {};
            type == 'add' ?
                slApp.page.curPage++ : slApp.page.curPage = 1;

            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: API_DOMAIN + 'storesList',
                data: {
                    page: slApp.page.curPage,
                    filter: slApp.FILTER[slApp.curFilterId],
                    place: slApp.place,
                    keywords: slApp.keyword,//KEYWORD,
                    geo: JSON.stringify(GEO),
                },
            }).done(function (data) {
                //console.log(data)
                slApp.isLoading = false;
                NProgress.done();
                storesSet(type, data.data);
            })
        }

        /* store render */
        function storesSet(type, data) {
            slApp.page.isEnd = data.page.isEnd;
            slApp.page.isLock = false;
            if (data.list.length != 0) {
                if (type == 'init') {
                    slApp.page.total = data.page.total;
                    slApp.stores = data.list;
                    slApp.activeStoreIndex = 0;
                    mapInit();
                }
                else if (type == 'add') {
                    for (var i = 0; i < data.list.length; i++) {
                        slApp.stores.push(data.list[i]);
                    }

                }
            }
        }

        /*infinite load*/
        function scrollLoad() {
            $(window).scroll(function () {
                if ($('body').height() * 0.8 <
                    $('body').scrollTop() + $(window).height()) {
                    if (!slApp.page.isEnd && !slApp.page.isLock) {
                        slApp.page.isLock = true;
                        storesGet('add');
                    }
                }
            })
        }
    })
}


