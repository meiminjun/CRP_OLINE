/**
 * 新闻列表store
 * @class CRP.store.NewsStore
 */
Ext.define('CRP.store.NewsStore', {
	extend: 'Ext.data.Store',

	requires: [
		'CRP.model.NewsModel',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	config: {
		autoLoad: false,
		model: 'CRP.model.NewsModel',
		storeId: 'newsListStore',
		pageSize : 15,
		proxy: {
			type: 'ajax',
//			url:'resources/data/GetNewList.json',
			url:Global.domain+'/api/GetNews.ashx',
			timeout : 50000,
			startParam : false,
			limitParam : 'PageSize',
			pageParam : 'PageIndex',
			reader: {
				type: 'json',
				rootProperty:'rows',
				totalProperty : 'TotalCount'
			}
		},
		listeners:{
			/**
			 * store loaded event
			 * 初始化PDF下载状态，phonegap只返回下载已完成对应的新闻id集合（首次加载或加载更多）
			 */
        	load : function(store, records, successful, operation, eOpts) {
    			if (successful && operation.getResponse()) {
					try{
						// 根据phonegap返回的itemiId集合修改下载已完成的状态
						var params = operation.getRequest().getParams(),
							PageIndex = params.PageIndex,
							PageSize = params.PageSize,
							loadRecords = store.getRange(PageSize*(PageIndex-1),store.getAllCount()-1),
							AttachmentUrl,
							physicalFileName,
							completeFileNameArr = [];
	
	//						console.log(PageIndex);
	//						console.log(PageSize*(PageIndex-1));
	//						console.log(store.getAllCount()-1);
	//						console.log(loadRecords);
	
//	测试
//						Ext.Array.each(loadRecords,function(record,index,countriesItSelf){
//							var rowsItem = record.data;
//							console.log(rowsItem.Download);
//							arr.push(rowsItem);
//						});
						//离线缓存，后面要用
						var offlineStr = operation.getResponse().responseText;
                        var offlineObj = Ext.JSON.decode(offlineStr);
                        
						// 根据第一页返回的数据条数下载PDF文件，非固定15条；
						if(PageIndex == 1){
	                        Global.offlineArr = offlineObj.rows;
							Ext.Array.each(loadRecords,function(record,index,countriesItSelf){
								AttachmentUrl = record.get('AttachmentUrl');
								physicalFileName = record.get('PhysicalFileName');
								newsCtr.downLoadPDFFn(record,AttachmentUrl,physicalFileName,index);
							});
						}
		                // console.log(Global.offlineObj);
						// phonegap 获取下载PDF已完成的文件名集合
						// 从最新获取的records中根据文件名初始化下载状态，如果文件有更新，返回的还是旧文件名；
						PhoneGapAPI.getDLPDFComplete(function(result){
                            console.log("------------已完成-----------");
                            console.log(result);
							completeFileNameArr = result;
							if(loadRecords && loadRecords.length > 0){
								Ext.Array.each(loadRecords,function(record,index,countriesItSelf){
                                    console.log(record);
									if(completeFileNameArr && completeFileNameArr.length > 0){
										Ext.Array.each(completeFileNameArr,
											function(completeFileName,index,countriesItSelf){
												if(completeFileName == record.get('PhysicalFileName')){
													record.set('Download',1);
												}
										});
									}
								});
							}
						});
	
						//分离各个离线数据
						var type = operation.getRequest().getParams().CategoryID,
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
						
						//手动拼装离线数据
						var data2 = {
							"rows":Global.offlineArr,
							"TotalCount":store.getAllCount(),
							"result":true,
							"ErrorCode":null
						};
						var str1 = Ext.JSON.encode(data2);
//						第二个参数无效
						CRP.util.PubOperation.onlineLoad(name,"1",str1);
					}catch (e) {Ext.Logger.deprecate(e);}
				}
            }
        }
	}
});