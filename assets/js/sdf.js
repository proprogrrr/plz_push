




div = $("<div></div>").attr("id","detaildiv"+result[loop].isbn);



var detailbtn = $("<input />").attr("type","button").attr("value","상세정보").attr("class","btn-xs, btn-primary");
var detailTd = $("<td></td>").append(detailbtn);

detailbtn.on("click",function () {
	var isbn = $(this).parent().parent().attr("data-isbn");
	$("#detaildiv"+isbn).empty();
	$.ajax({
		url : "http://localhost:7070/book/BookDetail",
		type : "GET",
		dataType : "jsonp",
		jsonp : "callback",

		data : {
			isbn : isbn
		},
		success: function(result){

			page = $("<tr></tr>").text("쪽 수 : "+result[0].page);
			date = $("<tr></tr>").text("발행일 : "+result[0].date);
			translator = $("<tr></tr>").text("번역 : "+result[0].translator);
			publisher = $("<tr></tr>").text("출판사 : "+result[0].publisher);
			supplement = $("<tr></tr>").text("부록 : "+result[0].supplement);
			div.empty();

			div.append(page);
			div.append(date);
			div.append(translator);
			div.append(supplement);
			div.append(publisher);

			$("#detaildiv"+isbn).append(div);


		},
		error: function () {

			alert("x");
		}
	});

});