var BürgermeisterRun = BürgermeisterRun || {};

/**
 * Controls for the game are shown here
 * Calls (parent) State class constructor
 * @constructor
 */

var current_level;
BürgermeisterRun.Option_control = function () {
    "use strict";
    Phaser.State.call(this);
};
/**
 * Assets (the background)
 */
BürgermeisterRun.Option_control.prototype.preload = function () {
    "use strict";

    game.load.image('control','assets/images/steuerungsemi.png');


};
/**
 * creates an object of Type State
 * @type {Phaser.State}
 */
BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.Option_control;


/**
 * look at the description in MainMenu for the function init
 * @param next_level
 */

BürgermeisterRun.Option_control.prototype.init = function (next_level) {
    "use strict";
    current_level=next_level;
}
/**
 * set the background (the image for the controls)
 * add the button menu and his functionality (the function "up" is already defined in the state MainMenu)
 * add the button option and his functionality (up_option is already defined in the state Option)
 */

BürgermeisterRun.Option_control.prototype.create = function () {
    "use strict";

    // set background
    var background = game.add.sprite(0, 0, 'control');

    var menueButton= game.add.button(100, 50, "menu", actionOnClick(0), this, 2, 1, 0);
    menueButton.onInputUp.add(up_option, {param1: 3}, this);

    var optionButton = game.add.button(500, 50, 'option', actionOnClick(0), this, 2, 1, 0);
    // button listener
    optionButton.onInputUp.add(up, {param1: 0}, this);

};

function actionOnClick(level){

};