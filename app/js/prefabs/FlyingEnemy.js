var BürgermeisterRun = BürgermeisterRun || {};

/**
 * creates a FlyingEnemy object
 * add a animation
 * gravity to false because this Enemy is flying
 *
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */


BürgermeisterRun.FlyingEnemy = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Enemy.call(this, game_state, position, properties);
    
    // flying enemies are not affected by gravity
    this.body.allowGravity = false;
    
    this.animations.add("flying", [0, 1], 5, true);
    this.animations.play("flying");
};
/**
 * FlyingEnemy extend from Enemy class
 * @type {BürgermeisterRun.Enemy}
 */
BürgermeisterRun.FlyingEnemy.prototype = Object.create(BürgermeisterRun.Enemy.prototype);
BürgermeisterRun.FlyingEnemy.prototype.constructor = BürgermeisterRun.FlyingEnemy;