// When a key is pressed in the input box, execute this code
document.getElementById('text-input').addEventListener('keypress', function(event) {
  // return if enter key was not pressed
  // 13 === enter key code
  if (event.which !== 13) {
    return false;
  }

  // get value of input box
  var tagString = document.getElementById('text-input').value;

  // set images element as either `Loading` or our images
  document.querySelector('.images').innerHTML = searchFlickrByTags(tagString) || 'Loading';
});

/**
 * searches Flickr based on a string of tags
 * @param tagString {String} value of the input box when enter was pressed
 */
function searchFlickrByTags (tagString) {
  // Create an HTTPRequest and our apiUrl
  var
    request = new XMLHttpRequest(),
    // URL contains our:
    // api_key: registed for one from Flickr website
    // method: what we want to do with the flickr api (flickr.photos.search)
    // tags: what we want to search for (whatever was specified in input box)
    // format: specify json so flickr api returns json data (otherwise returns xml by default, xml isn't nice to work with in javascript)
    apiUrl = 'https://api.flickr.com/services/rest/?api_key=d5fda30419ed5d39efb5552fc413d0e0&method=flickr.photos.search&tags=' + encodeURIComponent(tagString) + '&format=json&nojsoncallback=1';

  // Open our request
  request.open('GET', apiUrl, true);

  // When request is loaded, execute this code
  request.onload = function() {
    // If statement checks there are no errors
    if (this.status >= 200 && this.status < 400) {
      // Success! Parse JSON
      var data = JSON.parse(this.response);
      // now format and load images into html
      formatAndLoadImages(data);
    } else {
      // We reached our target server, but it returned an error
      console.log('We reached our target server, but it returned an error', this.error);
    }
  };

  // If there is an error with our request, print it here
  request.onerror = function(err) {
    // There was a connection error of some sort
    console.log('There was an error with flickr', err.text);
  };

  // Send our request
  request.send();
};

/**
 * formats and loads images into html
 * @param data {Object} contains all our photo data
 * @return {[type]}      [description]
 */
function formatAndLoadImages (data) {
  var photos = data.photos.photo;
  console.log(photos);

  // clear our images element for new search
  document.querySelector('.images').innerHTML = '';

  // Loop through photos
  for(var i = 0; i < photos.length; i++) {
    // Construct an image url we can use
    // formatted according to spec specified here: https://www.flickr.com/services/api/misc.urls.html
    var imageUrl = 'http://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg'
  
    // Create an image element
    var imageElement = document.createElement('img');
    // Set src of image as our constructed url
    imageElement.src = imageUrl;

    // insert image element into images element in our html file
    document.querySelector('.images').appendChild(imageElement);
  }
}