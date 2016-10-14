1. We're going to create an app that lets us get weather
   data based on where we are, using the wunderground api.
   Let's start with the HTML. Be sure to name it `index.html`!

<!DOCTYPE html>
<html>
<head>
    <title>Using Weather API's</title>
</head>
<body>
    
    <!-- Button with unique id `weatherLocationButton` -->
    <button id="weatherLocationButton">Get Weather From Location!</button>

    <!-- HTML Element that we will inject our weather data into -->
    <div id="weather"></div>

<!-- Link to our Javascript -->
<script src="app.js"></script>
</body>
</html>

2. Now we don't have an app.js file yet, so lets create one.
   It doesn't need its own folder or anything, just put it right 
   next to the index.html

3. Now when we think of how we want our app to work, the user has
   to click the button first. We can find out when that happens by 
   adding a `click` event listener.

// Execute this code when the weatherLocationButton is clicked
document.getElementById('weatherLocationButton').addEventListener('click', function() {
  // Anything here gets called when you click the button
});

4. Lets call a function we will later create called getWeatherData

// Execute this code when the weatherLocationButton is clicked
document.getElementById('weatherLocationButton').addEventListener('click', function() {
  // call getWeatherData
  getWeatherData();
});

5. Now we'll create a function called getWeatherData, that will fetch
   weather data from the wundergroud api

/**
 * gets data from wunderground api
 */
function getWeatherData() {
  
}

6. Inside this function, lets create an XMLHttpRequest, which is how we
   can get data from api's

// Create an HTTPRequest and our apiUrl
  var
    request = new XMLHttpRequest(),
    // URL contains our:
    // api: registed for one from Wunderground website
    // forecast: what data we want
    // autoip: automatically get location data from computer
    apiUrl = 'http://api.wunderground.com/api/fa15555a27e3935d/forecast/q/autoip.json';


  // Open our request
  request.open('GET', apiUrl, true);

  // When request is loaded, execute this code
  request.onload = function() {
    // If statement checks there are no errors
    if (this.status >= 200 && this.status < 400) {
      // Success! Parse JSON
      var data = JSON.parse(this.response);
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

7. Read through that code and understand what it does. It's very 
   important to what we're doing! Now right under where we parse the JSON response,
   let's call a function that will take our data and put it into our html.

// If statement checks there are no errors
    if (this.status >= 200 && this.status < 400) {
      // Success! Parse JSON
      var data = JSON.parse(this.response);
      // now format and load weather data into html
      formatAndLoadWeather(data);
    } else {

8. Now we're done with the getWeatherData function. Lets 
   create the function that will format and load our weather data.

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

9. Now simply open your index.html in Chrome (preferred) and click 
   the button. You should get a little icon and some text that describes
   the current weather conditions. Congratulations on your first web app
   that utilizes an api!

10. Further Learning: Look at my `index.html` and `app.js`. I've made 
    some changes that let you search for weather by zip code, using San
    Francisco as an example. Can you add one for New York and Chicago on 
    your own?