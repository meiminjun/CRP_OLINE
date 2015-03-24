/**
 * phoneGap js with native api
 * 
 * @author duwei
 * @date 2014-01-17
 */

// Call onDeviceReady when Cordova is loaded.
//
// At this point, the document has loaded but cordova-2.5.0.js has not.
// When Cordova is loaded and talking with the native device,
// it will call the event `deviceready`.
//
/**
 * android返回键处理
 * 
 * @author duwei
 * @date 2013-10-09
 */
function onBackKeyDown() {
	
/*	var indexNav = mainCtr.getIndexNav();
	
	if (indexNav) {
		// navigationView parent
		if (indexNav.getInnerItems().length > 1) {
			mainCtr.navigationViewBack();
		} else {
			PhoneGapAPI.exit();
		}
	} else {
		PhoneGapAPI.exit();
	}*/
	if(!navCtr.popToPrev()){
		PhoneGapAPI.exit();
	}
}

var PhoneGapAPI = {
	/**
	 * 退出程序
	 */
	exit : function() {
		Cordova.exec(null, null, "Application", "exit", [ Global.inboxUnreadCnt, -1, "no", Global.appID ]);
		// 此处加上退出App的逻辑 ， 待API提供中
		// window.localStorage.clear();
	},
	/**
	 * 获取登录用户信息
	 * @param callback
	 */
	getLoginUserInfo : function(callback) {
//		Cordova.exec(function(result){
//			Global.userAccount = result.userName;
////			Global.userToken = result.userToken;
//			Global.userPwd = result.userPassword;
//			Global.appID = result.appID;
//			Global.deviceType = result.device;
//			Global.longitude = result.longitude;
//			Global.latitude = result.latitude;
//			Global.width = result.width;
//			Global.height = result.height;
//			Global.pushFlag = result.pushFlag;
//
//			
//			Global.CMAAIOKey = result.CMAAIO;
//			// callback fun
//			callback();
//		}, null, "UserInfo", "GetUserInfo", []);
	},
	/**
	 * 检测网络状态
	 */
	checkConnection : function(){
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN] = 'Unknownconnection';
		states[Connection.ETHERNET] = 'Ethernetconnection';
		states[Connection.WIFI] = 'WiFiconnection';
		states[Connection.CELL_2G] = 'Cell2Gconnection';
		states[Connection.CELL_3G] = 'Cell3Gconnection';
		states[Connection.CELL_4G] = 'Cell4Gconnection';
		states[Connection.NONE] = 'Nonetworkconnection';

		return states[networkState];
	},
	/**
	 * 存储缓存
	 * @param key
	 * @param val
	 */
	WriteCacheInfo : function(key,val){
//		return null;
		Cordova.exec(function(result){
//			 alert('写入缓存成功'+val);
			 console.log("写入本地缓存成功:" + (new Date()).getTime());
		},null,"UserInfo", "WriteApplicationCacheInfo",[key,val,'CRP']);
	},
	/**
	 * 获取缓存
	 * @param key
	 */
	GetCacheInfo : function(key,callback){
//		var str = "{\"result\":true,\"ErrorCode\":\"0\",\"rows\":[{\"TypeName\":\"M & E\",\"TypeCode\":\"Mod_CS\",\"TypeDescription\":\"Mechanical & Electrical\"},{\"TypeName\":\"C & S\",\"TypeCode\":\"Mod1\",\"TypeDescription\":\"Civil & Structure\"},{\"TypeName\":\"TestNewTemplate\",\"TypeCode\":\"58820f97-0d35-4447-bc1f-76ebc736ab33\",\"TypeDescription\":\"TestNewTemplate\"},{\"TypeName\":\"测试测试测试测\",\"TypeCode\":\"14b6302c-43c0-4abf-b6e5-187155cb6604\",\"TypeDescription\":\"测试测试测试测试测试\"}]}";
//		callback(str);
		Cordova.exec(function(result){
//			alert('获取缓存成功'+result);
			console.log("获取本地缓存成功:" + (new Date()).getTime());
			callback(result);
		},null,"UserInfo", "GetApplicationCacheInfo",[key,'CRP']);
	},
	/**
	 * 批注页面
	 * @param base64Img base64格式
	 * @param callback
	 */
	getPostilImg : function(base64Img,callback){
		if(Ext.os.is.Android){
			Cordova.exec(function(result){
				console.log("进入批注成功:" + (new Date()).getTime());
				callback(result);
			},null,"UserInfo", "GetPostilImage",[base64Img,'CRP']);
		}else{
			Cordova.exec(function(result){
				console.log("进入批注成功:" + (new Date()).getTime());
				callback(result);
			},null,"DoodleImage", "doodleImage",[base64Img,'CRP']);
		}
	},
	/**
	 * 附件预览
	 * @param url
	 * @param newsId
	 */
	checkAtt : function(url,newsId) {
		// android
		if (Ext.os.is.Android) {
		 	Cordova.exec(function(result) {
		 		newsCtr.readNewFun(newsId); //成功后提交给后台
		 	}, function(fail) {}, "UserInfo", "openUrl", [url]);
		}else if (Ext.os.is.iOS) {
			window.open(url,arguments[2]);
			newsCtr.readNewFun(newsId); //成功后提交给后台
		}
	},
	/**
	 * 发送邮件
	 * @param email
	 * @param title
	 * */
	sendMail : function(email,title){
		Cordova.exec(function(result){
		},function(fail) {
		},"Auth","SendMail",[email,title]);

	},
	/**
	 * 分享
	 * @param {string} title
	 * @param {string} physicalFileName
	 * @param {string} attachmentName
	 */
	share:function(title,physicalFileName,attachmentName) {
		Cordova.exec(function(result) {
		},function(fail) {
		},"Auth","Share",[title,physicalFileName,attachmentName]);
	},
	/**
	 * 下载PDF
	 * @param {String} url 
	 * @Param {String} physicalFileName
	 * @param callback
	 * @result 0：失败， 1：成功
	 */
	downLoadPDF:function(url,physicalFileName,callback) {
		Cordova.exec(function(result) {
			callback(result);
		},function(fail) {
			alert("downLoadPDF原生错误");
		},"Auth","DownLoadPDF",[url,physicalFileName]);
	},
	/**
	 * 新闻列表刷新时获取下载完成的PDF对应的itemID集合
	 * @param physicalFileArr
	 * @param callback
	 * @result 文件名array 
	 */
	getDLPDFComplete:function(callback){
		Cordova.exec(function(result) {
			callback(result);
		},function(fail) {
			alert("getDLPDFComplete原生错误");
		},"Auth","GetDLPDFComplete",[]);
	}
};