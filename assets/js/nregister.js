

	function registerInfo(){


		$.ajax({
			url : "http://localhost:7070/finalweb/memberInsert",
				type : "GET",
				dataType : "jsonp",
				jsonp : "callback",
				data : {
					id : $(".id").val(),
					password : $(".password").val(),
					email : $(".email").val()
			},
			success : function(result){
				alert("정상적으로 처리되었습니다.");

			},
			error : function(){
				alert("업데이트 에러 발생!!");
			}
		});


	}
