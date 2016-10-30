var form_data = {
    "syubetsu": {
        "type": ["checkbox","selectedIndex"],
        "keys":["tatemono_shubetsu"],
        "data": [
           {"text": "", "values": [null]},
            {"text": "マンション", "values": ["マンション"]},
            {"text": "リゾートマンション","values": ["リゾートマンション"]},
            {"text": "アパート","values": ["アパート"]},
            {"text": "テラスハウス","values": ["テラスハウス"]},
            {"text": "タウンハウス","values": ["タウンハウス"]},
            {"text": "戸建","values": ["戸建"]},
            {"text": "土地","values": ["土地"]},
            {"text": "店舗","values": ["店舗"]},
            {"text": "事務所","values": ["事務所"]},
            {"text": "ビル","values": ["ビル"]},
            {"text": "倉庫","values": ["倉庫"]},
            {"text": "工場","values": ["工場"]},
            {"text": "トランクルーム","values": ["トランクルーム"]},
            {"text": "駐車場","values": ["駐車場"]},
            {"text": "バイク置き場","values": ["バイク置き場"]},
            {"text": "その他","values": ["その他"]}
        ]
    },

    "chinryou": {
        "type": ["checkbox","selectedIndex"],
        "keys": ["chinryo_min", "chinryo_max"],
        "data": [
           {"text": "",          "values": [null, null]},
            {"text": "50000円以下", "values": [null, 50000]},
            {"text": "50000-70000円", "values": [50000,70000]},
            {"text": "70000-90000円", "values": [70000,90000]},
            {"text": "90000-110000円", "values": [90000,110000]},
            {"text": "110000-130000円", "values": [110000,130000]},
            {"text": "130000円以上", "values": [130000,null]}
        ]
    },

    "parking": {
    	"type": ["checkbox","selectedIndex"],
    	"keys": ["chushajo_code"],
    	"data": [
    		{"text": "", "values": [null]},
    		{"text": "無", "values": ["1"]},
    		{"text": "有（敷地内）", "values": ["2"]},
    		{"text": "付", "values": ["3"]},
    		{"text": "近隣駐車場", "values": ["4"]},
    		{"text": "空無", "values": ["5"]},
    		{"text": "要お問合せ", "values": ["6"]},
    	]
    },

    "genkyo":{
    	"type": ["checkbox","selectedIndex"],
    	"keys": ["tintai_genkyo"],
    	"data": [
    		{"text": "", "values": [null]},
    		{"text": "居住中", "values": ["居住中"]},
    		{"text": "空", "values": ["空"]},
    		{"text": "賃貸中", "values": ["賃貸中"]},
    		{"text": "未完成", "values": ["未完成"]},
    		{"text": "一部賃貸", "values": ["一部賃貸"]},
    		{"text": "全部賃貸", "values": ["全部賃貸"]},
    		{"text": "新築", "values": ["新築"]}
    	]
    },

    "pet":{
    	"type": ["checkbox","selectedIndex"],
    	"keys": ["pet"],
    	"data":[
    		{"text": "", "values": [null]},
    		{"text": "不可", "values": ["不可"]},
    		{"text": "可", "values": ["可"]},
    		{"text": "相談", "values": ["相談"]},
    	]
    },

    "madori_number":{
    	"type": ["checkbox","selectedIndex"],
    	"keys": ["madori_number"],
    	"data": [
    		{"text": "", "values": [null]},
    		{"text": "1", "values": ["1"]},
    		{"text": "2", "values": ["2"]},
    		{"text": "3", "values": ["3"]},
    		{"text": "4", "values": ["4"]},
    		{"text": "5", "values": ["5"]},
    	]
    },

    "madori_type":{
    	"type": ["checkbox","selectedIndex"],
    	"keys": ["madori_type"],
    	"data": [
    		{"text": "", "values":[null]},
    		{"text": "R", "values":["R"]},
    		{"text": "K", "values":["K"]},
    		{"text": "DK", "values":["DK"]},
    		{"text": "SDK", "values":["SDK"]},
    		{"text": "LDK", "values":["LDK"]},
    		{"text": "SLDK", "values":["SLDK"]},
    		{"text": "LK", "values":["LK"]},
    		{"text": "SK", "values":["SK"]},
    		{"text": "SLK", "values":["SLK"]}
    	]
    },

    "station":{
    	"type": ["free_text","value"],
    	"keys": ["kotsu_ensen_eki_1"],
    	"data": [
    		{"text": "","values":[null]}
    	]
    }
};
var form_set = function(){
    for (var elem_id in form_data) {
        var form = form_data[elem_id];
        if (form.type[0] == "checkbox") {
            var box = "";
            for (var dat of form.data) {
		if(dat.text != ""){
                    box += "<li><input type=\"checkbox\" name=\"" + form.keys[0] +"\" id=\""+ dat.text + "\">"+ dat.text + "</li>";
		}
	    }
            document.getElementById(elem_id).innerHTML = box;
        } else if (form.type[0] == "free_text") {
        }
    }
};

