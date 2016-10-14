1. Start by creating a folder, and dragging the js and style folders into it

2. Then create a simple html file (be sure to name it index!).
   You can reference index_finished.html for any help

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>A game built using HTML5 canvas</title>
    <meta charset="utf-8">

    <!-- Just makes the window hide any overflow of canvas -->
    <link rel="stylesheet" href="style/game.css">
  </head>
  <body>

  </body>
</html>

3. We need a canvas, it's what we will draw our player on. 
   Put this code between the <body> and </body> tags

<canvas id="gameCanvas"></canvas>

4. Now let's inject some basic scripts into our html file. Add these tags right before </body>

<script src="js/Keys.js"></script>
<script src="js/Player.js"></script>
<script src="js/game.js"></script>

5. In the js folder, create a file and call it game.js
   You can reference the game_finished.js file for the completed game code

6. To create the game, lets create some variables and an initializing function

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
}

7. This will initialize the players, but not draw anything. Lets create an animate, update, and draw method

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

8. When you run your index.html in the browser, you'll notice that nothing get's drawn!
   That's because in Javascript, nothing gets called until you call it, so init and animate are never getting called.

9. Add these two function declarations at the bottom of your game.js to see a square
   appear everytime you refresh the page.

// Initialize and animate the game
init();
animate();

10. Now let's make our player move, at the end of the init function, 
    add a declaration for the setEventHandlers function.

setEventHandlers();

11. Now this doesn't do anything since we haven't created the function yet. Lets create it in game.js

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

12. What this does is call the onKeyDown function when the keydown event is fired by the browser,
    the onKeyUp function when keyup is fired, and so on. But we haven't yet decided how we want to handle key presses, let's do that. Create the onKeyDown, onKeyUp, and onResize functions.

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

13. Now, when we press a key, we tell our key code to handle the event and it saves the state of key presses.

14. Run your index.html file in Chrome and you should now have a little box that moves according to your key presses!