Ext.define('CRP.view.NewsList', {
	extend: 'Ext.dataview.List',
	xtype: 'newsList',
	requires: [
		'Ext.TitleBar',
		'Ext.dataview.List',
		'Ext.field.Search',
		'Ext.XTemplate',
		'Ext.plugin.ListPaging',
		'Ext.plugin.PullRefresh'
	],
    config: {
			flex: 1,
			itemId: 'newsList',
			useSimpleItems: true,
			variableHeights: true,
			infinite: true,
			disableSelection: true,
			allowDeselect: false,
			scrollToTopOnRefresh: false,
			cls: 'news',
			locales:{
				emptyText: 'orderIndex.emptyText'	
			},
//			emptyText: 'orderIndex.emptyText',
			loadingText: false,
			scrollable: {
				directionLock: true,
				direction: 'vertical'
			},
			itemTpl: [
				'<div style="position:absolute;top:28px;left:10px">',
					'<div class="avatar-img">',
						'<img class="listImgDef" src="{ImageUrl}" />',
					'</div>',
				'</div>',
				'<div class="avatar-row defaultFont-style" style="margin-left:72px;height: 82px;">',
					'<div class="head text-overflow">',
						'<span class="proName">{NewsTitle}</span>',
					'</div>',
					'<div class="rowscontent">{NewsContent}</div>',
					'<div class="expand">',
						'<a class="email"></a>',
						'<span class="split">|</span>',
						'<a class="share"></a>',
						'<span class="split">|</span>',
						'<tpl if="FavoriteStatus==\'1\'">',
							'<a class="collected"></a>',
						'<tpl else>',
							'<a class="notCollect"></a>',
						'</tpl>',
						'<span class="split">|</span>',
						'<tpl if="Download==1">',
							'<a class="downloaded"></a>',
						'<tpl elseif="Download==2">',
							'<a class="downloading"></a>',
						'<tpl else>',
							'<a class="undownload"></a>',
						'</tpl>',
					'</div>',
				'</div>',
				'<div>',
					'<tpl if="ReadStatus==\'0\'">',
						'<img class="unread" src="resources/images/weidu.png" />',
					'</tpl>',
//					'<tpl if="Download==1">',
//						'<div class="downloaded"></div>',
//					'<tpl elseif="Download==2">',
//						'<div class="downloading"></div>',
//					'<tpl else>',
//						'<div class="undownload"></div>',
//					'</tpl>',
					'<div class="time">',
						'{[CRP.util.PubOperation.dateFormatFun(values.AuthorTime,"")]}',
					'</div>',
			],
			items: [{
				xtype: 'searchfield',
				docked: 'top',
				placeHolder: 'keywords',
				itemId:'mysearch',
				//name: 'orderListSearch',
				cls: 'newsSearchfield',
			}],
			plugins: [{
				type: 'listpaging'
			},{
			    xclass: 'CRP.ux.PullRefreshFn',
			    snappingAnimationDuration:10,
	          	pullText: 'Pull down for more new Data!',
//		            locales: {
//		            	lastUpdatedText: 'pullRefresh.lastUpdatedText',
//		            	pullText: 'pullRefresh.pullRefreshText',
//		            	releaseText: 'pullRefresh.releaseRefreshText'
//		            },
	            refreshFn: function() {
	            	newsCtr.refreshListData();
	           	}
		    }],
		    listeners:[{
				fn:'keyupFun',
				event:'change',
				delegate:'#mysearch'
			}]
		},
		keyupFun:function(textfield,e,eOpts) {
			newsCtr.searchCont(textfield.getValue());
		}
});