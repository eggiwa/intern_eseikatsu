var details_pair = [
    ["tatemono_name","建物名",""],
    ["jusho_full_text","住所",""],
    ["chinryo","賃料","円"],
    ["kanrihi","管理費","円"],
    ["kyoekihi","共益費","円"],
    ["shikikin","敷金","ヶ月"],
    ["reikin","礼金","ヶ月"],
    ["kotsu_ensen_eki_1","最寄駅",""],
    ["tatemono_shubetsu","建物種別",""],
    ["heya_kukaku_number","部屋番号",""],
    ["senyu_menseki","専有面積","㎡"],
    ["madori","間取り",""],
    ["tintai_genkyo","現況",""],
    ["chushajo","駐車場",""],
    ["pet","ペット",""],
    // ["room_share","ルームシェア",""],
 ];
var detail_write = function(budata){
    document.getElementById("detail-name").innerHTML = "";
    for(var content of details_pair){
        if (budata[content[0]] == null){
            continue;
        }
	var detail_data = "<p>";
	detail_data += (content[1]+ ": "+ budata[content[0]] + content[2]);
	detail_data += "</p>";
	document.getElementById("detail-name").innerHTML += detail_data;
    }
    document.getElementById("detail-picture").innerHTML = "";
    var detail_p = "<img src=\"./images/3.jpg\" width=\"50%\" height=\"50%\">";
    document.getElementById("detail-picture").innerHTML += detail_p;
};
