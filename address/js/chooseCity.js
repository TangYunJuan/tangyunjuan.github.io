$(function() {
	$('#showPicker').on('click', function () {
	    weui.picker(cityData, {
	        onConfirm: function (result) {
	        	$("#userResult").val(cityData[result].label)
	        	$("#userResult").css('color',"#000");
	        	$('.content').each(function() {
	        		console.log($(this).attr("pl"),$(this).val())
	        		if($(this).val() == $(this).attr("pl")) {
	        			$(".h-btn").removeClass("active");
	        		}else {
	        			$(".h-btn").addClass("active");
	        		}
	        	})
	        }
	    });
	});

	changeBtnColor()
	function changeBtnColor() {
		$('.content').keyup(function(){
			var fz = 0;
			$('.content').each(function(){
				if($(this).val()=="" || $(this).val() == $(this).attr("pl") ){
					$(".h-btn").removeClass("active")
					return;
				}
				fz++;
			})
			console.log(fz)
			console.log($('.content').length)
			console.log($(".user-city").val())
			if(fz == $('.content').length && $(".city").val() !== ""){
				$(".h-btn").addClass("active")
			}
		})
	}
})
