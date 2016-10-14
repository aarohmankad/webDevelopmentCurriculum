////////////////////
// Game Variables //
////////////////////
// canvas {Object} our canvas to draw on
// context {Object} graphics that lets us draw
// keys {Keys} controls state of key presses at any time
// localPlayer {Player} our player object
// remotePlayers {Array} array of Player objects also in the game
// socket {Socket} socket object that handles connection between client and server
var
  canvas,
  context,
  keys,
  localPlayer,
  remotePlayers,
  socket;

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
  remotePlayers = [];

  // Connect our client to our server port
  socket = io.connect('http://localhost', {
    port: 8080,
    transports: ['websocket'],
  });

  // set event handlers for keyDown, keyUp, and windowResize
  setEventHandlers();
}

/**
 * sets event handlers on certain user events (keydown, keyup, and resize)
 */
function setEventHandlers() {
  // Keyboard
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  // Window resize
  window.addEventListener('resize', onResize);

  // call onSocketConnected when this player is connected
  socket.on('connect', onSocketConnected);
  
  // call onSocketDisconnect when this player disconnects
  socket.on('disconnect', onSocketDisconnect);
  
  // call onNewPlayer when a new player joins the game
  socket.on('new player', onNewPlayer);
  
  // call onMovePlayer when any player moves
  socket.on('move player', onMovePlayer);

  // call onRemovePlayer when any player leaves
  socket.on('remove player', onRemovePlayer);
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
 * called when this player connects to the server
 */
function onSocketConnected() {
  console.log('Connected to socket server');

  // Push our local player to the server
  socket.emit('new player', {
    x: localPlayer.getX(),
    y: localPlayer.getY(),
  });
}

/**
 * called when player disconnects from the server
 */
function onSocketDisconnect() {
  console.log('Disconnected from socket server');
}

/**
 * called when a new player joins the game
 * @param data {Object} data of the new player
 */
function onNewPlayer(data) {
  console.log('New player connected:', data.id);

  var newPlayer = new Player(data.x, data.y);
  newPlayer.id = data.id;
  remotePlayers.push(newPlayer);
}

/**
 * called when any player moves
 * @param data {Object} data on the player that moved
 */
function onMovePlayer(data) {
  console.log("updating player");

  var movePlayer = findPlayerById(data.id);

  if (!movePlayer) {
    console.log('Player not found:', data.id);
    return;
  }

  movePlayer.setX(data.x);
  movePlayer.setY(data.y);
}

/**
 * called when player is removed or leaves
 * @param data {Object} data on player being removed or leaving
 */
function onRemovePlayer(data) {
  var removePlayer = findPlayerById(data.id);

  if (!removePlayer) {
    console.log('Player not found:', data.id);
    return false;
  }

  remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
}


/**
 * return player based on unique id
 * @param id {String} unique id for a player object
 * @return {Player}
 */
function findPlayerById (id) {
  for (var i = 0; i < remotePlayers.length; i++) {
    if (id === remotePlayers[i].id) {
      return remotePlayers[i];
    }
  }

  return null;
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
  if (localPlayer.update(keys)) {
    socket.emit('move player', {
      x: localPlayer.getX(),
      y: localPlayer.getY(),
    });
  }
}

/**
 * draw player onto canvas
 */
function draw() {
  // clear canvas every time
  context.clearRect(0, 0, canvas.width, canvas.height);

  localPlayer.draw(context);

  for (var i = 0; i < remotePlayers.length; i++) {
    remotePlayers[i].draw(context);
  };
}

// Initialize and animate the game
init();
animate();