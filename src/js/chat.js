$(document).ready(function()
{
    $(".wl_faces_main img").click(function () {
		var a = $(this).attr("src");
        console.log($(this));
        console.log($(this).prop("outerHTML"));
		$("#editArea").html($("#editArea").html() + $(this).prop("outerHTML"));
		
        $(".wl_faces_box").css("display","none");
	
	})


    $(".chat_face_btn").on("click", function()
    {
        $(".wl_faces_box").css("display","block");
    })



})