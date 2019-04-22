var BürgermeisterRun = BürgermeisterRun || {};

/**
 * creates a RunningEnemy object
 * set the detection_distance to the detection_distance of the properties
 * set the running_speed to the running_speed of the properties
 *
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */


BürgermeisterRun.RunningEnemy = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.GroundEnemy.call(this, game_state, position, properties);
    
    this.detection_distance = +properties.detection_distance;
    this.running_speed = +properties.running_speed;
};

/**
 * RunningEnemy extend from GroundEnemy class
 * @type {BürgermeisterRun.GroundEnemy}
 */

BürgermeisterRun.RunningEnemy.prototype = Object.create(BürgermeisterRun.GroundEnemy.prototype);
BürgermeisterRun.RunningEnemy.prototype.constructor = BürgermeisterRun.RunningEnemy;

/**
 * the update function monitor the collision
 * and runs to the Player if the detect_player function is true
 */



BürgermeisterRun.RunningEnemy.prototype.update = function () {
    "use strict";
    var direction;
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    if (this.detect_player()) {
        // player is inside detection range, run towards it
        direction = (this.game_state.prefabs.player.x < this.x) ? -1 : 1;
        this.body.velocity.x = direction * this.running_speed;
        this.scale.setTo(-direction, 1);
        this.previous_x = this.x;
    } else {
        // player is outside detection range, act like a regular enemy
        direction = (this.body.velocity.x < 0) ? -1 : 1;
        this.body.velocity.x = direction * this.walking_speed;
        this.scale.setTo(-direction, 1);
        BürgermeisterRun.GroundEnemy.prototype.update.call(this);
    }
};

/**
 * Is monitoring the area around the Enemy
 * if player is in the area it returns true
 * @returns {boolean}
 */

BürgermeisterRun.RunningEnemy.prototype.detect_player = function () {
    "use strict";
    var distance_to_player;
    distance_to_player = Math.abs(this.x - this.game_state.prefabs.player.x);
    // the player must be in the same ground y position, and inside the detection range
    return (this.bottom === this.game_state.prefabs.player.bottom) && (distance_to_player <= this.detection_distance);
};
