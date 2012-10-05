/* 
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html 
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */

$( "#map-page" ).live( "pageinit", function() {
	
	var map, geocoder;
	var defaultLatLng = new google.maps.LatLng(37.09, -95.71);  // Default Guayaquil, cuando no hay soporte de geolocalización
	
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show map with these coordinates
			drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		}
		
		function fail(error) {
			console.log(error);
			drawMap(defaultLatLng);  // Failed to find location, show default map
		}
		
		// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
		navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
	} else {
		drawMap(defaultLatLng);  // No geolocation support, show default map	
	}

	function drawMap(latlng) {
		var myOptions = {
			zoom: 14,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		 map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		// Add an overlay to the map of current lat/lng
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "Saludos!"
		});
		
          
          // Adding a click event to the marker
          google.maps.event.addListener(marker, 'click', function(e) {
			   getAddress(e.latLng);
            
          });
		
	}
	function getAddress(latLng) {

    // Check to see if a geocoder object already exists
    if (!geocoder) {
      geocoder = new google.maps.Geocoder();
    }

    // Creating a GeocoderRequest object
    var geocoderRequest = {
      latLng: latLng
    }

    geocoder.geocode(geocoderRequest, function(results, status) {
  

      // Creating an InfowWindow          
          var infowindow = new google.maps.InfoWindow();
  
      // Setting the position for the InfoWindow
      infowindow.setPosition(latLng);
  
      // Creating content for the InfoWindow
      var content = '<h3>Position: ' + latLng.toUrlValue() + '</h3>';
  
      // Check to see if the request went allright
      if (status == google.maps.GeocoderStatus.OK) {
	
        // Looping through the result
        for (var i = 0; i < results.length; i++) {
          if (results[0].formatted_address) {
            content += i + '. ' + results[i].formatted_address + '<br />';    			
          }
        }
	
      } else {
        content += '<p>No address could be found. Status = ' + status + '</p>';
      }

      // Adding the content to the InfoWindow
      infowindow.setContent(content);
  
      // Opening the InfoWindow
      infowindow.open(map);

    });	
	
	$("#map-page2").live("pageinit",function(){
	
		var defaultLatLng = new google.maps.LatLng(-2.140012,-79.879684);  // Default Terminal Río Daule
	
		drawMap(defaultLatLng);  // No geolocation support, show default map	
	

	function drawMap(latlng) {
		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

			var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "Metrovía Guayaquil"
			
		});
		
		 // Creating an InfowWindow          
          var infowindow = new google.maps.InfoWindow({
            content: 'Metrovía Guayaquil'
          });
          
          // Adding a click event to the marker
          google.maps.event.addListener(marker, 'click', function() {
            // Opening the InfoWindow
          	infowindow.open(map, marker);
          });
		
	}
	
});
	

		
  }
	
	
});