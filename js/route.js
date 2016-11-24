'use strict';
$(function () {
    var BASE = {
        html : 'view/',
        js:'js/'
    }

    /**
     * CL ROUTER
     */
    var wrap = $("#mainTmp");
    var routerData = {
        home: function () {
            wrap.load(BASE.html + 'home.html');
        },
        search_list: function () {
            wrap.load(BASE.html + 'search_list.html', function () {
                $.getScript(BASE.js + 'search_list.js');
                entry();
            });
        },

        store: function () {
            wrap.load(BASE.html + 'store.html', function () {
                $.getScript(BASE.js + 'store.js');
                entry();
            });
        },

        claim: function () {
            wrap.load(BASE.html + 'claim.html', function () {
                $.getScript(BASE.js + 'claim.js');
                entry();
            });
        },

        my_stores: function () {
            wrap.load(BASE.html + 'my_stores.html', function () {
                $.getScript(BASE.js + 'my_stores.js');
                entry();
            });
        },

        add_store: function () {
            wrap.load(BASE.html + 'add_store.html', function () {
                $.getScript(BASE.js + '../js/add_store.js');
                entry();
            });
        },

        forget_password: function () {
            wrap.load(BASE.html + 'forget_password.html', function () {
                $.getScript(BASE.js + 'forget_password.js');
                entry();
            });
        },

        reset_password: function () {
            wrap.load(BASE.html + 'reset_password.html', function () {
                $.getScript(BASE.js + 'reset_password.js');
                entry();
            });
        },

        account_setting: function () {
            wrap.load(BASE.html + 'account_setting.html', function () {
                $.getScript(BASE.js + 'account_setting.js');
                entry();
            });
        },

        contact: function () {
            wrap.load(BASE.html + 'contact.html', function () {
                $.getScript(BASE.js + 'contact.js');
                entry();
            });
        },

        police_privacy: function () {
            wrap.load(BASE.html + 'polices_privacy.html');
        },
        police_terms: function () {
            wrap.load(BASE.html + 'polices_terms.html');
        },
        browser_by_other: function () {
            wrap.load(BASE.html + 'browser_by_other.html');
        },
        stores: function () {
            wrap.load(BASE.html + 'stores.html');
        },
        about: function () {
            wrap.load(BASE.html + 'about.html')
        },
        account_activated: function () {
            wrap.load(BASE.html + 'account_activated.html');
        },
        not_found: function () {
            wrap.load(BASE.html + '404.html');
        },
        error: function () {
            wrap.load(BASE.html + '500.html');
        }
    }

    var routes = {
        '/home': routerData.home,
        '/search_list': routerData.search_list,
        '/store': routerData.store,
        '/claim': routerData.claim,
        '/my_stores': routerData.my_stores,
        '/add_store': routerData.add_store,
        '/forget_password': routerData.forget_password,
        '/reset_password': routerData.reset_password,
        '/police_privacy': routerData.police_privacy,
        '/police_terms': routerData.police_terms,
        '/account_setting': routerData.account_setting,
        '/browser_by_other': routerData.browser_by_other,
        '/stores': routerData.stores,
        '/about': routerData.about,
        '/contact': routerData.contact,
        '/account_activated': routerData.account_activated,
        '/404': routerData.not_found,
        '/500': routerData.error,
    }

    var router = Router(routes);
    router.configure({
        on: function () {
            $('body').scrollTop(0);
        }
    });
    router.init();

    function entry() {
        $.getScript(BASE.js + 'entry.js');
    }
})