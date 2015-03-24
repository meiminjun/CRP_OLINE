/**
 * @description 公共方法控制器
 * @author duwei
 * @date 2014-01-17
 */

Ext.define('CRP.util.PubOperation', {

	singleton : true,

	requires : ['Ext.Toast'],
	/**
	 * @description 容器添加子项
	 * @param {}
	 *            id 显示面板编号
	 * @param {}
	 *            nameSpace 命名空间路径/别名
	 * @author duwei
	 * @date 2012-7-6
	 */
	viewPortAdd : function(nameSpace, xtypes) {
		var obj = Ext.create(nameSpace);
		if (undefined == obj) {
			Ext.Viewport.add({
				xtype : xtypes
			});
		}
	},
	/**
	 * @description 容器设置活动项
	 * @param {}
	 *            id 显示面板编号
	 * @param {}
	 *            jumpModel 跳转方式
	 * @author duwei
	 * @date 2012-7-6
	 */
	viewPortJump : function(nameSpace, jumpModel) {
		Ext.Viewport.animateActiveItem(Ext.create(nameSpace), jumpModel);
	},
	/**
	 * @description 默认跳转页面公共方法
	 * @param {}
	 *            id 显示面板编号
	 * @param {}
	 *            nameSpace 命名空间路径
	 * @param {}
	 *            jumpModel 跳转方式
	 * @author duwei
	 * @date 2012-7-6
	 */
	jump : function(id, nameSpace, jumpModel, historyFla) {
		var obj = Ext.getCmp(id);
		if (undefined == obj) {
			var newCard = Ext.Viewport.add({
				xtype : nameSpace
			});
			Ext.Viewport.animateActiveItem(newCard, jumpModel);
		} else {
			Ext.Viewport.animateActiveItem(obj, jumpModel);
		}
	},
	/**
	 * show loading
	 * loading居中或者loading at titlebar
	 */
	showLoadMask : function() {
		CRP.ux.CustomLoading.hide();
		CRP.ux.CustomLoading.show({
			message : arguments[0] == undefined ? Global.getLoadingMsg() : arguments[0],
			// position : 'center center',
			modal : arguments[1] == undefined ? false : arguments[1]
		});
//		var me=this,
//			msg = arguments[0] == undefined ? Global.getLoadingMsg() : arguments[0];
//		me.toast = Ext.toast({
//    		message : '<div class="maskTipsClsItemDiv"></div><div>'+msg+'</div>',
//    		timeout: 100000,
//    		centered : true,
//    		cls : 'maskTipsCls',
//    		hideAnimation : null,
//    		showAnimation : null
//    	});
	},
	/**
	 * hide loading
	 */
	hideLoadMask : function() {
//		var me = this;
//		me.toast.setTimeout(0);
		CRP.ux.CustomLoading.hide();
	},
	/**
	 * 显示提示语，2秒自动隐藏
	 * 
	 * @param{string} key 提示语关键字，类似'succeedMsg'/'failureMsg'
	 */
	showTips : function(key, type) {
//		CRP.ux.CustomLoading.hide();
//		CRP.ux.CustomLoading.showTip({
//			message : Global.getTipsMsg(key),
//			type : type,
//			showTipTime : 2,
//			callback : function() {
//				// Ext.Msg.alert('显示结束');
//			}
//		});
		//如果执行返回操作，必须延时在timeout总数之后执行
		Ext.Function.defer(function(){
			var msg = Global.getTipsMsg(key),
				maskCls = "";
			switch (type) {
				case "success":
					maskCls = "maskTipsSuccessDiv";
					break;
				case "failure":
					maskCls = "maskTipsFailureDiv";
					break;
				default:
					maskCls = "";
			}
			Ext.toast({
	    		message : '<div class="'+maskCls+'"></div><div>'+msg+'</div>',
	    		timeout:1000,
	    		centered : true,
	    		modal : false,
	    		cls : 'maskTipsCls',
	    		hideAnimation : null,
	    		showAnimation : null
	    	});
		},500);
	},
	/**
	 * 下拉列表显示
	 * 
	 * @param {}
	 *            id 下拉列表编号
	 */
	showSelect : function(id, nameSpace) {
		// 实例化下拉列表对象
		var selectField = Ext.getCmp(id);
		if (selectField == undefined) {
			Ext.Viewport.add({
				xtype : nameSpace
			});
		}
		Ext.getCmp(id).show();
	},
	/**
	 * 判断是否为PC谷歌游览器
	 */
	isGoogleChrome : function() {
		// ios
		if (Ext.os.is.iOS) {
			return false;
			// android
		} else if (Ext.os.is.Android) {
			return false;
		} else {
			return true;
		}
	},
	/**
	 * @description 调整 list height
	 * @param {}
	 *            _this 当前面板对象
	 * @param {}
	 *            size 要减去的高度
	 * @author duwei
	 * @create 2012-8-28
	 */
	resetListHeight : function(_this, size) {
		var height = Ext.Viewport.getSize().height;
		_this.setHeight(height - size);
	},
	/**
	 * 语言
	 */
	initLanguage : function() {
		if(this.isGoogleChrome()){
			CRP.ux.Manager.setConfig({
	            ajaxConfig : {
	                method : 'GET'
	            },
	            language   : 'en-us',
	            tpl        : 'locales/{locale}.json',
	            type       : 'ajax'
	        });
			Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
			CRP.ux.Manager.init();
	        
	    	// Destroy the #appLoadingIndicator element
	        Ext.fly('appLoadingIndicator').destroy();
	        // Initialize the main view
//	        Ext.Viewport.add(Ext.create('CRP.view.News'));
	        Ext.Viewport.add(Ext.create('CRP.view.Main'));
	        Ext.Function.defer(function(){
				// 推送入口
		    	if (Global.pushFlag == "1") {
					mainCtr.goToDetail(Global.pushCode);
		    	}
			},1000);
		}else{
			//获取语言缓存数据
			CRP.util.PubOperation.offlineAccess('CRPLanguage',null,function(result){
//				if(result == ''){
//	    			result = 'en-us';
//	    		}
	    		Global.language = 'en-us';
	    		CRP.ux.Manager.setConfig({
		            ajaxConfig : {
		                method : 'GET'
		            },
		            language   : 'en-us',
		            tpl        : 'locales/{locale}.json',
		            type       : 'ajax'
		        });

		        CRP.ux.Manager.init();
		        
		    	// Destroy the #appLoadingIndicator element
		        Ext.fly('appLoadingIndicator').destroy();
				// Initialize the main view
		        Ext.Viewport.add(Ext.create('CRP.view.Main'));
				
				// set datePicker monthNames
				if(result == 'zh-cn'){
					Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
				}else{
					Ext.Date.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
				}
				
				
				Ext.Function.defer(function(){
					try{
						// 推送入口
				    	if (Global.pushFlag == "1") {
				    		Cordova.exec(function(result) {
								Global.pushType = result.pushType;
								// pushType="iTell";
								// pushType="iTellInbox";
								Global.pushCode = result.pushCode;
								// pushCode="301065749";
								console.log("result.pushType:" + result.pushType);
								console.log("result.pushCode:" + result.pushCode);
								
                                var arr = result.pushCode.split('|');
							 		Global.CategoryId = arr[0];
                                var	attUrl = Global.domain+arr[1],
                                    physicalFileName = arr[2],                                   
                                    newsId = arr[3],
                                    categoryId = arr[0];
								mainCtr.goToDetail(attUrl,newsId,physicalFileName,categoryId);
	
							}, null, "UserInfo", "GetSettingInfo", []);
				    	}
					}catch(e){Ext.Logger.deprecate(e);}
				},1000);
			});
		}
	},
	/**
	 * 登录
	 */
	loginPub : function(callbackFn,isCheck){
		//ajaxFun login
		var url = Global.domain + '/api/IBuy21/GetJsonUserToken';
		var params = {
			adName : Global.userAccount
		};
		
		var resultFun = function(responseText) {
			var resJSON = Ext.JSON.decode(responseText);
			if(resJSON.Success){
				Global.userToken = resJSON.token;
				callbackFn(Global.userToken);
			}else{
				Ext.Function.defer(function(){CRP.util.PubOperation.showTips('failureMsg','failure');},500);
			}
        };
	
		var failureFun = function() {
			callbackFn(Global.userToken);
			Ext.Function.defer(function(){CRP.util.PubOperation.showTips('requestErrorMsg','failure');},2000);
		};
		// 调用ajax
		CRP.util.PubOperation.ajaxFun(url, params, resultFun, failureFun, true, false , 'login_CRP');	
	},
	/**
	 * Ajax数据加载
	 * 
	 * @param url
	 *            请求URL地址
	 * @param params
	 *            请求参数
	 * @param resultFun
	 *            ajax成功回调方法
	 * @param failureFun
	 *            ajax失败回调方法
	 * @param isCheck
	 *            是否检查网络
	 * @param loadFormCache
	 *            是否加载缓冲
	 * @param key
	 *            加载缓存的key
	 *            
	 * @desc  离线缓存： 首页商场image加载先请求网络，如果网络异常再加载缓存
	 *  				其他请求先加载缓存，再请求网络
	 * @param requestFun
	 * 			   请求方式
	 */
	ajaxFun : function(url, params, resultFun, failureFun, isCheck,loadFormCache, key,requestFun) {
		try {
			//离线缓存
			if(loadFormCache){
				CRP.util.PubOperation.offlineAccess(key,null,resultFun);
			}
			
			// 判断网络
			if (!CRP.util.PubOperation.checkConnectionStatus()) {
				if (isCheck == true) {
					CRP.util.PubOperation.showTips('nonetworkconnection', 'normal');
				}
				return;
			}
            
			// 设置请求参数
			var extraparams = this.pushExtraParams(params);
			if (key == 'checkReply') {
				// 检查编辑提示数据提交中
				CRP.util.PubOperation.showLoadMask(Global.getTipsMsg('submissionMsg'));
			} else {
				// default loading data
				CRP.util.PubOperation.showLoadMask();
			}
			
			Ext.Ajax.request({
				url : url,
				params : extraparams,
				method : requestFun,
				timeout : 50000,
				success : function(response, opts) {
					CRP.util.PubOperation.hideLoadMask();
					resultFun(response.responseText);
				},
				failure : function(response, opts) {
					CRP.util.PubOperation.hideLoadMask();
					failureFun(response.responseText);
				},
				callback : function(operation, success, response) {
					if (success) {
                        // 检查返回数据是否为空/请求成功返回错误信息处理
//						CRP.util.PubOperation.emptyDataOperation(null,response, success);
                        if(loadFormCache){
                        	CRP.util.PubOperation.onlineLoad(key,null,response.responseText);
                        }
                    }else{
                    	// 非abortAll提示
						if(operation.error && operation.error.status != -1){
							CRP.util.PubOperation.showTips('requestErrorMsg','failure');
						}
                    }
				}
			});
		} catch (e) {}
	},
	/**
	 * 公共列表加载方法
	 * 
	 * @param store
	 *            store数据代理
	 * @param params
	 *            数据请求参数
	 * @param isCheck
	 *            是否检查网络
	 * @param loadFormCache
	 *            是否加载换成
	 * @param key
	 *            key关键字
	 * @param callBackFun
	 *            回调方法
	 */
	pubListLoad : function(store, params, isCheck, loadFormCache, key, callBackFun) {
		try{
			var callBackFun = arguments[5];
			
			// 离线加载
			if(loadFormCache){
				CRP.util.PubOperation.offlineAccess(key,store);
			}
			// 判断网络
			if(!CRP.util.PubOperation.checkConnectionStatus()){
				if (isCheck == true) {
					CRP.util.PubOperation.showTips('nonetworkconnection','normal');
				}
				return;
			}
			CRP.util.PubOperation.showLoadMask();	//静态演示时取消loading
			// 设置请求参数
			var extraparams = this.pushExtraParams(params);
			store.getProxy().setExtraParams(extraparams);
			store.loadPage(1, {
				callback : function(record, operation, success) {
					CRP.util.PubOperation.hideLoadMask();
					var response = operation.getResponse();
					if(response){
						if(!response.responseText){
							response = {};
						}else{
							response = Ext.JSON.decode(response.responseText,true);	
						}						
					}

					if (success) {
						// 检查返回数据是否为空/请求成功返回错误信息处理
						//CRP.util.PubOperation.emptyDataOperation(record,operation.getResponse(), success);
					} else {
						// 非abortAll提示
						if(operation.error && operation.error.status != -1){
							CRP.util.PubOperation.showTips('requestErrorMsg','failure');
						}
					}
					if(callBackFun != undefined){callBackFun(response);}
				},
				scope : this
			});
		}catch (e) {}
	},
	/**
	 * 公共列表刷新方法
	 * 
	 * @param store
	 *            store数据代理
	 * @param params
	 *            数据请求参数
	 * @param isCheck
	 *            是否检查网络
	 * @param loadFormCache
	 *            是否加载换成
	 * @param key
	 *            key关键字
	 */
	pubListRefresh : function(store, params, isCheck, loadFormCache, key) {
		try{
			// 离线加载
			if(loadFormCache){
				CRP.util.PubOperation.offlineAccess(key,store);
			}
			// 判断网络
			if(!CRP.util.PubOperation.checkConnectionStatus()){
//				if (isCheck === true) {
//					CRP.util.PubOperation.showTips('nonetworkconnection','normal');
//				}
				return;
			}
			CRP.util.PubOperation.showLoadMask();
			// 缓存List参数需重新设置
			if (params) {
				var extraparams = this.pushExtraParams(params);
//				store.getProxy().setExtraParams(extraparams);
				store.setParams(extraparams);
				// refresh自动获取参数
				store.loadPage(1, {
					callback : function(record, operation, success) {
						CRP.util.PubOperation.hideLoadMask();
						if (success) {
							// 检查返回数据是否为空/请求成功返回错误信息处理
							CRP.util.PubOperation.emptyDataOperation(record,
									operation.getResponse(), success);
						}else{
							CRP.util.PubOperation.showTips('requestErrorMsg',
							'failure');
						}
					},
					scope : this
				});
			}
		}catch (e) {Ext.Logger.deprecate(e);}
	},
	/**
	 * store porxy jsonp动态添加用户参数
	 * 
	 * @param {}
	 *            params 请求参数对象
	 */
	pushExtraParams : function(params) {
		params.ADAccount = Global.userAccount;
		params.token = Global.userToken;
		params.language = Global.language;
		return params;
	},
	/**
	 * 检查网络
	 * 
	 * @returns {Boolean}
	 */
	checkConnectionStatus : function() {
		// verification ios or android is
		if (!this.isGoogleChrome()) {
			var connectionType = PhoneGapAPI.checkConnection();
			// check connection
			if (connectionType == 'Unknownconnection'
					|| connectionType == 'Nonetworkconnection') {
//				CRP.util.PubOperation.showTips('nonetworkconnection',
//						"normal");
				return false;
			}
		}

		return true;
	},
	/**
	 * list请求成功（返回错误信息/空数据）
	 * 
	 * @param {}
	 *            record
	 * @param {}
	 *            responseObj
	 * @param {}
	 *            success
	 */
	emptyDataOperation : function(record, responseObj, success) {
		// if(operation.isComplete())
		if (success) {
			var response = Ext.JSON.decode(responseObj.responseText);
			if (!response.Success) {
				if (response.ErrorCode == -1) {
					CRP.util.PubOperation.showTips('abnormalMsg', 'failure');
				} else if (response.ErrorCode == -2) {
					CRP.util.PubOperation.showTips('paramsMsg', 'failure');
				} else if (response.ErrorCode == -3) {
					CRP.util.PubOperation.showTips('systemErrorMsg',
							'failure');
				} else if (response.ErrorCode == -4) {
					CRP.util.PubOperation.showTips('permissionsMsg',
							'failure');
				} else if(response.ErrorCode == -8) {
					CRP.util.PubOperation.showTips('projectStatusMsg',
					'failure');
				}
			} else {
//				var response = Ext.JSON.decode(responseObj.responseText),record = response.rows;
//				if (!record){
//					CRP.util.PubOperation.showTips('emptyDataMsg', "normal");
//				}else {
//					if(record.length == 0){
//						CRP.util.PubOperation.showTips('emptyDataMsg', "normal");
//					}
//				} 
			}
		} else {
			CRP.util.PubOperation.showTips('requestErrorMsg', 'failure');
		}
	},
	/**
	 * 获取当前年月
	 */
	getCurrentMonthYear : function() {
		var myDate = new Date();
		return Ext.Date.format(myDate, 'Y-m');
	},
	/**
	 * 获取当前年月日
	 */
	getCurrentDate : function() {
		var myDate = new Date();
		return Ext.Date.format(myDate, 'Y-m-d');
	},
	/**
	 * 获取当前年月日时分 Y-m-d H:i
	 */
	getCurrentTime : function() {
		var myDate = new Date();
		return Ext.Date.format(myDate, 'Y-m-d H:i');
	},
	/**
	 * 日期格式转换 中文日期/英文日期
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dateFormatFun : function(date, format) {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var text = "",dateTime = new Date(Date.parse(date));
        if(Global.language == 'zh-cn'){
            text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日";
        }else{
            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear();
        }
        return text;
	},
	/**
	 * 日期格式转换 中文日期/英文日期
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dateFormatMdFun : function(date, format) {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var text = "",dateTime = new Date(Date.parse(date));
        if(Global.language == 'zh-cn'){
//            text = (dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日";
        	text = (dateTime.getMonth()+1)+"-"+dateTime.getDate();
        }else{
            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate();
        }
        return text;
	},
	/**
	 * 日期格式转换 中文日期/英文日期
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	pullRefreshDataFormat : function() {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        var text = "",dateTime = new Date();
        if(Global.language == 'zh-cn'){
            text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日"+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes())+":"+(dateTime.getSeconds()>9?dateTime.getSeconds():'0'+dateTime.getSeconds());
        }else{
            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear()+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes())+":"+(dateTime.getSeconds()>9?dateTime.getSeconds():'0'+dateTime.getSeconds());
        }
        return text;
	},
	/**
	 * 格式化日期
	 * 
	 * @param {}
	 * 
	 * @return {}
	 */
	pD : function(s) {
		var dt = s.split(/ /);
		var d = dt[0].split(/-/);
		var t;
		if (dt[1]) {
			t = dt[1].split(/:/);
			t.push(0);
			t.push(0);
		} else {
			t = [ 0, 0, 0 ];
		}
		return new Date(d[0], d[1] - 1, d[2], t[0], t[1], t[2]);
	},
	/**
	 * 日期转换成整数
	 * 
	 * @param {}
	 *            d
	 * @return {}
	 */
	pS : function(d) {
		var Y = d.getFullYear();
		var M = d.getMonth() + 1;
		(M < 10) && (M = '0' + M);
		var D = d.getDate();
		(D < 10) && (D = '0' + D);
		var h = d.getHours();
		(h < 10) && (h = '0' + h);
		var m = d.getMinutes();
		(m < 10) && (m = '0' + m);
		var s = d.getSeconds();
		(s < 10) && (s = '0' + s);
		return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
	},
	/**
	 * 根据key获取指定json里面的值
	 * 
	 * @param {}
	 *            key
	 * @param {}
	 *            json
	 * @return {}
	 */
	JSONForKey : function(key, json) {
		// 转换成json对象
		var jsonObj = Ext.JSON.decode(json);
		return jsonObj[key];
	},
	/**
	 * 日期格式转换 中文日期/英文日期（年月日）
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dateFormatFun : function(date, format) {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		if (date == "0001/1/1 0:00:00" || date == '') {
			return '';
		}else{
			var text = "",dateTime = new Date(Date.parse(date));
			if(Global.language == 'zh-cn'){
				text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日";
			}else{
				text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear();
			}
			return text;
		}
	},
	/**
	 * 日期格式转换 中文日期/英文日期（年月日时分）
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dateFormatHMFun : function(date, format) {
		var monthArray = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		if (date == "0001/1/1 0:00:00" || date == '') {
			return '';
		}else{
			var text = "",dateTime = new Date(Date.parse(date));
		    if(Global.language == 'zh-cn'){
	            text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日"+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
	        }else{
	            text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear()+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
	        }
			return text;
		}
	},
	/**
	 * 日期格式转换
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dataFormatLogogram : function(date, format) {
		var now = new Date(), monthArray = [ "Jan", "Feb", "Mar", "Apr", "May",
				"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		if (date == "0001/1/1 0:00:00" || date == '') {
			return '';
		} else {
			 var day = (new Date()).getDate(),month = (new Date()).getMonth(),year = (new Date()).getFullYear(),
			 	 today = new Date(year + '/' + (month+1) + '/' + day + ' 00:00:00'),
			 	 serverDate = new Date(Date.parse(date)),
	    		 dt = parseFloat((now - serverDate) / 3600000).toFixed(2);
	            
//	    		console.log('today: '+ today);
//	    		console.log('serverDate: '+serverDate);
//	    		console.log('dt:' + dt);
//	    		console.log(today >= serverDate);
	            if(today < serverDate){
	            	if (dt > 2 && dt < 24) {
	    				return parseInt(dt) + ' ' + Global.getTipsMsg('hours');
	    			} else if (dt > 1 && dt < 2) {
	    				return parseInt(dt) + ' ' + Global.getTipsMsg('hour');
	    			} else {
	    				var time = parseInt(dt * 60) > 0 ? parseInt(dt * 60) : 0;
	    				return time + ' ' + Global.getTipsMsg('minute');
	    			}
	            }else{
	            	var text = "";
 	                if(Global.language == 'zh-cn'){
 	                    text = serverDate.getFullYear()+"年"+(serverDate.getMonth()+1)+"月"+serverDate.getDate()+"日"+" "+(serverDate.getHours()>9?serverDate.getHours():'0'+serverDate.getHours())+":"+(serverDate.getMinutes()>9?serverDate.getMinutes():'0'+serverDate.getMinutes());
 	                }else{
 	                    text = monthArray[serverDate.getMonth()]+" "+serverDate.getDate()+" "+serverDate.getFullYear()+" "+(serverDate.getHours()>9?serverDate.getHours():'0'+serverDate.getHours())+":"+(serverDate.getMinutes()>9?serverDate.getMinutes():'0'+serverDate.getMinutes());
 	                }
 	                return text;
	            }
	            
//			var dateTime = new Date(Date.parse(date));
//			var dt = parseFloat((now - dateTime) / 3600000).toFixed(2);
//
//			if (dt >= 24) {
//				var currentTime = parseInt(dt/24);
//	            if(currentTime<=1){
//	                return currentTime + Global.getTipsMsg('day') + " "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	            }
//	            else if(currentTime<=7 && currentTime>1){
//	                return currentTime + Global.getTipsMsg('days') + " " + (dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	            }else{
//	                var text = "";
//	                if(Global.language == 'zh-cn'){
//	                    text = dateTime.getFullYear()+"年"+(dateTime.getMonth()+1)+"月"+dateTime.getDate()+"日"+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	                }else{
//	                    text = monthArray[dateTime.getMonth()]+" "+dateTime.getDate()+" "+dateTime.getFullYear()+" "+(dateTime.getHours()>9?dateTime.getHours():'0'+dateTime.getHours())+":"+(dateTime.getMinutes()>9?dateTime.getMinutes():'0'+dateTime.getMinutes());
//	                }
//	                return text;
//	            }
//			} else if (dt > 2 && dt < 24) {
//				return parseInt(dt) + Global.getTipsMsg('hours');
//			} else if (dt > 1 && dt < 2) {
//				return parseInt(dt) + Global.getTipsMsg('hour');
//			} else {
//				var time = parseInt(dt * 60) > 0 ? parseInt(dt * 60) : 0;
//				return time + Global.getTipsMsg('minute');
//			}
		}
	},
	/**
	 * 日期格式转换，事件差為天和月
	 * 
	 * @param {}
	 *            time 日期
	 * @param {}
	 *            format 日期格式
	 * @return {}
	 */
	dataFormatLogogram2 : function(date, format) {
		var now = new Date(), monthArray = [ "Jan", "Feb", "Mar", "Apr", "May",
				"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		if (date == "0001/1/1 0:00:00" || Ext.isEmpty(date)) {
			return '';
		} else {
//			 var day = (new Date()).getDate(),month = (new Date()).getMonth(),year = (new Date()).getFullYear(),
//			 	 today = new Date(year + '/' + (month+1) + '/' + day + ' 00:00:00'),
//			 	 localDate = new Date(Date.parse(date)),
//	    		 dt = parseFloat((now - localDate) / 3600000).toFixed(2);
//	            
//			    		console.log('today: '+ today);
//			    		console.log('localDate: '+localDate);
//			    		console.log('dt:' + dt);
//			    		console.log(today >= localDate);
//	            if(today < localDate){
//    				return parseInt(dt) + ' ' + Global.getTipsMsg('hours');
    				
//    				return (today.getTime()-localDate.getTime())/24/60/60/1000;
//	            }
	            
				var localDate = new Date(Date.parse(date));
				var dt = parseFloat((now - localDate) / 3600000).toFixed(2);
				if (dt >= 24) {
					var currentTime = parseInt(dt/24);
					if(currentTime >= 30){
						var monthCnt = parseInt(currentTime/30);
						if(monthCnt >= 12){
							var yearCnt = parseInt(monthCnt/12);
							if(yearCnt <= 1){
								return yearCnt + Global.getTipsMsg('year');
							}else{
								return yearCnt + Global.getTipsMsg('years');
							}
						}else if(monthCnt > 1 && monthCnt < 12){
							return monthCnt + Global.getTipsMsg('months');
						}else if(monthCnt <=1 ){
							return monthCnt + Global.getTipsMsg('month');
						}
					}else if(currentTime > 1 && currentTime < 30){
						return currentTime + Global.getTipsMsg('days');
					}else if(currentTime <=1){
						return currentTime + Global.getTipsMsg('day');
					}
				}else{
 	                return 'Today';
				}
		}
	},
	/**
	 * 计算两个日期的间隔天数
	 * 
	 * @param {}
	 *            sDate1
	 * @param {}
	 *            sDate2
	 */
	computation : function(sDate1, sDate2) {
		var aDate, oDate1, oDate2, iDays, s1, s2;
		aDate = sDate1.split("-");
		s1 = aDate[1] + '-' + aDate[2] + '-' + aDate[0];
		oDate1 = new Date(s1.replace(/-/g, "/"));
		aDate = sDate2.split("-");
		s2 = aDate[1] + '-' + aDate[2] + '-' + aDate[0];
		oDate2 = new Date(s2.replace(/-/g, "/"));

		var days = oDate2.getTime() - oDate1.getTime();
		iDays = parseInt(days / (1000 * 60 * 60 * 24));
		return iDays;
	},
	/**
	 * 获取年月日（前一个月）
	 */
	getOneMonthBeforeDate : function() {
		var myDate = new Date();
		var currentyear = myDate.getFullYear();
		var onemonthbefore = myDate.getMonth();

		if (onemonthbefore == 0) {
			currentyear = currentyear - 1;
			onemonthbefore = 12;
		}

		// 获取当月当天
		var currentDay = myDate.getDate();
		// 获取前一个月总天数
		var lastday = this.getLastDay(currentyear, onemonthbefore);
		// 如果当月当天大于上月总天数则显示上月总天数，否则显示当月当天
		if (currentDay > lastday) {
			lastday = lastday;
		} else {
			lastday = currentDay;
		}

		if (onemonthbefore < 10) {
			onemonthbefore = "0" + onemonthbefore;
		}
		if (lastday < 10) {
			lastday = "0" + lastday;
		}
		var date = currentyear + '-' + onemonthbefore + '-' + lastday;
		return date;
	},
	/**
	 * 获取年月（前一个月）
	 */
	getOneMonthBefore : function() {
		var myDate = new Date();
		var currentyear = myDate.getFullYear();
		var onemonthbefore = myDate.getMonth();
		if (onemonthbefore < 10) {
			onemonthbefore = "0" + onemonthbefore;
		}
		var date = currentyear + '-' + onemonthbefore;
		return date;
	},
	/**
	 * 获取指定月份最后一天（本月总天数）
	 * 
	 * @param {}
	 *            year
	 * @param {}
	 *            month
	 * @return {}
	 */
	getLastDay : function(year, month) {
		// 取当前的年份
		var new_year = year;
		// 取下一个月的第一天，方便计算（最后一天不固定）
		var new_month = month++;
		// 如果当前大于12月，则年份转到下一年
		if (month > 12) {
			// 月份减
			new_month -= 12;
			// 年份增
			new_year++;
		}
		// 取当年当月中的第一天
		var newnew_date = new Date(new_year, new_month, 1);
		// 获取当月最后一天日期
		return (new Date(newnew_date.getTime() - 1000 * 60 * 60 * 24))
				.getDate();
	},
	/**
	 * 阻止事件冒泡
	 * 
	 * @param {}
	 *            e
	 */
	cancelBubble : function(e) {
		if (e && e.stopPropagation)
			e.stopPropagation();
		else
			window.event.cancelBubble = true;
	},
	/**
	 * array删除指定元素
	 * 
	 * @param {}
	 *            arr
	 * @param {}
	 *            index
	 * @return {}
	 */
	removeAtArr : function(arr, index) {
		return arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
	},
	/**
	 * 清空邮件详情tpl
	 * 
	 * @param {}
	 *            panelId 要清空的面板项ID
	 */
	clearMailInfoPanel : function(panelId) {
		var infoData = {};
		var infoPanel = Ext.getCmp(panelId);
		var infoTpl = noDataSourceTpl;
		infoTpl.overwrite(infoPanel.id, infoData);
	},
	/**
	 * 加载数据前清空面板项
	 * 
	 * @param {}
	 *            panelId 要清空的面板项ID
	 */
	clearInfoPanel : function(panelId) {
		var infoData = {};
		var infoPanel = Ext.getCmp(panelId);
		var infoTpl = infoPanel.getItemTpl();
		infoTpl.overwrite(infoPanel.id, infoData);
	},
	/**
	 * 打开附件
	 */
	attsFileOpen : function(src) {
		// android
		if (Ext.os.is.Android) {
			CRP.util.PubOperation.maskMessage('附件加载中，请稍候...');
			CRP.util.PhoneGapAPI.downloadFileForAndroid(src, {
				overwrite : false,
				open : true
			}, function(res) {
			}, function(error) {
				phoneGapAPI.showAlert(error, '提示', '确定');
			});
			// ios
		} else if (Ext.os.is.iOS) {
			var nativePluginResultHandler = function(result) {
				phoneGapAPI.showAlert(result, '提示', '确定');
			};
			var nativePluginErrorHandler = function(error) {
				phoneGapAPI.showAlert(error, '提示', '确定');
			};
			CRP.util.PhoneGapAPI.downloadFileForIOS(
					nativePluginResultHandler, nativePluginErrorHandler, src);
		}
	},
	/**
	 * 金额转换千分位
	 */
	convert : function(money) {
		// 获取小数型数据
		var s = money;
		s += "";
		// 如果没有小数点，在后面补个小数点和0
		if (s.indexOf(".") == -1)
			s += ".0";
		// 正则判断
		if (/\.\d$/.test(s))
			s += "0";
		// 符合条件则进行替换
		while (/\d{4}(\.|,)/.test(s))
			// 每隔3位添加一个
			s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2");
		return s;
	},
	/**
	 * 保留两位小数点（四舍五入）
	 * 
	 * @param x
	 * @returns
	 */
	toDecimal : function(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return false;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		return this.convert(s);
	},
	/**
	 * 字符串替换所有
	 * 
	 * @param{} str
	 * @param{} oldstr
	 * @param{} newstr
	 */
	replaceAll : function(str, oldstr, newstr) {
		var ret = str;
		while (ret.indexOf(oldstr) != -1) {
			ret = ret.replace(oldstr, newstr);
		}
		return ret;
	},
	/**
	 * 预览相册
	 * 
	 * @params {string} url
	 */
	openImage : function(url) {
		if (Ext.os.is.Android) {
			CRP.util.PhoneGapAPI.openImageForAndroid(url, {
				overwrite : false,
				open : true
			}, function(res) {
			}, function(error) {
			});
		} else if (Ext.os.is.iOS) {
			CRP.util.PhoneGapAPI.openImageForIOS(function() {
			}, function() {
			}, url);
		}
	},
	/**
	 * 离线访问： 离线状态时（没有可用网络访问），从CMA AIO 中获取请求缓存的响应
	 * 
	 * @params {string} key 缓存关键字，唯一 返回本地缓存内容
	 * @params {obj} store
	 * @params {obj} resultFun ajaxfun callback
	 */
	offlineAccess : function(key,store,resultFun) {
		var resultFun = arguments[2];
		if (this.isGoogleChrome()) {
			var offlineLocalStore = Ext.getStore("OfflineLocalStore");
			offlineLocalStore.load();
			var record = offlineLocalStore.findRecord("cacheItem", key);
			if(resultFun == undefined){
				// list
				if (record != null) {
					var obj = Ext.JSON.decode(record.get('resTxt'));
					// 股票json节点在其他接口部分不是
					if(key == "stockList") {
						if(obj && obj.rows){
                			var store1 = Ext.create('Ext.data.TreeStore', {
						         model: 'CRP.model.StockModel',
						         defaultRootProperty: 'rows',
						         root: obj
					      	});
					      	stockCtr.getStockList().setStore(store1);
					      	stockCtr.getStockList().doIndexExpand(0);
					      	store1.load();
					      	return;
                    	}else{
                    		stockCtr.getStockList().setStore(null);
                    	}			
					}
					if(obj && obj.rows){
						store.setData(obj.rows);
					}else{
						store.setData(null);
					}
				}else{
                    store.setData(null);
                }
			}else{
				// ajaxfun缓存
				if (record != null) {
                    resultFun(record.get('resTxt'));
                }else{
                    resultFun('');
                }
			}
		} else {
			var callback = function(result){
//				console.log("callback-result:"+typeof result +','+result);
				// 缓存获取并且缓存不为空
//              console.log("======result:==="+(result != null && result != ''));
				
				if(resultFun == undefined){
					// list
                    if ( result != '(null)' && result != '') { 
                    	var obj = Ext.JSON.decode(result);
                        // 股票json节点在其他接口部分不是
						if(key == "stockList") {
							if(obj && obj.rows){
	                			var store1 = Ext.create('Ext.data.TreeStore', {
							         model: 'CRP.model.StockModel',
							         defaultRootProperty: 'rows',
							         root: obj
						      	});
						      	stockCtr.getStockList().setStore(store1);
						      	stockCtr.getStockList().doIndexExpand(0);
						      	store1.load();
						      	return;
	                    	}else{
	                    		stockCtr.getStockList().setStore(null);
	                    	}			
						}
						if(obj && obj.rows){
							store.setData(obj.rows);
						}else{
							store.setData(null);
						}
                    }else{
//                          console.log("NO======");
                        store.setData(null);
                    }
				}else{
					// ajaxfun缓存
                    if ( result != '(null)' && result != '') {
//                          console.log("ajaxfun ok");
                        resultFun(result);
                    }else{
//                          console.log("ajaxfun NO======");
                        resultFun('');
                    }
				}
			};
			PhoneGapAPI.GetCacheInfo(key,callback);
		}
	},
	/**
	 * 在线加载： 在线状态时，在Local storage 中缓存的请求响应内容
	 * 
	 * @params {string} key 缓存关键字，唯一
	 * @params {string} response 响应的内容
	 * 
	 */
	onlineLoad : function(key, response) {
		var resTxt = '';
		if(arguments[2] == undefined){
			//　list缓存
			resTxt = response.responseText;
		}else{
			// 项目详情和项目附录ajaxfun手动缓存
			resTxt = arguments[2];
		}
		if (this.isGoogleChrome()) {
			var offlineLocalStore = Ext.getStore("OfflineLocalStore");
			// loads any existing data from localStorage
			offlineLocalStore.load();
			var record = offlineLocalStore.findRecord("cacheItem", key);
			if (record == null) {
				offlineLocalStore.add({
					cacheItem : key,
					cacheDate : new Date(),
					resTxt : resTxt
				});
			} else {
				// 只有在数据变动情况下才更新换成数据
				if (record.get('resTxt') != resTxt) {
					record.set('cacheDate', new Date());
					record.set('resTxt', resTxt);
				}
			}
			offlineLocalStore.sync();
		} else {
			PhoneGapAPI.WriteCacheInfo(key, resTxt);
		}
	},
	/**
	 * 项目计划定义actionSheet
	 * 
	 * @params{} title
	 */
	getCheckPointSheet : function(title) {
		if (!this.checkPointActionSheet) {
			this.checkPointActionSheet = Ext.widget('checkPointActionSheet');
		}
		var checkPointActionSheet = this.checkPointActionSheet;
		Ext.Viewport.add(checkPointActionSheet);

		checkPointActionSheet.show();

		// 先清空页面的控件，然后再根据不同角色追加
		checkPointActionSheet.removeAll(true, true);
		if(Global.checkReplyItems == ''){
			if (Global.localUserRole == 'pm') {
				checkPointActionSheet.add([ {
					xtype : 'panel',
					margin : 'auto auto 2em auto',
					style : 'text-align:center;color:white;word-break:break-word',
					html : title
				}, {
					name : '01',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.oK'
					}
				}, {
					name : '03',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.PMalternativeAccepted'
					}
				}, {
					name : '04',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.nA'
					}
				}, {
					ui : 'normal',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.cancel'
					},
					handler : function() {
						this.up('actionsheet').hide();
					}
				} ]);
			} else if (Global.localUserRole == 'dm') {
				checkPointActionSheet.add([ {
					xtype : 'panel',
					margin : 'auto auto 2em auto',
					style : 'text-align:center;color:white;word-break:break-word',
					html : title
				}, {
					name : '01',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.oK'
					}
				}, {
					name : '02',
					ui : 'decline',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.notOK'
					}
				}, {
					name : '03',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.DMalternativeAccepted'
					}
				}, {
					name : '04',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.nA'
					}
				}, {
					ui : 'normal',
					cls : 'actionsheetBtn',
					locales : {
						html : 'actionSheet.cancel'
					},
					handler : function() {
						this.up('actionsheet').hide();
					}
				} ]);
			}	
		}else{
			checkPointActionSheet.add([ {
				xtype : 'panel',
				margin : 'auto auto 2em auto',
				style : 'text-align:center;color:white;word-break:break-word',
				html : title
			}, {
				name : '01',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.oK'
				}
			}, {
				name : '02',
				ui : 'decline',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.notOK'
				}
			}, {
				name : '04',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.nA'
				}
			}, {
				ui : 'normal',
				cls : 'actionsheetBtn',
				locales : {
					html : 'actionSheet.cancel'
				},
				handler : function() {
					this.up('actionsheet').hide();
				}
			} ]);
		}
	},
	/**
     * 删除给定数组中的指定元素
     * @param array
     * @param index
     */
    removeArrayItem:function(arr,index){
         return arr.slice(0,index).concat(arr.slice(index+1,arr.length));
    },
	/**
	 * ajax请求数据更新列表置空处理函数
	 * #维保清单详情检查历史
	 * #维保详情成功回调更新清单列表和历史列表
	 * 
	 * @param list
	 * @param store
	 */
	listEmptyOperationFn : function(list,store){
		store.add({
			hasData : true
		});
		
		var ckPointHisEl = list.element.down('center[name=ckPointHisCt]');
		Ext.Function.defer(function(){
			if(ckPointHisEl){ckPointHisEl.dom.innerHTML = Global.getTipsMsg("ungebetenEmptyMsg");}
		},100);
	},
	/**
	 * url转base64
	 * @param url
	 * @param callback
	 * @param outputFormat
	 */
	convertImgToBase64 : function(url, callback, outputFormat){
	    var canvas = document.createElement('CANVAS'),
	        ctx = canvas.getContext('2d'),
	        img = new Image;
	    img.crossOrigin = 'Anonymous';
	    img.onload = function(){
	        canvas.height = img.height;
	        canvas.width = img.width;
	        ctx.drawImage(img,0,0);
	        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	        callback.call(this, dataURL);
	        canvas = null; 
	    };
	    img.src = url;
	}
});
