'use strict';
$(function(){
    var page = $("#pv").val();
    var router = {
        /*common*/
        'searchList': function () {
            entry_searchList();
        },
        'store': function () {
            entry_store();
        },

        /*user*/
        'myStores': function () {
            entry_myStores();
        },
        'addStore': function () {
            entry_addStore();
        },
        'claim': function () {
            entry_claim();
        },
        'accountSetting':function() {
            entry_accountSetting();
        },

        /*other*/
        'contact':function () {
            entry_contact();
        },
        'forgetPassword':function () {
            entry_forgetPassword();
        },
        'resetPassword':function(){
            entry_resetPassword();
        }
    }

    if(page)router[page]();
})