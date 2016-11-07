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
			alert("업데이트 에러 발생! ");

		}

	});

}






/*

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
*/






 function searchBook(){
    //입력상자에 키가 입력되면 무조거 호출
	 //우리가 원하는 건 enter key를 입력했을 때 서버와 통신


	 if(event.keyCode==13){
	 //사용자가 입력한 ISBN번호를 가져와서
	 //AJAX로 서버프로그램을 호출

		 $.ajax({

	   url: "http://localhost:7070/finalweb/bookList",
	   type : "GET",
	   
	   //서버로부터 오는 데이터가 JSON문자열이야.
	   //추가적으로 JSON문자열을 -> JavaScript객체로 자동 변환.
		//JSONP방식으로 사용할거면 jsonp라는 값을 이용
	   dataType : "jsonp",
	   jsonp : "callback",

	   data :{

	     keyword :  $("#keyword").val()

	   },


	     success : function(result){
             //result는 결국 서버에서 오는 배열이에요!


			 for(var i=0; i<result.length; i++){


				 var del = '<input id = "delete" type="button" value="삭제">';


				 var tr=$("<tr></tr>").attr("data-isbn",result[i].isbn);

				 var bookImg = $("<img />").attr("src", result[i].img);
			     var bookImgTd = $("<td></td>").append(bookImg);
			     var titleTd=$("<td></td>").text(result[i].title);
				 var authorTd=$("<td></td>").text(result[i].author);
				 var priceTd=$("<td></td>").text(result[i].price);

				 var deleteTd = $("<td></td>").append(del);



				 /////////////////////////////도서 상세 정보/////////////////////////////
				 var infobtn=$("<input />").attr("type","button").attr("value","상세정보").attr("id","info");
				 infobtn.on("click",function(){

					 var isbn=$(this).parent().parent().attr("data-isbn");
					 var thisTd=$(this).parent().parent().find("td:nth-child(2)");

					 alert(isbn);


					 $.ajax({
						 url:"http://localhost:7070/finalweb/bookInfo",
						 type:"GET",
						 dataType: "jsonp",
						 jsonp:"callback",
						 data:{
							 isbn:isbn
						 },

						 success:function (result){
							 console.log("info success!! " + result.date );

							 var date=$("<p></p>").text("출판일: "+result.date);
							 thisTd.append(date);

							 var page=$("<p></p>").text("페이지수: "+result.page+"쪽");
							 thisTd.append(page);

							 var supplement=$("<p></p>").text("공급: "+result.supplement);
							 thisTd.append(supplement);

							 var publisher=$("<p></p>").text("출판사: "+result.publisher);
							 thisTd.append(publisher);

						 },

						 error:function (){
							 alert("상세정보 보기 오류가 발생했습니다!");

						 }

					 });
				 });


                 var infoTd=$("<td></td>").append(infobtn);


				 


				 ////////////////////////////도서 정보 수정//////////////////////////////
				 var updatebtn=$("<input />").attr("type","button").attr("value","수정");

				 updatebtn.on("click",function () {

					 var title=$(this).parent().parent().find("td:nth-child(2)").text();
					 var author=$(this).parent().parent().find("td:nth-child(3)").text();
					 var price=$(this).parent().parent().find("td:nth-child(4)").text();

					 var updatebox1=$("<input />").attr("type","text").attr("class", "updateboxclass1").val(title);
					 var updatebox2=$("<input />").attr("type","text").attr("class", "updateboxclass2").val(author);
					 var updatebox=$("<input />").attr("type","text").attr("class", "updateboxclass").val(price);



					 updatebox1.on("keyup",function () {
						 if(event.keyCode==13){


							 var titleTd = $(this).parent().parent().find("td:nth-child(2)");

							 var isbn= $(this).parent().parent().attr("data-isbn");
							 var title=$(this).val();
							 var author=updatebox2.val();
							 var price=updatebox.val();
							 var thisTd = $(this).parent().parent();

							  $.ajax({
								 url:"http://localhost:7070/finalweb/bookUpdate",
								 type:"GET",
								 dataType:"jsonp",
								 jsonp:"callback",
								 data : {
									 isbn : isbn,

									 title : title,
									 author : author,
									 price : price

								 },

								 success:function (result) {
									 alert("정상적으로 처리됨 ");
									 $(".updateboxclass1").remove();
									 $(this).parent().parent().find("td:nth-child(2)").empty();
									 $(this).parent().parent().find("td:nth-child(2)").text(title);

									 thisTd.find("td:nth-child(2)").text(result.title);
									 thisTd.find("td:nth-child(3)").text(result.author);
									 thisTd.find("td:nth-child(4)").text(result.price);


									 thisTd.find("[type=button]").attr("disabled", false);

								 },
								 error:function(){
									 alert("업데이트 에러 발생! ");

								 }

							 });

						 }

					 });

					 $(this).parent().parent().find("td:nth-child(2)").text("");
					 $(this).parent().parent().find("td:nth-child(2)").append(updatebox1);


					 updatebox2.on("keyup",function () {
						 if(event.keyCode==13){
							 //update처리!
							 //일단 DB처리도 해야하고
							 //AJAX호출해서 서버프로그램을 실행시켜서 database의 데이터를 변경하면 돼요!
							 //서버프로그램에게 어떤 값을 알려줘야 처리가 될까요?
							 //변경된 책 가격, 키값 ISBN 이 필요해요!

							 var isbn= $(this).parent().parent().attr("data-isbn");
							 var title=updatebox1.val();
							 var author=$(this).val();
							 var price=updatebox.val();
							 var thisTd = $(this).parent().parent();
							 $.ajax({
								 url:"http://localhost:7070/finalweb/bookUpdate",
								 type:"GET",
								 dataType:"jsonp",
								 jsonp:"callback",
								 data : {
									 isbn : isbn,
									 title : title,
									 author : author,
									 price : price


								 },

								 success:function (result) {
									 alert("정상적으로 처리됨 ");
									 $(".updateboxclass2").remove();
									 $(this).parent().parent().find("td:nth-child(3)").empty();
									 $(this).parent().parent().find("td:nth-child(3)").text(author);

									 thisTd.find("td:nth-child(2)").text(result.title);
									 thisTd.find("td:nth-child(3)").text(result.author);
									 thisTd.find("td:nth-child(4)").text(result.price);


									 thisTd.find("[type=button]").attr("disabled", false);

								 },
								 error:function(){
									 alert("업데이트 에러 발생! ");

								 }

							 });

						 }

					 });
					 $(this).parent().parent().find("td:nth-child(3)").text("");
					 $(this).parent().parent().find("td:nth-child(3)").append(updatebox2);

					 updatebox.on("keyup",function () {
                          if(event.keyCode==13){
							  //update처리!
                              //일단 DB처리도 해야하고
							  //AJAX호출해서 서버프로그램을 실행시켜서 database의 데이터를 변경하면 돼요!
							  //서버프로그램에게 어떤 값을 알려줘야 처리가 될까요?
							  //변경된 책 가격, 키값 ISBN 이 필요해요!

							  var isbn= $(this).parent().parent().attr("data-isbn");
							  var title=updatebox1.val();
							  var author=updatebox2.val();
							  var price=$(this).val();
							  var thisTd = $(this).parent().parent();


							  $.ajax({
								   url:"http://localhost:7070/finalweb/bookUpdate",
								   type:"GET",
								   dataType:"jsonp",
								   jsonp:"callback",
								   data : {
								        isbn : isbn,
									   title : title,
									   author : author,
									   price : price


								   },

							  success:function (result) {
								  alert("정상적으로 처리됨 ");

								  $(".updateboxclass").remove();
								  $(this).parent().parent().find("td:nth-child(4)").empty();
								  $(this).parent().parent().find("td:nth-child(4)").text(price);

								  thisTd.find("td:nth-child(2)").text(result.title);
								  thisTd.find("td:nth-child(3)").text(result.author);
								  thisTd.find("td:nth-child(4)").text(result.price);


								  thisTd.find("[type=button]").attr("disabled", false);

							  },
							  error:function(){
								  alert("업데이트 에러 발생! ");

							  }


							   });

							  //화면처리도 해야해요!

						  }

					 });

					 $(this).parent().parent().find("td:nth-child(4)").text("");
					 $(this).parent().parent().find("td:nth-child(4)").append(updatebox);
					 $(this).parent().parent().find("[type=button]").attr("disabled","disabled");


				 });

				 var updatebtnTd = $("<td></td>").append(updatebtn);


				 /////////////////////////////////////서평관리////////////////////////////////

				 var comment = $("<button id='comment' >서평쓰기</button>");
				 var review = $("<button id='review' >서평보기</button>");

				 var commentTd = $("<td></td>").append(comment);
				 var reviewTd = $("<td></td>").append(review);

				 tr.append(bookImgTd);
				 tr.append(titleTd);
				 tr.append(authorTd);
				 tr.append(priceTd);

				 tr.append(deleteTd);
				 tr.append(updatebtnTd);
				 tr.append(infoTd);
				 tr.append(commentTd);
				 tr.append(reviewTd);




				 $("tbody").append(tr);


			 }


	   },
	   error : function(){
	    alert("뭔가 이상해요!!");
	   }
	   
	  });
   }
 }



