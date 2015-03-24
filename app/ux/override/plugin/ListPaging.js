Ext.define('CRP.ux.override.plugin.ListPaging', {
    override : 'Ext.plugin.ListPaging',

    requires : [
        'CRP.ux.override.Component'
    ],

    constructor : function() {
        this.callSuper(arguments);
    },

    setLocale : function(locale) {
        
    	var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            loadMoreText        = locales.loadMoreText,
            noMoreRecordsText   = locales.noMoreRecordsText,
            manager     = me.locale,
            defaultLoadMoreText = 'Load More...',
            defaultNoMoreRecordsText   = 'No More Records';
    	
        if (loadMoreText) {
            if (Ext.isObject(loadMoreText)) {
                defaultLoadMoreText = loadMoreText.loadMoreText ;
                loadMoreText        = loadMoreText.key;
            }

            loadMoreText = manager.get(loadMoreText, defaultLoadMoreText);
            
            if (Ext.isString(loadMoreText)) {
                me.setLoadMoreText(loadMoreText);
            }
            
            noMoreRecordsText = manager.get(noMoreRecordsText, defaultNoMoreRecordsText);
            if(Ext.isString(noMoreRecordsText)){
            	me.setNoMoreRecordsText(noMoreRecordsText);
            }
        }

        me.callParent(arguments);
    }
});