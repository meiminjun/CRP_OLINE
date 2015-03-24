Ext.define('CRP.ux.override.picker.Picker', {
    override : 'Ext.picker.Picker',

//    config : {
//        doneButton   : {
//            locales   : {
//                text   : 'buttons.done'
//            }
//        },
//        cancelButton : {
//            locales   : {
//                text   : 'buttons.cancel'
//            }
//        }
//    }
    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            doneButton       = locales.doneButton,
            cancelButton     = locales.cancelButton,
            manager     = me.locale,
            defaultDoneButton = '',
            defaultcancelButton = '';
        
        if (doneButton) {
            if (Ext.isObject(doneButton)) {
            	defaultDoneButton = doneButton.defaultText;
            	doneButton       = doneButton.key;
            }

            doneButton = manager.get(doneButton, defaultDoneButton);

            if (Ext.isString(doneButton)) {
                me.setDoneButton(doneButton);
            }
        }
        
        if (cancelButton) {
            if (Ext.isObject(cancelButton)) {
            	defaultcancelButton = cancelButton.defaultText;
            	cancelButton       = cancelButton.key;
            }

            cancelButton = manager.get(cancelButton, defaultcancelButton);

            if (Ext.isString(cancelButton)) {
                me.setCancelButton(cancelButton);
            }
        }

        this.callParent(arguments);
    }
});