$(document).on('click', '#delete', function() {


	$(this).parent().parent().remove();
	alert($(this).parent().parent().attr("data-isbn"));

	$.ajax({
		// url : 서버 프로그램에 대한 url
		url:"http://localhost:7070/finalweb/bookDelete",
		// type: 전송방식
		type: "GET",
		// 만약 서버쪽에서 보내주는 데이터가 JSON이면

		dataType : "jsonp",
		//클라이언트가 서버쪽에 보내주는 데이터
		jsonp : "callback",

		data:{
			isbn : $(this).parent().parent().attr("data-isbn")
		},

		//서버쪽 프로그램을 실행시키는 과정이 성공하면
		success : function(result){

			alert("책 정보가 삭제되었습니다.");
		},
		//서버쪽 프로그램을 실행시키는 과정이 실패하면!!
		error : function(){
			alert("오류입니다.")
		}
	});
});



function mySort() {
		var rows = $("table").find("tbody>tr").get();
		rows.sort(function (a, b) {
			var keyA = $(a).children("td").eq(3).text();
			var keyB = $(b).children("td").eq(3).text();

			if(keyA < keyB) return -1;
			if(keyA > keyB) return 1;

			return 0;
		});

		$.each(rows, function (idx, row) {
			$("table").children("tbody").append(row);

		});
	}






