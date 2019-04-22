var BürgermeisterRun = BürgermeisterRun || {};


/**
 * creates a Goal object
 * set the next level variable to the next_level variable of the properties
 * @param game_state
 * @param position
 * @param properties
 * @constructor
 */

BürgermeisterRun.Goal = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);
    
    this.next_level = properties.next_level;
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.anchor.setTo(0.5);
};
/**
 * create the object
 * Goal extends the Prefab class
 * @type {BürgermeisterRun.Prefab}
 */

BürgermeisterRun.Goal.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.Goal.prototype.constructor = BürgermeisterRun.Goal;

/**
 * the update function monitor the collision
 * and calls the reach_goal function if this overlap with the player
 */
BürgermeisterRun.Goal.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};
/**
 * stops the sound
 * starts the Quizscreen
 * resets the numbers (paperballs, scoreMultiplier)
 */

BürgermeisterRun.Goal.prototype.reach_goal = function () {
    "use strict";

    levelSound.destroy();
    this.game_state.game.state.start("QuizScreen",true, false, this.game_state, this.next_level);
    _iPaperball = 10;
    scoreMultiplier = 1;
};

