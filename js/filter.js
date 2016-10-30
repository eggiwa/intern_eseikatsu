var filtering = function(){

    var search_filter = {
	"syubetsu": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	"chinryou": [0,0,0,0,0,0],
	"parking": [0,0,0,0,0,0],
	"genkyo": [0,0,0,0,0,0,0],
	"pet": [0,0,0],
	"madori_number":[0,0,0,0,0],
	"madori_type":[0,0,0,0,0,0,0,0,0],
	"station":"",
	"radius":1,
	"focus":0,
    };

    for (var elem_id in form_data) {
        var form = form_data[elem_id];
        if (form.type[0] == "checkbox") {
	    var i = 0;
            for (var dat of form.data) {
		if(dat.text != ""){
		    search_filter[elem_id][i] =  document.getElementById(dat.text).checked;
		    i += 1;
		}
	    }
        } else if (form.type[0] == "free_text") {
            search_filter[elem_id] += document.getElementById("station").value;
        }
    }

    var check = document.getElementById("check-map").checked;
    var r = 0;
    if(check==true){
	var check1 = document.getElementById("radio1").checked;
	var check2 = document.getElementById("radio2").checked;
	var check3 = document.getElementById("radio3").checked;
	if(check1 == true){
	    r = 1;
	}
	else if(check2 == true){
	    r = 3;
	}
	else if(check3 == true){
	    r = 5;
	}
    }
    search_filter["radius"] = r;
    var koumoku = "koumoku";
    for(var i=1;i<8;i++){
	check = document.getElementById(koumoku + (i+'')).checked;
	if(check==true){
	    search_filter["focus"] = i;
	    break;
	}
    }
   // console.log(search_filter);
    return search_filter;


};

var search_item = function(search_filter,name,number){
    if(number == null){
	return false;
    }else{
	for(var i=0;i<search_filter[name].length;i++){
	    if(search_filter[name][i] == true){
		return (search_filter[name][number-1] != true);
	    }
	}
	return false;
    }
};

var switch_item = function(data){
    if(data == null || data == undefined){
	return 0;
    }else{
	return data;
    }
};

var search = function(map,search_filter,data){
    var hit_number = 0;
    for(var i=0;i<data.length;i++){
	var unidata = data[i];
	if(search_item(search_filter,"syubetsu",unidata.tatemono_shubetsu_code)){
	    continue;
	}
	var up=1000000,lw=0;
	for(var j=0;j<6;j++){
	    if(search_filter["chinryou"][j]){
		if(lw == 0 && j != 0){
		    lw = 30000+j*20000;
		}
		if(j != 5){
		    up = 50000+j*20000;
		}
	    }
	}
	if(unidata.chinryo < lw || unidata.chinryo > up){
	    continue;
	}

	if(search_item(search_filter,"parking",unidata.chushajo_code)){
	    continue;
	}

	if(search_item(search_filter,"genkyo",unidata.tintai_genkyo_code)){
	    continue;
	}
	var pet;
	if(unidata.pet == "不可"){
	    pet = 1;
	}else if(unidata.pet == "可"){
	    pet = 2;
	}else if(unidata.pet == "相談"){
	    pet = 3;
	}else{
	    pet = 0;
	}
	if(search_item(search_filter,"pet",pet)){
	    continue;
	}
	if(search_item(search_filter,"madori_type",unidata.madori_code)){
	    continue;
	}
	if(search_item(search_filter,"madori_number",unidata.madori_number)){
	    continue;
	}

	var check = document.getElementById("check-map").checked;
	if(check==true){
	    if(calc_distance(center_ido,center_keido,unidata.ido,unidata.keido) >= search_filter["radius"]){
		continue;
	    }
	}
	if(search_filter["station"] != ""){
	    if(unidata.kotsu_ensen_eki_1 == null || unidata.kotsu_ensen_eki_1 == undefined){
		continue;
	    }else{
		if(unidata.kotsu_ensen_eki_1.indexOf(search_filter["station"]) < 0){
		    continue;
		}
	    }
	}
	var num = 0;
	switch(search_filter["focus"]){
	case 0:
	    num = 1;
	    break;
	case 1:
	    num = switch_item(unidata.tatemono_shubetsu_code);
	    break;
	case 2:
	    num = switch_item(unidata.chushajo_code);
	    break;
	case 3:
	    num = switch_item(unidata.tintai_genkyo_code);
	    break;
	case 4:
	    num = pet;
	    break;
	case 5:
	    var n = switch_item(unidata.chinryo);
	    if(n < 50000){
		num = 1;
	    }else if(n > 130000){
		num = 6;
	    }else{
		num = Math.ceil((n-30000)/20000);
	    }
	    break;
	case 6:
	    num = switch_item(unidata.madori_number);
	    break;
	case 7:
	    num = switch_item(unidata.madori_code);
	    break;
	}
	hit_number += 1;
	build_pin(map,unidata,num);
    }
    return hit_number;
};

var color_table = function(filter){
    var key = "";
    switch(filter["focus"]){
    case 0:
	break;
    case 1:
	key = "syubetsu";
	break;
    case 2:
	key = "parking";
	break;
    case 3:
	key = "genkyo";
	break;
    case 4:
	key = "pet";
	break;
    case 5:
	key = "chinryou";
	break;
    case 6:
	key = "madori_number";
	break;
    case 7:
	key = "madori_type";
	break;
    }
    if(key != ""){
	var text_c = "<font face=\"ＭＳ 明朝,平成明朝\"color=\"#";
	var row = form_data[key]["data"];
	document.getElementById("map-color").innerHTML = "";
	document.getElementById("map-color").innerHTML += (text_c+color[0]+"\">記載なし</font>/ ");

	for(var i=1;i<row.length;i++){
	    document.getElementById("map-color").innerHTML += (text_c+color[i]+"\"> "+row[i]["text"]+"</font>/ ");

	}
    }else{
	document.getElementById("map-color").innerHTML = "";
    }
};

var write_hit = function(hit_number){
    document.getElementById("hit").innerHTML = "";
    var text_number = "件ヒットしました！";
    document.getElementById("hit").innerHTML = (hit_number+text_number);
}


var search_listener = function(map){
    document.getElementById("search-button").addEventListener("click",
function(){

    delete_pin();
    var filter =  filtering();
    var data = [];
    for(var rdata of items){
	var budata = modify(rdata);
	if(budata){
	    data.push(budata);
	}
    }
    var hit_number = search(map,filter,data);
    color_table(filter);
    write_hit(hit_number);

});
};

