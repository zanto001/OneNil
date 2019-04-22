var BürgermeisterRun = BürgermeisterRun || {};
var counter;

var result = {} ;
var current_level;

var infoboxSound;



BürgermeisterRun.Infobox = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);



    current_level = this.game_state.level_data['assets']['level_tilemap']['source'];

    this.activated = properties.activated;
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.anchor.setTo(0.5);
    infoboxSound = this.game.add.audio('infoboxSound',0.5,false);
    counter = 0;
};

BürgermeisterRun.Infobox.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.Infobox.prototype.constructor = BürgermeisterRun.Infobox;

BürgermeisterRun.Infobox.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.collide(this, this.game_state.groups.players, this.showInfo, null, this);
};

BürgermeisterRun.Infobox.prototype.showInfo = function (infobox, player) {
    "use strict";

    // add text to the infobox
    if (this.activated === false) {

        game.add.button(this.x - 380, this.y-160, 'infobox_speech_bubble_green', actionOnClick(0), this, 2, 1, 0);

        console.log("infobox_index + " + infobox_index);
        console.log("counter: " + counter);

        if (counter > 2 ){
            counter = 2;
        }
        this.info = game.add.text(this.x,this.y-105,current_level_data[infobox_index[counter]]['fact']);


        // position
        this.info.anchor.set(0.5);

        // font styling
        this.info.font = "Arial Black";
        this.info.fontSize = 15;
        this.info.fill = "#000000";
        this.info.align = "center";

        counter++;
    }
    this.activated=true;

    //sound
    infoboxSound.play();
};




function actionOnClick(){}