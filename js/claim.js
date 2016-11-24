function entry_claim() {
    console.log('p:c');
    $(function () {
        var claimApp = new Vue({
            el: '#claimApp',
            data: {
                businessName: '',
                suburb: '',
                noResult: false,
                stores: [],
                /*page*/
                page: {}
            },
            methods: {
                pageClick: function (pageIndex) {
                    pageHandler(pageIndex);
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
                claimSubmit: function () {
                    if (this.businessName != '') {
                        getClaimList();
                    }
                }
            },
            mounted: function () {
                $('body').on('keyup', function (event) {
                    if (event.keyCode == 13) {
                        claimApp.claimSubmit();
                    }
                })
            }
        })

        function getClaimList() {
            console.log(claimApp.page.curPage ? claimApp.page.curPage : 1)
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'claim',
                data: {
                    storeName: claimApp.businessName,
                    suburb: claimApp.suburb,
                    page: claimApp.page.curPage ? claimApp.page.curPage : 1
                }
            }).done(function (data) {
                console.log(data);
                if (data.data.list) {
                    claimApp.stores = data.data.list;
                    /*page*/
                    claimApp.page = data.data.page;
                    claimApp.page.pageCount =
                        parseInt(claimApp.page.total / claimApp.page.pagePerCount);
                }
                else {
                    claimApp.noResult = true;
                }

            })
        }

        /*page handler*/
        function pageHandler(pageIndex) {
            switch (pageIndex) {
                case 'next':
                    if (!claimApp.page.isEnd) {
                        claimApp.page.curPage++;
                        getClaimList();
                    }
                    break;
                case 'prev':
                    if (claimApp.page.curPage != 1) {
                        claimApp.page.curPage--;
                        getClaimList();
                    }
                    break;
                default : {
                    claimApp.page.curPage = pageIndex
                    getClaimList();
                }
            }
        }


        //getStoresName()
        function getStoresName() {
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: API_DOMAIN + 'storesName',
                data: {
                    keyword: 1,
                    limit: 5,
                }
            }).done(function (data) {

            })
        }

    })
}