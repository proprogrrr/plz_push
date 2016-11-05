/**
 * 
 */

 function insertBook(){


	$.ajax({

			url: "http://localhost:7070/finalweb/bookInsert",
			type : "GET",
			dataType : "jsonp",
			jsonp : "callback",

			data :{

				imgbase64 : $("#img").attr("src"),
				isbn : $("[type=isbn]").val(),
				author: $("[type=author]").val(),
				price : $("[type=price]").val(),
				title : $("[type=title]").val()


			},

			success:function (result) {
				alert("도서 입력 완료 ");
			},
			error:function(){
				lert("업데이트 에러 발생! ");

			}

		 });

 }



$(function() {

	// image file load
	var imageLoader = document.getElementById('filePhoto');
	imageLoader.addEventListener('change', handleImage, false);

	function handleImage(e) {
		var reader = new FileReader();
		reader.onload = function (event) {
			$('.uploader img').attr('src',event.target.result);
		}
		reader.readAsDataURL(e.target.files[0]);
	}
});