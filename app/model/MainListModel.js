Ext.define("CRP.model.MainListModel", {
	 extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],
	config: {
		fields: [{
			name: 'Image'
		}, {
			name: 'Cont'
		}, {
			name: 'Status'
		},{
			name: 'LastVisit'
		}]
	}
});