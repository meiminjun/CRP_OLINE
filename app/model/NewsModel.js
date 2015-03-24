/**
 * 新闻列表model
 * @class CRP.model.NewsModel
 */
Ext.define('CRP.model.NewsModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                name: 'NewsID',
                type : 'string'
            },{
            	name:'ImageUrl',
            	type : 'string'
            },{
            	name:'NewsTitle',
            	type : 'string'
            },{
            	name:'NewsContent',
            	type : 'string'
            },{
            	name:'FavoriteStatus',
            	type : 'string'
            },{
            	// 0:未下载完成，1：下载完成，2：下载中
            	name:'Download',
            	type : 'auto',
            	defaultValue : 0
            },{
            	name:'CreateTime',
            	type : 'string'
            },{
            	name:'UpdateTime',
            	type: 'string'
            },{
            	name:'ReadStatus',
            	type : 'string'
            },{
            	name: 'CreatorUserEmail',
            	type : 'string'
            },{
            	name: 'AttachmentUrl',
            	type : 'string'
            },{
            	name: 'AuthorUserEmail',
            	type: 'string'
            },{
            	// 顯示名稱
            	name : 'AttachmentName',
            	type : 'auto'
            },{
            	// 物理文件名
            	name : 'PhysicalFileName',
            	type : 'auto'
            },{
            	name : 'AuthorTime',
            	type : 'string'
            }
        ]
    }
});