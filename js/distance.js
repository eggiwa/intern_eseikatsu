var calc_distance = function(lat_1, lng_1, lat_2, lng_2) {
    // 測地系定数
    // GRS80 ( 世界測地系 ) <- 現在の日本での標準
    const RX = 6378137.000000  // 赤道半径
    const RY = 6356752.314140  // 極半径
    // 2点の経度の差を計算 ( ラジアン )
    var a_x = lng_1 * Math.PI / 180 - lng_2 * Math.PI / 180;
    
    // 2点の緯度の差を計算 ( ラジアン )
    var a_y = lat_1 * Math.PI / 180 - lat_2 * Math.PI / 180;
    
    // 2点の緯度の平均を計算
    var p = (lat_1 * Math.PI / 180 + lat_2 * Math.PI / 180) / 2;
    
    // 離心率を計算
    var e = Math.sqrt((RX * RX - RY * RY) / (RX * RX));
    
    // 子午線・卯酉線曲率半径の分母Wを計算
    var w = Math.sqrt(1 - e * e * Math.sin(p) * Math.sin(p));
    
    // 子午線曲率半径を計算
    var m = RX * (1 - e * e) / (w * w * w);
    
    // 卯酉線曲率半径を計算
    var n = RX / w;
    
    // 距離を計算
    var d  = Math.pow(a_y * m, 2) + Math.pow(a_x * n * Math.cos(p), 2);
    d = Math.round(Math.sqrt(d)) / 1000;
    
    return d;
}
