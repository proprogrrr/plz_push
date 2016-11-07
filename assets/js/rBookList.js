/**
 * Created by CJuser on 2016-11-04.
 */

///도서 대여 리스트 출력하기//////////////////////////////////////
function searchBook(){

    //enter key가 입력됐을때 사용자가 입력한 내용을 가지고
    //서버 프로그램 Ajax방식으로 호출

    if(event.keyCode ==13){
        //ajax 호출

        $("li").remove();
        $("#contents1").attr("id","contents");
        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/finalweb/rentbookList",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{
                keyword : $("#keyword").val()
            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){
                alert("정상처리됐습니다.");

                for(var i=0;i<result.length;i++) {

                    var tr = $("<li></li>").attr("data-isbn", result[i].isbn);
                    var img = $("<div id='bookimg' ><img id='getimg' src='" + result[i].rimg + "' height='200px'/></div>");
                    var titleTd = $("<p id='title' align='center'></p>").text(result[i].rtitle);
                    var authorTd = $("<p id='author'>저자 :"+result[i].rauthor+"</p>");
                    var yesperson = $("<p id='yesperson' style='color: red'>대여인 ID :"+result[i].remail+"</p>");
                    var noperson = $("<p id='noperson' style='color: blue'>대여인 ID : 없음</p>");

                    tr.append(img);
                    tr.append(titleTd);
                    tr.append(authorTd);

                    //대여가능한지 여부 판단하기///////////////////////////////////////////////////////////////////////////
                    var rentbtn = null;
                    var rstatus =null;

                    if(result[i].rstatus==0){

                        rstatus = $("<p class='rentp' style='color: blue'>대출여부 : 대여가능</p>");
                        rentbtn = $("<button id='rent' style='background-color: white;width:220px;height: 40px;'>대여하기</button>");
                        tr.append(noperson);

                    }

                    //만약 뽑아온 데이터의 rent email값과 다르다면
                    else if(result[i].remail!=null && result[i].remail!=result[i].userEmail){

                        rstatus = $("<p class='rentp' style='color: red'>대출여부 : 대여불가</p>");
                        rentbtn = $("<button id='impRent' style='background-color: #ff1b00;width:220px;height: 40px;color: white;'>대여불가</button>")
                        tr.append(yesperson);
                    }

                    else{

                        rstatus = $("<p class='rentp' style='color: red'>대출여부 : 대여불가</p>");
                        rentbtn = $("<button id='return' style='background-color: #ff1b00;width:220px;height: 40px;color: white;'>반납하기</button>")

                        tr.append(yesperson);
                    }

                    tr.append(rstatus);
                    tr.append(rentbtn);

                    $("#list").append(tr);

                }
            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("코드 다시짜라~!")
            }
        });
    }
}



/// 서버접속해서 세션확인하고 email값 받아오기! 페이지접속하자마자 실행
$(function(){

    //session email값을 받아올 저장 변수 정의
    var check = null;

    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/finalweb/rentSessionCheck",
        // type: 전송방식
        type: "GET",
        // 만약 서버쪽에서 보내주는 데이터가 JSON이면

        dataType : "jsonp",
        //클라이언트가 서버쪽에 보내주는 데이터
        jsonp : "callback",

        data:{

        },

        //서버쪽 프로그램을 실행시키는 과정이 성공하면
        success : function(result){
            check = result.id;


            alert("세션 아이디"+check);
            if(check!=null){

                $(".inout").text("로그아웃");
                $(".inout").attr("href","").attr("id","out");

            }
            else{

                $(".inout").text("로그인");

                $(location).attr("href","index1.html");

            }
        },
        //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
        error : function(){
            alert("에러!!!!")
        }
    });

    $(document).on('click', '#out', function() {

        var xx = "t";
        $.ajax({

            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/finalweb/sessionCheck",
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

            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("서버에 문제가있습니다.~");
            }
        });

    });



    //대여 불가 버튼을 누르면//
    $(document).on("click","#impRent",function(){
        alert("대여가 불가능합니다.");
    });

    //대여하기 버튼을 누르면
    $(document).on("click","#rent",function(){

        alert($(this).parent().attr("data-isbn"));
        var tr = $(this).parent();

        alert("도서 대여하러 들어왔습니다.");

        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/finalweb/rentbookupdate",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{
                keyword : $(this).parent().attr("data-isbn"),
                id : check
            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                if(result==true){
                    alert("해당 도서를 대여했습니다.");


                    //대여가능한지 여부 판단하기///////////////////////////////////////////////////////////////////////////
                    var rentbtn = null;
                    var rstatus =null;
                    var yesperson = $("<p id='yesperson' style='color: red'>대여인 ID : "+check+" </p>");

                    tr.find(".rentp").remove();
                    tr.find("#rent").remove();
                    tr.find("#noperson").remove();

                    rstatus = $("<p class='rentp' style='color: red' style='color: red'>대출여부 : 대여불가</p>");
                    rentbtn = $("<button id='return' style='background-color: red;width:220px;height: 40px;color:white'>반납하기</button>");

                    tr.append(yesperson);
                    tr.append(rstatus);
                    tr.append(rentbtn);



                }else{
                    alert("대여가 불가능!!");
                }

            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("에러!!!!")
            }
        });

    });

    ////대여중인 도서 반납하기 /////////////////////////////////////////////////////////////
    $(document).on("click","#return",function(){

        alert($(this).parent().attr("data-isbn"));
        var tr = $(this).parent();
        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/finalweb/returnbookupdate",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

            dataType : "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp : "callback",

            data:{
                keyword : $(this).parent().attr("data-isbn"),
                id : check
            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                if(result==true){
                    alert("도서가 반납되었습니다. ");

                    //대여가능한지 여부 판단하기///////////////////////////////////////////////////////////////////////////
                    var rentbtn = null;
                    var rstatus =null;
                    var noperson = $("<p id='noperson' style='color: blue'>대여인 ID : 없음</p>");

                    tr.find(".rentp").remove();
                    tr.find("#return").remove();
                    tr.find("#yesperson").remove();


                    rstatus = $("<p class='rentp' style='color: blue'>대출여부 : 대여가능</p>");
                    rentbtn = $("<button id='rent' style='background-color: white;width:220px;height: 40px;'>대여하기</button>");
                    tr.append(noperson);
                    tr.append(rstatus);
                    tr.append(rentbtn);


                }else{
                    alert("도서 반납 오류");
                }

            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){
                alert("에러!!!")
            }
        });

    });

});






