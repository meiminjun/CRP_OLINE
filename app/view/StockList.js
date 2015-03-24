Ext.define('CRP.view.StockList', {
    extend: 'Ext.Container',
    xtype: 'stockList',
    requires: [
        'Ext.ux.AccordionList',
        'Ext.data.TreeStore',
        'Ext.ActionSheet'
    ],
    config: {
    	flex:1,
    	layout:'vbox',
        items: [{
                xtype: 'accordionlist',
                flex: 1,
                itemId:'stockList',
//				store:'stockList',
				headerItemTpl: [
		                '<tpl if="this.isExpanded(values)">',
		                    '<div style="color:rgb(245,244,244);font-size: 15px;font-weight:bold;padding-top: 11px;padding-right: 30px;">',
		                    '{[this.toCapital(values.GroupName)]}',
		                    '<img class="collapse" src="resources/images/down.png" width="14px" height="10px">',
		                    '</div>',
		                '<tpl else>',
		                    '<div style="color:rgb(245,244,244);font-size: 15px;font-weight:bold;padding-top: 11px;padding-right: 30px;">',
	                     	'{[this.toCapital(values.GroupName)]}',
		                    '<img class="collapse" src="resources/images/right.png" width="10px" height="14px">',		                    
		                    '</div>',
		                '</tpl>'
	            ].join(''),
                contentItemTpl: [
                    '<div class="row">',
                    	'<span class="right">{StockName}</span>',                  	
//                  	'<a class="updown"><span>+</span>{right}</a>',
                    	'<div class="middle">',
	                    	'<span class="midUp">{AskRealTime}</span>',
	                    	'<span class="midDown">{Currency}</span>',
                    	'</div>',
                    	'{[this.updateHtml(values.ChangeRealTime)]}',

                    '</div>',
                ].join(''),
                listConfig: {
					variableHeights : true,
					infinite : true,
					disableSelection : true,
					allowDeselect : false,
					loadingText: false,
					scrollToTopOnRefresh: false,
					scrollable: {
			            directionLock: true,
			            direction: 'vertical'
			        },
			        cls : 'stockList',
			        pressedCls: 'itemPressed',
		         	plugins: [
                    {
					    xclass: 'CRP.ux.PullRefreshFn',
			          	pullText: 'Pull down for more new Data!',
			          	style:"color:white",
	//		            locales: {
	//		            	lastUpdatedText: 'pullRefresh.lastUpdatedText',
	//		            	pullText: 'pullRefresh.pullRefreshText',
	//		            	releaseText: 'pullRefresh.releaseRefreshText'
	//		            },
			            refreshFn: function() {
			            	stockCtr.StockListRefresh();
			           	}
			    	}]
				},				
//              cls:'stockList',
            },
            {
                xtype: 'actionsheet',
    		  	hideOnMaskTap:true,
    		  	name:'stockDetail',
                hidden: true,
                cls:'stockDetail',
                items: [
	                {
	                xtype: 'container',
					cls:"stockTable",
					name:'detail',
	                tpl: [
					'<h3 class="tableTitle">{title}</h3>',
                    '<table border="0" width="100%" height="100%">',
                    '<caption>Stock prices are 20 minutes delayed</caption>',
                    '<tr>',
                    '<th>OPEN</th>',
                    '<td>{Open}</td>',
                    '<th>CAP</th>',
                    '<td>{MarketCapitalization}</td>',
                    '</tr>',
                    '<tr>',
                    '<th>HIGH</th>',
                    '<td>{DaysHigh}</td>',
                    '<th>52W HIGH</th>',
                    '<td>{YearHigh}</td>',
                    '</tr>',
                    '<tr>',
                    '<th>LOW</th>',
                    '<td>{DaysLow}</td>',
                    '<th>52W LOW</th>',
                    '<td>{YearLow}</td>',
                    '</tr>',
                    '<tr>',
                    '<th>VOL</th>',
                    '<td>{Volume}</td>',
                    '<th>AVG VOL</th>',
                    '<td>{AverageDailyVolume}</td>',
                    '</tr>',
                    '<tr>',
                    '<th>P/E</th>',
                    '<td>{PERatio}</td>',
                    '<th>YIELD</th>',
                    '<td>{DividendYield}</td>',
                    '</tr>',
                    '</table>',
                    ]
	//              data:{"open":"112.05","cap":"668.58","high":"114.52","whigh":"119.75","low":"112.01","wlow":"70.51","vol":"33.72","avgvol":"51.74","pe":"17.67","yield":"1.7%"}
	            }]
            }
//          {
//              xtype: 'container',
//				cls:"stockTable",
//				name:'detail',
//              tpl: [
//					'<h3 class="tableTitle">{title}</h3>',
//                  '<table border="0" width="100%" height="100%">',
//                  '<caption>Stock prices are 20 minutes delayed</caption>',
//                  '<tr>',
//                  '<th>OPEN</th>',
//                  '<td>{Open}</td>',
//                  '<th>CAP</th>',
//                  '<td>{MarketCapitalization}</td>',
//                  '</tr>',
//                  '<tr>',
//                  '<th>HIGH</th>',
//                  '<td>{DaysHigh}</td>',
//                  '<th>52W HIGH</th>',
//                  '<td>{YearHigh}</td>',
//                  '</tr>',
//                  '<tr>',
//                  '<th>LOW</th>',
//                  '<td>{DaysLow}</td>',
//                  '<th>52W LOW</th>',
//                  '<td>{YearLow}</td>',
//                  '</tr>',
//                  '<tr>',
//                  '<th>VOL</th>',
//                  '<td>{Volume}</td>',
//                  '<th>AVG VOL</th>',
//                  '<td>{AverageDailyVolume}</td>',
//                  '</tr>',
//                  '<tr>',
//                  '<th>P/E</th>',
//                  '<td>{PERatio}</td>',
//                  '<th>YIELD</th>',
//                  '<td>{DividendYield}</td>',
//                  '</tr>',
//                  '</table>',
//                  ]
//          }
        ]    	
   }
});