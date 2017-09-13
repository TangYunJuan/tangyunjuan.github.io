$(function() {
	// 身份证号码验证
	var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	function isCardID(sId){
		 var iSum=0 ;
		 var info="" ;
		 if(!/^\d{17}(\d|x)$/i.test(sId)) return false;
		 sId=sId.replace(/x$/i,"a");
		 if(aCity[parseInt(sId.substr(0,2))]==null) return false;
		 sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
		 var d=new Date(sBirthday.replace(/-/g,"/")) ;
		 if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false;
		 for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
		 if(iSum%11!=1) return false;
		 //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
		 return true;
	}
	// input 点击 内容消失
	setInput()
	function setInput() {
	 	$("input").each(function(){
	 		if($(this).val() == "") {
	 			$(this).val($(this).attr("pl"));
	 		}
			
		})
		$("input").focus(function() {
		//操作
			$(".error-content").text(" ");
			if($(this).val()==$(this).attr("pl")){
				$(this).val("").css("color","#000")
			}
	    });
	    $("input").blur(function() {
		//操作
			if($(this).val()=="")
				$(this).val($(this).attr("pl")).css("color","#8d8d8d")
	    });
	}

	// 注册信息验证
	function examineForm() {
		var pattern = /^1[34578]\d{9}$/;
		if($(".user-name").val() == "" || $(".user-name").val() == null || $(".user-name").val() == "请输入姓名") {

			$(".error-content").text("* 请输入您的姓名");
			return false;
		}
		if($(".user-card").val() == "" || $(".user-card").val() == "请输入身份证号码"|| !isCardID($(".user-card").val())) {
			$(".error-content").text("* 身份证号码输入错误");
			return false;
		}
		if(!pattern.test($(".user-number").val()) || $(".user-number").val() == "请输入手机") {
			$(".error-content").text("* 手机号码错误");
			return false;
		}
		if($(".user-yan").val() == "" || $(".user-yan").val() == null) {
			$(".error-content").text("* 请输入验证码");
			return false;
		}
		if($(".user-sms").val() == "" || $(".user-sms").val() == null) {
			$(".error-content").text("* 请输入短信验证码");
			return false;
		}
		if($(".user-sms").val()!==yanzhengma){
			$(".error-content").text("*短信验证码错误");
			yanzhengma="";
			return false;			
		}
		if($(".user-city").val() == "" || $(".user-city").val() == null || $(".user-city").val() == "请选择城市") {
			$(".error-content").text("* 请选择城市");
			return false;
		}
		
		return true;
	}
	$(".sms-code").on("touchstart",function() {
		$(this).css("background","#dedede")
	})
	// 提交表单内容
	$("#btn").on("touchstart",function() {
		if(examineForm()) {
			$(".error-content").text(" ");
			 $.ajax({
		           url : path+"/user/add.html",
		           data: {
		        	   name:$(".user-name").val(),
		        	   idNumber:$(".user-card").val(),
		        	   phone:$(".user-number").val(),
		        	   city:$(".user-city").val()       	   
		           },
		           type : "POST",
		           datatype : "json",
		           async: false,
		           success : function(datas) {
		        	   var json =JSON.parse(datas);
		        	   if(json.code==200){
		        		   layer.msg(json.msg, {time: 2000},function(){                                
  	   	    				 window.location="/home.html";
  	   	    				});  
		        	   }else{
		        		   	alert(json.msg);
		        	   }
		           }
		       });  
		  }
	});		

	// 贷款页信息验证
	function applicationForm() {
		var pattern = /^1[34578]\d{9}$/;
		if($(".l-user-name").val() == "" || $(".l-user-name").val() == null || $(".l-user-name").val() == "请输入姓名") {
			$(".error-content").text("* 请输入姓名");
			
			return false;
		}
		if($(".l-user-id").val() == "" || $(".l-user-id").val() == "请输入身份证号码"|| !isCardID($(".l-user-id").val())) {
			$(".error-content").text("* 身份证号码输入错误");
			console.log($(".l-user-name").val());
			return false;
		}
		if(!pattern.test($(".l-user-phone").val()) || $(".l-user-phone").val() == "请输入手机") {
			$(".error-content").text("* 手机号码错误");
			return false;
		}
		if($(".l-user-city").val() == "" || $(".l-user-city").val() == null || $(".l-user-city").val() == "请选择城市") {
			$(".error-content").text("* 请选择城市");
			return false;
		}
		
		return true;
	}
	//选择城市时提示消失
	$(".choose-city").on("touchstart",function() { $(".error-content").text(" ");})
	//贷款页表单验证
	$(".application-btn").on("touchstart",function() {
		console.log("1")
		if(applicationForm()) {
			/* $.ajax({
		           url : path+"/member/add.html",
		           data: {
		        	   name:$(".user-name").val(),
		        	   idNumber:$(".user-card").val(),
		        	   phone:$(".user-number").val(),
		        	   city:$(".user-city").val()       	   
		           },
		           type : "POST",
		           datatype : "json",
		           async: false,
		           success : function(datas) {
		        	   var json =JSON.parse(datas);
		        	   if(json.code==200){
		        		   window.location=path+"/home.html"
			        	   if(json.data!=0){
			        		   window.location=path+'/user/kkd.html';     
			        	   }else if(json.data==0){
			        		   window.location='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4NDc4MzM2OQ==&scene=116#wechat_redirect';
			        	   }
		        	   }else{
		        		   	layer.msg(json.msg);
		        	   }
		           }
		       });  */
		}
	})

	//企业身份非空
	function companyAndPersonForm() {
		if($(".weui-select").val()==1){
			if($(".comp-name").val() == "" || $(".comp-name").val() == null ||$(".comp-name").val() == "请输入公司名称") {
				$(".error-content").text("* 请输入公司名称");
				console.log("aaa")
				return false;
			}
			if($(".comp-address").val() == "" || $(".comp-address").val() == null || $(".comp-address").val() == "请输入公司地址") {
				$(".error-content").text("* 请输入公司地址");
				return false;
			}
			if($(".comp-person").val() == "" || $(".comp-person").val()==null || $(".comp-person").val() == "请输入公司法人") {
				$(".error-content").text("* 请输入公司法人");
				return false;
			}
			if($(".comp-number").val() == "" || $(".comp-number").val()== "请输入公司电话" ) {
				$(".error-content").text("* 请输入公司电话");
				return false;
			}
			/*if($(".weui-uploader__files").children().length == 0) {
				$(".error-content").text("* 上传图片");
				return false;
			}*/	
			if(idcardBase64==""){
				$(".error-content").text("* 上传身份证附件");
				return false;
			}
			if(busBase64==""){
				$(".error-content").text("* 上传营业执照附件");
				return false;
			}
			return true;
		}else{
			if($(".person-name").val() == "" || $(".person-name").val() == null ||$(".person-name").val() == "请输入姓名") {
				$(".error-content").text("* 请输入姓名");
				console.log("aaa")
				return false;
			}
			if($(".person-idcard").val() == "" || $(".person-idcard").val() == null || $(".person-idcard").val() == "请输入身份证号码") {
				$(".error-content").text("* 请输入身份证号码");
				return false;
			}
			if($(".person-bus").val() == "" || $(".person-bus").val() == null ||$(".person-bus").val() == "请输入所在城市") {
				$(".error-content").text("* 请输入所在城市");
				return false;
			}
			if(idcardBase64==""){
				$(".error-content").text("* 上传身份证附件");
				return false;
			}
			return true;
		}
	}
	//身份表单验证
	$(".company-btn").on("touchstart",function() {
		console.log("renzheng")
		if(companyAndPersonForm()) {
			var result= new Object();
				result.type=$(".weui-select").find("option:selected").text();
				result.idCard=idcardBase64;
				result.state=1;
				if($(".weui-select").val()==1){
					result.name=$(".comp-name").val();
				    result.address=$(".comp-address").val();
				    result.legalPerson=$(".comp-person").val();
				    result.busNumber=$(".comp-bus").val();
				    result.phone=$(".comp-number").val();
				    result.licenseAttachment=busBase64;
				}else{
					result.personName= $(".person-name").val();
				    result.city=$(".person-bus").val();
				    result.idCardNumber=$(".person-idcard").val();
				}
			 $.ajax({
		           url : path+"/member/updateAuthInfo.html",
		           data: result,
		           type : "POST",
		           datatype : "json",
		           async: false,
		           success : function(datas) {
		        	   var json =JSON.parse(datas);
		        	   layer.msg(json.msg);
		           }
		       });  
		   }
	  })

	//绑定银行卡验证
	function getBankCard() {
		if($(".card-username").val() == "" || $(".card-username").val() == null ||$(".card-username").val() == "姓名") {
			$(".error-content").text("* 请输入姓名");
			return false;
		}
		if($('.bank-number').val().length < 14) {
			$(".error-content").text("* 请输入银行卡号");
			return false;
		}
		return true;
	}
	$('.add-card-btn').on('touchstart',function() {
		console.log('list')
		if(getBankCard()) {
			$('.h-btn a').attr('href',"card-information.html");
		}
	})
	//银行卡信息验证
	function verifiBankCard() {
		var pattern = /^1[34578]\d{9}$/;
		if(!pattern.test($(".bank-phone").val()) || $(".bank-phone").val() == "请输入手机号") {
			$(".error-content").text("* 手机号码错误");
			return false;
		}
		if(!$('.weui-agree__checkbox').is(':checked')) {
			$(".error-content").text("* 未同意协议");
			return false;
		}
		return true;
	}
	$('.card-infor-btn').on('touchstart',function() {
		if(verifiBankCard()) {
			// $('.h-btn a').attr('href',"card-information.html");
		}
	})

	
})

