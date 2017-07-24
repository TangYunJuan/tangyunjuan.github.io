function setCanvas() {
	var yImg = new Image();
	yImg.src = "img/xz.png";
	yImg.onload = function() {
		canvas = document.getElementById("cas");
		context = canvas.getContext('2d');
		focallength = 250; //焦距
		canvas.width = $(".xz").width();
        canvas.height = $(".xz").height();
		var dots = getimgData(yImg)

		var pause = false;//暂停
		initAnimate()

		function initAnimate() {
			dots.forEach(function() {
				this.x = Math.random() * canvas.width;	//圆心位置 X
				this.y = Math.random() * canvas.height;
				this.z = Math.random() * focallength * 2 - focallength;

				this.tx = Math.random() * canvas.width;	//文字后随机位置
				this.ty = Math.random() * canvas.height;
				this.tz = Math.random() * focallength * 2 - focallength;
				this.paint();
			});
	        animate();

	    }
	    		//计算帧速率
		var lastTime;
		var derection = true;
		function animate() {
	        animateRunning = true;
	        var thisTime = +new Date();//开始 时间
	        context.clearRect(0, 0, canvas.width, canvas.height);//清空 画布
	        dots.forEach(function() {
	        	var dot = this;	        
		        if (derection) {
		            if (Math.abs(dot.dx - dot.x) < 0.1 && Math.abs(dot.dy - dot.y) < 0.1 && Math.abs(dot.dz - dot.z) < 0.1) {
		                dot.x = dot.dx;
		                dot.y = dot.dy;
		                dot.z = dot.dz;
		                pause = true;
		                
		                // if (thisTime - lastTime < -400) derection = false;
		            } else {
		                dot.x = dot.x + (dot.dx - dot.x) * 0.1;//朝向 文字位置
		                dot.y = dot.y + (dot.dy - dot.y) * 0.1;
		                dot.z = dot.z + (dot.dz - dot.z) * 0.1;
		                lastTime = +new Date()
		                pause = false;
		            }
		        }
		        dot.paint();
	        })
	       	if (!pause) {
	       		setTimeout(animate,50)
			}else{
				$('.name').animate({opacity:1},1000,function(){
					writeFont();
				});
				
			}
		}


	}

}
Array.prototype.forEach = function(callback) {
	for (var i = 0; i < this.length; i++) {
		callback.call(this[i]);
	}
}
function getimgData(theyImg) {

	var tuheHeight = canvas.height * 0.12 ;
	console.log(tuheHeight)
	context.drawImage(theyImg, canvas.width / 2 - theyImg.width / 2,tuheHeight);
	var imgData = context.getImageData(0, 0, canvas.width, canvas.height); //复制指定区域中像素点位置
	// context.clearRect(0, 0, canvas.width, canvas.height);//清空给定矩形内的指定像素
	var dots = [];
	for (var x = 0; x < imgData.width; x += 8) {
		for (var y = 0; y < imgData.height; y += 4) {
			var i = (y * imgData.width + x) * 4;
			console.log('取点')
			if (imgData.data[i] >= 2) {
			var dot = new Dot((Math.random()-0.5)*4+x, (Math.random()-0.5)*4 +y, 0, 1);//(centerX, centerY, centerZ, radius)
			dots.push(dot);// 
			}
		}
	}
	console.log(dots)
	return dots;
}

var Dot = function(centerX, centerY, centerZ, radius) {
	this.dx = centerX;  //文字点 位置
	this.dy = centerY;
	this.dz = centerZ;
	this.tx = 0;		//圆心位置 X
	this.ty = 0;		//圆心位置 z
	this.tz = 0;		//圆半径 r
	this.z = centerZ;
	this.x = centerX;
	this.y = centerY;
	this.radius = radius;
}
Dot.prototype = {
	paint: function() {
		context.save();
		context.beginPath();//丢弃任何当前定义的路径并且开始一条新的路径
		var scale = focallength / (focallength + this.z);
		context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
		context.fillStyle = "rgba(255,255,255,.9)";//填充颜色
		context.fill();//填充
		context.restore();
	}
}