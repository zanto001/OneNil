var BürgermeisterRun = BürgermeisterRun || {};

/**
 * creates a Fire object
 * add a animation
 *
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */

BürgermeisterRun.Fire = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.DestroyObject.call(this, game_state, position, properties);

    this.animations.add("fire", [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31], 5, true);
    //
    this.animations.play("fire");

    this.anchor.setTo(0.5);
};
/**
 * Fire extend from DestroyObject class
 * @type {BürgermeisterRun.DestroyObject.}
 */

BürgermeisterRun.Fire.prototype = Object.create(BürgermeisterRun.DestroyObject.prototype);
BürgermeisterRun.Fire.prototype.constructor = BürgermeisterRun.Fire;

/**
 * the update function monitor the collision
 */

BürgermeisterRun.Fire.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

};