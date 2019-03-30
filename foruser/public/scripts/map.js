var event1 = {
    lat: 53.38177,
    lng: -1.482
};

var event2 = {
    lat: 52.38177,
    lng: -1.482
};

var map;
var infoWindow;
var pos;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 53.38177, lng: -1.482},
        zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            $("#map_x").val(pos.lat);
            $("#map_y").val(pos.lng);
            markers(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function searchForEvents() {
    var input_content = $("#map_input").val();

}

function markers(pos) {
    if (map == '' || map == 'undefined') {
        return;
    }
    var marker = new google.maps.Marker({
        position: pos,
    });
    marker.setMap(map);
}

function makeEvents() {
    if (map == '' || map == 'undefined') {
        return;
    }
    var marker1 = new google.maps.Marker({
        position: event1,
        title: "Hello World!"
    });
    var marker2 = new google.maps.Marker({
        position: event2,
        title: "Hello World!"
    });
    marker1.setMap(map);
    marker2.setMap(map);
}