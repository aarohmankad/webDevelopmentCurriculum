var
  // Express is a popular node server library
  express = require('express'),
  // Set up our app as an Express App
  app = express();

/*
 * returns index.html when user goes to localhost:8080
 * @param request {Object} request information from the browser (url, options, etc.)
 * @param response {Object} the response we want to send back, essentially the browser
 * @returns {File}
 */
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});


app.listen(8080);
console.log('Server listening to localhost:8080');
