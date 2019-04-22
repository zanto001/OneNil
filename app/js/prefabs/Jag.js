var BürgermeisterRun = BürgermeisterRun || {};

/**
 * creates a Jag object
 *
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */

BürgermeisterRun.Jag = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.DestroyObject.call(this, game_state, position, properties);

    this.anchor.setTo(0.5);
};
/**
 * Jag extend from DestroyObject class
 * @type {BürgermeisterRun.DestroyObject.}
 */
BürgermeisterRun.Jag.prototype = Object.create(BürgermeisterRun.DestroyObject.prototype);
BürgermeisterRun.Jag.prototype.constructor = BürgermeisterRun.Jag;


/**
 * the update function monitor the collision
 */

BürgermeisterRun.Jag.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

};