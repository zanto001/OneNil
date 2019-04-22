var BürgermeisterRun = BürgermeisterRun || {};
/**
 * display the score
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */
BürgermeisterRun.Score = function (game_state, position, properties) {
    "use strict";
    Phaser.Text.call(this, game_state.game, position.x, position.y, properties.text);
    
    this.game_state = game_state;
    
    this.game_state.groups[properties.group].add(this);
    
    this.fixedToCamera = true;
};
/**Score extend from phaser class
 * @type {Phaser.Text}
 */
BürgermeisterRun.Score.prototype = Object.create(Phaser.Text.prototype);
BürgermeisterRun.Score.prototype.constructor = BürgermeisterRun.Score;
/**
 * updates the score diplay
 */
BürgermeisterRun.Score.prototype.update = function () {
    "use strict";
    // update text to player current score
    this.text = "Score: " + this.game_state.prefabs.player.score + "       Papierbälle: "+ _iPaperball;
};
