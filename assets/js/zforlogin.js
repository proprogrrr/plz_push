

$(document).on('click', '#login', function() {

	var id = $("#id").val();
	var password = $("#password").val();
	alert("id는"+id+"입니다.");


	$.ajax({

		// url : 서버 프로그램에 대한 url
		url:"http://localhost:7070/finalweb/login",
		// type: 전송방식

		type: "GET",
		// 만약 서버쪽에서 보내주는 데이터가 JSON이면

		dataType : "jsonp",
		//클라이언트가 서버쪽에 보내주는 데이터

		jsonp : "callback",

		data:{


			id : $("#id").val(),
			password : $("#password").val()

		},

		//서버쪽 프로그램을 실행시키는 과정이 성공하면
		success : function(result){

			if(result==true){
				alert("로그인 성공");

				$(location).attr('href', "index.html");

			}
			else{
				alert("로그인 실패")
			}


		},
		//서버쪽 프로그램을 실행시키는 과정이 실패하면!!
		error : function(){
			alert("서버 에러!!!");
		}
	});

});



$(document).on('click', '#join', function() {

	var id = $("#id").val();
	var password = $("#password").val();
	var email = $("#email").val();


     if(id==""){
		alert("ID를 입력하세요!!");
	}

	else if(password==""){
		alert("비밀번호를 입력하세요!!")
	}
	else if(email==""){
		alert("email을 입력하세요!!")
	}

	else{
		$.ajax({
			// url : 서버 프로그램에 대한 url
			url:"http://localhost:7070/finalweb/memberInsert",
			// type: 전송방식
			type: "GET",
			// 만약 서버쪽에서 보내주는 데이터가 JSON이면

			dataType : "jsonp",
			//클라이언트가 서버쪽에 보내주는 데이터
			jsonp : "callback",

			data:{

				id : $("#id").val(),
				password : $("#password").val(),
				email : $("#email").val()

			},

			//서버쪽 프로그램을 실행시키는 과정이 성공하면
			success : function(result){

				alert("회원가입이 완료되었습니다.");
				$(location).attr('href', "index.html");
			},
			//서버쪽 프로그램을 실행시키는 과정이 실패하면!!
			error : function(){
				alert("회원가입 실패!!")
			}
		});
	}
});






