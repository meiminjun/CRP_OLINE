/**
 * main控制器
 * @author duwei
 * @date 20150204
 */
Ext.define('CRP.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
        stores : ['MainListStore','OfflineLocalStore','NewsStore','FavoriteStore'],
	    models: ['MainListModel','NewsModel','OfflineLocalModel'],
		refs: {
			main : 'main list'
//			collectBtn: 'main #collectBtn'
		},
		control: {
			main:{
				itemsingletap: 'jumpToNews'
			}
//			collectBtn: {
//				tap:'jumpToCollect'
//			}
		}
	},
	/**
	 * 初始化
	 */
	init: function() {
		// 获取用户选择的语言缓存信息
		CRP.util.PubOperation.initLanguage();
	},
	/**
	 * 首页返回至AIO
	 *
	 * @param obj
	 * @param e
	 * @param eOpts
	 */
	mainBackBtnTapFun: function(obj, e, eOpts) {
		if (CRP.util.PubOperation.isGoogleChrome()) {
			Ext.Msg.alert('homeBack');
		} else {
			PhoneGapAPI.exit();
		}
	},
	/**
	 * 首页进入第二个页面(股票页面、News)页面
	 */
	jumpToNews:function(list, index, target, record, e, eOpts) {
		var me = this;
		if(index === 0) {	//进入股票页面
			navCtr.pushToNext('CRP.view.StockView', function(view) {
				stockCtr.stockInit(view, index, record);
				navCtr.controlRefresh('StockView');
			});
		}else {
			navCtr.pushToNext('CRP.view.News', function(view) {
				newsCtr.newsListInit(view, index, record);
				navCtr.controlRefresh('News');
			});
		}
		me.index = index;
		window.localStorage.removeItem("lastVisit"+index);
		window.localStorage.setItem("lastVisit"+index, Ext.Date.format(new Date(),"Y-m-d H:i:s"));
	},
	//进入收藏页面
	jumpToCollect:function() {
		navCtr.pushToNext('CRP.view.Favorite',function(view){
			favoriteCtr.favoriteInit(view);
		});
	},
	goToDetail:function(attUrl,newsId,physicalFileName,categoryId) {
//		if(attUrl&&newsId&&physicalFileName) {
//          alert("url:"+attUrl+"-----newsId:"+newsId+"-----filName--"+physicalFileName);
//          PhoneGapAPI.checkAtt(attUrl,newsId);
//      }
		navCtr.pushToNext('CRP.view.News', function(view) {
			if(categoryId) {
				newsCtr.pushNewsList(view, categoryId);
			}
		});
		if(Ext.os.is.iOS) {
			if(attUrl&&newsId) {
	            PhoneGapAPI.checkAtt(attUrl,newsId);
	        }
		}
	}
});
