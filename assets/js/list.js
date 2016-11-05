/**
 * 
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

				 var tr=$("<tr></tr>").attr("data-isbn",result[i].isbn);

				 var bookImg = $("<img />").attr("src", result[i].img);
				 var bookImgTd = $("<td></td>").append(bookImg);
				 var titleTd=$("<td></td>").text(result[i].title);
				 var authorTd=$("<td></td>").text(result[i].author);
				 var priceTd=$("<td></td>").text(result[i].price);

				 var deleteTd = $("<td></td>").append(del);

			//////////////////////////////도서 상세보기/////////////////////////////////////////








             ///////////////////////////// 도서 삭제///////////////////////////////////////////
			 var del = '<input id = "delete" type="button" value="삭제">';





			     tr.append(bookImgTd);
				 tr.append(titleTd);
				 tr.append(authorTd);
				 tr.append(priceTd);
				 tr.append(deleteTd);

				 $("tbody").append(tr);


			 }


	   },
	   error : function(){
	    alert("뭔가 이상해요!!");
	   }
	   
	  });
   }
 }


	$(document).on('click', '#delete', function(){
		$(this).parent().parent().remove();
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