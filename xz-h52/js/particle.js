 function setCanvas() {
		canvas = document.getElementById("cas");
		context = canvas.getContext('2d');
		focallength = 250; //焦距

		var dots = getimgData(document.getElementById('name').value); // 传入要绘的文字

		var pause = false;//暂停?

		$('#cas').width($(".home").width());
		$('#cas').height($(".home").height());
		initAnimate();// 产生 随机点位置
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
		        else {
		        }
		        dot.paint();
	        })

			if (!pause) {
				if ("requestAnimationFrame" in window) {
					requestAnimationFrame(animate);//启动 小球 动画
				}
				else if ("webkitRequestAnimationFrame" in window) {
					webkitRequestAnimationFrame(animate);
				}
				else if ("msRequestAnimationFrame" in window) {
					msRequestAnimationFrame(animate);
				}
				else if ("mozRequestAnimationFrame" in window) {
					mozRequestAnimationFrame(animate);
				}
			}

	    }


		
	} //window.onload End
		Array.prototype.forEach = function(callback) {
			for (var i = 0; i < this.length; i++) {
				callback.call(this[i]);
			}
		}
		function getimgData(text) {
			drawText(text);//生成文字
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height); //复制指定区域中像素点位置
			// context.clearRect(0, 0, canvas.width, canvas.height);//清空给定矩形内的指定像素
			var dots = [];
			console.log('画布宽度',imgData.width,imgData.height)
			console.log('画布点',imgData.data)
			for (var x = 0; x < imgData.width; x +=6) {
				for (var y = 0; y < imgData.height; y += 6) {
					var i = (y * imgData.width + x) * 4;
					// console.log('取点',i)
					if (imgData.data[i] >= 128) {
					// console.log('>=128',imgData.data[i])
					var dot = new Dot(x - 3, y - 3, 0, 1);//(centerX, centerY, centerZ, radius)

					// console.log(dot)
					dots.push(dot);// 
					}
				}
			}
			// console.log(dots)
			return dots;
		}

		function drawText(text) {
			context.save() //用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作
			context.font = "180px 微软雅黑";
			context.fillStyle = "rgba(255,255,255,0.5)";
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.fillText(text, canvas.width / 2, 200);
			context.restore(); //用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影
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
				//arc() 来创建圆arc(x,y,r,sAngle,eAngle,counterclockwise)
				/*
					*x	圆的中心的 x 坐标。
					*y	圆的中心的 y 坐标。
					*r	圆的半径。
					*sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
					*eAngle	结束角，以弧度计。
					*counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
				*/
				context.arc(canvas.width / 2 + (this.x - canvas.width / 2) * scale, canvas.height / 2 + (this.y - canvas.height / 2) * scale, this.radius * scale, 0, 2 * Math.PI);
				context.fillStyle = "rgba(255,255,255," + scale + ")";//填充颜色
				context.fill();//填充
				context.restore();
			}
		}

