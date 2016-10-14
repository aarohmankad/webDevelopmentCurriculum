/**
 * Player object to store on server
 * @param startX {Object} starting x coord of player
 * @param startY {Object} starting y coord of player
 * @return {Object} Player Object
 */
var Player = function (startX, startY) {
  var
    x = startX,
    y = startY,
    id;

  /**
   * @return {Integer} x coord of player
   */
  this.getX = function() {
    return x;
  }

  /**
   * @return {Integer} y coord of player
   */
  this.getY = function() {
    return y;
  }

  /**
   * set x coord of player
   * @param newX {Integer} new x coord for player
   */
  this.setX = function(newX) {
    x = newX;
  }

  /**
   * set y coord of player
   * @param newY {Integer} new y coord for player
   */
  this.setY = function(newY) {
    y = newY;
  }

  return this;
}

exports.Player = Player;