var BürgermeisterRun = BürgermeisterRun || {};


/**
 * Main Menu
 * Loads the buttons to start the levels.
 * Calls (parent) State class constructor
 * @constructor
 */

var mainMenuSound;
var current_level;
var best_level=1;

var kurhaus_level_button;
var russische_kirche_level_button;
var warmer_damm_level_button;
var neroberg_level_button;



BürgermeisterRun.MainMenu = function () {
    "use strict";
    Phaser.State.call(this);



};
/**
 * Loading the assets
 * before accessing the assets, they must be scaled to the window
 */
BürgermeisterRun.MainMenu.prototype.preload = function () {
    "use strict";

    game.load.image('wiesbaden','assets/images/wiesbaden1.png');
    game.load.image('1','assets/images/button_level_1.png');
    game.load.image('2','assets/images/button_level_2.png');
    game.load.image('3','assets/images/button_level_3.png');
    game.load.image('4','assets/images/button_level_4.png');

    game.load.image('infobox_speech_bubble','assets/images/infobox_speech_bubble.png');
    game.load.image('infobox_speech_bubble_green','assets/images/infobox_speech_bubble_green.png');

    game.load.image('option','assets/images/optionen_button.png');
    game.load.audio('mainMenuSound','assets/sounds/main_menu_music.wav');
    mainMenuSound = game.add.sound('mainMenuSound', 0.3, true);



    //adding devices to adjust the screen
    if( Phaser.Device.iPad) {
        game.scale.setGameSize(1060, 850);}
    else if (Phaser.Device.android ||Phaser.Device.iPhone ){
        game.scale.setGameSize(750, 425);

    }
    else{
        //scale the window
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = false;
        this.scale.setScreenSize(true);
        game.scale.setGameSize(1060, 850);
    }
    //window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio

    // scales the screen to every device known to man
    this.game.scale.maxWidth = this.game.device.innerWidth*this.game.device.pixelRatio;
    this.game.scale.maxHeight = this.game.device.innerHeight*this.game.device.pixelRatio;


};

/**
 * Loads the images
 */


BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.MainMenu;


/**
 * init is the very first function called when your State starts up.
 * It's called before preload, create or anything else.
 * If you need to route the game away to another State you could do so here, or if you need to prepare a set of variables or objects before the preloading starts.
 * src: https://phaser.io/docs/2.3.0/Phaser.State.html#init
 * This way data can be shared across states without declaring variables outside the state
 * @param next_level provided by call of that state in main.js file.
 * game.state.start("BootState", true, false, "assets/levels/level1.json");
 */
BürgermeisterRun.MainMenu.prototype.init = function (next_level) {
    "use strict";
    this.next_level=next_level;
    current_level=next_level;
    if(next_level>best_level){
        best_level=next_level;
    }
};

/**
 * in the create function we create the Layout of the Menu and add the buttons a listener
 */
BürgermeisterRun.MainMenu.prototype.create = function () {
    "use strict";


    if(!mainMenuSound.isPlaying) {
        mainMenuSound.play();
    }
    // set background
    var background = game.add.sprite(0, 0, 'wiesbaden');

    // create buttons

    var optionButton = game.add.button(775, 0, 'option', actionOnClick(0), this, 2, 1, 0);
    // button listener
    optionButton.onInputUp.add(up, {param1: 0}, this);

     var tempButton;
     var y=636;
     var x=580;
     for(var i=1;i<=best_level;i++) {
         tempButton = game.add.button(x, y, i, actionOnClick(i), this, 2, 1, 0);
         // button listener
         tempButton.onInputUp.add(up, {param1: i}, this);
         switch (i) {
             case 1:
                 x = 620;
                 y = 508;
                 break;
             case 2:
                 x=314;
                 y=51;
                 break;
             case 3:
                 x=10;
                 y=38;
                 break;
             default:
                 x=0;
                 y=0;
         }
     }
};

/**
 *  called when a button is klicked
 *  matches the levels with the buttons by checking param1
 */
function up(){

    mainMenuSound.destroy();

    if(this.param1===0){
        game.state.start("Option", true, false, current_level);
    }
    else if (this.param1 === 1 || this.param1 === "1"){
        game.state.start("BootState", true, false, "assets/levels/level1.json");

    }else if (this.param1 === 2|| this.param1 === "2") {
        game.state.start("BootState", true, false, "assets/levels/level2.json");

    } else if (this.param1 === 3|| this.param1 === "3") {
        game.state.start("BootState", true, false, "assets/levels/level3.json");

    }else if (this.param1 === 4|| this.param1 === "4") {
        game.state.start("BootState", true, false, "assets/levels/level4.json");

    }

};

function actionOnClick(level){
};