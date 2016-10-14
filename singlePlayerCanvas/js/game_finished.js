////////////////////
// Game Variables //
////////////////////
// canvas {Object} our canvas to draw on
// context {Object} graphics that lets us draw
// keys {Keys} controls state of key presses at any time
// localPlayer {Player} our player object
var
  canvas,
  context,
  keys,
  localPlayer;

/**
 * initialize the game
 */
function init() {
  // Set canvas and context
  canvas = document.getElementById('gameCanvas');
  context = canvas.getContext('2d');

  // Create the new Keys object
  keys = new Keys();

  // Make canvas full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create a player with random starting coordinated
  var
    startX = Math.round(Math.random() * (canvas.width - 5)),
    startY = Math.round(Math.random() * (canvas.height - 5));

  localPlayer = new Player(startX, startY);

  // set event handlers for keyDown, keyUp, and windowResize
  setEventHandlers();
}

/**
 * sets event handlers on certain user events (keydown, keyup, and resize)
 */
function setEventHandlers() {
  // Keyboard
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  // Window resize
  window.addEventListener("resize", onResize);
}

/**
 * track what key was pressed down
 * @param e {Object} key press data
 */
function onKeyDown(e) {
  localPlayer ? keys.onKeyDown(e) : false;
}

/**
 * track what key was let go
 * @param e {Object} key press data
 */
function onKeyUp(e) {
  localPlayer ? keys.onKeyUp(e) : false;
}

/**
 * set canvas to full window width and height
 * when window is resized
 */
function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

/**
 * Calls update and draw 60 times a second
 */
function animate() {
  update();
  draw();

  window.requestAnimationFrame(animate);
}

/**
 * updates player based on state of keys pressed
 */
function update() {
  localPlayer.update(keys);
}

/**
 * draw player onto canvas
 */
function draw() {
  // clear canvas every time
  context.clearRect(0, 0, canvas.width, canvas.height);

  localPlayer.draw(context);
}

// Initialize and animate the game
init();
animate();