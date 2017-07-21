$(function() {
	var IMGWIDTH = $(".home").width();
	var IMGHEIGHT = $(".home").height();
	console.log(IMGWIDTH+","+IMGHEIGHT)
	var BGWIDTH = 640;
	var BGHEIGHT = 1136;
	var ZOOMNUM = IMGWIDTH / BGWIDTH;
	console.log(ZOOMNUM)
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
		// console.log(this.x)	
	}
	MoveImg.prototype.init = function() {
		var image = new Image();
		image.src = this.url;
		// console.log(this.url)
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
		// console.log(this.size.h)
		this.dom.css("width",this.size.w);
		this.dom.css("height",this.size.h)
		// console.log(this.dom.style.width)
	}
	MoveImg.prototype.setPos = function()　{
		this.dom.css("top",this.pos.x);
		this.dom.css("left",this.pos.y);
		// console.log(this.dom.style.width)
	}
	new MoveImg($('.logo'),"img/logo.png","100")
	new MoveImg($('.fingerprint-wrap'),"img/figure.png","500")
	new MoveImg($('.hold'),"img/font.png","550","50")
	new MoveImg($('.name'),"img/tucen.png","480")
	new MoveImg($('.next'),"img/la.png","1080")
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
	new MoveImg($('.contect'),"img/lianxi.png","80")
	new MoveImg($('.erwei'),"img/er.png","200")



	function touchFinger() {
		var touchStart, touchEnd, touchTime
		$(".fingerprint-wrap").on('touchstart',function(e) {
			touchStart = e.timeStamp;
		})
		$(".fingerprint-wrap").on('touchmove',function(e) {
			 event.preventDefault();
		})
		$(".fingerprint-wrap").on('touchend',function(e) {
			touchEnd = e.timeStamp;
			if(touchEnd - touchStart > 0) {
				$('.home-wrap').hide();
				$('.home').addClass("bg-black").fadeOut();
				$(".main").fadeIn();
				setTimeout(setCanvas,700)
				setTimeout(writeFont,1800)
			}
		})

	}
	touchFinger()
	
	function writeFont() {
		var str_shi = '以时尚科技引领潮流';
			var str_jihe = '集合线上线下为一体';
			var str_tigong = '提供全面且独具创意的一站式服务';
			var jishu = 0;
			var hangshu = 1;
			$(".shi .gbiao").show();
			var mysetT =  setInterval(function(){
					if(hangshu == 1&&jishu<str_shi.length){
						$(".shi .txtbox").html($(".shi .txtbox").html()+str_shi[jishu])
						jishu++;
						return
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
					console.log(1)

			},200)
		}
	
})