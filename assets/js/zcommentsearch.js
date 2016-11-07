


$(document).on('click', '#search', function() {

    $(this).parent().parent().remove();
    alert($(this).parent().parent().attr("data-isbn"));

    $.ajax({
        // url : 서버 프로그램에 대한 url
        url:"http://localhost:7070/finalweb/CommentKeywordList",
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
            alert("서평 검색 에러!!!!!!")
        }

    });

});
