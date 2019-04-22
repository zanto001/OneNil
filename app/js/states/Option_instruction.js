var BürgermeisterRun = BürgermeisterRun || {};

/**
 * Instructions and rules for the game are shown here
 * Calls (parent) State class constructor
 * @constructor
 */

var current_level;
BürgermeisterRun.Option_instruction = function () {
    "use strict";
    Phaser.State.call(this);
};
/**
 * load the background from assets
 */

BürgermeisterRun.Option_instruction.prototype.preload = function () {
    "use strict";

    game.load.image('instruction','assets/images/Option_instruction.png');

};

BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.Option_instruction;
/**
 * look at descrition from MainMenu init function
 * @param next_level
 */
BürgermeisterRun.Option_instruction.prototype.init = function (next_level) {
    "use strict";
    current_level=next_level;
};

/**
 * set the background (the image for the instructions)
 * add the button menu and his functionality (the function "up" is already defined in the state Option)
 * add the button option and his functionality (same as menu button)
 */

BürgermeisterRun.Option_instruction.prototype.create = function () {
    "use strict";

    // set background
    var background = game.add.sprite(0, 0, 'instruction');

    var menueButton= game.add.button(100, 700, "menu", actionOnClick(0), this, 2, 1, 0);
    menueButton.onInputUp.add(up_option, {param1: 3}, this);

    var optionButton = game.add.button(500, 700, 'option', actionOnClick(0), this, 2, 1, 0);
    // button listener
    optionButton.onInputUp.add(up, {param1: 0}, current_level);

};

