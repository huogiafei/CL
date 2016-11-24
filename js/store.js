function entry_store() {
    console.log('p:s');
    $(function () {
        initMap();

        function initMap() {
            var $map = $("#storeMap");
            var storeLat = $map.attr('data-lat') - 0;
            var storeLng = $map.attr('data-lng') - 0;
            var myLatLng = {lat: storeLat, lng: storeLng};
            var map = new google.maps.Map(document.getElementById('storeMap'), {
                center: {lat: storeLat, lng: storeLng},
                zoom: 16
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: ''
            });
        }

        /*lightbox options*/
        if (!isMobile) {
            lightbox.option({
                'albumLabel': "%1 of %2",
                disableScrolling: true,
                fadeDuration: 100,
                'resizeDuration': 200,
                'wrapAround': true
            })
        }

        /*login check*/
        $(".login-check").click(function (event) {
            event.preventDefault();
            if(!getCookie('pid')){
                $('#loginBtn').click();
            }
            else {
                location.href = $(this).attr('href');
            }
        })

        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return  decodeURI(arr[2]);
            else
                return null;
        }
    })

}
