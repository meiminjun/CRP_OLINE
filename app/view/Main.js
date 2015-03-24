Ext.define('CRP.view.Main', {
    extend: 'Ext.Container',
	xtype:'main',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        autoDestroy: false,
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                cls: 'customToolBar',
                title:'Group Research',
                items: [
                    {
						xtype: 'button',
						ui: 'plain',
						iconCls: 'backBtnCls',
						iconMask: true,
						docked: 'left',
						handler: function(e) {
							mainCtr.mainBackBtnTapFun();
						}
		            },
                    {
                        xtype: 'button',
                        itemId:'collectBtn',
                        iconCls: 'collectBtnCls',
                        docked: 'right',
                        ui: 'plain',
                        iconMask: true,
                        handler:function(e) {
                        	mainCtr.jumpToCollect();
                        }
//                      text: 'MyButton1'
                    }
                ]
            },
            {
             	xtype:'mainList', 
                flex: 1,
                            
            }
        ]
    },
    refreshPageFn : function(){
    	var records = Ext.getStore('mainList').getRange();
    	
    	Ext.Array.each(records,function(record,index,countriesItSelf){
    		var lastVisitLocal = window.localStorage.getItem("lastVisit"+index),
    			lastVisitVal = CRP.util.PubOperation.dataFormatLogogram2(lastVisitLocal);
			if(!Ext.isEmpty(lastVisitVal)){
    			record.set('LastVisit','Last seen: '+lastVisitVal);
    		}
    	});
    }
});