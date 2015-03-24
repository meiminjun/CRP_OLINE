/**
 * main控制器
 * @author duwei
 * @date 20150204
 */
Ext.define('CRP.controller.Favorite', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			favorite: 'favorite',
			favoriteList: 'favoriteList',
			searchFavorite: 'favoriteList searchfield'
		},
		control: {
			favoriteList: {
				itemswipe : 'favoriteListSwipe',
				itemsingletap : 'favoriteListTap'
			}
		}
	},
	/**
	 * 初始化
	 */
	favoriteInit: function(view){
    	var me = this,
			favoriteList = Ext.create('CRP.view.FavoriteList');
    	view.add(favoriteList);
    	me.refreshData();
		
		
	},
	/*
	 * 刷新数据
	 * */
	refreshData: function(){
		var me = this,
			favoriteList = me.getFavoriteList(),
			store = favoriteList.getStore(),
			keyword = me.getSearchFavorite().getValue();
		
		if(!store){
			store = Ext.create('CRP.store.FavoriteStore');
			favoriteList.setStore(store);
			
/*    		//提取缓存 仅限进入页面时
			CRP.util.PubOperation.offlineAccess('favoriteList',store,function(responseText){
        		var response = Ext.JSON.decode(responseText);
        		
        		store.setData(response.rows);
        		favoriteList.getScrollable().getScroller().getTranslatable().translate(0,0);    		
        	});*/
		}
//		Ext.Ajax.abort(store.getProxy().url);
		var param = {
			"ADAccount":Global.userAccount,
			"SearchKeywords": keyword ? keyword : ''
		};
		CRP.util.PubOperation.pubListLoad(store, param, true, false, 'favoriteList',function(response){		
    		
		});		
	},
	/**
	 * 收藏夹左划 添加删除按钮
	 * */
	favoriteListSwipe: function(list, index, target, record, e, eOpts){
		var delIdsArr = list.delSwipeIds ? list.delSwipeIds : (list.delSwipeIds = []),
			item;
		if(e.direction === 'left'){
			if(delIdsArr.length > 0){
				delIdsArr[0].removeCls('leftStatus');
				delIdsArr.pop();
				
			}else{
				// 停止draggable所有事件
				navCtr['Favorite'].getDraggable().suspendEvents();
			}
			item = list.getItemAt(index);
			item.addCls('leftStatus');
			delIdsArr.push(item);	

		}else if(e.direction === 'right'){
			if(delIdsArr.length > 0){
				delIdsArr[0].removeCls('leftStatus');
				delIdsArr.pop();
				// 启用draggable事件
				navCtr['Favorite'].getDraggable().resumeEvents();	
			}else{
				
			}
		}
	},
	/**
	 * 收藏夹点击事件
	 * */
	favoriteListTap: function(list, index, target, record, e, eOpts){
		var me = this;
		var className = e.target.className;
		var newsId = record.get('NewsID');
		if(className === 'deleteBtn'){
			e.stopPropagation();
	    	me.deleteFun(list,index,newsId);
		}else{
			newsCtr.goToPDFFn(newsId,record.get('AttachmentUrl'),record.get('PhysicalFileName'));
		}
	},
	/**
	 * 删除单个收藏方法
	 * @param {String} id
	 */
	deleteFun:function(list,index,newsId) {
		if(newsId) {
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
				    	list.getStore().removeAt(index);
				    	list.delSwipeIds = [];
				    	navCtr['Favorite'].getDraggable().resumeEvents();
				    	list.getItemAt(index).removeCls('leftStatus');
					}else{
						list.getItemAt(index).removeCls('leftStatus');
//						Ext.Msg.alert('Error',"result:"+result+"----ErrorCode"+errorCode);
						console.log("result:"+result+"----ErrorCode"+errorCode);
					}
				}
			});
		}
	},
	/**
	 * PDF预览
	 */
	goToPDFFn: function(pdfUrl) {
		var me = this,
			url = '';
		url = Ext.os.is.Android ? '/CRPAndroid_UAT/'+pdfUrl : pdfUrl;
		PhoneGapAPI.checkAtt(url);
	},	
	/**
	 * 根据搜索内容显示对应数据
	 * @param {String} cont
	 */
	searchCont:function(cont) {
/*		var store = Ext.getStore('favoriteStore');
		
		if(cont.length>0) {
			store.setParams({
	 			"SearchKeywords":cont
	 		});
			store.loadPage(1,{
				callback:function(record,operation,success) {
					var response = operation.getResponse();
					console.log(response);
					var data = response.responseText;
					var jsonData = Ext.JSON.decode(data);
					console.log(jsonData);
					var Obj = jsonData.Favorites;
					if(!Ext.isEmpty(Obj)) {
						store.setData(Obj);
					}else{
						store.setData(null);
					}
				},
				scope : this
			});
		}*/
	 	var me = this;
	 	
	 	me.refreshData();
	}
});
