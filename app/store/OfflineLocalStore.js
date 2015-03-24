/**
 * 缓存列表store
 * 
 * @author yangkun
 * @create 2013-10-16
 */
Ext.define('CRP.store.OfflineLocalStore', {
	extend : 'Ext.data.Store',
	requires:['Ext.data.proxy.LocalStorage'],
	config : {
		autoLoad : false,
		model: 'CRP.model.OfflineLocalModel',
//		fields : [ 'cacheItem', 'cacheDate', 'resTxt' ],
		proxy : {
			type : 'localstorage',
			id : 'crp'
		}
	}
});