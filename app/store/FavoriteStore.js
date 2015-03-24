Ext.define('CRP.store.FavoriteStore', {
	extend: 'Ext.data.Store',

	requires: [
		'CRP.model.NewsModel',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	config: {
		autoLoad: false,
		model: 'CRP.model.NewsModel',
		pageSize : 15,
		storeId: 'favoriteStore',
		proxy: {
			type: 'ajax',
//			url:'resources/data/GetFavorite.json',
			url:Global.domain+'/api/GetMyFavorites.ashx',
			startParam : false,
			limitParam : 'PageSize',
			pageParam : 'PageIndex',
			reader: {
				type: 'json',
				rootProperty:'rows',
				totalProperty : 'TotalCount'
			}
		},
		listeners:[{
			fn:'loadData',
			event:'load'
		}]
	},
	loadData:function(store,records,successful,operation,eOpts) {
		if (successful && operation.getResponse()) {
			CRP.util.PubOperation.onlineLoad("favoriteList",operation.getResponse());
		}
	}
});