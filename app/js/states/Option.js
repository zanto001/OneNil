var BürgermeisterRun = BürgermeisterRun || {};

/**
 * Options for the game are classified here
 * Calls (parent) State class constructor
 * @constructor
 */

var current_level;
BürgermeisterRun.Option = function () {
    "use strict";
    Phaser.State.call(this);
};

/**
 * Preloader for the assets
 */
BürgermeisterRun.Option.prototype.preload = function () {
    "use strict";
    game.load.image('steuerung','assets/images/buttonSteuerung.png');
    game.load.image('anleitung','assets/images/buttonAnleitung.png');
    game.load.image('sound','assets/images/sound_button.png');
    game.load.image('soundOff','assets/images/sound_button_aus.png');
    game.load.image('menu','assets/images/buttonMenu.png');
    game.load.image('anzeige','assets/images/Optionen_anzeige.png');
};

BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.Option;

/**
 * Look at the description in MainMenu at Method init
 * @param next_level
 */

BürgermeisterRun.Option.prototype.init = function (next_level) {
    "use strict";
    current_level=next_level;
}

/**
 * Create the background
 * add the buttons to the screen
 * add the functionality to the buttons
 */
BürgermeisterRun.Option.prototype.create = function () {
    "use strict";

    var background = game.add.sprite(0, 0, 'anzeige');

    // create button

    var menueButton= game.add.button(300, 150, "menu", actionOnClick(3), this, 2, 1, 0);
    menueButton.onInputUp.add(up_option, {param1: 3}, this);

    var controlButton= game.add.button(300, 270, "steuerung", actionOnClick(0), this, 2, 1, 0);
    controlButton.onInputUp.add(up_option, {param1: 0}, this);

    var anleitungButton= game.add.button(300, 390, "anleitung", actionOnClick(1), this, 2, 1, 0);
    anleitungButton.onInputUp.add(up_option, {param1: 1}, this);

    if(game.sound.mute){
        soundButton= game.add.button(300, 510, "soundOff", actionOnClick(4), this, 2, 1, 0);
        soundButton.onInputUp.add(up_option, {param1: 4}, this);
    }
    else{
        var soundButton= game.add.button(300, 510, "sound", actionOnClick(2), this, 2, 1, 0);
        soundButton.onInputUp.add(up_option, {param1: 2}, this);
    }



};

/**
 * functionalities of the buttons
 * param1: 0 = jump to "Steuerung"
 * param1: 1 = jump to "Anleitung"
 * param1: 2 = show the soundOff button and mute the game
 * param1: 3 = jump to the mainmenu
 * param1: 4 = turn on the sound
 */
function up_option(){
    if(this.param1===0){
        game.state.start("Option_control", true, false, current_level);
    }
    else if (this.param1 === 1){
        game.state.start("Option_instruction", true, false, current_level);
    }else if (this.param1 === 2) {
        soundButton= game.add.button(300, 510, "soundOff", actionOnClick(4), this, 2, 1, 0);
        soundButton.onInputUp.add(up_option, {param1: 4}, this);
        game.sound.mute = true;
    }
    else if (this.param1 === 3) {
        game.state.start("MainMenu",true,false,current_level);
    }
    else{
        soundButton= game.add.button(300, 510, "sound", actionOnClick(2), this, 2, 1, 0);
        soundButton.onInputUp.add(up_option, {param1: 2}, this);
        game.sound.mute = false;
    }

};

function actionOnClick(level){

};