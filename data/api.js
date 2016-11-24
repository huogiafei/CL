'use strict';
var config = {
    domain: 'http://dev.yeep.com.au/api/',
    temp: {
        /**
         * Common
         */
        whatAutoTmp: {
            'list': [
                "Arana Hills",
                "Adaminaby",
                "Acton Park",
                "Acton",
                "Acacia Ridge"
            ]
        },

        whereAutoTmp: {
            'list': [
                "Abortion Clinic",
                "Abrasive & Sandblasting Services",
                "Abseiling Service",
                "Accommodation & Travel",
                "Accountant",
                "Acrobatics Class",
                "Acting Class",
                "Actuarial Services",
                "Acupuncture",
                "Adult Entertainment"
            ]
        },

        json: {
            statusCode: 200,
            message: 'add successful',
            data: {
                storeID: 20
            }
        },

        /**
         * Search List
         */
        storesListTmp: {
            'page': {
                page: 2,
                itemPos: [11, 19],
                total: 32,
                isEnd: false
            },
            'list|2': [
                {
                    storeLink: '#/store',
                    name: 'Puma Australia',
                    address: 'Harbour Town 147 Brisbane Rd Biggera Waters, QLD 4216',
                    phone: '(07) 5529 2341',
                    openInfo: 'Open today 9:00 - 21:00',
                    coordinate: {
                        lat: '-27.931415',
                        lng: '153.387824'
                    },
                    contact: {
                        email: '123@puma.com',
                        website: 'www.puma.com.au',
                    },
                    storeImg: 'img/store_1.jpg'
                },
                {
                    storeLink: '#/store',
                    name: 'Nike Store',
                    address: 'Pacific Fair, QLD 4218',
                    phone: '(07) 5529 2330',
                    openInfo: 'Open today 9:00 - 21:00',
                    coordinate: {
                        lat: '-27.981415',
                        lng: '153.397824'
                    },
                    contact: {
                        website: 'www.nike.com.au',
                    },
                    storeImg: 'img/store_2.jpg'
                },
                {
                    storeLink: '#/store',
                    name: 'Adidas Originals Cavill Ave',
                    address: '3170 Surfers Paradise Blv Surfers Paradise, QLD 4217',
                    phone: '(07) 5529 2330',
                    openInfo: 'Open today 9:00 - 21:00',
                    coordinate: {
                        lat: '-28',
                        lng: '153.433333'
                    },
                    contact: {
                        website: 'www.adidas.com.au',
                    },
                    storeImg: 'img/store_3.jpg'
                },

            ]
        },

        /**Claim**/
        claimTmp: {
            'page': {
                curPage: 2, //当前页码
                total: 32, //结果总个数
                isEnd: false, //是否已经最后一页
                pagePerCount: 5
            },
            'lists|3': [
                {
                    storeName: "Bella C's Cafe",
                    address: '162 Barkly street,Ararat, Victoria, 3377',
                    claimLink: 'http://123.com'
                }
            ]
        },

        /**StoreName**/
        storesNameTmp: {
            'list|10': ['@FIRST']
        },

        /**My Stores**/
        myStoresTmp: {
            'list|4': [
                {
                    storeID: 24,
                    storeLink: {
                        detail: 'http://123.com',
                        edit: 'http://456.com'
                    },
                    storeName: 'Burke and Wills Motel',
                    type: 'add',
                    status: {
                        code:1,
                        message:'active'
                    },
                    buildTime: '2016-06-12',
                    visited: 24
                },
            ]
        }
    }
}
/*定义*/
/**MAIN**/
Mock.mock(config.domain + 'whatAuto', config.temp.whatAutoTmp);
Mock.mock(config.domain + 'whereAuto', config.temp.whereAutoTmp);
Mock.mock(config.domain + 'storesList', config.temp.storesListTmp);

/**USER**/
Mock.mock(config.domain + 'claim', config.temp.claimTmp);
/*Mock.mock(config.domain + 'myStores', config.temp.myStoresTmp);*/
Mock.mock(config.domain + 'storesName', config.temp.storesNameTmp);

 Mock.setup({
 timeout: 2000
 })
