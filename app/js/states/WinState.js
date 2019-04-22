var BürgermeisterRun = BürgermeisterRun || {};


/**
 * Screen for the game when its cleared
 * Calls (parent) State class constructor
 * @constructor
 */

var current_level;
BürgermeisterRun.WinState = function () {
    "use strict";
    Phaser.State.call(this);
};
/**
 * load the assets
 */
BürgermeisterRun.WinState.prototype.preload = function () {
    "use strict";
    game.load.image('menu','assets/images/buttonMenu.png');
    game.load.image('win_state','assets/images/endScreen.png');

};
/**
 * create the object Winstate
 *
 * @type {Phaser.State}
 */
BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.WinState;

BürgermeisterRun.WinState.prototype.init = function (next_level) {
    "use strict";
    current_level=next_level;
}
/**
 * add the background (the Winningscreen)
 * add the menubutton and its functionality (jump to main menu)
 */
BürgermeisterRun.WinState.prototype.create = function () {
    "use strict";

    var WinState = game.add.sprite(300, 0, 'win_state');

    // create button
    var menuButton= game.add.button(920, 630, "menu", actionOnClick(), this, 2, 1, 0);
    menuButton.onInputUp.add(up_option, {param1: 3}, this);


};



function actionOnClick(level){

};