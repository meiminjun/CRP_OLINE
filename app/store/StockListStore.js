Ext.define('CRP.store.StockListStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
    	'CRP.model.StockModel',
    	'Ext.data.proxy.Ajax',
    	'Ext.data.reader.Json'
    ],

    config: {
        defaultRootProperty: 'rows',
		autoLoad: false,
        model: 'CRP.model.StockModel',
		storeId:'stockList',
		pageSize : 6,
        proxy: {
            type: 'ajax',
//          url:'resources/data/GetStockData3.json',
			url:Global.domain+'/api/GetStocks.ashx',
			timeout : 50000,
			startParam : false,
			limitParam : 'PageSize',
			pageParam : 'PageIndex',
            reader: {
                type: 'json',
                rootProperty: 'rows',
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
			CRP.util.PubOperation.onlineLoad("stockList",operation.getResponse());
		}
	}
});
