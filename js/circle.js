var create_marker = function(map){
    var latlng = new google.maps.LatLng( 35.681298 , 139.766247 );
    var marker = new google.maps.Marker({
	map: map ,
	position: latlng,
	draggable: true,
	//animation: google.maps.Animation.BOUNCE,
	icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=p|00ffff|000000'
    }) ;
    return marker;
};
var create_circle = function(map,marker){
    var latlng = new google.maps.LatLng( 35.681298 , 139.766247 );
    var circleOptions = {
	map: map,
	center: latlng,
	radius: 1000,
	strokeColor: "#009933",
	strokeOpacity: 1,
	strokeWeight: 1,
	fillColor: "#00ffcc",
	fillOpacity: 0.35
    };
    var unicircle = new google.maps.Circle(circleOptions);
    unicircle.bindTo("center",marker,"position");
    return unicircle;
};
var circle;
var radius_change = function() {
    var check1 = document.getElementById("radio1").checked;
    var check2 = document.getElementById("radio2").checked;
    var check3 = document.getElementById("radio3").checked;
    if(check1 == true){
	circle.setRadius(1000);
    }
    else if(check2 == true){
	circle.setRadius(3000);
    }
    else if(check3 == true){
	circle.setRadius(5000);
    }
};

var circleOn = function(){
    var check = document.getElementById("check-map").checked;
    if(check===true){
    //    marker.setVisible(true);
        circle.setVisible(true);
    }else{
    //   marker.setVisible(false);
       circle.setVisible(false);
    }
};
var radius_listner = function(){
    document.getElementById("check-map").addEventListener("click",
function(){
    circleOn();
});

    document.getElementById("radio2").addEventListener("click",
function(){
    radius_change();
});

    document.getElementById("radio3").addEventListener("click",
function(){
    radius_change();
});

    document.getElementById("radio1").addEventListener("click",
function(){
    radius_change();
});

};
var circle_listner = function(marker){
    google.maps.event.addListener( marker, 'dragend', function(ev){
	center_ido = ev.latLng.lat();
	center_keido = ev.latLng.lng();
    });
};
