var BürgermeisterRun = BürgermeisterRun || {};

/**
 *creates a checkpoint object where the player can respawn if he died
 */
BürgermeisterRun.Checkpoint = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);
    
    this.checkpoint_reached = false;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);
};
/**
 * Checkpoint object extend from Prefab class
 * @type {BürgermeisterRun.Prefab}
 */
BürgermeisterRun.Checkpoint.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.Checkpoint.prototype.constructor = BürgermeisterRun.Checkpoint;
/**
 * set collision betweeen this and the layer
 * calls the function reach_checkpoint if this and the player overlap
 */
BürgermeisterRun.Checkpoint.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_checkpoint, null, this);
};
/**
 * is called if this and the player overlap
 * set checkpoint_reached = true
 */
BürgermeisterRun.Checkpoint.prototype.reach_checkpoint = function () {
    "use strict";
    // checkpoint was reached
    this.checkpoint_reached = true;
};

