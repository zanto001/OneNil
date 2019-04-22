var BürgermeisterRun = BürgermeisterRun || {};

/**
 * creates a WalkingEnemy object
 * add a animation
 *
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */

BürgermeisterRun.WalkingEnemy = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Enemy.call(this, game_state, position, properties);

    this.animations.add("moving", [0, 1, 2], 5, true);
    this.animations.play("moving");
};
/**
 * WalkingEnemy extend from Enemy class
 * @type {BürgermeisterRun.Enemy}
 */

BürgermeisterRun.WalkingEnemy.prototype = Object.create(BürgermeisterRun.Enemy.prototype);
BürgermeisterRun.WalkingEnemy.prototype.constructor = BürgermeisterRun.WalkingEnemy;

/**
 * the update function monitor the collision
 * and calls the switch_direction function if has_tile_to_walk is false
 */


BürgermeisterRun.WalkingEnemy.prototype.update = function () {
    "use strict";
    BürgermeisterRun.Enemy.prototype.update.call(this);

    if (this.body.blocked.down && !this.has_tile_to_walk()) {
        this.switch_direction();
    }
};

/**
 * the has_tile_to_walk function monitor the way the Enemy is walking
 * If theres no ground in front of him it returns false
 */

BürgermeisterRun.WalkingEnemy.prototype.has_tile_to_walk = function () {
    "use strict";
    var direction, position_to_check, map, next_tile;
    direction = (this.body.velocity.x < 0) ? -1 : 1;
    // check if the next position has a tile
    position_to_check = new Phaser.Point(this.x + (direction * this.game_state.map.tileWidth), this.bottom + 1);
    map = this.game_state.map;
    // getTileWorldXY returns the tile in a given position
    next_tile = map.getTileWorldXY(position_to_check.x, position_to_check.y, map.tileWidth, map.tileHeight, "collision");
    return next_tile !== null;

};