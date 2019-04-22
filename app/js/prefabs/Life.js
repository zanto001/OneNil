var BürgermeisterRun = BürgermeisterRun || {};
/**
 * display the number of life
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */
BürgermeisterRun.Life = function (game_state, position, properties) {
    "use strict";
    Phaser.Text.call(this, game_state.game, position.x, position.y, properties.text);

    this.game_state = game_state;

    this.game_state.groups[properties.group].add(this);

    this.fixedToCamera = true;
};
/**Life extend from phaser class
 * @type {Phaser.Text}
 */
BürgermeisterRun.Life.prototype = Object.create(Phaser.Text.prototype);
BürgermeisterRun.Life.prototype.constructor = BürgermeisterRun.Life;
/**
 * updates the life display if the player dies
 */
BürgermeisterRun.Life.prototype.update = function () {
    "use strict";
    // update text to player current score
    this.text = "Leben: " + this.game_state.prefabs.player.life;
};
