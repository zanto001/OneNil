var BürgermeisterRun = BürgermeisterRun || {};

/**
 * creates a Enemy object
 * set the walking_speed to the walking_speed of the properties
 * set the walking_distance to the walking_distance of the properties
 * set the score to the score of the properties
 *
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */


BürgermeisterRun.Enemy = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);
    
    this.walking_speed = +properties.walking_speed;
    this.walking_distance = +properties.walking_distance;
    this.score = +properties.score;
    
    // saving previous x to keep track of walked distance
    this.previous_x = this.x;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.velocity.x = properties.direction * this.walking_speed;
    
    this.scale.setTo(-properties.direction, 1);
    
    this.anchor.setTo(0.5);
};

/**
 * Enemy extend from Prefab class
 * @type {BürgermeisterRun.Prefab}
 */
BürgermeisterRun.Enemy.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.Enemy.prototype.constructor = BürgermeisterRun.Enemy;



/**
 * the update function monitor the collision
 * and calls the switch_direction function if the Enemy walked the walking distance
 */

BürgermeisterRun.Enemy.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    
    // change the direction if walked the maximum distance
    if (Math.abs(this.x - this.previous_x) >= this.walking_distance) {
        this.switch_direction();
    }
};

/**
 * Switches the direction of the Enemy
 *
 */
BürgermeisterRun.Enemy.prototype.switch_direction = function () {
    "use strict";
    this.body.velocity.x *= -1;
    this.previous_x = this.x;
    this.scale.setTo(-this.scale.x, 1);
};