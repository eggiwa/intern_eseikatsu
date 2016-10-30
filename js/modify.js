// DB部から受け取った生物件データから必要なものを抽出する
// よみこんだものから必要なものだけをbudataに入れる
var modify = function(raw_budata){
    var tmp = raw_budata;
    var budata = {};
    
    //緯度・経度
    budata.ido = tmp.ido / 3600000;
    budata.keido = tmp.keido / 3600000;
    //物件名称、住所、最寄り駅、建物種別、部屋番号、専有面積、取引態様
    budata.tatemono_name = tmp.tatemono_name;
    budata.jusho_full_text = tmp.jusho_full_text;
    budata.kotsu_ensen_eki_1 =tmp.chinshaku_bukken_view.kotsu_ensen_eki_1;
    budata.kotsu_ekitoho_1 =tmp.chinshaku_bukken_view.kotsu_ekitoho_1;
    budata.tatemono_shubetsu_code=tmp.tatemono_shubetsu_code;
    budata.tatemono_shubetsu=tmp.tatemono_shubetsu;
    budata.heya_kukaku_number=tmp.heya_kukaku_number;
    budata.senyu_menseki=tmp.senyu_menseki
    //賃料、管理費、共益費、礼金、敷金
    budata.chinryo=tmp.chinshaku_boshu_joken_view.chinryo;
    budata.kanrihi=tmp.chinshaku_boshu_joken_view.kanrihi;
    budata.kyoekihi=tmp.chinshaku_boshu_joken_view.kyoekihi;
    //礼金の単位をヶ月にそろえる
    var reikin_kubun=tmp.chinshaku_boshu_joken_view.reikin_kubun;
    var reikin_amount=tmp.chinshaku_boshu_joken_view.reikin_amount;
    if(reikin_kubun=="円"){
        budata.reikin=reikin_amount/budata.chinryo;
    }else if(reikin_kubun=="%"){
      budata.reikin=reikin_amount/100;
    }else if(reikin_kubun=="年"){
      budata.reikin=reikin_amount/12;
    }else if(reikin_kubun=="実費"){
      budata.reikin=null;
    }else{
      budata.reikin=reikin_amount;
    }
    //敷金の単位をヶ月にそろえる
    var shikikin_kubun=tmp.chinshaku_boshu_joken_view.shikikin_kubun;
    var shikikin_amount=tmp.chinshaku_boshu_joken_view.shikikin_amount;
    if(shikikin_kubun=="円"){
      budata.shikikin=shikikin_amount/budata.chinryo;
    }else if(shikikin_kubun=="%"){
      budata.shikikin=shikikin_amount/100;
    }else if(shikikin_kubun=="年"){
      budata.shikikin=shikikin_amount/12;
    }else if(shikikin_kubun=="実費"){
      budata.shikikin=null;
    }else{
      budata.shikikin=shikikin_amount;
    }
    //入居可能日,築年数,間取り,駐車場状況
    // if (tmp.chinshaku_boshu_joken_view.nyukyo_kano_datejun != null) {
    //      budata.nyukyo_kano_date=tmp.chinshaku_boshu_joken_view.nyukyo_kano_datejun.toString();
    //      budata.nyukyo_kano_date_nen=budata.nyukyo_kano_datejun.slice(0,4);
    //      budata.nyukyo_kano_date_getu=budata.nyukyo_kano_datejun.slice(5,7);
    //      budata.nyukyo_kano_date_hi=budata.nyukyo_kano_datejun.slice(8,9);
    // }
    // if (tmp.shunko_datejun != null) {
    //      budata.shunko_date=tmp.shunko_datejun.toString();
    //      budata.shunko_date_nen=budata.shunko_datejun.slice(0,4);
    //      budata.shunko_date_getu=budata.shunko_datejun.slice(5,6);
    //      budata.shunko_date_hi=budata.shunko_datejun.slice(7,8);
    // }
    budata.madori = tmp.madori_name;
    budata.madori_number = tmp.madori_heyasu;
    budata.madori_type   = tmp.madori;
    budata.madori_code = tmp.madori_code;
    budata.chushajo_code = tmp.chinshaku_boshu_joken_view.chushajo_jokyo;
    switch(budata.chushajo_code){
        case 1:
            budata.chushajo="無";
            break;
        case 2:
            budata.chushajo="有（敷地内）";
            break;
        case 3:
            budata.chushajo="付";
            break;
        case 4:
            budata.chushajo="近隣駐車場";
            break;
        case 5:
            budata.chushajo="空無";
            break;
        case 6:
            budata.chushajo="要お問合せ";
            break;
    }

    //現況
    budata.tintai_genkyo=tmp.chinshaku_boshu_joken_view.chintai_genkyo;
    budata.tintai_genkyo_code=tmp.chinshaku_boshu_joken_view.chintai_genkyo_code;
    /*検索用項目
    ペット可
    ルームシェア
    飲食店
    外国人入居
    学生専用
    楽器使用
    高齢者
    子供
    事務所
    性別
    単身
    店舗
    二人入居
    法人
    保証人
    */
    budata.pet           = tmp.chinshaku_boshu_joken_view.keiyaku_joken_pet;
    budata.room_share    = tmp.chinshaku_boshu_joken_view.keiyaku_joken_room_share;
    budata.inshokuten    = tmp.chinshaku_boshu_joken_view.keiyaku_joken_inshokuten;
    budata.gaikokujin_nyukyo = tmp.chinshaku_boshu_joken_view.keiyaku_joken_gaikokujin_nyukyo;
    budata.gakusei_senyo = tmp.chinshaku_boshu_joken_view.keiyaku_joken_gakusei_senyo;
    budata.gakki_shiyo   = tmp.chinshaku_boshu_joken_view.keiyaku_joken_gakki_shiyo;
    budata.koreisha      = tmp.chinshaku_boshu_joken_view.keiyaku_joken_koreisha;
    budata.kodomo        = tmp.chinshaku_boshu_joken_view.keiyaku_joken_kodomo;
    budata.jimusho       = tmp.chinshaku_boshu_joken_view.keiyaku_joken_jimusho;
    budata.seibetsu      = tmp.chinshaku_boshu_joken_view.keiyaku_joken_seibetsu;
    budata.tanshin       = tmp.chinshaku_boshu_joken_view.keiyaku_joken_tanshin;
    budata.tempo         = tmp.chinshaku_boshu_joken_view.keiyaku_joken_tempo;
    budata.futari_nyukyo = tmp.chinshaku_boshu_joken_view.keiyaku_joken_futari_nyukyo;
    budata.hojin         = tmp.chinshaku_boshu_joken_view.keiyaku_joken_hojin;
    budata.hoshonin      = tmp.chinshaku_boshu_joken_view.hoshonin;

    //（おそらく）1物件ごとに保持している物件スペックのguid
    budata.guid = tmp.spec_bukken_view_guid;

    return budata;
}
