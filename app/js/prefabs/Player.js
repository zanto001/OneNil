var BürgermeisterRun = BürgermeisterRun || {};

var lookRight=true;
var spacebarKey;
var doubleJump = false;
var paperball;
var shootTime=0;
var shootobject;
var _iPaperball =10;
var scoreMultiplier = 1;
var shootButton;
var jumpButton;
var jumpButtonDpad;
var leftButton;
var left=false;
var rightButton;
var right=false;
var downButton;
var duck=false;
var speedButton;
var speedrun=false;
const MAX_FALL_SPEED = 800;

//Shoud be a member of Player
var touchedGround = false;


var levelSound;
var paperThrow;
var fart;

BürgermeisterRun.Player = function (game_state, position, properties) {
    "use strict";
    BürgermeisterRun.Prefab.call(this, game_state, position, properties);
    
    this.walking_speed = +properties.walking_speed;
    this.jumping_speed = +properties.jumping_speed;
    this.bouncing = +properties.bouncing;
    this.life = +properties.life;
    this.score = 0;
    this.start_x = this.x;
    this.start_y = this.y;
    this.game_state.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    
    this.animations.add('left', [1, 2, 3, 4], 10, true);
    this.animations.add('right', [6, 7, 8, 9], 10, true);

    this.frame = 6;
    
    this.anchor.setTo(0.5, 0.5);

    this.body.bounce.y = 0.2;

    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    this.speedRunSKey = this.game_state.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.shootKey = this.game_state.game.input.keyboard.addKey(Phaser.Keyboard.A);
    spacebarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.muteSound = game.input.keyboard.addKey(Phaser.Keyboard.M);

    //sound
    levelSound = game.add.sound('levelSound',0.2,true);
    levelSound.play();

    paperThrow = game.add.sound('paperThrow',0.4,false);
    fart = game.add.sound('fart',0.4,false);


//virtual buttons for mobile devices
   if(! Phaser.Device.desktop) {

       shootButton = game.add.button(10, 705, 'shootButton', this.shoot, this);
       shootButton.fixedToCamera = true;

       jumpButton = game.add.button(10, 580, 'jumpButton', this.jump, this);
       jumpButton.fixedToCamera = true;

       jumpButtonDpad = game.add.button(811, 465, 'jumpButtonDpad', this.jump, this);
       jumpButtonDpad.fixedToCamera = true;

       leftButton = game.add.button(678, 600, 'leftButton', null, this);
       leftButton.fixedToCamera = true;
       leftButton.events.onInputDown.add(function () {
           left = true;});
       leftButton.events.onInputUp.add(function () {
           left = false;});

       rightButton = game.add.button(900, 595, 'rightButton', null, this);
       rightButton.fixedToCamera = true;
       rightButton.events.onInputDown.add(function () {
           right = true;});
       rightButton.events.onInputUp.add(function () {
           right = false;});

       downButton = game.add.button(811, 690, 'downButton', null, this);
       downButton.fixedToCamera = true;
       downButton.events.onInputDown.add(function () {
           duck = true;});
       downButton.events.onInputUp.add(function () {
           duck = false;});

       speedButton = game.add.button(140, 705, 'speedButton', null, this);
       speedButton.fixedToCamera = true;
       speedButton.events.onInputDown.add(function () {
           speedrun = true;});
       speedButton.events.onInputUp.add(function () {
           speedrun = false;});

   }

    //shootobject config
    shootobject = game.add.group();
    shootobject.enableBody = true;
    shootobject.physicsBodyType= Phaser.Physics.ARCADE;
    shootobject.createMultiple(100, 'paperball');
    shootobject.setAll('anchor.x' , 0.5);
    shootobject.setAll('anchor.y' , 0.5);
    shootobject.setAll('scale.x' , 1);
    shootobject.setAll('scale.y' , 1);
    shootobject.checkWorldBounds = true;
    shootobject.outOfBoundsKill = true;
};

/**
 * Player object extend from Prefab class
 * @type {BürgermeisterRun.Prefab}
 */
BürgermeisterRun.Player.prototype = Object.create(BürgermeisterRun.Prefab.prototype);
BürgermeisterRun.Player.prototype.constructor = BürgermeisterRun.Player;

