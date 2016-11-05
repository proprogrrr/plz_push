
$(function(){

	$.ajax({
		url : "http://localhost:7070/finalweb/session",
		type : "GET",
		dataType : "jsonp",
		jsonp : "callback",

		success : function(result){
			alert(result.result);

			if(!result.result){
				var out = $("<a href='#' id='logout'>로그아웃</a>");
				$("#check").empty();
				$("#check").append(out);
			}else{
				var in1 = $("<a href='login.html' id='login'>로그인</a>");
				$("#check").empty();
				$("#check").append(in1);
			}
		},
		error : function(){

		}
	})

});


$(document).on('click', '#logout', function(){


	$.ajax({
		url : "http://localhost:7070/finalweb/logout",
		type : "GET",
		dataType : "jsonp",
		jsonp : "callback",

		success : function(result){

			alert("로그아웃 되었습니다.");

			var in1 = $("<a href='login.html' id='login'>로그인</a>");
			$("#check").empty();
			$("#check").append(in1);
		},
		error : function(){
			alert("로그인 에러 발생!!");
		}
	})

});