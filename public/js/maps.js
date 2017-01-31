/**
 * Created by Epulapp on 08/12/2016.
 */

$(document).ready(function(){
    var locations = [
        // ['Bondi Beach', -33.890542, 151.274856, 4],
        // ['Coogee Beach', -33.923036, 151.259052, 5],
        // ['Cronulla Beach', -34.028249, 151.157507, 3],
        // ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        // ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];


    var Input = $("#dom-target").html();
    Input = jQuery.parseJSON(Input);
    console.log(Input);


    if(Input != undefined) {
        jQuery.each(Input, function (i, val) {
            locations.push([val.name, val.lat, val.lng, val.id]);
        })
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(45.758646, 4.860944),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent("bientot pointera vers la page :" + locations[i][3]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }


});
function drawUniqueStation(){




    var array = [];
    if(Input != undefined) {
        jQuery.each(Input, function (i, val) {
            array.push([new Date(val.created_at), parseFloat(val.nb_bikeAvailable), parseFloat(val.temperature) - 273.15]);
        })
    }
    data.addRows(array);
    console.log(array);

    var options = {
        hAxis: {
            title: 'Time'
        },
        vAxis: {
            title: 'Number'
        },
        displayAnnotations: true
    };

    var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div'));
    chart.draw(data, options);
}