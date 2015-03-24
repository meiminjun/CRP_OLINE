/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.require('CRP.util.PubOperation');

Ext.require('CRP.ux.Manager');
Ext.require('CRP.ux.CustomLoading');
Ext.require('CRP.ux.ImageViewer');
Ext.require('CRP.ux.TimePicker');
Ext.require('CRP.ux.Timefield');
Ext.require('CRP.ux.PullRefreshFn');

Ext.require('CRP.ux.override.Component');
Ext.require('CRP.ux.override.Button');
Ext.require('CRP.ux.override.Container');
Ext.require('CRP.ux.override.DataView');
Ext.require('CRP.ux.override.TitleBar');
Ext.require('CRP.ux.override.Toolbar');
Ext.require('CRP.ux.override.field.Field');
Ext.require('CRP.ux.override.field.DatePicker');
Ext.require('CRP.ux.override.form.FieldSet');
Ext.require('CRP.ux.override.navigation.Bar');
Ext.require('CRP.ux.override.navigation.View');
Ext.require('CRP.ux.override.picker.Picker');
Ext.require('CRP.ux.override.picker.Date');
Ext.require('CRP.ux.override.plugin.ListPaging');
Ext.require('CRP.ux.override.plugin.PullRefresh');

if(this.isGoogleChrome()){
	initFn();
}else{
	// 加载phonegap device
	document.addEventListener("deviceready", function(){
		document.addEventListener("backbutton", onBackKeyDown, false);
		Cordova.exec(function(result){
			Global.userAccount = result.userName;
			Global.userToken = result.userToken;
			Global.userPwd = result.userPassword;
			Global.appID = result.appID;
			Global.deviceType = result.device;
			Global.longitude = result.longitude;
			Global.latitude = result.latitude;
//			Global.width = result.width;
//			Global.height = result.height;
//			Global.CMAAIOKey = result.CMAAIO;
			Global.pushFlag = result.pushFlag;
			Global.language = result.language == "中文" ? "zh-cn" : "en-us";
			initFn();
		}, null, "UserInfo", "GetUserInfo", []);
	}, false);
}
function initFn(){
	Ext.application({
	    name: 'CRP',

	    requires: [
            'Ext.MessageBox',
            'Ext.ProgressIndicator'
        ],	            
	    views: [
            'Main',
            'MainList',
            'News',
            'StockView',
            'Favorite',
            'FavoriteList',
            'NewsList',
	        'StockList'
	    ],
	    controllers: [
	        'Main',
	        'NewsCtr',
	        'NavController',
	        'StockCtr',
	        'Favorite'
	    ],
	    isIconPrecomposed: true,
	    launch: function() {
			mainCtr = this.getApplication().getController('Main');
			navCtr = this.getApplication().getController('NavController');
			newsCtr = this.getApplication().getController('NewsCtr');
			stockCtr = this.getApplication().getController('StockCtr');
			favoriteCtr = this.getApplication().getController('Favorite');
	    }
	});
}

function isGoogleChrome() {
	// ios
	if (Ext.os.is.iOS) {
		return false;
		// android
	} else if (Ext.os.is.Android) {
		return false;
	} else {
		return true;
	}
}