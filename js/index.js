var degrees = 'f';

function getLocation() {
  var msg;

  if ('geolocation' in navigator) {
    // geolocation is supported :)
    requestLocation();
  } else {
    // no geolocation :(
    msg = "Sorry, looks like your browser doesn't support geolocation";
    outputResult(msg); 
  }

  function requestLocation() {
    var options = {
      // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
      enableHighAccuracy: false,
      // timeout = how long does the device have, in milliseconds to return a result?
      timeout: 5000,
      // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
      maximumAge: 0
    };

    // call getCurrentPosition()
    navigator.geolocation.getCurrentPosition(success, error, options);

    // upon success, do this
    function success(pos) {
      // get longitude and latitude from the position object passed in
      var lng = pos.coords.longitude;
      var lat = pos.coords.latitude;
      
      msg = 'You appear to be at longitude: ' + lng + ' and latitude: ' + lat;
      //outputResult(msg);  output message
      //$('.pure-button').removeClass('pure-button-primary').addClass('pure-button-success'); // change button style
      loadWeather(lat + ',' + lng);
    }

    // upon error, do this
    function error(err) {
      // return the error message
      msg = 'Error: ' + err + ' :(';
      //outputResult(msg); // output button
      // $('.pure-button').removeClass('pure-button-primary').addClass('pure-button-error'); // change button style
    }
  } // end requestLocation();

  function outputResult(msg) {
    //$(".location").text(msg);
    //console.log(msg);
  }
} // end getLocation()

$(document).ready(function() {
  getLocation();
  
}); /* end doc ready... */

$(".toggleDegrees").on("click", function() {
  if (degrees == 'f') {
    degrees = 'c';
  } else {
    degrees = 'f';
  }
  getLocation();
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: degrees,
    success: function(weather) {
      city = weather.city;
      temp = weather.temp + '&deg; ' + degrees;
      wcode = '<img src=' + weather.image + '></img>';
      wind = weather.wind.speed + weather.units.speed;
      humidity = weather.humidity + ' %';

      $(".weatherImageCurrent").html(wcode);
      $(".location").text('Currently in ' + city);
      $(".temperature").html(temp);
      $(".windSpeed").html(wind);
      $(".humidity").text(humidity);

      $(".weatherImage1").html('<img src=' + weather.forecast[1].thumbnail + '></img>');
      $(".weatherImage2").html('<img src=' + weather.forecast[2].thumbnail + '></img>');
      $(".weatherImage3").html('<img src=' + weather.forecast[3].thumbnail + '></img>');
      $(".weatherImage4").html('<img src=' + weather.forecast[4].thumbnail + '></img>');

      $(".high1").html('high ' + weather.forecast[1].high + '&deg;');
      $(".dayName1").text(weather.forecast[1].day);
      $(".high2").html('high ' + weather.forecast[2].high + '&deg;');
      $(".dayName2").text(weather.forecast[2].day);
      $(".high3").html('high ' + weather.forecast[3].high + '&deg;');
      $(".dayName3").text(weather.forecast[3].day);
      $(".high4").html('high ' + weather.forecast[4].high + '&deg;');
      $(".dayName4").text(weather.forecast[4].day);

    },
    error: function(error) {
      $(".error").html('<p>' + error + '</p>');
    }
  });
}