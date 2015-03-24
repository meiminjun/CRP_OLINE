Ext.define("CRP.model.OfflineLocalModel", {
 	extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],
	config: {
		fields: [{
			name: 'cacheItem'
		}, {
			name: 'cacheDate'
		}, {
			name: 'resTxt'
		}]
	}
});