//模态窗方法
function Elastic(e,msg,duration){
	duration=isNaN(duration)?3000:duration;  
	var m = document.createElement('div');  
	var cs=m.className += e;
	m.innerHTML = msg;  
	m.classList.add(cs); 
	document.body.appendChild(m);  
	setTimeout(function() {  
		var d = 0.5;  
		m.style.webkitTransition = '-webkit-transform ' + d + 's ease, opacity ' + d + 's ease';  
		m.style.opacity = '0';  
		setTimeout(function() { 
			document.body.removeChild(m) 
		}, d * 1000);
	}, duration);											
}

//透明遮罩层
function loading(show, bgColor, Color) {
	if(show){
		$(`<div id="loadingTips" style="background-color: ${bgColor};position: fixed;top: 0;z-index: 9999;bottom: 0; width: 100%; height:100%;"></div>`).appendTo("body");
	    $(`<div id="alert" style="top: 50%;left: 50%;position: absolute;">
		    <div class="loading-bottom layout" style="background: transparent;">
			    <span class="center">
				    <div class="wraps">
					    <div class="spinner">
						    <div class="spinner-container container1">
							    <div class="circle1" style="background-color: ${Color}"></div>
							    <div class="circle2" style="background-color: ${Color}"></div>
							    <div class="circle3" style="background-color: ${Color}"></div>
							    <div class="circle4" style="background-color: ${Color}"></div>
						    </div>
						    <div class="spinner-container container2">
							    <div class="circle1" style="background-color: ${Color}"></div>
							    <div class="circle2" style="background-color: ${Color}"></div>
							    <div class="circle3" style="background-color: ${Color}"></div>
							    <div class="circle4" style="background-color: ${Color}"></div>
						    </div>
						    <div class="spinner-container container3">
							    <div class="circle1" style="background-color: ${Color}"></div>
							    <div class="circle2" style="background-color: ${Color}"></div>
							    <div class="circle3" style="background-color: ${Color}"></div>
							    <div class="circle4" style="background-color: ${Color}"></div>
						    </div>
					    </div>
				    </div>
			    </span>
		    </div>
		</div>`).appendTo("#loadingTips");
	}else{
		$('#loadingTips').remove();
	}
};
//自定义跳转(全站)
$("body *").each(function () {
var url = $(this).attr('data-url');
if (url) {
    $(this).unbind('tap').on('click', function () {
      window.location.href = url
    });
}
});

const ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      document.body.classList.remove(bodyCls);
      document.scrollingElement.scrollTop = scrollTop;
      document.body.style.top = 0 + 'px';
    }
  };
})('modal-open');

//回车事件
jQuery.fn.extend({  
    enter: function(fn){  
        $(this).bind('keydown',function(event){  
            var e = event || window.event;  
            if(!e.ctrlKey && e.keyCode ==13){  
              if(typeof(fn)!='undefined'){  
                  fn.call(this);  
                  return false;//这句话阻止原有的回车换行事件的冒泡执行  
               }  
            }  
        });  
        return this;  
    }  
});
//滚动菜单(详情页、<返回顶部>)
function floor(totop,fixedevery,louceng) {
    this.totop = totop;
    this.fixedevery = fixedevery;
    this.louceng = louceng;
}
floor.prototype = {
    init: function () {
        var that = this;
        that.start();
        this.totopClick();
        this.fixedeveryClick();
    },
    start: function () {
        var that = this;
        $(window).on('scroll',function(){
            var winH=$(window).height();
            var iTop = $(window).scrollTop() || window.pageYOffset;//鼠标滚动的距离
            
            var header=$("header").height();
            if(iTop>header){
                $(that.totop).css('visibility','visible');
                $(that.louceng).each(function(){
                    if(winH+iTop - $(this).offset().top>winH/2){
                        $(that.fixedevery).removeClass('currentitem');
                        $(that.fixedevery).eq($(this).index()).addClass('currentitem');
                    }
                })
            }else{
                $(that.totop).css('visibility','hidden');
            }
        });
        $(window).on('load',function(){
            var winH=$(window).height();
            var iTop = $(window).scrollTop();//鼠标滚动的距离
            var header=$(".header").height();
            if(iTop>0){
                $(that.totop).css('visibility','visible');
                $(that.louceng).each(function(){
                    if(winH+iTop - $(this).offset().top>winH/2){
                        $(that.fixedevery).removeClass('currentitem');
                        $(that.fixedevery).eq($(this).index()).addClass('currentitem');
                    }
                })
            }else{
                $(that.totop).css('visibility','hidden');
            }
        });
    },
    totopClick: function () {
        var that = this;
        $(that.totop).click(function(){
            $('body,html').animate({"scrollTop":0},500)
        })
    },
    fixedeveryClick: function () {
        var that = this;
        $(that.fixedevery).click(function(){
            var t = $(that.louceng).eq($(this).index()).offset().top;
            $('body,html').animate({"scrollTop":t},500);
        });

    }

}
$(function(){
	//初始化垂直悬浮菜单(滚动)
	var objitem = new floor('.totop','.itemtitle .itemhead','.floorscroll');
	objitem.init()
})

//加入购物车计数
function Addcart(){
	var t = $("#item-input");	
    if(t.val()<=1){
        $('#item-min').attr('disabled',true);
        $('#item-min').css('background','#E5e4e4');	
    }
    $("#item-adds").click(function(){    
        t.val(parseInt(t.val())+1)
        if (parseInt(t.val())!=1){
            $('#item-min').attr('disabled',false);
            $('#item-min').css('background','#FFFFFF');
        }
      	if(t.val()>4){
			Elastic("ElasticClass","当前库存不足,请选择其他商品",2000);
      		$('#item-adds').attr('disabled',true);
            $('#item-adds').css('background','#E5e4e4');
      	}
    }) 
    $("#item-min").click(function(event){
        t.val(parseInt(t.val())-1);
        if (parseInt(t.val())==1){
            $('#item-min').attr('disabled',true);
            $('#item-min').css('background','#E5e4e4');
        }
      	$('#item-adds').attr('disabled',false);
        $('#item-adds').css('background','#FFFFFF');
    })  
}


//商品券加减按钮
function AddTicketNum(NumID) {
    try {
        var num = parseInt(document.getElementById(NumID).value);
        if (isNaN(document.getElementById(NumID).value)) {
            num = 1;
        }
        if (num >= 99) {
            num = 98;
        }
    }
    catch (e) {
        return false;
    }
    document.getElementById(NumID).value = num + 1;
 }

function MinusTicketNum(NumID) {
    try {
        var num = parseInt(document.getElementById(NumID).value);
        if (isNaN(document.getElementById(NumID).value)) {
            num = 1;
        }
    }
    catch (e) {
        return false;
    }
    if (num < 2) {
        return false;
    }
        document.getElementById(NumID).value = num - 1;
}

document.addEventListener('plusready', function() {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function() {
            webview.canBack(function(e) {
                if(e.canBack) {
                    webview.back();             
                } else {
                    //webview.close(); //hide,quit
                    //plus.runtime.quit();
                    //首页返回键处理
                    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                    var first = null;
                    plus.key.addEventListener('backbutton', function() {
                        //首次按键，提示‘再按一次退出应用’
                        if (!first) {
                            first = new Date().getTime();
                            console.log('再按一次退出应用');
                            setTimeout(function() {
                                first = null;
                            }, 1000);
                        } else {
                            if (new Date().getTime() - first < 1500) {
                                plus.runtime.quit();
                            }
                        }
                    }, false);
                }
            })
        });
    });