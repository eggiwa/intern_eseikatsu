$(function() {
    $(".accordion dd").css("display","none");
    $(".accordion dt").click(function(){
        $(this).toggleClass("open").next().slideToggle("fast");
    });
});

$(function() {
    $(".accordion2 dd").css("display","none");
    $(".accordion2 dt").click(function(){
        $(this).toggleClass("open").next().slideToggle("fast");
    });
});

$(function() {
    $('.sankaku').click(function(){
        $('.sankaku-selected').css('display', 'block');
        $('.sankaku').css('display','none');
    });
});

$(function() {
    $('.sankaku-selected').click(function(){
        $('.sankaku-selected').css('display', 'none');
        $('.sankaku').css('display','block');
    });
});

$(function() {
    $('.sankaku2').click(function(){
        $('.sankaku-selected2').css('display', 'block');
        $('.sankaku2').css('display','none');
    });
});

$(function() {
    $('.sankaku-selected2').click(function(){
        $('.sankaku-selected2').css('display', 'none');
        $('.sankaku2').css('display','block');
    });
});