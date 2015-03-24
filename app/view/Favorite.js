Ext.define('CRP.view.Favorite', {
	extend: 'Ext.Container',
	xtype: 'favorite',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List',
		'Ext.field.Search',
		'Ext.XTemplate',
		'Ext.plugin.ListPaging',
		'Ext.plugin.PullRefresh'
	],
    config: {
		layout: 'vbox',
		items: [{
			xtype: 'titlebar',
			docked: 'top',
			title:'Favorites',
			cls: 'customToolBar',
			items: [{
				xtype: 'button',
				ui: 'plain',
				iconCls: 'backBtnCls',
				iconMask: true,
				docked: 'left',
				handler: function(e) {
					navCtr.popToPrev();
				}
            }]
		}]
	},
    destroyChildFn: function(){
    	var child = navCtr['Favorite'].getComponent('favoriteList');
    	if(child){
    		child.destroy();
    	}
    },
    refreshPageFn: function(){
    	favoriteCtr.refreshData();
    }
});