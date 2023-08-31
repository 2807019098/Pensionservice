//搜索关键词提示(搜索页面)
$('#idNumber').on('keyup',function(){
    if($(this).val()==""){
        $('#keyBox').hide();
    }else{
        $('#keyBox').show();
    }
});
		
//热门搜索 (搜索页面)

$.ajax({
    type: 'GET',
    url: 'static/json/search.json',
    dataType: 'json',
    success: function(data){
        var arrLen = data.hot.length;
        var result = '';
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){                        				                        			
            	result +='<div class="word-break">'+data.hot[i].word+'</div>';								                        			                        			
            }
        }
        $('.hotbox').append(result);     
        hot();
        init();
		searchGo();
		latelyword();
		wordval();
    },
    error: function(xhr, type){
    	
    }
    
});

//搜索关键词提示(搜索页面)
$.ajax({
	type: 'GET',
    url: 'static/json/search.json',
    dataType: 'json',
    success: function(data){
        var arrLen = data.history.length;
        var result = '';
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){                        				                        			
            	result +='<li class="word-break layout-left searchinfo">'+data.history[i].word+'</li>';
            }
        }
        $('#keyBox ul').append(result);     
		wordval();
    },
    error: function(xhr, type){
    	
    }
})

//换一批(搜索页)
function hot(){
	var changeindex=1;
	var clickindex=2;
	$(".hot-word .word-break").each(function(index,element){      
		if(index/8<changeindex){

			element.className="word-break change"+changeindex;
		}else{
			changeindex++;
			element.className="word-break change"+changeindex;
		}
	})
	$(".change1").siblings().css("display","none");
	$(".change1").show();
	$(document).on('click','.hot-change',function(){
		if(clickindex<=changeindex){
			$(".change"+clickindex).siblings().css("display","none");
			$(".change"+clickindex).show();
			clickindex++;
		}else{
			clickindex=1;
			$(".change"+clickindex).siblings().css("display","none");
			$(".change"+clickindex).show();
		}

	});
}

//点击最近搜索赋值给搜索框(搜索页面)
function latelyword(){
	$(".searchdelete").delegate(".searchdelete>div", "click", function() {
		$("#idNumber").val($(this).text());
	});
}


/*搜索记录相关(搜索页面)*/
//从localStorage获取搜索时间的数组
var hisTime;
//从localStorage获取搜索内容的数组
var hisItem;
//从localStorage获取最早的1个搜索时间
var firstKey;

function init() {			
	//每次执行都把2个数组置空
	hisTime = [];
	hisItem = [];
	//模拟localStorage本来有的记录
	//localStorage.setItem("a",12333);
	//本函数内的两个for循环用到的变量
	var i = 0
	for(; i < localStorage.length; i++) {
		if(!isNaN(localStorage.key(i))) {
			hisItem.push(localStorage.getItem(localStorage.key(i)));
			hisTime.push(localStorage.key(i));
		}
	}
	i = 0;
	//执行init(),每次清空之前添加的节点
	$(".searchdelete").html("");
	for(; i < hisItem.length; i++) {
		//alert(hisItem);
		$(".searchdelete").prepend('<div class="word-break" id=""style=" z-index: 1000;">' + hisItem[i] + '</div>')
	}
}


//点击搜索(搜索页面)
function searchGo(){
	init();
	$("#search1").click(function() {
		$('.searchtitle').show();
		$('.his-dele').show();
		var value = $("#idNumber").val();//验证搜索内容
		var time = (new Date()).getTime();
		//模拟数据为空
		if(value=="0"){
			window.location.href="productlist.html?test=" + value
			return true;
		}
		if(!value) {
			layer.open({
			    content: '<i class="iconfont icon_empty">&#xe629;</i>',
			    shadeClose: false,
			    btn: '请填写搜索内容!',
			    style:'color:#808080',
			    end:function(){
			    	
			    }
			});
			return false;
		}

		//输入的内容localStorage有记录
		if($.inArray(value, hisItem) >= 0) {
			for(var j = 0; j < localStorage.length; j++) {
				if(value == localStorage.getItem(localStorage.key(j))) {
					localStorage.removeItem(localStorage.key(j));
				}
			}
			localStorage.setItem(time, value);
		}
		//输入的内容localStorage没有记录
		else {
			if(hisItem.length > 20) {
				firstKey = hisTime[0]
				localStorage.removeItem(firstKey);
				localStorage.setItem(time, value);
			} else {
				localStorage.setItem(time, value)
			}
		}
		init();
		//提交
		$("#searchform").submit();

	});
}


//回车事件
$("#searchform").on('keypress',function(e) {
    var keycode = e.keyCode;
    var searchName = $(this).val();
    if(keycode=='13') {
        e.preventDefault();
        //请求搜索接口 
        $("#search1").click();
    }
});

//清除记录功能
$("#his-dele").click(function() {
	var f = 0;
	for(; f < hisTime.length; f++) {
		localStorage.removeItem(hisTime[f]);
	}
	$(this).remove();
	$('.searchtitle').hide();
	init();
});

//点击复制给搜索框
function wordval(){
	$('.word-break').on('click',function() {
		var div = $(this).text();
		$('#idNumber').val(div);
		$("#search1").click();
	})
}