BürgermeisterRun.Player.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.enemies, this.hit_enemy, null, this);
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.destroyObject, this.hit_destroyObject, null, this);
    this.game_state.game.physics.arcade.overlap(shootobject, this.game_state.groups.enemies, this.shoot_enemy, null, this);
    this.game_state.game.physics.arcade.collide(shootobject, this.game_state.layers.collision);

    if(this.muteSound.justDown){
        if(!this.game.sound.mute){
            this.game.sound.mute = true;
        }
       else{
            this.game.sound.mute=false;
        }
    }

    if (this.cursors.down.isDown||duck && this.body.velocity.x === 0) {
        // cower
        if(lookRight===true){
            this.frame = 10;
        }
        else{
            this.frame = 0;
            }
        if(!fart.isPlaying){
            fart.play();
        }
    } else if (this.cursors.right.isDown||right && this.body.velocity.x >= 0) {
        // move right
        if(this.speedRunSKey.isDown||speedrun)this.body.velocity.x = this.walking_speed *1.5;
        else this.body.velocity.x = this.walking_speed;
        this.animations.play("right");
        this.scale.setTo(1, 1);
        lookRight = true;

    } else if (this.cursors.left.isDown ||left && this.body.velocity.x <= 0) {
        // move left
        if(this.speedRunSKey.isDown||speedrun)this.body.velocity.x =- this.walking_speed *1.5;
        else this.body.velocity.x = -this.walking_speed;
        this.animations.play("left");
        this.scale.setTo(1, 1);
        lookRight = false;

    } else {
        // stop
        this.body.velocity.x = 0;
        this.animations.stop();
        this.scale.setTo(1, 1);
        if(lookRight===true){
            this.frame = 6;
        }
        else{
            this.frame = 1;
        }
    }

    this.cursors.up.onDown.add(this.jump,this);
    spacebarKey.onDown.add(this.jump,this);
    //shoot
    if (this.shootKey.isDown) {
        this.shoot();

    }

    // dies if touches the end of the screen
    if (this.bottom >= this.game_state.game.world.height) {
        this.game_state.restart_level();
    }

    this.check_score(this);
    this.check_touched_ground(this);
    this.limit_fall_speed(this);
};

//Check if body touched the ground, if it touched the ground its possible to jumop instantly -> no delay
BürgermeisterRun.Player.prototype.check_touched_ground = function (player) {
    "use strict";
    if (this.body.blocked.down){
        touchedGround = true;
    }
};

BürgermeisterRun.Player.prototype.jump = function (player) {
    "use strict";
    if (touchedGround) {
        this.body.velocity.y = -this.jumping_speed;
        doubleJump = true;
        touchedGround = false;
    }else {
        if (doubleJump){
            this.body.velocity.y = -this.jumping_speed;
            doubleJump = false;
        }
    }
};

//Check if player is falling to fast, if yes the falling velocity will be limited
BürgermeisterRun.Player.prototype.limit_fall_speed = function (player) {
    "use strict";
    if (this.body.velocity.y > MAX_FALL_SPEED){
        this.body.velocity.y = MAX_FALL_SPEED;
    }
};

BürgermeisterRun.Player.prototype.hit_enemy = function (player, enemy) {
    "use strict";
    // if the player is above the enemy, the enemy is killed, otherwise the player dies
    if (enemy.body.touching.up) {
        this.score += enemy.score;
        enemy.kill();
        player.y -= this.bouncing;


    } else {
        this.game_state.restart_level();
    }
};

BürgermeisterRun.Player.prototype.hit_destroyObject = function (player, destroyObject) {
    "use strict";
    this.game_state.restart_level();
};

BürgermeisterRun.Player.prototype.shoot_enemy = function (player, enemy) {
    "use strict";

        this.score += enemy.score;
        enemy.kill();
        paperball.kill();
        shootTime = game.time.now;

};



BürgermeisterRun.Player.prototype.check_score = function (player) {
    if((this.score / (1500 * scoreMultiplier)) > 1){
        scoreMultiplier++;
        this.life++;
    }
};

BürgermeisterRun.Player.prototype.shoot = function () {
    "use strict";
    // noinspection JSAnnotator
    if (game.time.now > shootTime && this.alive && _iPaperball > 0) {
        paperball = shootobject.getFirstExists(false);

        if(paperball&& lookRight == true){
            paperball.reset(this.x,this.y);
            paperball.body.velocity.x = 1000;
            paperball.body.velocity.y = -115;
            paperball.lifespan =1000;
            shootTime = game.time.now + 1000;
            _iPaperball--;
        }

        if(paperball&& lookRight == false ){
            paperball.reset(this.x,this.y);
            paperball.body.velocity.x = -1000;
            paperball.body.velocity.y = -115;
            paperball.lifespan =1000;
            shootTime = game.time.now + 1000;
            _iPaperball--;
        }
        //sound for Paperthrowing
        if (!paperThrow.isPlaying) {
            paperThrow.play();
        }
   }
};

