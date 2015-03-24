/**
 * News控制器
 * @author meiminjun
 * @date 20150205
 */
Ext.define('CRP.controller.NewsCtr', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			newList : 'news list',
			searchField: 'news searchfield'
		},
		control: {
			newList: {
				itemsingletap: 'showDetailFun'
			}
		}
	},
	/**
	 * 页面初始化
	 * */
	newsListInit: function(view, index, record){
		var me = this,
			titlebar = view.down('titlebar'),
			titleText = record.get('Cont'),
			name = '';
		
		titlebar.setTitle(titleText);
		var newsList = Ext.create('CRP.view.NewsList');		
		
		if(index === 1 ) {
			name = "newsList";
		}else if(index === 2 ) {
			name = "researchList";
		}else if(index === 3) {
			name = "consultancyList";
		}else if(index === 4) {
			name = "innovationList";
		}else if(index === 5){
			name = "calendarList";
		}
		me.listName = name;
		me.listIndex = index;
		
		view.add(newsList);
		me.refreshData();
	},
	/**
	 * 刷新数据
	 * */
	refreshData: function(){
		var me = this,
			newsList = me.getNewList(),
			store = newsList.getStore(),
			searchText = me.getSearchField().getValue(),
			param = {
				"ADAccount": Global.userAccount,
				"CategoryID": me.listIndex,
				"SearchKeywords": searchText ? searchText : ''
			};
		if(!store){
			store = Ext.create('CRP.store.NewsStore');
			newsList.setStore(store);			
		}
		CRP.util.PubOperation.pubListLoad(store, param, true, true, me.listName,function(response){
			var plu = newsList.getPlugins()[1];
//			console.log(plu.getAutoSnapBack());
			if (plu.getAutoSnapBack()) {
              plu.snapBack(true);
    		}
//			console.log(response);
		});
	},
	refreshListData:function() {
		var me = this,
			newsList = me.getNewList(),
			store = newsList.getStore(),
			searchText = me.getSearchField().getValue(),
			param = {
				"ADAccount": Global.userAccount,
				"CategoryID": me.listIndex,
				"SearchKeywords": searchText ? searchText : ''
			},
			PageIndex = 1,
			PageSize = 15;
		if(!store){
			store = Ext.create('CRP.store.NewsStore');
			newsList.setStore(store);			
		}


        var type = me.listIndex,
         	name="";
        if(type === 1 ) {
         name = "newsList";
        }else if(type === 2 ) {
         name = "researchList";
        }else if(type === 3) {
         name = "consultancyList";
        }else if(type === 4) {
         name = "innovationList";
        }else if(type === 5){
         name = "calendarList";
        }
        if (!CRP.util.PubOperation.checkConnectionStatus()) {
            CRP.util.PubOperation.showTips('nonetworkconnection', 'normal');
            return;
        }
        CRP.util.PubOperation.pubListRefresh(store,param,true,false,name);

       
  
		// Ext.Ajax.request({
		// 	url:Global.domain+'/api/GetNews.ashx',
		// 	params: {
		// 		"ADAccount": Global.userAccount,
		// 		"CategoryID": me.listIndex,
		// 		"SearchKeywords": searchText ? searchText : '',
		// 		"language":Global.language,
		// 		"PageIndex":PageIndex,
		// 		"PageSize":PageSize
		// 	},
  //           method : 'get',
  //           timeout : 50000,
		// 	success:function(response) {
  //               // CRP.util.PubOperation.hideLoadMask();
		// 		var JsonObj = Ext.JSON.decode(response.responseText),
		// 			result = JsonObj.result,
		// 			errorCode = JsonObj.ErrorCode;
                    
  //                   me.Count = JsonObj.TotalCount;
		// 		if(result) {
		// 			var loadRecords = JsonObj.rows,
		// 				AttachmentUrl,
		// 				physicalFileName,
		// 				completeFileNameArr = [];
					
		// 			Global.offlineArr = loadRecords;
  //                   // console.log(loadRecords);
  //                   store.setData(loadRecords);
  //                   // console.log(store.getData());
  //                   alert(store.getTotalCount());
  //                   store.setTotalCount(JsonObj.TotalCount);
  //                   alert(JsonObj.TotalCount);
  //                   // 根据第一页返回的数据条数下载PDF文件，非固定15条；
  //                   // if(PageIndex == 1){
  //                   //     Ext.Array.each(store.getData().all,function(record,index,countriesItSelf){
  //                   //         AttachmentUrl = record.get('AttachmentUrl');
  //                   //         physicalFileName = record.get('PhysicalFileName');
  //                   //         newsCtr.downLoadPDFFn(record,AttachmentUrl,physicalFileName,index);
  //                   //     });
  //                   // }
		// 			// phonegap 获取下载PDF已完成的文件名集合
		// 			// 从最新获取的records中根据文件名初始化下载状态，如果文件有更新，返回的还是旧文件名；
  //                   PhoneGapAPI.getDLPDFComplete(function(result){
  //                           completeFileNameArr = result;
  //                           if(loadRecords && loadRecords.length > 0){
  //                               Ext.Array.each(store.getData().all,function(record,index,countriesItSelf){
  //                                   // alert(Global.offlineArr[index].Download);
  //                                   var i = index;
  //                                   AttachmentUrl = record.get('AttachmentUrl');
  //                                   physicalFileName = record.get('PhysicalFileName');
  //                                   newsCtr.downLoadPDFFn(record,AttachmentUrl,physicalFileName,i);

  //                                   if(completeFileNameArr && completeFileNameArr.length > 0){
  //                                       Ext.Array.each(completeFileNameArr,function(completeFileName,index,countriesItSelf){
                                            
  //                                           if(completeFileName == record.get('PhysicalFileName')){
  //                                               record.set('Download',1);
  //                                           }
  //                                       });
  //                                   }
  //                               });
  //                           }

  //                           CRP.util.PubOperation.hideLoadMask();
  //                       });	
		// 		}else{
		// 			console.log("result:"+result+"----ErrorCode"+errorCode);
		// 			return false;
		// 		}
		// 	},
  //           failure:function(response,opts) {
  //               CRP.util.PubOperation.hideLoadMask();
  //           }
		// });
	},
	/**
	 * 跳转到新闻详情页面
	 * @param {Object} list
	 * @param {Object} index
	 * @param {Object} target
	 * @param {Object} record
	 * @param {Object} e
	 * @param {Object} eOpts
	 */
	showDetailFun:function(list, index, target, record, e, eOpts) {
		var me = this;
		me.record = record;
		var target = e.target,
			className = target.className,
			newsId = record.get('NewsID'),
			Download = record.get('Download');
			
		CRP.util.PubOperation.cancelBubble(e);	//阻止冒泡
		if(className === "collected") {
			me.collectFun(newsId,false);
		}else if (className === "notCollect") {
			me.collectFun(newsId,true);
		}else if (className === "undownload") {
			var	pdfUrl = record.get('AttachmentUrl'),
				physicalFileName = record.get('PhysicalFileName');
			this.downLoadPDFFn(record,pdfUrl,physicalFileName,index);
		}else if (className === "share") {
			if(Download == "1") {
				PhoneGapAPI.share(record.get('NewsTitle'),record.get('PhysicalFileName'),record.get('AttachmentName'));
			}else {
				CRP.util.PubOperation.showTips('UnableAttachFile','normal');
			}
		}else if (className === "email") {
			PhoneGapAPI.sendMail(record.get('AuthorUserEmail'),record.get('NewsTitle'));
		}else {
			me.index = index;
			this.goToPDFFn(newsId,record.get('AttachmentUrl'),record.get('PhysicalFileName'));
		}
		
		window.localStorage.removeItem("lastVisit"+mainCtr.index);
		window.localStorage.setItem("lastVisit"+mainCtr.index, Ext.Date.format(new Date(),"Y-m-d H:i:s"));
	},
	/**
	 * 收藏单个文章方法
	 * @param {String} flat	true:为收藏,false:取消收藏
	 * @param {String} newsId
	 */
	collectFun:function(newsId,flat) {
		var me = this;
		if(flat) {
			Ext.Ajax.request({
				url:Global.domain+'/api/AddToFavorites.ashx',
				params:{
					ADAccount:Global.userAccount,
					NewsID:newsId
				},
				success:function(response) {
					var JsonObj = Ext.JSON.decode(response.responseText),
						result = JsonObj.result,
						errorCode = JsonObj.ErrorCode;
					if(result) {
						me.record.set('FavoriteStatus',1);
					}else{
//					Ext.Msg.alert('Failed',"收藏失败！");
						me.record.set('FavoriteStatus',0);
						console.log("result:"+result+"----ErrorCode"+errorCode);
						return false;
					}		
				}
			});
		}else {
			Ext.Ajax.request({
				url:Global.domain+'/api/DelFavorite.ashx',
				params:{
					ADAccount:Global.userAccount,
					NewsID:newsId
				},
				success:function(response) {
					var JsonObj = Ext.JSON.decode(response.responseText),
						result = JsonObj.result,
						errorCode = JsonObj.ErrorCode;
					if(result) {
						me.record.set('FavoriteStatus',1);
					}else{
						me.record.set('FavoriteStatus',0);
						console.log("result:"+result+"----ErrorCode"+errorCode);
						return false;
					}
				}
			});
		}
	},
	/**
	 * 根据搜索内容显示对应数据
	 * @param {String} cont
	 */
	searchCont:function(cont) {
		var me = this;
	 	me.refreshData();
	},
	/**
	 * PDF预览
	 * @param newsId
	 * @param attUrl
	 * @param physicalFileName
	 * 静态DEMO，android指定目录/CRPAndroid_UAT/
	 * 线上版本，android需要修改目录原生指定：download/CRP/itemId.PDF（已下载完）、pdfUrl（未下载完）
	 */
	goToPDFFn: function(newsId,attUrl,physicalFileName) {
		var me = this,
			url = '';
			
		if(Ext.os.is.Android){
			// Demo下載
//			url = Ext.os.is.Android ? '/CRPAndroid_UAT/'+pdfUrl : pdfUrl;
			// UAT下載
			url = me.record.get('Download') == "1" ? 'download/CRP/'+physicalFileName : attUrl; 
			PhoneGapAPI.checkAtt(url,newsId);
		}else if (Ext.os.is.iOS) {
			PhoneGapAPI.checkAtt(attUrl,newsId,physicalFileName);
		}
	},
	/**
	 * 向后台提交已读
	 * @param {String} NewsID
	 */
	readNewFun:function(NewsID) {
		var me = this;
		Ext.Ajax.request({
			url:Global.domain+'/api/ReadNews.ashx',
			params:{
				ADAccount:Global.userAccount,
				NewsID:NewsID
			},
			success:function(response) {
				var JsonObj = Ext.JSON.decode(response.responseText),
					result = JsonObj.result,
					errorCode = JsonObj.ErrorCode,
					type = me.listIndex,
					index = me.index,
					name="";
				if(result) {
					me.record.set('ReadStatus',1);										
                    if(type === 1 ) {
                        name = "newsList";
                    }else if(type === 2 ) {
                        name = "researchList";
                    }else if(type === 3) {
                        name = "consultancyList";
                    }else if(type === 4) {
                        name = "innovationList";
                    }else if(type === 5){
                        name = "calendarList";
                    }
					Global.offlineArr[index].ReadStatus = 1;
                    var data2 = {
                            "rows":Global.offlineArr,
                            "TotalCount":me.getNewList().getStore().getAllCount(),
                            "result":true,
                            "ErrorCode":null
                        };
                    var str1 = Ext.JSON.encode(data2);
                    //第二个参数无效
                    CRP.util.PubOperation.onlineLoad(name,'1',str1);					
				}else{
					console.log("result:"+result+"----ErrorCode"+errorCode);
				}
			}
		});
	},
	/**
	 * PDF文件下载处理（单条）
	 * @param record
	 * @param pdfUrl
	 * @Param physicalFileName
	 */
	downLoadPDFFn : function(record,pdfUrl,physicalFileName,index){
		try{
			// 未下载完成时执行
			if(record.get('Download') == 0){
				// 單項點擊修改下载状态为downloading
				record.set('Download',2);
                var me = this;
                var type = me.listIndex,name="";
				// phonegap download pdf
                // 由于这个是异步下载，所以离线缓存在这里
				PhoneGapAPI.downLoadPDF(pdfUrl,physicalFileName,function(result){
					var resultJSON = result;
					if(record){
						// phonegap下载状态回调，1：下载成功，0：下载失败
						if(resultJSON && resultJSON.state == 1){
							record.set('Download',1);
						}else{
							record.set('Download',0);
						}
					}
                    if(index<15) {
                        var downLoad = record.data.Download;
                        Global.offlineArr[index].Download = downLoad;

                        
                        if(type === 1 ) {
                            name = "newsList";
                        }else if(type === 2 ) {
                            name = "researchList";
                        }else if(type === 3) {
                            name = "consultancyList";
                        }else if(type === 4) {
                            name = "innovationList";
                        }else if(type === 5){
                            name = "calendarList";
                        }

                        var data2 = {
                                "rows":Global.offlineArr,
                                "TotalCount":me.getNewList().getStore().getAllCount(),
                                "result":true,
                                "ErrorCode":null
                            };
                        var str1 = Ext.JSON.encode(data2);
                        //第二个参数无效
                        CRP.util.PubOperation.onlineLoad(name,'1',str1);
                    }
				});
			}
		}catch (e) {Ext.Logger.deprecate(e);}
	},
	/**
	 * 推送中转
	 * @param {Object} view
	 * @param {String} categoryId
	 */
	pushNewsList: function(view, categoryId){
		var me = this,
			titlebar = view.down('titlebar'),
			titleText = "",
			name = '';
		var newsList = Ext.create('CRP.view.NewsList');	
		
		if(categoryId == "1") {
			name = "newsList";
			titleText = "News Feed";
		}else if(categoryId == "2") {
			name = "researchList";
			titleText = "Research Reports";
		}else if(categoryId == "3") {
			name = "consultancyList";
			titleText = "Consultancy Reports";
		}else if(categoryId == "4") {
			name = "innovationList";
			titleText = "Innovation";
		}else if(categoryId == "5"){
			name = "calendarList";
			titleText = "Key Events Calendar";
		}
		titlebar.setTitle(titleText);
		me.listName = name;
		me.listIndex = categoryId;
		
		view.add(newsList);
		me.refreshData();
	}
});