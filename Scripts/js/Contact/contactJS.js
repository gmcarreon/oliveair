
$(document).ready(function () {

    $($('.page-scroll')[3]).addClass('page-scroll-active');

    var date = new Date();
    $('#rCompose-date').val(date.toISOString().substr(0, 10));

    //======================FOR DISABLED PAST DATES===================
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var min = yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); 
    $('#rCompose-date').prop('min', min);
});



function initMapC() {
    var myLatlng = { lat: 41.762148, lng: -88.008704 };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: myLatlng,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        }
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        title: 'Click to Zoom',
        optimized: false
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<b>Happy Home Care LLC</b><hr>6912 Main St. Suite 215 Downers Grove, IL 60516'
    });

    marker.addListener('click', function () {
        map.setZoom(20);
        map.setCenter(marker.getPosition());
    });
    infowindow.open(map, marker);

}
