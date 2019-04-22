var BürgermeisterRun = BürgermeisterRun || {};

/**
 * Boot State
 * Loads json file with the level information and starts the Loading State.
 * Calls (parent) State class constructor
 * @constructor
 */
BürgermeisterRun.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

/**
 * Boot State extends from State class, for quick access to common functions
 */
BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.BootState;

/**
 * init is the very first function called when your State starts up.
 * It's called before preload, create or anything else.
 * If you need to route the game away to another State you could do so here, or if you need to prepare a set of variables or objects before the preloading starts.
 * src: https://phaser.io/docs/2.3.0/Phaser.State.html#init
 * This way data can be shared across states without declaring variables outside the state
 * @param level_file provided by call of that state in MainMenu.js file.
 * game.state.start("BootState", true, false, "assets/levels/level1.json");
 */
BürgermeisterRun.BootState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};

/**
 * Load the json file with level information
 */
BürgermeisterRun.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
};

/**
 * Loads the level info as JSON.
 * start(key, clearWorld, clearCache, parameter)
 * src:https://phaser.io/docs/2.4.4/Phaser.StateManager.html#start
 * Starts the LoadingState with the level info JSON.
 */
BürgermeisterRun.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data);
};