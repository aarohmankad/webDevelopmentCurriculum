Now it's time to move our players. Let start by tracking the current position of our player.

1.  In the Player.js file in the js folder, add a prevX and prevY to the 
    update function, so we can tell if they player has moved since the last frame.

/**
 * updates position on player based on key presses
 * @param  keys {Object} access what keys were pressed
 */
this.update = function(keys) {
  var
    prevX = x,
    prevY = y;

  if (keys.up) {
    y -= moveAmount;
  }

  if (keys.down) {
    y += moveAmount;
  }

  if (keys.left) {
    x -= moveAmount;
  }

  if (keys.right) {
    x += moveAmount;
  }

  // return true if player has moved
  return (prevX != x || prevY != y) ? true : false;
};

2. Now that we know if the player moves, let's only move the player on the screen
   if they player moves with the key press. Add the following code to the update function
   of game.js

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

3. Now we only update the player when the player moves. Since we can get data when the
   player moves, we can add this code to the onMovePlayer function in game.js

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

4. This code updates remote players when they move. To also track this on the server, add
   the following code to the onMovePlayer function in Server.js

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

5. We're done! Run `node server.js` in Git Bash and open multiple index.html files. 
   Try moving the players in both browsers. They should now be in sync.