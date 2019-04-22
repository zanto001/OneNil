var BürgermeisterRun = BürgermeisterRun || {};

/**
 * GameOver State
 * screen will be shown, when the game is over and the player lost
 * Calls (parent) State class constructor
 * @constructor
 */

var current_level;
BürgermeisterRun.GameOver = function () {
    "use strict";
    Phaser.State.call(this);
};
/**
 * loading the assets
 */
BürgermeisterRun.GameOver.prototype.preload = function () {
    "use strict";
    game.load.image('menu','assets/images/buttonMenu.png');
    game.load.image('game_over','assets/images/GameOver.png');
    game.load.image('buttonAgain','assets/images/buttonNochmal.png');
};
/**
 * create the Object GameOver
 * @type {Phaser.State}
 */
BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.GameOver;

/**
 * look at the description from MainMenu function init
 * @param next_level
 */
BürgermeisterRun.GameOver.prototype.init = function (next_level) {
    "use strict";
    current_level=next_level;
}
/**
 * Add the buttons and their functionalities
 * add the background
 *
 */
BürgermeisterRun.GameOver.prototype.create = function () {
    "use strict";

    var gameOver = game.add.sprite(300, 0, 'game_over');

    // create button
    var menuButton= game.add.button(300, 300, "menu", actionOnClick(), this, 2, 1, 0);
    menuButton.onInputUp.add(upp, {param1: 2}, this);

    var againButton= game.add.button(600, 300, "buttonAgain", actionOnClick(), this, 2, 1, 0);
    againButton.onInputUp.add(up, {param1: current_level}, this);

};

/**
 * end the sound because the game restarts or it jumps to the main menu (there are another sounds)
 * @param level_data
 */
function upp(level_data){
    levelSound.destroy();
    game.state.start("MainMenu", true, false, current_level);

};

function actionOnClick(level){

};