$(function() {
	// 表单内容填完，按钮变黄色
	changeBtnColor()
	function changeBtnColor() {
		$('input').keyup(function(){
			var fz = 0;
			$('input').each(function(){
				if($(this).val()=="" || $(this).val() == $(this).attr("pl") ){
					$(".h-btn").removeClass("active")
					return;
				}
				fz++;
			})
			console.log(fz)
			console.log($('input').length)
			if(fz == $('input').length){
				$(".h-btn").addClass("active")
			}
		})
	}
})