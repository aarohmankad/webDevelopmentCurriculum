
/////////////////////////
// Server Dependencies //
/////////////////////////
var
  util = require('util'),
  io = require('socket.io'),
  Player = require('./Player').Player;

///////////////////////
// Game Dependencies //
///////////////////////
var
  socket,
  players;

/**
 * initialize game variables and dependencies
 */
function init() {
  // Make our players an empty array when server starts
  players = [];

  // We want our app to run on port 8080 (this is just a common style)
  socket = io.listen(8080);

  // Configure the socket to use `websockets`; not super important
  socket.configure(function() {
    socket.set("transports", ["websocket"]);
    socket.set("log level", 2);
  });

  // Call setEventHandlers function
  setEventHandlers();
}

/**
 * set basic event handlers
 */
function setEventHandlers() {
  // call onSocketConnection every time a player joins the game
  socket.sockets.on('connection', onSocketConnection);
}

/**
 * called when a client joins the game
 * adds event listeners on the player
 * @param client {Object} data on the player who just joined
 */
function onSocketConnection (client) {
  util.log('New player has connected:', client.id);

  // call onClientDisconnect when this player disconnects
  client.on('disconnect', onClientDisconnect);

  // call onNewPlayer when new player joins
  client.on('new player', onNewPlayer);

  // call onMovePlayer when this player moves
  client.on('move player', onMovePlayer);
}

/**
 * called when a client leaves the game
 */
function onClientDisconnect() {
  util.log('Player has disconnected:', this.id);

  var removePlayer = findPlayerById(this.id);

  if (!removePlayer) {
    console.log('Player not found:', this.id);
    return false;
  }

  // This is just a fancy way to remove the player 
  // from the array
  players.splice(players.indexOf(removePlayer), 1);
 
  // Tell all other players that this player left.
  this.broadcast.emit('remove player', {
    id: this.id,
  });
}

/**
 * called when a new player joins the game
 * only called once a game is set up for local player
 * @param data {Object} data on player who joined
 */
function onNewPlayer (data) {
  // create a new player and assign it a unique id
  var newPlayer = new Player(data.x, data.y);
  newPlayer.id = this.id;

  // Let all other players know there is a new player
  // and send out new player's info.
  this.broadcast.emit('new player', {
    id: newPlayer.id,
    x: newPlayer.getX(),
    y: newPlayer.getY(),
  });

  for (var i = 0; i < players.length; i++) {
    var existingPlayer = players[i];

    // Send all existing players to current game instance
    this.emit('new player', {
      id: existingPlayer.id,
      x: existingPlayer.getX(),
      y: existingPlayer.getY(),
    });
  };

  players.push(newPlayer);
}

/**
 * called when player moves
 * @param data {Object} data on player movement
 */
function onMovePlayer (data) {
  var movePlayer = findPlayerById(this.id);

  if (!movePlayer) {  
    console.log('Player not found:', this.id);
  }

  movePlayer.setX(data.x);
  movePlayer.setY(data.y);

  this.broadcast.emit('move player', {
    id: movePlayer.id,
    x: movePlayer.getX(),
    y: movePlayer.getY(),
  });
}

/**
 * return player based on unique id
 * @param id {String} unique id for a player object
 * @return {Player}
 */
function findPlayerById (id) {
  for (var i = 0; i < players.length; i++) {
    if (id === players[i].id) {
      return players[i];
    }
  }

  return null;
}

// Initialize game and point user to "website"
init();
console.log('Magic happens on localhost:8080');
