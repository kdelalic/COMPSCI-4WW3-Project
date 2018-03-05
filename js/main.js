//Declare variables
var map;
var service;
var infowindow;

//Get and check for location compatibility
function alertLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(alertShowPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//Alert location on search page
function alertShowPosition(position) {
    alert("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
    window.location.href = 'results_sample.html';
}

//Load map on results page
function loadMap() {
    //Hard coded location
    var pyrmont = new google.maps.LatLng(43.2597561, -79.92468509999999);

    //Make new google map api object
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    //Request object
    var request = {
        location: pyrmont,
        query: 'sushi'
    };

    //Call google api to search for places
    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
}

//Callback function for results map search
//Places markers on map from array
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results)
        console.log(results[0].geometry.location)
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

//Creates markers on map
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent("<a href='" + place.name + ".html'>" + place.name + "</a>");
        infowindow.open(map, this);
    });
}

//Function for showing joya sushi on map
function joyaSushi() {
    map = new google.maps.Map(document.getElementById('objectMap'), {
        center: {
            lat: 43.257752,
            lng: -79.931316
        },
        zoom: 15
    });

    var request = {
        placeId: "ChIJLwDXbrqELIgRYpXamVT4dFo"
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, objectCallback);
}

//Function for showing hotaru sushi on map
function hotaruSushi() {
    map = new google.maps.Map(document.getElementById('objectMap'), {
        center: {
            lat: 43.257548,
            lng: -79.934190
        },
        zoom: 15
    });

    var request = {
        placeId: "ChIJe54xwbuELIgR5ld0exqCVUA"
    };

    service = new google.maps.places.PlacesService(map);
    service.getDetails(request, objectCallback);
}

//Callback for sushi restaurant
function objectCallback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarker(place);
    }
}

//Gets current location for submission page coordinates
function currentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentLocationCallback);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

//Submission page coordinate callback
function currentLocationCallback(position) {
    document.getElementById("lat").value = position.coords.latitude;
    document.getElementById("long").value = position.coords.longitude;
}

//Form validation function
function validateForm() {
    //Checks if name input is empty and alerts
    if (document.forms["register"]["name"].value == "") {
        alert("Name must be filled out.");
        return false;
    } else {
        //Checks if the name only contains letters.
        var letters = /^[A-Za-z]+$/;
        if (!document.forms["register"]["name"].value.match(letters)) {
            alert("Make sure to only use letters in your name.")
            return false;
        }
    }
    if (document.forms["register"]["location"].value == "") {
        alert("Location must be filled out.");
        return false;
    }
    if (document.forms["register"]["email"].value == "") {
        alert("Email must be filled out.");
        return false;
    } else {
        //Regex test for email format
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(document.forms["register"]["email"].value)) {
            alert("Email format should be user@example.com.");
            return false;
        }
    }
    if (document.forms["register"]["password"].value == "") {
        alert("Password must be filled out.");
        return false;
    }
    if (!document.forms["register"]["terms"].checked) {
        alert("Please agree to the terms.");
        return false;
    }
}