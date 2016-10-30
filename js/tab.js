$(function() {
	//クリックしたときのファンクションをまとめて指定
	$('.tab div').click(function() {

		//.index()を使いクリックされたタブが何番目かを調べ、
		//indexという変数に代入します。
		var index = $('.tab div').index(this);
	    console.log(this);
		//コンテンツを一度すべて非表示にし、
		$('.content li').css('display','none');

		//クリックされたタブと同じ順番のコンテンツを表示します。
		$('.content li').eq(index).css('display','block');

		//一度タブについているクラスselectを消し、
		$('.tab div').removeClass('select');

		//クリックされたタブのみにクラスselectをつけます。
		$(this).addClass('select')
	});
});
