var markers = [];
var center_keido = 139.766247;
var center_ido =  35.681298;
var color = ["7fffd4","ff0000","0000ff","ffff00","000080","800080","ffa500","008000","ffd700","a52a2a","00ff00","3cb371","008080","d8bfd8","d2b48c","7fff00","ffdead"];
var build_pin = function(map,budata,num){

    var latlng = new google.maps.LatLng(budata.ido, budata.keido);
    var marker = null;
    var popup = null;
    var icon_text = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld= |";
    icon_text += color[num];
    icon_text += "|000000";

    marker = new google.maps.Marker({
	map: map,
	position: latlng,
	icon: icon_text,
    });
    var text = "";
    text += "賃料: " + budata.chinryo + "円<br>";
    if (budata.kotsu_ensen_eki_1!=null && budata.kotsu_ekitoho_1!=null) {
        text += "最寄り駅: " + budata.kotsu_ensen_eki_1;
        text += "(" + Math.floor(budata.kotsu_ekitoho_1) + "分)";
    };
    popup = new google.maps.InfoWindow({
	content: text,
	position: latlng,
	disableAutoPan: false,
    });
    google.maps.event.addListener(marker, 'mouseover', function(){
        popup.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function(){
        popup.close();
    });
    google.maps.event.addListener(marker, 'click' , function(){
	detail_write(budata);
	$('.content li').css('display','none');
	$('.content li').eq(1).css('display','block');
	$('.tab div').removeClass('select');
	$('.tab div').addClass('select');
    });
    markers.push(marker);

};
var delete_pin = function(){
    for(var i=0;i<markers.length;i++){
	markers[i].setMap(null);
    }
};


