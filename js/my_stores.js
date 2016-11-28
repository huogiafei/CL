function entry_myStores() {
    console.log('p:ms');
    $(function () {
        var myStoresApp = new Vue({
            el: '#myStoresApp',
            data: {
                isLoading : true,
                stores: '',
                curDelStore: {}
            },
            methods: {
                storeDel: function (i) {
                    this.curDelStore = {
                        name: this.stores[i].storeName,
                        id: this.stores[i].storeID,
                        index: i
                    }
                    console.log(this.curDelStore.id)
                    $("#storeDelModal").openModal();
                },
                storeDelConfirm: function () {
                    var self = this;
                    console.log(this.curDelStore.index);
                    $.ajax({
                        type: 'DELETE',
                        dataType: 'json',
                        url: API_DOMAIN + 'myStores',
                        data: {
                            storeID: this.curDelStore.id
                        }
                    }).done(function (data) {
                        console.log(data);
                        self.stores.splice(self.curDelStore.index, 1);
                        $("#storeDelModal").closeModal();
                    })
                }
            },
            mounted: function () {
                myStoreInit();
            }
        })

        /**
         * API
         */
        function myStoreInit() {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: API_DOMAIN + 'myStores',
            }).done(function (data) {
                console.log(data)
                if (data.statusCode == 1) {
                    myStoresApp.stores = data.data.list;
                    myStoresApp.isLoading = false;
                }

            })
        }
    })
}