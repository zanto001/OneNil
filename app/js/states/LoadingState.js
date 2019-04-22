var BürgermeisterRun = BürgermeisterRun || {};

var quiz_data;
var current_level_loading_state;
var current_level_data = [];

var infobox_index = [];

var infobox_1_index;
var infobox_2_index;
var infobox_3_index;

var russische_kirche_level_path = "assets/maps/russische_kirche_map.json";
var neroberg_level_path = "assets/maps/neroberg_map.json";
var kurhaus_level_path = "assets/maps/kurhaus_map.json";
var warmer_damm_level_path = "assets/maps/warmer_damm_map.json";




/**
 * Loading State
 * Loads all the game assets, and starts the Level State.
 * Calls (parent) State class constructor
 * @constructor
 */
BürgermeisterRun.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

/**
 * Loading State extends from State class, for quick access to common functions
 */
BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.LoadingState;

/**
 * Init the level info provided by start function in main.js
 * @param level_data
 */
BürgermeisterRun.LoadingState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
};

/**
 * Loads the assets from the json file based on their type
 */
BürgermeisterRun.LoadingState.prototype.preload = function () {
    "use strict";
    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    for (asset_key in assets) { // load assets according to asset key
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
            this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
            break;
            case "audio":
                this.load.audio(asset_key, asset.source);
                break;
            }
        }
    }

    quiz_data = this.get_quiz_data();
    current_level_loading_state = this.get_current_level();
    console.log(current_level_loading_state);
    current_level_data = this.get_current_level_data(quiz_data,current_level_loading_state);
    this.populate_infoboxindexes(0,current_level_data.length - 1);
    console.log("infobox index 1: " + infobox_index[0]);
    console.log("infobox index 2: " + infobox_index[1]);
    console.log("infobox index 3: " + infobox_index[2]);



};

/**
 * Start the GameState with level data info
 * start(key, clearWorld, clearCache, parameter)
 * src:https://phaser.io/docs/2.4.4/Phaser.StateManager.html#start
 */
BürgermeisterRun.LoadingState.prototype.create = function () {
    "use strict";
    this.game.state.start("GameState", true, false, this.level_data);
};

/**
 * Loads the quiz data from JAVA app with via GET request
 * @returns string[]
 */
BürgermeisterRun.LoadingState.prototype.get_quiz_data = function (){
    var result = "";
    $.ajax({
        url:"http://localhost:63342/OneNil/app/data.json",
        async: false,
        success:function(data) {
            result = data;
        }
    });
    return result;
};



/**
 * Returns a random number between min and max (both inclusive)
 *
 * @param min int
 * @param max int
 * @returns int
 */
BürgermeisterRun.LoadingState.prototype.get_random_int_within_range = function (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates 3 different random ints and stores the values in global variables
 *
 * @param min int
 * @param max int
 */
BürgermeisterRun.LoadingState.prototype.populate_infoboxindexes = function (min, max){

    //infobox_1_index = this.get_random_int_within_range(min,max);
    infobox_index.push(this.get_random_int_within_range(min,max));

    var temp = this.get_random_int_within_range(min,max);
    while(temp == infobox_index[0]){
        temp = this.get_random_int_within_range(min,max);
    }
    //infobox_2_index = temp;
    infobox_index[1] = temp;

    temp = this.get_random_int_within_range(min,max);
    while(temp == infobox_index[0] || temp == infobox_index[1]){
        temp = this.get_random_int_within_range(min,max);
    }
    infobox_index[2] = temp;
};

BürgermeisterRun.LoadingState.prototype.get_current_level = function (){

    current_level_loading_state = this.level_data['assets']['level_tilemap']['source'];
    console.log(current_level_loading_state);

    if (current_level_loading_state === russische_kirche_level_path){

        current_level_loading_state = 'russische-kirche';

    } else if (current_level_loading_state === neroberg_level_path){

        current_level_loading_state = 'neroberg';

    } else if (current_level_loading_state === kurhaus_level_path){

        current_level_loading_state = 'kurhaus';

    } else {
        current_level_loading_state = 'warmer-damm';
    }

    return current_level_loading_state;
};

BürgermeisterRun.LoadingState.prototype.get_current_level_data = function (quiz_data, loading_state_current_level){
    var level_data_here = [];

    for (var i = 0; i < quiz_data.length; i++){

        if(quiz_data[i]['subject'] === loading_state_current_level){
            level_data_here.push(quiz_data[i]);
        }

    }
    return level_data_here;
};




