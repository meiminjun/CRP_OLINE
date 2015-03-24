Ext.define('CRP.view.FavoriteList', {
	extend: 'Ext.dataview.List',
	xtype: 'favoriteList',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List',
		'Ext.field.Search',
		'Ext.XTemplate',
		'Ext.plugin.ListPaging',
		'Ext.plugin.PullRefresh'
	],
    config: {
    	itemId: 'favoriteList',
    	useSimpleItems: true,
		variableHeights: true,
		infinite: true,
		disableSelection: true,
		allowDeselect: false,
		scrollToTopOnRefresh: false,
		cls: 'favoriteList',
		loadingText: false,
		flex: 1,
		itemHeight: 60,
		locales: {
			emptyText: 'orderIndex.emptyText',	
		},
		scrollable: {
			directionLock: true,
			direction: 'vertical'
		},
		itemTpl: [
		    '<div class="content">',
		    	'<div class="img"><img src="{ImageUrl}" /></div>',
		    	'<div class="infor">',
		    		'<div class="title">{NewsTitle}</div>',
		    		'<p class="cont">{NewsContent}</p>',
		    		'<div class="time">{[CRP.util.PubOperation.dateFormatFun(values.UpdateTime,"")]}</div>',
		    	'</div>',
		    '</div>',
		    '<div class="deleteBtn"></div>'
		],
		items: [{
			xtype: 'searchfield',
			docked: 'top',
			placeHolder: 'keywords',
			cls: 'searchfield',
			itemId:'mysearch2',
		}],
		plugins: [{
			type: 'listpaging'
		},{
		    xclass: 'CRP.ux.PullRefreshFn',
          	pullText: 'Pull down for more new Data!',
            refreshFn: function() { 
            	favoriteCtr.searchCont();
           	}
	    }],
     	listeners:[{
				fn:'keyupFun',
				event:'change',
				delegate:'#mysearch2'
		}]
	},
	keyupFun:function(textfield,e,eOpts) {
		favoriteCtr.searchCont(textfield.getValue());
	}
});