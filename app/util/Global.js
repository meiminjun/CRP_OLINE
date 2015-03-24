/*
// * @class iTenants.util.Global
 * @desc Tour Global
 */
var navCtr,mainCtr,fileUploadCtr;
var sprite, list = [], old1 = [0, 0], old2 = [0, 0];
var Global = {
	/*
	 * _globleParam_countryCode :全局变量 ，记录检查项编码 _globleParam_checkItemCode :全局变量
	 * ，记录检查项编码 _globleParam_floorName :全局变量 ，记录检查点编码 _globleParam_pointCode
	 * :全局变量 ，记录检查点编码 _globleParam_pointName :全局变量 ，记录检查点名称
	 * _globleParam_marketCode :全局变量 ，记录商场ID _globleParam_userName :
	 * 全局变量，记录用户账户名 _globleParam_userToken : 全局变量，记录Token值
	 * _globleParam_checkPointType :
	 * 用于在用户在checkpointview上点击不同的按钮时，取哪一个localstorage的值 _globleParam_telephone :
	 * 商场经理的电话 _globleParam_numberCode : _globleParam_floorCode : 楼层编码
	 * 
	 */
	userAccount : "huangcheng1",
	userToken : "",
//	userToken : "Mko7ozRPLsDmiFqJi7bUnNEkWUUV5wnaz%2fygR%2fWlpWE0fAWZXvTLYQChnRC6He3NaIiQLg1OnJYXVpu7qp%2fewneuLv%2bwoOyt%2fzozPiS%2frFJfGrCNVvNuqAlxgXB2lG0Kfgvh9%2fIHL3M5WBI4KdOP2KrVcKUK2sxRW2gzDC9UnhihmPLcNdXhsRyiUN2IXMLYTreaaS9LdPp6MFPYPS3fkSYIaIiu5ghC8rAfB8Av1bjge%2buh8B8g4QTUEyx%2fTygJvdYNJ4JB%2fqJ21s5h5RXuOlj%2fHVyEDvdiFps0Q%2bZtvyOIa7h2pmMTCIHFaEuUHwrvkGLXH3F%2bRXc%3d",
	// liuyifei pwd:simon_401a
	userPwd : "",
	appID : 'd716f46f-e234-4b38-b9c8-d0948b90f228',
	localUserRole : '',
	width : "",
	height : "",
	longitude : 113.94928,
	latitude : 22.52758,
	deviceType : "",
	requestObj : "",
	pushFlag : "",
	CMAAIOKey : null,
	language : "en-us",
//	domain : "https://mipassuat.capitaretail.com.cn",
//	domainIEM : 'http://miemuat.capitaretail.com.cn',
//	domain : "https://miMaintenance .capitaretail.com.cn",
//	domain : "http://mitrackuat.capitaretail.com.cn:8023",
	domain : "https://mcrpuat.capitaretail.com.cn",
	loadingTpl : '<div class="text-overflow" style="float:left;max-width:80%">{0}</div><div style="float:left;width:30px;"><img style="width:1.4em;vertical-align: middle;padding-left: 3px;" src="./resources/images/mask/load.gif" /></div>',
	/**
     * mallId
     */
    mallId : '',
    mallCode : '',
    mallName : '',
	/**
	 * back按钮
	 */
	backBtn : null,
	/**
	 * 提示语(加载中)配置
	 */
	loadingMsg : {
		"zh-cn" : "数据加载中...",
		"en-us" : "Loading..."
	},
	/**
	 * 提示语配置
	 */
	tipsMsg : {
		"hisNoContent" : {
			"zh-cn" : "暂无备注",
			"en-us" : "No note"
		},
		"schedule" : {
			"zh-cn" : "计划",
			"en-us" : "Schedule"
		},
		"minute" : {
			"zh-cn" : "分钟前",
			"en-us" : "min ago"
		},
		"hour" : {
			"zh-cn" : "小时前",
			"en-us" : "hr ago"
		},
		"hours" : {
			"zh-cn" : "小时前",
			"en-us" : "hrs ago"
		},
		"day" : {
			"zh-cn" : "天前",
			"en-us" : " day ago"
		},
		"days" : {
			"zh-cn" : "天前",
			"en-us" : " days ago"
		},
		"month" : {
			"zh-cn" : "月前",
			"en-us" : " month ago"
		},
		"months" : {
			"zh-cn" : "月前",
			"en-us" : " months ago"
		},
		"year" : {
			"zh-cn" : "年前",
			"en-us" : " year ago"
		},
		"years" : {
			"zh-cn" : "年前",
			"en-us" : " years ago"
		},
        /**
         * 语音播放
         */
        "playingAudio":{
            "zh-cn" : "正在播放",
            "en-us" : "Playing"
        },
        /**
         * 暂停语音
         */
        "pauseAudio":{
            "zh-cn" : "暂停",
            "en-us" : "Pause"
        },
        /**
         * 停止播放
         */
        "stopAudio":{
            "zh-cn" : "停止",
            "en-us" : "Stop"
        },
        /**
         * 录音失败
         */
        "tapeFail":{
            "zh-cn" : "录音失败",
            "en-us" : "Taping fail"
        },
        /**
         * 获取资源文件失败
         */
        "loadSource":{
            "zh-cn" : "读取语音中...",
            "en-us" : "Downloading voice..."
        },
        /**
         * 数据提交中
         */
        "submissionMsg" : {
    		"zh-cn" : "数据提交中...",
    		"en-us" : "In the data submission..."
    	},
 		/**
		 * 提交成功
		 */
		"succeedMsg" : {
			"zh-cn" : "数据提交成功.",
			"en-us" : "Data submitted to the success."
		},
		/**
		 * 提交失败
		 */
		"failureMsg" : {
			"zh-cn" : "数据处理失败.",
			"en-us" : "Data processing failed."
		},
		/**
		 * 服务器请求错误
		 */
		"requestErrorMsg" : {
			"zh-cn" : "请求服务器失败，请稍候重试.",
			"en-us" : "Request that the server failed, please try again."
		},
		/**
		 * 空数据
		 */
		"emptyDataMsg" : {
			"zh-cn" : '没有相关数据.',
			"en-us" : 'No relevant data.'
		},
		/**
		 * 空数据2
		 */
		"ungebetenEmptyMsg" : {
			"zh-cn" : "暂无数据.",
			"en-us" : "No data."
		},
		/**
		 * 必填项
		 */
		"requiredMsg" : {
			"zh-cn" : "请输入内容.",
			"en-us" : "Please enter the content."
		},
		/**
		 * 无网络连接
		 */
		"nonetworkconnection" : {
			"zh-cn" : "网络连接不可用.",
			"en-us" : "Network connection is unavailable."
		},
		/**
		 * 系统异常错误
		 */
		"abnormalMsg" : {
			"zh-cn" : "系统异常.",
			"en-us" : "System abnormalities."
		},
		/**
		 * 参数错误错误
		 */
		"paramsMsg" : {
			"zh-cn" : "参数错误.",
			"en-us" : "Parameter error."
		},
		/**
		 * 系统错误
		 */
		"systemErrorMsg" : {
			"zh-cn" : "系统错误.",
			"en-us" : "System Error."
		},
		/**
		 * 无权限
		 */
		"permissionsMsg" : {
			"zh-cn" : "无权限.",
			"en-us" : "No permissions."
		},
		/**
		 * 拍照提示
		 */
		"photoMsg" : {
			"zh-cn" : "最多保存三张图片.",
			"en-us" : "Only support to upload three images or less."
		},
		/**
		 * 提示
		 */
		"Prompt" : {
			"zh-cn" : "提示",
			"en-us" : "Prompt"
		},
		/**
		 * 确定
		 */
		"OK" : {
			"zh-cn" : "确定",
			"en-us" : "OK"
		},
		/**
		 * 图片上传
		 */
		"picUpload" : {
			"zh-cn" : "附件上传中...",
			"en-us" : "Annex uploading..."
		},
		/**
		 * 图片加载
		 */
		"picLoad" : {
			"zh-cn" : "加载中...",
			"en-us" : "Loading..."
		},
		/**
		 * 切换语言提示语
		 */
		"switchLanguage" : {
			"zh-cn" : "设置语言中...",
			"en-us" : "Setting Language..."
		},
		/**
		 * 检查输入项标题
		 */
		"checkInpTitle" : {
			"zh-cn" : "备注",
			"en-us" : "Remarks"
		},
		/**
		 * 显示图片
		 */
		"showPicText" : {
			"zh-cn" : "显示图片",
			"en-us" : "Show picture"
		},
		/**
         * 附件上传提示
         */
        "annexUpload":{
            "zh-cn" : "附件上传中...",
            "en-us" : "Attachment uploading..."
        },
        /**
         * 附件上传成功提示
         */
        "annexUploadSuccess":{
            "zh-cn" : "附件上传成功",
            "en-us" : "Attachment uploading success"
        },
        /**
         * 附件上传失败提示
         */
        "annexUploadFail":{
            "zh-cn" : "附件上传失败",
            "en-us" : "Attachment uploading failure"
        },
		"sendMsgTips" : {
			"zh-cn" : "已成功通过邮件发送该信息，是否希望用短信方式再次发送？",
			"en-us" : "Message sent successfully by email.Do you want send SMSes to these recipients as well?"
		},
		'noMobile' : {
			"zh-cn" : "电话号码不存在!",
			"en-us" : "No Mobile!"
		},
		"success" : {
			"zh-cn" : "成功",
			"en-us" : "Success"
		},
		"noYes" : {
			"zh-cn" : "否,是的",
			"en-us" : "No,Yes"			
		},
		"handingOver" : {
			"zh-cn" : "Handing Over",
			"en-us" : "Handing Over"		
		},
		"takingOver" : {
			"zh-cn" : "Taking Over",
			"en-us" : "Taking Over"		
		},
		"checkListNotAll":{
			"zh-cn" : "Before you modify  the order,please make sure checklist is ok.",
			"en-us" : "Before you modify  the order,please make sure checklist is ok."		
		},
		"checkListItemDone" : {
			"zh-cn" : "You cannot check the checklist now.",
			"en-us" : "You cannot check the checklist now."				
		},
		"commentsEmpty" : {
			"zh-cn" : "Please enter the comments",
			"en-us" : "Please enter the comments",
		},
		"UnableAttachFile" : {
			"zh-cn" : "Unable to attach file. Please try again later.",
			"en-us" : "Unable to attach file. Please try again later."
		}
	},
	/**
	 * 获取请求URL
	 */
	getDomainIEM : function() {
		return this.domainIEM + '/Api/MiemApiHandler.ashx?method=' + this.method
				+ '&tocken=' + encodeURIComponent(this.userToken) + '&interfaceCode='
				+ this.interfaceCode;
	},
	/**
	 * 获取LoadingMsg字符
	 * @returns
	 */
	getLoadingMsg : function() {
		var language = this.language,
		loadingMsg = this.loadingMsg[language];
		
		return loadingMsg;
	},
	/**
	 * 
	 * @param key
	 */
	getTipsMsg : function(key) {
		var language = this.language;
		if (this.tipsMsg[key]) {
			return this.tipsMsg[key][language];
		} else {
			return null;
		}
	},
	time1:new Date(),
	time2:new Date(),
	time3:new Date(),
	time4:new Date(),
	time5:new Date(),
	time6:new Date(),
	CategoryId:'',
	offlineArr:[]
};

/**
 * string format格式化
 * @param args
 * @returns {String}
 */
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                	//var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                	var reg=new RegExp ("({)"+i+"(})","g"); 
                	result = result.replace(reg, arguments[i]); 
                }
            }
        }
    }
    return result;
};

function smoothenList(points) {
    if (points.length < 3) {
        return ["M", points[0], points[1]];
    }
    var dx = [], dy = [], result = ['M'],
        i, ln = points.length;
    for (i = 0; i < ln; i += 2) {
        dx.push(points[i]);
        dy.push(points[i + 1]);
    }
    dx = Ext.draw.Draw.spline(dx);
    dy = Ext.draw.Draw.spline(dy);
    result.push(dx[0], dy[0], "C");
    for (i = 1, ln = dx.length; i < ln; i++) {
        result.push(dx[i], dy[i]);
    }
    return result;
}