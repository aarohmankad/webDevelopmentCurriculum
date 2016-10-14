/**************************************************
** GAME PLAYER CLASS
**************************************************/
/**
 * @param startX {Integer} beginning x coord of player
 * @param startY {Integer} beginning y coord of player
 * @return {Object} Player object with update and draw functions
 */
var Player = function(startX, startY) {
	var x = startX,
		y = startY,
		moveAmount = 5;

	/**
	 * updates position on player based on key presses
	 * @param  keys {Object} access what keys were pressed
	 */
	var update = function(keys) {
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
	};

	/**
	 * draws player on canvas
	 * @param context {Object} context of the canvas we want to draw in
	 */
	var draw = function(context) {
		context.fillRect(x-5, y-5, 10, 10);
	};

	return {
		update: update,
		draw: draw
	}
};