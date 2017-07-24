$(function(){
//判断移动端还是pc端
	function IsPC() {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone",
	                "SymbianOS", "Windows Phone",
	                "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}
	var IMGWIDTH = $(".home").width();
	var IMGHEIGHT = $(".home").height();
	var BGWIDTH = 640;
	var BGHEIGHT = 1136;
	var ZOOMNUM = IMGWIDTH / BGWIDTH;   //屏幕比
	function Size(width ,height){return {w:width,h:height}}
	function position(left,top){return {x:left,y:top}}
	function MoveImg(dom,url,x,y) {
		this.dom = dom;
		this.url = url;
		this.x = x;
		this.y = y;
		this.size = Size(0,0);
		this.pos = position(0,0);
		this.init();	
	}
	MoveImg.prototype.init = function() {
		var image = new Image();
		image.src = this.url;
		var _this = this;
		image.onload = function() {
			_this.size.w = parseInt(image.width * ZOOMNUM)
			_this.size.h = parseInt(image.height * ZOOMNUM)
			_this.pos.x = parseInt(_this.x * ZOOMNUM)
			_this.pos.y = parseInt(_this.y * ZOOMNUM)
			_this.dom.css("background","url('"+_this.url+"')");
			_this.dom.css("background-size","100% 100%");
			_this.setSize();
			_this.setPos();
		}
	}
	MoveImg.prototype.setSize = function()　{
		this.dom.css("width",this.size.w);
		this.dom.css("height",this.size.h)
	}
	MoveImg.prototype.setPos = function()　{
		this.dom.css("top",this.pos.x);
		this.dom.css("left",this.pos.y);
	}

//图片 大小和位置
	new MoveImg($('.logo'),"img/logo.png","100")
	new MoveImg($('.fingerprint-wrap'),"img/figure.png","500")
	new MoveImg($('.hold'),"img/font.png","550","80")
	new MoveImg($('.name'),"img/tucen.png","470")
	new MoveImg($('.next'),"img/la.png")
	new MoveImg($('.ball-wrap'),"img/ke3.png")
	new MoveImg($('.ball-in'),"img/ke2.png")
	new MoveImg($('.out'),"img/ke1.png")
	new MoveImg($('.qiu1'),"img/web.png")
	new MoveImg($('.qiu2'),"img/wechat.png")
	new MoveImg($('.qiu3'),"img/kaifa.png")
	new MoveImg($('.qiu4'),"img/yingyong.png")
	new MoveImg($('.qiu5'),"img/shuju.png")
	new MoveImg($('.qiu6'),"img/yunying.png")
	new MoveImg($('.qiu7'),"img/xianxia.png")
	new MoveImg($('.address-img'),"img/address.png","720")
	new MoveImg($('.contect'),"img/lianxi.png","70")
	new MoveImg($('.pop-cir'),"img/keji1.png","124")
	new MoveImg($('.pop-in'),"img/keji2.png","108","90")
	new MoveImg($('.pop-out'),"img/keji3.png","80","63")	
	new MoveImg($('.ball1-content1'),"img/webbase.png")
	new MoveImg($('.ball1-content2'),"img/wecahtbase.png")
	new MoveImg($('.ball1-content3'),"img/app.png")
	new MoveImg($('.ball1-content4'),"img/yinbase.png")
	new MoveImg($('.ball1-content5'),"img/shujubase.png")
	new MoveImg($('.ball1-content6'),"img/yunbase.png")
	new MoveImg($('.ball1-content7'),"img/xianxiabase.png")
	new MoveImg($('.pop-img1'),"img/webball.png","60")
	new MoveImg($('.pop-img2'),"img/wechatball.png","60")
	new MoveImg($('.pop-img3'),"img/appball.png","60")
	new MoveImg($('.pop-img4'),"img/yinyongbase.png","60")
	new MoveImg($('.pop-img5'),"img/shujuball.png","60")
	new MoveImg($('.pop-img6'),"img/yunball.png","60")
	new MoveImg($('.pop-img7'),"img/xiaxiaball.png","60")
	new MoveImg($('.close'),"img/close.png","40","490")
	new MoveImg($('.slider-set'),"img/sao.png")
	// new MoveImg($('.hand'),"img/hand.png","170","80")

// 触摸或点击进入页面
	function touchFinger() {
		if(IsPC()) {
			$(".fingerprint-wrap").on('click',function() {
				$('.home-wrap').hide();
					$('.home').addClass("bg-black").fadeOut();
					$(".main").fadeIn();
					swiperReady();
			})
		}else {
			var touchStart, touchEnd, touchTime
			$(".fingerprint-wrap").on('touchstart',function(e) {
				touchStart = e.timeStamp;
				e.preventDefault();
			})
			$(".fingerprint-wrap").on('touchmove',function(e) {
				 event.preventDefault();
			})
			$(".fingerprint-wrap").on('touchend',function(e) {
				touchEnd = e.timeStamp;
				if(touchEnd - touchStart > 500) {
					$('.home-wrap').hide();
					$('.home').addClass("bg-black").fadeOut();
					$(".main").fadeIn();
					swiperReady();
				}
			})
		}
	}
	touchFinger()
	window.writeFont = function () {
		var str_shi = '以时尚科技引领潮流';
			var str_jihe = '集合线上线下为一体';
			var str_tigong = '提供全面且独具创意的一站式服务';
			var jishu = 0;
			var hangshu = 1;
			$(".shi .gbiao").show();
			var mysetT = setInterval(function(){
					if(hangshu == 1 && jishu<str_shi.length){
						$(".shi .txtbox").html($(".shi .txtbox").html()+str_shi[jishu])
						jishu++;
						return;
					}else{
						if(hangshu == 1){
							hangshu =2;
							jishu =0
							$(".jihe").show()
							$(".shi .gbiao").hide()
						}
					}
					if(hangshu ==2 && jishu<str_jihe.length){
						$(".jihe .txtbox").html($(".jihe .txtbox").html()+str_jihe[jishu])
						jishu++;
						return
					}else{
						if(hangshu == 2){
							hangshu =3;
							jishu =0
							$(".tigong").show()
							$(".jihe .gbiao").hide()
						}
					}
					if(hangshu ==3 && jishu<str_tigong.length){
						$(".tigong .txtbox").html($(".tigong .txtbox").html()+str_tigong[jishu])
						jishu++;
						return
					}else{
						$(".tigong .gbiao").hide()
						clearInterval(mysetT)
					}
			},150)
		}
//详情
	getDialog()
	function getDialog() {
		var ballArr = [];
		var touchstart,touchend
		$(".ball-dia").each(function(index) {
			ballArr.push($(this))
			var _this = $(this);
			var _index = index;
			$(this).on("touchstart",function(e) {
				touchstart = e.timeStamp;
				$(this).parent().children().eq(_index+7).show();
			})
			$(this).on('touchmove',function(e) {
				 event.preventDefault();
			})
			$(this).on("touchsend",function(e) {
				touchend = e.timeStamp;
				if(touchend - touchstart > 200) {
					$(this).parent().children().eq(_index+7).show();
				}
			})
			$(".close").on("touchend",function() {
				_this.parent().children().eq(_index+7).hide();
			})
		})
	}
	$(".erwei").css("width", $(".erwei").width()*ZOOMNUM)
	$(".erwei").css("top",170*ZOOMNUM);
	$(".inter").css("top",620*ZOOMNUM);

	function swiperReady(){
		var mySwiper = new Swiper('.swiper-container', {
			direction : 'vertical',
			width: window.innerWidth,
			height: window.innerHeight,
			speed:300,
			freeMode : false,
			onInit: function(swiper){
				setCanvas()
			},
			onSlideChangeEnd: function(swiper){
				if(swiper.activeIndex == 1) {
					moveHand()
				      // alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
				}
			}
		})
	}
//星球闪烁
	function moveHand() {
		var handPos1Top = 170 * ZOOMNUM + "px";
		var handPos1left = 80 * ZOOMNUM + "px";
		var handPos2Top = 130 * ZOOMNUM + "px";
		var handPos2left = 320 * ZOOMNUM + "px";
		var handPos3Top = 280 * ZOOMNUM  + "px";
		var handPos3Left = 480 * ZOOMNUM  + "px";
		var handPos4Top = 460 * ZOOMNUM + "px";
		var handPos4Left = 260 * ZOOMNUM + "px";
		var handPos5Top = 580 * ZOOMNUM + "px";
		var handPos5Left = 500 * ZOOMNUM + "px";
		var handPos6Top = 760 * ZOOMNUM + "px";
		var handPos6Left = 320 * ZOOMNUM + "px";
		var handPos7Top = 800 * ZOOMNUM + "px";
		var handPos7Left = 110 * ZOOMNUM + "px";
		// $(".hand").css({"top":handPos1Top,"left":handPos1left})
		// $(".hand").animate(
		// 	{top:handPos2Top,left:handPos2left},1000).animate(
		// 	{top:handPos3Top,left:handPos3Left},1000).animate(
		// 	{top:handPos4Top,left:handPos4Left},1000).animate(
		// 	{top:handPos5Top,left:handPos5Left},1000).animate(
		// 	{top:handPos6Top,left:handPos6Left},1000).animate(
		// 	{top:handPos7Top,left:handPos7Left},1000,function() {
		// 		$(".hand").hide()
		// 	})
		$('.ball-pos').addClass('cir-shaing')
	}

})

