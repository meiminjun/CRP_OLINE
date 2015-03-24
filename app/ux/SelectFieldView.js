/**
 * 搜索历史 最近5条记录
 * 水电表搜索历史记录
 * @author duwei
 * @create 2014-01-17
 */
Ext.define('CRP.ux.SelectFieldView', {
	extend : 'Ext.dataview.List',
	xtype : 'selectFieldView',
	requires : ['Ext.Toolbar','Ext.Button'],
	config : {
		// We give it a left and top property to make it floating by default
        left: 0,
        top: 0,
        
        // Make it modal so you can click the mask to hide the overlay
        modal: false,
        hideOnMaskTap: true,

        // Make it hidden by default
        hidden: true,

        // Here we specify the #id of the element we created in `index.html`
        contentEl: 'content',

        // Style the content and make it scrollable
        styleHtmlContent: true,
        scrollable: false,
        loadingText : false,
        pressedCls : 'customListItem-item-pressed',
		selectedCls : 'customListItem-item-selected',
		
        itemHeight : 28,
        itemTpl: '<div class="defaultFont-style text-overflow">{title}</div>',
        cls : 'selectFieldList',
        store : 'SelectFieldView',
        flex : 1
	}
});