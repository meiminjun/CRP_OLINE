Ext.define("CRP.model.StockModel", {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.Field'
	],
	config: {
		fields: [{
			name:'GroupName',
			type:'string'
		},{
			name: 'StockName',
			type: 'string'
		}, {
			name: 'AskRealTime',
			type: 'string'
		}, {
			name: 'Currency',
			type: 'string'
		}, {
			name: 'ChangeRealTime',
			type: 'string'
		}, {
			name: 'Detail',
			type: 'object'
		}, {
			name: 'title',
			type: 'string'
		}, {
			name: 'Open',
			type: 'string'
		}, {
			name: 'MarketCapitalization',
			type: 'string'
		}, {
			name: 'DaysHigh',
			type: 'string'
		}, {
			name: 'YearHigh',
			type: 'string'
		}, {
			name: 'DaysLow',
			type: 'string'
		}, {
			name: 'YearLow',
			type: 'string'
		}, {
			name: 'Volume',
			type: 'string'
		}, {
			name: 'AverageDailyVolume',
			type: 'string'
		}, {
			name: 'PERatio',
			type: 'string'
		}, {
			name: 'DividendYield',
			type: 'string'
		}]
	}
});