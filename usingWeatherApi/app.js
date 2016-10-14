// Execute this code when the weatherLocationButton is clicked
document.getElementById('weatherLocationButton').addEventListener('click', function() {
  // call getWeatherData
  getWeatherData();
});

// Execute this code when the weatherSFButton is clicked
document.getElementById('weatherSFButton').addEventListener('click', function() {
  // call getWeatherData with San Francisco ZIP code
  getWeatherData(94101);
});

document.getElementById('customZIP').addEventListener('keypress', function(event) {
  if (event.which !== 13) {
    return false;
  }

  var customZIP = document.getElementById('customZIP').value;
  getWeatherData(customZIP);
});

/**
 * gets data from wunderground api
 */
function getWeatherData(zip) {
  // Create an HTTPRequest and our apiUrl
  var
    request = new XMLHttpRequest(),
    apiUrl;

  // URL contains our:
  // api: registed for one from Wunderground website
  // forecast: what data we want
  // autoip: automatically get location data from computer
  // zip: zip code for city to get weather data of
  if (zip) {
    apiUrl = 'http://api.wunderground.com/api/fa15555a27e3935d/forecast/q/' + zip + '.json';
  } else {
    apiUrl = 'http://api.wunderground.com/api/fa15555a27e3935d/forecast/q/autoip.json';
  }

  // Open our request
  request.open('GET', apiUrl, true);

  // When request is loaded, execute this code
  request.onload = function() {
    // If statement checks there are no errors
    if (this.status >= 200 && this.status < 400) {
      // Success! Parse JSON
      var data = JSON.parse(this.response);
      // now format and load weather data into html
      formatAndLoadWeather(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('We reached our target server, but it returned an error', this.error);
    }
  };

  // If there is an error with our request, print it here
  request.onerror = function(err) {
    // There was a connection error of some sort
    console.log('There was an error with wunderground', err.text);
  };

  // Send our request
  request.send();
};

/**
 * format returned data and insert into HTML
 * @param data {Object} our formatted weather data
 */
function formatAndLoadWeather(data) {
  // Clear html for new weather data
  document.getElementById('weather').innerHTML = '';

  // Make an object that contains only todays weather.
  // Try printing data to see all the data we are given
  var weatherToday = data.forecast.txt_forecast.forecastday[0];

  // Image element that will hold weather icon
  var weatherImg = document.createElement('img');
  // Set source of image as icon_url that is returned
  weatherImg.src = weatherToday.icon_url;

  // Paragraph element that will contain weather summary text
  var weatherText = document.createElement('p');
  // Set innerHTML of paragraph element to summary weather text that was returned
  weatherText.innerHTML = weatherToday.fcttext;

  // Append both image and paragraph to our weather element in the HTML
  document.getElementById('weather').appendChild(weatherImg);
  document.getElementById('weather').appendChild(weatherText);
}