var BürgermeisterRun = BürgermeisterRun || {};

/**
 * Tiled State
 * Reads the map data and creates the game objects
 * @constructor
 */
BürgermeisterRun.TiledState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "player": BürgermeisterRun.Player.prototype.constructor,
        "ground_enemy": BürgermeisterRun.GroundEnemy.prototype.constructor,
        "flying_enemy": BürgermeisterRun.FlyingEnemy.prototype.constructor,
        "running_enemy": BürgermeisterRun.RunningEnemy.prototype.constructor,
        "goal": BürgermeisterRun.Goal.prototype.constructor,
        "checkpoint": BürgermeisterRun.Checkpoint.prototype.constructor,
        "coin": BürgermeisterRun.Coin.prototype.constructor,
        "score": BürgermeisterRun.Score.prototype.constructor,
        "life": BürgermeisterRun.Life.prototype.constructor,
        "infobox": BürgermeisterRun.Infobox.prototype.constructor,
        "jag": BürgermeisterRun.Jag.prototype.constructor,
        "fire": BürgermeisterRun.Fire.prototype.constructor,
        "green_enemy": BürgermeisterRun.WalkingEnemy.prototype.constructor

    };
};

/**
 * Tiled State extends from State class, for quick access to common functions
 */
BürgermeisterRun.TiledState.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.TiledState.prototype.constructor = BürgermeisterRun.TiledState;

/**
 * Init the level info provided by start function in main.js
 * Grab the map referenced in the level data json
 * Create the map
 * @param level_data
 */
BürgermeisterRun.TiledState.prototype.init = function (level_data) {
    "use strict";
    var tileset_index;
    this.level_data = level_data;
    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    // create map and set tileset
    this.map = this.game.add.tilemap(level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);

};
/**
 * crate layers
 * create groups
 * crate objects by calling the create_object function
 *
 */
BürgermeisterRun.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;
    
    // create map layers
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            collision_tiles = [];
            layer.data.forEach(function (data_row) { // find tiles used in the layer
                data_row.forEach(function (tile) {
                    // check if it's a valid tile index and isn't already in the list
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);
    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();

    /**
     * Create groups
     * Note:
     * 1.the order of the groups define the order they are drawn on the screen
     * 2.groups must be created after layers, otherwise the layers would be drawn above them.
     */
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};

    // create objects defined in the tileset map
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }

    // focus on player
    this.game.camera.follow(this.prefabs.player);
};

/**
 * Go through the tiled map json
 * Init respective prefab object
 * That way it lands in the game
 * @param object
 */
BürgermeisterRun.TiledState.prototype.create_object = function (object) {
    "use strict";
    var position, prefab;
    // tiled coordinates starts in the bottom left corner
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object.y - (this.map.tileHeight / 2)};
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};


/**
 * Is called when the player dies
 * if the player have lives he will respawn at the beginning or the checkpoint if reached
 * otherwise it call the GameOver state
 */
BürgermeisterRun.TiledState.prototype.restart_level = function () {
    "use strict";
	// restart the game only if the checkpoint was not reached
    if(this.prefabs.player.life>1) {
        this.prefabs.player.life = this.prefabs.player.life -1;
        if (this.prefabs.checkpoint.checkpoint_reached) {
            this.prefabs.player.x = this.prefabs.checkpoint.x;
            this.prefabs.player.y = this.prefabs.checkpoint.y;
            this.prefabs.player.body.velocity.x = 0;
            this.prefabs.player.body.velocity.y = 0;
        } else {
            this.prefabs.player.x = this.prefabs.player.start_x;
            this.prefabs.player.y = this.prefabs.player.start_y;
            this.prefabs.player.body.velocity.x = 0;
            this.prefabs.player.body.velocity.y = 0;

            //this.game.state.restart(true, false, this.level_data);
        }
    }else{
        this.game.state.start("GameOver",true, false, this.level_data['level']['level']);
        _iPaperball=10;
        levelSound.destroy();
    }
};
