"use strict";$(function(){var t=$("#pv").val(),n={searchList:function(){entry_searchList()},store:function(){entry_store()},myStores:function(){entry_myStores()},addStore:function(){entry_addStore()},claim:function(){entry_claim()},accountSetting:function(){entry_accountSetting()},contact:function(){entry_contact()},forgetPassword:function(){entry_forgetPassword()},resetPassword:function(){entry_resetPassword()}};t&&n[t]()});
function entry_searchList(){$(function(){function t(){var t=$("#sl-map")[0];t&&(r=new google.maps.Map(t,{zoom:14}),l=new google.maps.InfoWindow,d=new google.maps.Marker({map:r,animation:google.maps.Animation.DROP}),d.addListener("click",function(){l.open(r,d)}))}function o(){var t=g.stores[0].coordinate.lat-0,o=g.stores[0].coordinate.lng-0,i=g.stores[0].name;e(t,o,i)}function e(t,o,e){var i={lat:t,lng:o};r.panTo(i),d.setPosition(i),l.setContent(e)}function i(){function t(t){var o=$(".sl-left").outerWidth();t?$(".sl-right").css({position:"fixed",width:o+"px",top:"70px",left:"50%","z-index":10}):$(".sl-right").css({position:"relative",width:"50%",left:"auto",top:"auto"})}$(window).scroll(function(){var o=$(document).scrollTop(),e=$(".sl-main").offset().top;t(o>e-70)})}function n(t){NProgress.start();g.FILTER[g.curFilterId];"add"==t?g.page.curPage++:g.page.curPage=1,$.ajax({type:"GET",dataType:"json",url:API_DOMAIN+"storesList",data:{page:g.page.curPage,filter:g.FILTER[g.curFilterId],place:g.place,keywords:g.keyword,geo:JSON.stringify(GEO)}}).done(function(o){NProgress.done(),s(t,o.data)})}function s(t,e){if(g.page.isEnd=e.page.isEnd,g.page.isLock=!1,0!=e.list.length)if("init"==t)g.page.total=e.page.total,g.stores=e.list,g.activeStoreIndex=0,o();else if("add"==t)for(var i=0;i<e.list.length;i++)g.stores.push(e.list[i])}function a(){$(window).scroll(function(){.8*$("body").height()<$("body").scrollTop()+$(window).height()&&(g.page.isEnd||g.page.isLock||(g.page.isLock=!0,n("add")))})}var r,l,d,c=$("#slPlace").val(),p=$("#slKeyword").val(),g=new Vue({el:"#slApp",data:{FILTER:["pop","distance","openTime"],curFilterId:0,place:c?c.trim():"",keyword:p?p.trim():"",stores:[],page:{curPage:0,itemPos:[],total:0,isEnd:!1,isLock:!1},activeStoreIndex:0},methods:{filterHandler:function(t){this.curFilterId=t,n("init")},storeLinkHandler:function(t){t.stopPropagation()},storeClickHandler:function(t){if(isMobile)location.href=this.stores[t].storeLink;else{var o=this.stores[t].coordinate.lat-0,i=this.stores[t].coordinate.lng-0,n=this.stores[t].name;e(o,i,n),this.activeStoreIndex=t}}},mounted:function(){t(),a(),i(),$(".dropdown-button").dropdown({inDuration:300,outDuration:225,constrain_width:!1,hover:!0,gutter:0,belowOrigin:!1,alignment:"left"})}});n("init")})}
function entry_store(){$(function(){function t(){var t=$("#storeMap"),e=t.attr("data-lat")-0,n=t.attr("data-lng")-0,o={lat:e,lng:n},a=new google.maps.Map(document.getElementById("storeMap"),{center:{lat:e,lng:n},zoom:16});new google.maps.Marker({position:o,map:a,title:""})}function e(t){var e,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(n))?decodeURI(e[2]):null}t(),isMobile||lightbox.option({albumLabel:"%1 of %2",disableScrolling:!0,fadeDuration:100,resizeDuration:200,wrapAround:!0}),$(".login-check").click(function(t){t.preventDefault(),e("pid")?location.href=$(this).attr("href"):$("#loginBtn").click()})})}
function entry_myStores(){$(function(){function e(){NProgress.start(),$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"myStores"}).done(function(e){1==e.statusCode&&(t.stores=e.data.list,NProgress.done())})}var t=new Vue({el:"#myStoresApp",data:{stores:0,curDelStore:{}},methods:{storeDel:function(e){this.curDelStore={name:this.stores[e].storeName,id:this.stores[e].storeID,index:e},$("#storeDelModal").openModal()},storeDelConfirm:function(){var e=this;$.ajax({type:"DELETE",dataType:"json",url:API_DOMAIN+"myStores",data:{storeID:this.curDelStore.id}}).done(function(t){e.stores.splice(e.curDelStore.index,1),$("#storeDelModal").closeModal()})}},mounted:function(){e()}})})}
function entry_addStore(){$(function(){function e(){$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"store/step"}).done(function(e){1==e.statusCode&&(y.curStep=parseInt(e.data.step),"add"==e.data.editStatus&&1==e.data.step?a():s("add"==e.data.editStatus?y.curStep:y.curStep))})}function t(e){switch(e){case 1:""==y.step1.storeName||""==y.step1.tel||""==y.step1.email||$("#step1 input").hasClass("invalid")||(n(),y.curStep+=1,$("body").scrollTop(0));break;case 2:""!=y.step2.postcode&&(r(),y.curStep+=1,$("body").scrollTop(0));break;case 3:d(),y.curStep+=1,$("body").scrollTop(0);break;case 4:u(),y.curStep+=1,$("body").scrollTop(0)}}function s(e){switch(e){case 1:p();break;case 2:c();break;case 3:l();break;case 4:g()}}function a(){$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"store/category"}).done(function(e){1==e.statusCode&&(o(y.step1.categoryId||e.list[0].id),y.step1.categoryList.list=e.list,setTimeout(function(){var e=$("#category");e.material_select(),y.step1.categoryId=e.val(),e.on("change",function(){e.val()!=y.step1.categoryId&&(y.step1.categoryId=e.val(),y.step1.subCategoryId=0,y.step1.subCategoryId2=0,o(y.step1.categoryId))})},10))})}function o(e){$.ajax({type:"post",data:{parentID:e},dataType:"json",url:API_DOMAIN+"store/subCategory"}).done(function(e){e.list.length>0&&(y.step1.subCategoryList.list=e.list,y.step1.subCategoryId=e.list[0].id,setTimeout(function(){$("#subCategory1,#subCategory2").material_select(),$("#subCategory1").val(e.list[0].id),y.step1.subCategoryId=e.list[0].id,$("#subCategory1").on("change",function(){y.step1.subCategoryId=$(this).val()}),$("#subCategory2").on("change",function(){y.step1.subCategoryId2=$(this).val()})},10))})}function i(){setTimeout(function(){$("#businessType").material_select(),$("#businessType").on("change",function(){y.step1.businessType=$(this).val()})},20)}function n(){$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"store/basic",data:{storeName:y.step1.storeName,tel:y.step1.tel,email:y.step1.email,categoryID:JSON.stringify([y.step1.subCategoryId,y.step1.subCategoryId2]),businessType:y.step1.businessType,website:y.step1.website,chainStore:y.step1.chainStore}}).done(function(e){1==e.statusCode&&(y.step1.cache=!0)})}function p(){$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"store/basic"}).done(function(e){if(1==e.statusCode){y.step1.storeName=e.data.storeName,y.step1.tel=e.data.tel,y.step1.email=e.data.email,y.step1.categoryId=parseInt(e.data.categoryID),y.step1.subCategoryId=parseInt(e.data.subCategoryID[0]),y.step1.subCategoryId2=parseInt(e.data.subCategoryID[1]);var t=parseInt(e.data.businessType);y.step1.businessType=t?t:1,y.step1.website=e.data.website,y.step1.chainStore=e.data.chainStore,a(),i(),setTimeout(function(){Materialize.updateTextFields()},10),y.step1.cache=!0}})}function r(){function e(){if(1==y.step2.openType){for(var e=y.step2.time,t=[],s="",a=0;a<e.length;a++){var s=!e[a].isOpen||""==e[a].open&&""==e[a].close?"":e[a].open+" - "+e[a].close;t.push(s)}return JSON.stringify(t)}return""}$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"store/address_opentime",data:{street:y.step2.street,suburb:y.step2.suburb,state:y.step2.state,postcode:y.step2.postcode,lng:y.step2.geo.lng,lat:y.step2.geo.lat,openType:y.step2.openType,time:e()}}).done(function(e){1==e.statusCode&&(y.step2.cache=!0)})}function c(){function e(e){if(1==y.step2.openType)for(var t=0;t<y.step2.time.length;t++){var s=y.step2.time[t].name;e[s].length>0?(y.step2.time[t].isOpen=!0,y.step2.time[t].open=e[s][0],y.step2.time[t].close=e[s][1]):(y.step2.time[t].isOpen=!1,y.step2.time[t].open="",y.step2.time[t].close="")}}$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"store/address_opentime"}).done(function(t){1==t.statusCode&&(y.step2.street=t.data.street,y.step2.suburb=t.data.suburb,y.step2.state=t.data.state,y.step2.postcode=t.data.postcode,y.step2.geo.lng=parseFloat(t.data.lng),y.step2.geo.lat=parseFloat(t.data.lat),y.step2.openType=t.data.openType,e(t.data.time),y.map.setCenter(y.step2.geo),y.step2.cache=!0)})}function d(){$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"store/about",data:{logo:y.step3.logo.id,imgs:JSON.stringify(y.storeImgs),slogan:y.step3.slogan,about:y.step3.about,services:JSON.stringify(y.step3.services),products:JSON.stringify(y.step3.products),specialist:JSON.stringify(y.step3.specialist),serviceAreas:JSON.stringify(y.step3.serviceAreas)}}).done(function(e){1==e.statusCode&&(y.step3.cache=!0)})}function l(){$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"store/about"}).done(function(e){1==e.statusCode&&(y.step3.logo=e.data.logo,y.step3.imgs=e.data.imgs,y.step3.slogan=e.data.slogan,y.step3.about=e.data.about,y.step3.services=e.data.services,y.step3.products=e.data.products,y.step3.specialist=e.data.specialist,y.step3.serviceAreas=e.data.serviceAreas,setTimeout(function(){Materialize.updateTextFields()},10),y.step3.cache=!0)})}function u(){$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"store/contact",data:{facebook:y.step4.facebook,twitter:y.step4.twitter,pinterest:y.step4.pinterest,instagram:y.step4.instagram,fax:y.step4.fax,google:y.step4.google,linkedin:y.step4.linkedin}}).done(function(e){1==e.statusCode&&(y.step4.cache=!0)})}function g(){$.ajax({type:"get",dataType:"json",url:API_DOMAIN+"store/contact"}).done(function(e){1==e.statusCode&&(y.step4.facebook=e.data.facebook,y.step4.twitter=e.data.twitter,y.step4.pinterest=e.data.pinterest,y.step4.instagram=e.data.instagram,y.step4.fax=e.data.fax,y.step4.google=e.data.google,y.step4.linkedin=e.data.linkedin,setTimeout(function(){Materialize.updateTextFields()},10),y.step4.cache=!0)})}function m(e){var t=new google.maps.Map(document.getElementById("map"),{center:{lat:parseFloat(e.lat),lng:parseFloat(e.lng)},zoom:17,mapTypeControl:!1}),s={street_number:"short_name",route:"short_name",locality:"short_name",administrative_area_level_1:"short_name",postal_code:"short_name"},a=document.getElementById("pac-input"),o=new google.maps.places.Autocomplete(a);o.bindTo("bounds",t),t.controls[google.maps.ControlPosition.TOP_LEFT].push(a);var i=new google.maps.InfoWindow,n=new google.maps.Marker({map:t});return n.addListener("click",function(){i.open(t,n)}),o.addListener("place_changed",function(){i.close();var e=o.getPlace();if(e.geometry){e.geometry.viewport?t.fitBounds(e.geometry.viewport):(t.setCenter(e.geometry.location),t.setZoom(17)),n.setPlace({placeId:e.place_id,location:e.geometry.location}),n.setVisible(!0);for(var a,p=0;p<e.address_components.length;p++){var r=e.address_components[p].types[0];if(s[r]){var c=e.address_components[p][s[r]];switch(r){case"street_number":a=c;break;case"route":y.step2.street=a+" "+c;break;case"locality":y.step2.suburb=c;break;case"administrative_area_level_1":y.step2.state=c;break;case"postal_code":y.step2.postcode=c}}}y.step2.geo.lat=e.geometry.location.lat(),y.step2.geo.lng=e.geometry.location.lng(),i.setContent("<div><strong>"+e.name+"</strong><br>"+e.formatted_address),i.open(t,n)}}),t}var y=new Vue({el:"#addApp",data:{map:{},curStep:"",stepper:{title:["basic info","address","about us","contact","done"]},step1:{storeName:"",tel:"",email:"",categoryId:"",subCategoryId:"",subCategoryId2:"",businessType:"",website:"",chainStore:"",cache:!1,categoryList:{list:[]},subCategoryList:{list:[]},businessTypeList:{list:[{id:"1",title:"I Have A Store/Office Customers Can Visit"},{id:"2",title:"On-site service"},{id:"3",title:"Online only"}]}},step2:{fullAddress:"",street:"",suburb:"",state:"",postcode:"",geo:{lng:149.124417,lat:-35.3075},openType:1,time:[{name:"Monday",short:"Mon",open:"9:00",close:"17:00",isOpen:!0},{name:"Tuesday",short:"Tue",open:"",close:"",isOpen:!0},{name:"Wednesday",short:"Wed",open:"",close:"",isOpen:!0},{name:"Thursday",short:"Thu",open:"",close:"",isOpen:!0},{name:"Friday",short:"Fri",open:"",close:"",isOpen:!0},{name:"Saturday",short:"Sat",open:"",close:"",isOpen:!1},{name:"Sunday",short:"Sun",open:"",close:"",isOpen:!1}],cache:!1,picker:{hour:"9",min:"00",curDay:{index:"",type:""}}},step3:{logo:{id:"",src:""},imgsLimit:8,currentReplaceIndex:"",imgs:[],slogan:"",about:"",services:[],products:[],specialist:[],serviceAreas:[],cache:!1},step4:{facebook:"",twitter:"",pinterest:"",instagram:"",google:"",linkedin:"",fax:"",cache:!1}},mounted:function(){e(),this.map=m(this.step2.geo)},computed:{isAppt:{get:function(){return 1!=this.step2.openType},set:function(e){this.step2.openType=e?0:1}},timeFormat:function(){var e=this.step2.picker.hour,t=this.step2.picker.min;return e+":"+t},storeImgs:function(){var e=[];if(this.step3.imgs.length>0)for(var t=0;t<this.step3.imgs.length;t++)e.push(this.step3.imgs[t].id);return e}},methods:{checkNull:function(e){var t=e.target;""==t.value?($(t).addClass("invalid"),$(t).next().addClass("active")):$(t).removeClass("invalid")},stepHandler:function(e){var a=this.curStep+e;e>0?(t(this.curStep),a<5&&!this["step"+a].cache&&s(a)):(this["step"+a].cache||s(a),this.curStep+=e,$("body").scrollTop(0))},timePick:function(e,t){this.step2.picker.curDay={index:t,type:e},$("#timePickerModal").openModal({ready:function(){$("html").css("overflow","hidden")},complete:function(){$("html").css("overflow","")}})},timeConfirm:function(){var e=this.step2.picker.curDay;this.step2.time[e.index][e.type]=this.timeFormat,$("html").css("overflow",""),$("#timePickerModal").closeModal()},applyAll:function(){for(var e=this.step2.time[0].open,t=this.step2.time[0].close,s=1;s<this.step2.time.length;s++)this.step2.time[s].isOpen&&(this.step2.time[s].open=e,this.step2.time[s].close=t)}},directives:{imgUpload:{bind:function(e,t){var s=t.arg;setTimeout(function(){$(e).uploadifive({auto:!0,method:"post",buttonClass:"btn as-upload-btn",buttonText:"upload",fileObjName:"file",fileSizeLimit:1024,formData:{type:s},multi:!1,uploadScript:"http://dev.yeep.com.au/api/img",onUpload:function(e){},onUploadComplete:function(e,t){var a=JSON.parse(t);if(1==a.statusCode)switch(s){case"logo":y.step3.logo.id=a.data.imgID,y.step3.logo.src=a.data.imgSrc;break;case"store":var o={id:a.data.imgID,src:a.data.imgSrc};""!==y.step3.currentReplaceIndex?y.step3.imgs.splice(y.step3.currentReplaceIndex,1,o):y.step3.imgs.push(o)}else Materialize.toast("Minimum size of 1MB jpg, png, gif",4e3)},onError:function(e){var t="";switch(e){case"FILE_SIZE_LIMIT_EXCEEDED":t="Minimum size of 1MB jpg, png, gif"}Materialize.toast(t,4e3)}})},30)}}},components:{"add-list":{template:"#addListTemp",props:["list","item"],data:function(){return{newTodo:""}},methods:{add:function(e){this.list.push(this.newTodo.trim()),this.newTodo=""},del:function(e){this.list.splice(e,1)}}},"img-upload":{template:"#imgTemp",props:["src","id","type","index"],data:function(){return{type:this.type,id:this.id,isActive:!1,index:this.index}},methods:{menuToggle:function(){this.isActive=!this.isActive},replace:function(){switch(this.type){case"logo":$("#logo-upload").siblings(":last").click(),this.isActive=!this.isActive;break;case"store":y.step3.currentReplaceIndex=this.index,$("#store-upload").siblings(":last").click(),this.isActive=!this.isActive}},del:function(){switch(this.type){case"logo":y.step3.logo.id="",y.step3.logo.src="";break;case"store":y.step3.imgs.splice(this.index,1)}this.isActive=!1}}}}})})}
function entry_claim(){$(function(){function a(){$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"claim",data:{storeName:t.businessName,suburb:t.suburb,page:t.page.curPage?t.page.curPage:1}}).done(function(a){a.data.list?(t.stores=a.data.list,t.page=a.data.page,t.page.pageCount=parseInt(t.page.total/t.page.pagePerCount)):t.noResult=!0})}function e(e){switch(e){case"next":t.page.isEnd||(t.page.curPage++,a());break;case"prev":1!=t.page.curPage&&(t.page.curPage--,a());break;default:t.page.curPage=e,a()}}var t=new Vue({el:"#claimApp",data:{businessName:"",suburb:"",noResult:!1,stores:[],page:{}},methods:{pageClick:function(a){e(a)},checkNull:function(a){var e=a.target;""==e.value?($(e).addClass("invalid"),$(e).next().addClass("active")):$(e).removeClass("invalid")},claimSubmit:function(){""!=this.businessName&&a()}},mounted:function(){$("body").on("keyup",function(a){13==a.keyCode&&t.claimSubmit()})}})})}
function entry_accountSetting(){$(function(){function a(a,e,t){NProgress.start(),$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"profile",data:{headerId:a,fullName:e,phone:t}}).done(function(a){NProgress.done(),o.profile.loading=!1,1==a.statusCode})}function e(a,e){NProgress.start(),$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"password",data:{oldPassword:md5(a),newPassword:md5(e)}}).done(function(a){NProgress.done(),o.cp.loading=!1,1==a.statusCode})}function t(a){$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"password/old",data:{oldPassword:md5(a)}}).done(function(a){0==a.statusCode&&$("#oldPwd").addClass("invalid")})}var o=new Vue({el:"#accountApp",data:{profile:{fullName:"",phone:"",headerId:0,loading:!1},cp:{old:"",new:"",new2:"",loading:!1}},methods:{checkOld:function(){t(this.cp.old)},checkNull:function(a){var e=a.target;""==e.value?($(e).addClass("invalid"),$(e).next().addClass("active")):$(e).removeClass("invalid")},profileChange:function(e){""!=this.profile.fullName&&""!=this.profile.phone&&(this.profile.loading=!0,a(this.profile.headerId,this.profile.fullName,this.profile.phone))},confirmPwd:function(a){var e=a.target;return this.cp.new!==this.cp.new2?($(e).addClass("invalid"),$(e).next().addClass("active"),!1):($(e).removeClass("invalid"),!0)},passwordChange:function(){""!==this.cp.old&&""!==this.cp.new&&this.cp.new==this.cp.new2&&(this.cp.loading=!0,e(this.cp.old,this.cp.new))}},mounted:function(){$(".ep-head").attr("src",$(".head-access-head").attr("src"))}});$("#upload").uploadifive({auto:!0,method:"post",fileObjName:"file",buttonClass:"ep-avatar",buttonText:"",formData:{type:"avatar"},multi:!1,uploadScript:"http://dev.yeep.com.au/api/img",onUpload:function(a){NProgress.start()},onUploadComplete:function(a,e){var t=JSON.parse(e);1==t.statusCode&&(NProgress.done(),$(".ep-head").attr("src",t.data.imgSrc),o.profile.headerId=t.data.imgID)}})})}
function entry_contact(){$(function(){function e(){var e=document.getElementById("contactMap");if(e)var t=new google.maps.Map(e,{center:{lat:-37.9776688,lng:145.1470184},zoom:16,mapTypeControlOptions:{mapTypeIds:[]}});new google.maps.Marker({position:{lat:-37.9776688,lng:145.1470184},map:t,title:""})}function t(){NProgress.start(),$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"contact",data:{type:a.curTopicType,email:a.email,fullName:a.fullName,subject:a.subject,message:a.message,storeName:a.storeName,storeAddress:a.storeSuburb,os:a.os,browser:a.browser,partnerName:a.partnerName,partnerTel:a.partnerTel}}).done(function(e){NProgress.done(),a.loading=!1,$(".contact-main-content").hide(),$(".contact-success").show()})}var a=new Vue({el:"#contactApp",data:{curTopicType:0,fullName:"",email:"",subject:"",message:"",storeName:"",storeSuburb:"",os:"",browser:"",partnerName:"",partnerTel:"",loading:!1},methods:{checkNull:function(e){var t=e.target;""==t.value?($(t).addClass("invalid"),$(t).next().addClass("active")):$(t).removeClass("invalid")},sendHandler:function(){0!=this.curTopicType&&""!=this.fullName&&""!=this.email&&""!=this.subject&&(this.loading=!0,t())}},mounted:function(){e(),$("#topic").material_select(),$("#topic").change(function(){a.curTopicType=$(this).val()})}})})}
function entry_forgetPassword(){$(function(){function e(e){NProgress.start(),$.ajax({type:"post",dataType:"json",url:API_DOMAIN+"resetPasswordEmail",data:{email:e}}).done(function(e){NProgress.done(),0==e.statusCode?(i.emailError=a.NOT_EXIST,$("#email").addClass("invalid").focus()):($("#forgotStep1").hide(),$("#forgotStep2").show())})}var a={NULL:"please enter your email",NOT_EXIST:"email account does not exist"},i=new Vue({el:"#forgetPwdApp",data:{email:"",emailError:a.NULL},methods:{emailSend:function(){""==this.email?$("#email").addClass("invalid").focus:$("#email").hasClass("invalid")||e(this.email)},edit:function(){this.emailError=a.NULL}}})})}
function entry_resetPassword(){$(function(){function s(s){NProgress.start(),$.ajax({type:"post",dataType:"json",data:{password:md5(s)},url:API_DOMAIN+"resetPassword"}).done(function(s){NProgress.done(),$("#resetStep1").hide(),$("#resetStep2").show()})}new Vue({el:"#resetPwdApp",data:{password1:"",password2:""},methods:{reset:function(){""==this.password1&&$("#password").addClass("invalid").focus(),""==this.password2||this.password2!==this.password1?$("#password2").addClass("invalid").focus():this.password1!==this.password2||$("#resetStep1 input").hasClass("invalid")||s(this.password2)}}})})}