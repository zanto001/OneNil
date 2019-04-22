var BürgermeisterRun = BürgermeisterRun || {};


/**
 * creates a Destroy object
 * set the Gravity to false because it should be allowed to choose the position free
 * set the body immovable because it shouldnt move
 * add a animation
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */

BürgermeisterRun.DestroyObject = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);

    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.anchor.setTo(0.5);
};

/**
 * DestroyObject extend from Prefab class
 * @type {BürgermeisterRun.Prefab}
 */

BürgermeisterRun.DestroyObject.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.DestroyObject.prototype.constructor = BürgermeisterRun.DestroyObject;

/**
 * the update function monitor the collision
 */

BürgermeisterRun.DestroyObject.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);

};

