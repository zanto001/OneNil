var BürgermeisterRun = BürgermeisterRun || {};

/**
 * In Phaser, prefabs are objects that extend Phaser.Sprite, acting as objects in our game.
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */
BürgermeisterRun.Prefab = function (game_state, position, properties) {
    "use strict";
    Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);
    
    this.game_state = game_state;
    
    this.game_state.groups[properties.group].add(this);
};

BürgermeisterRun.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
BürgermeisterRun.Prefab.prototype.constructor = BürgermeisterRun.Prefab;