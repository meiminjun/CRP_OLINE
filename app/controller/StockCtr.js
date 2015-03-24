/**
 * Stocks控制器
 * @author meiminjun
 * @date 2015/2/11
 */
Ext.define('CRP.controller.StockCtr', {
	extend: 'Ext.app.Controller',
	config: {
		models:["StockModel"],
		stores:["StockListStore"],
		refs: {
			stockList:'stockList accordionlist',
			contain:'stockList container[name=detail]',
			actionsheet:'stockList actionsheet[name=stockDetail]'
		},
		control: {
			'accordionlist[itemId=stockList]':{
				leafitemtap:'updateFun',				
			}
		}
		
	},
	refreshFun:function(list) {
		console.log(list);
	},
	stockInit:function(view, index, record) {
		var me = this,
		titlebar = view.down('titlebar'),
		titleText = record.get('Cont');
		
		titlebar.setTitle(titleText);
		var stockList = Ext.create('CRP.view.StockList');
		view.add(stockList);
		me.refreshData();
	},
	refreshData:function() {
		var me = this,
			stockList = me.getStockList(),
			store = stockList.getStore(),
			param = {
				ADAccount: Global.userAccount
			};
		if(!store) {
			store = Ext.create('CRP.store.StockListStore');
			stockList.setStore(store);
		}
		CRP.util.PubOperation.pubListLoad(store, param, true, true, 'stockList',function(response){
//			stockList.setStore(store);
			stockList.doIndexExpand(0);
		});
	},
	/**
	 * 更新股票数据
	 * @param {Object} list
	 * @param {Object} index
	 * @param {Object} target
	 * @param {Object} record
	 * @param {Object} e
	 * @param {Object} eOpts
	 */
	updateFun:function(list, index, target, record, e, eOpts) {
		var me = this;
		var detailData = record.get("Detail");
		var titleText = record.get('StockName');
		detailData.title = titleText;
		
		me.getActionsheet().show();
		me.getContain().updateData(detailData);
	},
	updateHtml: function(str){
		console.log("dfdf");
		var	num = str.substr(1);
		if(str.indexOf("+") === 0) {
			return '<a class="up">+ '+num+'</a>';
		}else {
			return '<a class="down">- '+num+'</a>';
		}
	},
	/**
	 * StockList刷新页面(treeStore的setData、updateData方法都不奏效)
	 * */
	StockListRefresh: function(){
		var me = this,
			stockList = me.getStockList(),
			store = stockList.getStore();
		Ext.Ajax.request({
			url:Global.domain+'/api/GetStocks.ashx',
			params:{
				ADAccount: Global.userAccount
			},
			success:function(response) {
				var JsonObj = Ext.JSON.decode(response.responseText),
					result = JsonObj.result,
					errorCode = JsonObj.ErrorCode;
				if(result) {
					var store1 = Ext.create('Ext.data.TreeStore', {
				         model: 'CRP.model.StockModel',
				         defaultRootProperty: 'rows',
				         root: JsonObj
			      	});
			      	stockList.setStore(store1);
			      	stockList.doIndexExpand(0);
			      	store1.load();
					return;
				}else{
					return;
				}
			}
		});
	}
});