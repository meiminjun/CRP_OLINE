/**
 * nav控制器
 * @desc 1：页面模块push/pop控制
 * 		 2：数据加载/提交 在对应功能模块控制
 * @author duwei/luyifan
 * @date 20141115
 */
Ext.define('CRP.controller.NavController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
        	main : 'main'
        },
        control: {}
    },
    /**
     * push 方法
     * @param viewName 需要push的view页面的名字
     * @param callback 传递nextview
     * @desc  复杂页面布局说明：1：函数pushToNext参数callback中处理，在publistload（callback函数）或ajaxfun（resultFun函数）中动态新增item项处理；
     * 					  2：childComponent单独抽出文件，动态添加xtype；
     * 					  3：view层精简布局，页面跳转快速响应和过度；
     * */
    pushToNext : function(viewName,callback){
    	try{
	    	var me = this,
	    		keyIndex = viewName.lastIndexOf('.'),
	    		key = viewName.substr(keyIndex < 0 ? 0 : (keyIndex + 1));
	    	if(!me[key]){
	    		me[key] = Ext.create(viewName,{
	    			disabled: true,
	    			zIndex: 1
	    		});
	    		me.setDragInteraction(me[key]);
	    	}
	    	//设置阴影
			me[key].maskContainer  = Ext.create('Ext.Container', {
    			style: 'background-color: transparent;',
    			zIndex: 1,
    		    masked: true
    		});
	    	Ext.Viewport.add(me[key].maskContainer);
	    	me[key].maskContainer.show();
	    	// 判断父节点阻止双击事件，不存在则添加到viewport,

	        if(!me[key].hasParent()){
	        	/*
	        	 *  解决android webview中anmation动画跳转，h5页面部分区域白屏；（参照小米mi2/华为荣耀机型）；
	        	 *  android Ext.dataview.List infinite列表无限循环属性即可生效；
	        	 *  解决方案为整体硬件加速，phoneGap WebView设置software(mainWebView.setLayerType(WebView.LAYER_TYPE_SOFTWARE,new android.graphics.Paint());)*/
        		if (Ext.os.is.Android){
		        	var draggable = me[key].draggableBehavior.draggable,
	        			infinite = me[key].down('list')&&me[key].down('list').config.infinite;
		        	
		        	Ext.Viewport.add(me[key]);
		        	// android閃屏（1/10概率）解決方案：GPU硬件加速使用draggable,否則show
		        	if(infinite){
		        		// 首次
			            if(me[key].isHidden()){
			            	var zindex = me[key].getZIndex();
			            	me[key].setZIndex(-1);
			            	me[key].setHidden(false);
			                Ext.Function.defer(function() {
			                	me[key].setZIndex(zindex);
					            draggable.setOffset(window.innerWidth, 0);
					            draggable.setOffset(0, 0, {
					                type: 'slideIn',
					                direction: 'left',
					                duration: 200
					            });
					            // 异步加载 
					            me.asynchronousDeferLoad(key,callback,400);
			                }, 100);
			            }else{
				            draggable.setOffset(window.innerWidth, 0);
				            draggable.setOffset(0, 0, {
				                type: 'slideIn',
				                direction: 'left',
				                duration: 200
				            });			   
				            // 异步加载 
				            me.asynchronousDeferLoad(key,callback,300);
			            }
		        	}else{
			        	me[key].show({
			                type: 'slideIn',
			                direction: 'left',
			                duration: 200
			            });	      
			        	// 异步加载 
			            me.asynchronousDeferLoad(key,callback,300);
		        	}
	        	}else{
		        	// ios and pc chrome 都采用show anmation动画跳转
		        	Ext.Viewport.add(this[key]);
		        	me[key].show({
		                type: 'slideIn',
		                direction: 'left',
		                duration: 200
		            });	        	
		        	// 异步加载 
		            me.asynchronousDeferLoad(key,callback,300);
	        	}
	        }
    	}catch(e){Ext.Logger.deprecate(e);}
    },
    /**
     * 异步加载当前页面
     * @param key
     * @param callback
     * @param deferMs
     */
    asynchronousDeferLoad : function(key,callback,deferMs){
    	try{
	    	var me = this;
	    	if(!me.nowActiveViewKey){
				me.nowActiveViewKey = [];
			}
			me.nowActiveViewKey.push(key);
			if(callback && typeof callback === 'function'){
				Ext.Function.defer(function(){
					me[key].setDisabled(false);
					callback(me[key]);
				},deferMs);
	    	}   	
    	}catch(e){Ext.Logger.deprecate(e);}
    },
    /**
	 * navigationview back（支持数字/xclass命名空间）
	 * android back鍵/返回按鈕/dragend返回統一調用此方法進行判斷返回刷新操作
	 * Ext.Function.defer 250ms進行數據請求，不需要清空頁面（和push調用的loaddata方法一致）
	 */
	popToPrev : function(value) {
		try{
			var me = this,
				count = 1,	
				vIndex,
				i;
			if(value){
				if(typeof value === 'number'){
					count = value > 0 ? (value > me.nowActiveViewKey.length ? me.nowActiveViewKey.length : value) : 1;
				}else if(typeof value === 'string'){
					vIndex = me.nowActiveViewKey.lastIndexOf(value);
					count = vIndex >= 0 ? (me.nowActiveViewKey.length - vIndex - 1): me.nowActiveViewKey.length;
				}
			}
			// drag和返回键count=1，返回主页count>1
			for(i = 0; i < count; i++){
				if( (!me.nowActiveViewKey) || me.nowActiveViewKey.length === 0){
					return false;
				}
				var key = me.nowActiveViewKey[me.nowActiveViewKey.length - 1],
					component = me[key],
					draggable = component.draggableBehavior&&component.draggableBehavior.draggable;
				
				me.nowActiveViewKey.pop();
	            (function(component,draggable){
	            	if(draggable){
	    	            // setOffset takes X, Y, and an animation object
	    	            draggable.setOffset(window.innerWidth, 0, {
	    	            	type: 'slideOut',
	    	            	direction: 'right',
	    	          	  	duration: 200
	    	            });	
	    	            // using setTimeout here to allow the animation to finish,
	    	            // then hide the component and set setOffset back to 0
	    	            Ext.Function.defer(function() {
	    	                //component.setHidden(true);
	    	            	// remove函数删除dom树，保留inneritem内存块，component使用autoDestroy:false
	    	            	
	    	            	//取消阴影
	    	            	if(component.maskContainer){
	    	            		Ext.Viewport.remove(component.maskContainer,false);
	    	            	}
	    	                Ext.Viewport.remove(component,false);
	    	                // params1:is destroy ;params2:is everthing
//	    	                component.removeAll(true,false);
	    	                draggable.setOffset(0,0);
	    	            }, 300);	
	            	}
	            })(component,draggable);
	            // 启用draggable事件
	            component.getDraggable().resumeEvents();	
	            // 异步清空
	            Ext.Function.defer(function(){me.clearCurrentPage(component,key);},500);
			}
			var view = me[me.nowActiveViewKey[me.nowActiveViewKey.length - 1]];
			view = view || me.getMain();
			if(view.needRefresh && view.refreshPageFn){
				view.needRefresh = false;
				Ext.Function.defer(function(){
					view.refreshPageFn();
				},500);				
			}
			return true;
	    }catch(e){Ext.Logger.deprecate(e);}
	},
    /*
     * 控制哪些页面需要刷新
     * */
    controlRefresh: function(value){
    	var me = this,
    		arr = [];
    	if(typeof value === 'string'){
    		var index = me.nowActiveViewKey.indexOf(value);
    		if(index < 0){
    			return;
    		}
    		arr = me.nowActiveViewKey.slice(0, index + 1);
    	}else{
    		return;
    	}
    	Ext.each(arr, function(item){
    		if(me[item]){
    			me[item].needRefresh = true;
    		}
    	});
    	me.getMain().needRefresh = true;
    },
	/**
	 *异步清空当前页面（返回操作）
	 *@desc push动作不能异步清空，返回异步清空
	 *@param component
	 */
	clearCurrentPage : function(view,key){
		try{
			var itemId = view.getItemId();
			
			// reset box-shadow style
//			view.setStyle('box-shadow: none;');
			
			// loadingMask hide
			CRP.ux.CustomLoading.hide();
			Ext.Ajax.abortAll();
			
			// destroy childComponent or refresh page view
			if(view.destroyChildFn){
				view.destroyChildFn();
			}
		}catch(e){Ext.Logger.deprecate(e);}
	},
    /**
     * 拖动返回 方法
     * @param component 需要设定返回功能的组件
     * */
    setDragInteraction: function(component) {
    	try{
	        var me = this;
        	me.dragObj = {
	            direction: 'horizontal',
	            constraint: {
	                min: {x: 0, y: 0},
	                // allows us to drag the entire width of the view
	                max: {x: window.innerWidth, y: 0}
	            },
	            listeners: {
	                dragend: function(draggable) {
	                    // if the user has dragged more than half the width of the 
	                    // screen, set the offset to width of the screen and hide the view.
	                	
	                    if(draggable.offset.x > window.innerWidth / 2) {
	                        /*// setOffset takes X, Y, and an animation object
	                        draggable.setOffset(window.innerWidth, 0, {
	                            type: 'slide',
	                            duration: 200
	                        });
	                        me.nowActiveViewKey.pop();
	                        // using setTimeout here to allow the animation to finish,
	                        // then hide the component and set setOffset back to 0
	                        Ext.Function.defer(function() {
	                            //component.setHidden(true);
	                        	// remove函数删除dom树，保留inneritem内存块，component使用autoDestroy:false
	                            Ext.Viewport.remove(component,false);
	                            draggable.setOffset(0,0);
	                        }, 300);*/
	                    	me.popToPrev();
	                    }
	                    // User didn't drag far enough so snap back.
	                    else {
	                        draggable.setOffset(0, 0, {
	                            type: 'slide',
	                            duration: 200
	                        });
	                    }
	                }
	            }
	        };
	        component.setDraggable(me.dragObj);
    	}catch(e){Ext.Logger.deprecate(e);}
    }
});
