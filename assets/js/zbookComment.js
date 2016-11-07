


///서평 입력 부분=======================================================================
$(function(){

    var isbn = localStorage.isbn;
    var title = localStorage.btitle;
    var author = localStorage.bauthor;
    var img = localStorage.bimg;


    $(document).on('click', '#com', function() {

        alert(title);


        var id = $("#id").val();
        var password = $("#pw").val();
        var text = $("#text").val();
        var content = $("#content").val();



        $.ajax({
            // url : 서버 프로그램에 대한 url
            url:"http://localhost:7070/finalweb/commentInsert",
            // type: 전송방식
            type: "GET",
            // 만약 서버쪽에서 보내주는 데이터가 JSON이면

                dataType : "jsonp",
                //클라이언트가 서버쪽에 보내주는 데이터
                jsonp : "callback",

                data:{

                    isbn : isbn,
                    title : title,
                    author : author,
                    id : id,
                    password : password,
                    text : text,
                    content : content,
                    img : img

            },

            //서버쪽 프로그램을 실행시키는 과정이 성공하면
            success : function(result){

                alert("서평이 입력되었습니다~~~~~~~~~~~~~~");
                $(location).attr("href","list.html")

            },
            //서버쪽 프로그램을 실행시키는 과정이 실패하면!!
            error : function(){

                alert("서평 입력 에러!!!!!!!!")
            }
        });

    });

});












