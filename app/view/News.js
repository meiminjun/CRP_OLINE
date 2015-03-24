Ext.define('CRP.view.News', {
	extend: 'Ext.Container',
	xtype: 'news',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List',
		'Ext.field.Search',
		'Ext.XTemplate',
		'Ext.plugin.ListPaging',
		'Ext.plugin.PullRefresh'
	],

	config: {
		itemId:'feedList',
		layout: 'vbox',
		items: [{
			xtype: 'titlebar',
			docked: 'top',
			title:'News Feed',
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
		}],
//		listeners:[{
//			fn:'keyupFun',
//			event:'keyup',
//			delegate:'#mysearch'
//		}]
	},
//	keyupFun:function(textfield,e,eOpts) {
//		var searchText,event = e.event;
//		if(event.keyCode == 13){
//			searchText = textfield.getValue();
//			newsCtr.searchCont(searchText);
//		}
//		
//	},
	destroyChildFn: function(){
    	var child = navCtr['News'].down("list");
    	var store = Ext.getStore('newsListStore');
//			store.setParams({
//	 			"SearchKeywords":""
//	 		});
	 		store.setParams(null);
    	store.removeAll();
    	Global.offlineArr = [];
    	if(child){
    		child.destroy();
    	}
    }
});