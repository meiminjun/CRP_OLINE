Ext.define('CRP.store.MainListStore', {
	extend: 'Ext.data.Store',

	requires: [
		'CRP.model.MainListModel',
		'Ext.data.proxy.Ajax',
		'Ext.data.reader.Json'
	],

	config: {
		autoLoad: true,
		model: 'CRP.model.MainListModel',
		storeId: 'mainList',
		proxy: {
			type: 'ajax',
			url:'resources/data/getMainList.json',
			reader: {
				type: 'json',
				rootProperty:'rows'
			}
		},
		listeners:{
			/**
			 * store loaded event
			 */
        	load : function(store, records, successful, operation, eOpts) {
				try{
			    	Ext.Array.each(records,function(record,index,countriesItSelf){
			    		var lastVisitLocal = window.localStorage.getItem("lastVisit"+index),
			    			lastVisitVal = CRP.util.PubOperation.dataFormatLogogram2(lastVisitLocal);
			    		if(!Ext.isEmpty(lastVisitVal)){
			    			record.set('LastVisit','Last seen: '+lastVisitVal);
			    		}
			    	});
				}catch (e) {Ext.Logger.deprecate(e);}
            }
        }
	}
});