$(document).on('click', '#comment', function() {

	localStorage.isbn = $(this).parent().parent().attr("data-isbn");
	localStorage.title = $(this).parent().parent().find("#title").text();
	localStorage.author = $(this).parent().parent().find("#author").text();
	localStorage.img = $(this).parent().parent().find("#img").attr("src");

	$(location).attr("href","commentForm.html");

});


$(document).on('click', '#review', function() {

	localStorage.reviewisbn = $(this).parent().parent().attr("data-isbn");
	$(location).attr("href","commentList.html");

});



/*

$(document).on('click', '#com', function() {

	localStorage.isbn = $(this).parent().parent().attr("data-isbn");
	localStorage.title = $(this).parent().parent().find("#title").text();
	localStorage.author = $(this).parent().parent().find("#author").text();

	$(location).attr("href","commentForm.html");

});

*/







$(function(){

	var xx ="f";

	$.ajax({

		// url : 서버 프로그램에 대한 url
		url:"http://localhost:7070/finalweb/session",
		// type: 전송방식

		type: "GET",
		// 만약 서버쪽에서 보내주는 데이터가 JSON이면

		dataType : "jsonp",
		//클라이언트가 서버쪽에 보내주는 데이터

		jsonp : "callback",

		data:{
			quit : xx

		},

		//서버쪽 프로그램을 실행시키는 과정이 성공하면
		success : function(result){

			if(result==true){

				$(".inout").text("로그아웃");
				$(".inout").attr("href","").attr("id","out");
			}
			else{

				$(".inout").text("로그인");
			}

		},
		//서버쪽 프로그램을 실행시키는 과정이 실패하면!!
		error : function(){
			alert("세선체크 서버 에러!!");
		}
	});

});
