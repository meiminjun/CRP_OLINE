Ext.define('CRP.view.MainList', {
    extend: 'Ext.dataview.List',
	require:['Ext.plugin.ListPaging','Ext.plugin.PullRefresh'],
	xtype:'mainList',
    config: {
//      layout: 'vbox',
//      autoDestroy: false,
        useSimpleItems: true,
		variableHeights: true,
		infinite: true,
		disableSelection: true,
		allowDeselect: false,
		scrollToTopOnRefresh: false,
		cls: 'mainList',
		store:'mainList',
		loadingText : false,
		itemHeight: 60,
        itemTpl: [
            '<div style="position:absolute;left:15px;top:9px;">',
            	'<img src="{Image}" width="40px" height="40px" />',
            '</div>',
            '<div class="content">',
            	'<p>{Cont}</p>',
            	'<p style="font-size: 12px; color:#5a5a5a;">{LastVisit}</p>',
            '</div>',
            '<div style="position:absolute;right:15px;top:19px;">',
            	'<img src="{Status}" width="18px" height="18px" />',
            '</div>'
        ]  
    }
});