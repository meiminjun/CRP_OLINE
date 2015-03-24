Ext.define('CRP.ux.override.Component', {
    override : 'Ext.Component',

    requires : [
        'CRP.ux.Manager'
    ],

    enableLocale : false,
    locale       : null,
    locales      : null,

    constructor : function(config) {
        var me = this;

        config = CRP.ux.Manager.isLocalable(me, config);

        me.callParent([config]);

        if (me.enableLocale) {
            me.setLocale(CRP.ux.Manager.getLanguage());
        }
    },

    setLocale : function(locale) {
        var me          = this,
            locales     = me.locales || me.getInitialConfig().locales,
            html        = locales.html,
            manager     = me.locale,
            defaultText = '';

        if (html) {
            if (Ext.isObject(html)) {
                defaultText = html.defaultText;
                html        = html.key;
            }

            html = manager.get(html, defaultText);

            if (Ext.isString(html)) {
                me.setHtml(html);
            }
        }
    }
});
