$(function(){  	
	$('.input-file2').on('touchend',function() {
		uploadImg($('.input-file2'),$('.uploader-file2'))
	})
	$('.input-file1').on('touchend',function() {
		uploadImg($('.input-file1'),$('.uploader-file1'))
	})
	function uploadImg(a,b) {
        var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
            $uploaderInput = a,
            $uploaderFiles = b;

        $uploaderInput.on("change", function(e){
            var src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;

        	if($(this).parent().prev().children().length > 0) {
				return;
			}
            for (var i = 0, len = files.length; i < len; ++i) {
                var file = files[i];

                if (url) {
                    src = url.createObjectURL(file);
                } else {
                    src = e.target.result;
                }

                $uploaderFiles.append($(tmpl.replace('#url#', src)));
            }
        });
        $uploaderFiles.on("click", "li", function(){
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.show();
            $(this).addClass("chooseUpload");
        });
        $gallery.on("click", function(){
            $gallery.hide();
        });
        $(".weui-icon-delete").on('click',function() {
        	$(".chooseUpload").remove();
        })
    }

});