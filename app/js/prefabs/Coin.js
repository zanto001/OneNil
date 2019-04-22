var BürgermeisterRun = BürgermeisterRun || {};
/**
 * creates a coin object
 * set the score to the score of the properties
 * add a animation
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */

var coinCollect;

BürgermeisterRun.Coin = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);
    
    this.score = +properties.score;
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.animations.add("turning", [0, 1, 2], 3, true);
    this.animations.play("turning");

    this.anchor.setTo(0.5);

    //sound
    coinCollect = this.game.add.sound('coinCollect',0.4,false);
};
/**
 * Coin extend from Prefab class
 * @type {BürgermeisterRun.Prefab}
 */
BürgermeisterRun.Coin.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.Coin.prototype.constructor = BürgermeisterRun.Coin;
/**
 * the update function monitor the collision
 * and calls the collect_coin function if this overlap with the player
 */
BürgermeisterRun.Coin.prototype.update = function () {
    "use strict";
    this.animations.play("turning");
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_coin, null, this);
};
/**
 * remove the coin object and increase the score
 * @param coin
 * @param player
 */
BürgermeisterRun.Coin.prototype.collect_coin = function (coin, player) {
    "use strict";
    // kill coin and increase score
    this.kill();
    player.score += this.score;
    _iPaperball++;
    coinCollect.play();

};

