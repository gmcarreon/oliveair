
$(document).ready(function () {


    $('.page-scroll').click(function () {
        $('.page-scroll').removeClass('page-scroll-active');
        $(this).addClass('page-scroll-active');
    });
});


function initMap() {
    var module = window.location.pathname.split('/');
    var myLatlng = { lat: 14.5932238, lng: 121.0021888 };

    var options = {
        zoom: 17,
        center: myLatlng,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT,
        }
    };

    var map = new google.maps.Map(document.getElementById('map'),options);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.BOUNCE,
        title: 'Click to Zoom',
        optimized: false
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<b>OlivaKevinJuddrian</b><hr>Building 1 Room 124 Residencias de Manila, Jesus St. Pandacan, Manila Philippines'
    });

    marker.addListener('click', function () {
        map.setZoom(20);
        map.setCenter(marker.getPosition());
    });
    infowindow.open(map, marker);

    if (module[module.length - 1].toLowerCase() == "contact") {
        
        var options2 = {
            zoom: 14,
            center: myLatlng,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_LEFT
            }
        };

        console.log(window.location.pathname);
        var map2 = new google.maps.Map(document.getElementById('map2'), options2);

        var marker2 = new google.maps.Marker({
            position: myLatlng,
            map: map2,
            animation: google.maps.Animation.BOUNCE,
            title: 'Click to Zoom',
            optimized: false
        });

        marker2.addListener('click', function () {
            map2.setZoom(20);
            map2.setCenter(marker.getPosition());
        });
        
        infowindow.open(map2,marker2);
    }
}


function sendEmail(type, button) {
    
    var obj = [];
    var arr = {};
    obj[0] = {};

    $($(button).find('#send-button')).attr('disabled', true);
    
    if (type == "message") {
        $('#compose-output').text("");
        $('#compose-output').append('<i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Sending...');

        arr.operation = "message";
        obj[0].message = $('#compose-message').val();
        obj[0].name = $('#compose-name').val();
        obj[0].email = $('#compose-email').val();
    } else if (type == "reservation") {
        $('#rCompose-output').text("");
        $('#rCompose-output').append('<i class="fa fa-spinner fa-spin" style="font-size:24px"></i><small> Sending...</small>');

        arr.operation = "reservation";
        obj[0].reserveDate = $('#rCompose-date').val();
        obj[0].name = $('#rCompose-name').val();
        obj[0].email = $('#rCompose-email').val();
    } else if (type == "resume") {
        $('#resume-output').text("");
        var split = $('#attachment').val().split('\\');
        var sExtension = split[split.length - 1].split('.');
        var extension = sExtension[sExtension.length - 1];
        
        if (extension == "doc" || extension == "pdf" || extension == "docx" || extension == "xml") {
            $('#resume-output').append('<i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Sending...');

            arr.operation = "resume";
            obj[0].attachments = $('#fileByte').text();
            obj[0].filename = split[split.length - 1];
            obj[0].message = $('#cCompose-message').val();
        } else {
            $('#resume-output').append('<i class="fa fa-close text-danger" aria-hidden="true"></i>File Not Allowed');
            return false;
        };
    }
    arr.payload = obj;
    console.log(arr);

    $.ajax({
        url: 'api/email',
        type: "POST",
        data: JSON.stringify(arr),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.success) {
                console.log(data.responseText);
                //alert(data.responseText);
            } else {
                console.log(data.responseText);
                alert(data.responseText);
            }
        },
        error: function (jqXHR, exception) {
            console.log('Error: ' + jqXHR.responseText)
        },
        complete: function (data) {

            $('.fa-spin').remove();
            $($(button).find('#send-button')).attr('disabled', false);
            
            if (data.responseJSON.success) {
                if (type == "message" || type == "reservation") {
                    if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
                        $('input:-webkit-autofill').each(function () {
                            var text = '';
                            var name = $(this).attr('id');
                            $(this).after(this.outerHTML).remove();
                            $('input[id=' + name + ']').val(text);
                        });
                    }

                    if (type == "message") {
                        $('#compose-output').text("");
                        $('#compose-output').append('<i class="fa fa-check text-success" aria-hidden="true"></i><small> Message Sent</small>');
                        $('#compose-message').val('');
                    } else {
                        $('#rCompose-output').text("");
                        $('#rCompose-output').append('<i class="fa fa-check text-success" aria-hidden="true"></i><small> Sent</small>');
                    }

                } else if (type == "resume") {
                    $('#cCompose-message').val('');
                    $('#attachment').val('')
                    $($($('#attachment')[0].nextElementSibling)[0].firstChild).val('');
                    $('#resume-output').text("");
                    $('#resume-output').append('<i class="fa fa-check text-success" aria-hidden="true"></i> Message Sent');
                }
            } else {
                $('#compose-output').text("");
                $('#rCompose-output').text("");
                $('#resume-output').text("");
            }
        }
    });
    
    return false;
}