var BürgermeisterRun = BürgermeisterRun || {};

/**
 * Init the Phaser object
 * @type {Phaser.Game}
 */
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);

/**
 * Add the states to the game (phaser object)
 */
game.state.add("MainMenu", new BürgermeisterRun.MainMenu());
game.state.add("BootState", new BürgermeisterRun.BootState());
game.state.add("LoadingState", new BürgermeisterRun.LoadingState());
game.state.add("GameState", new BürgermeisterRun.TiledState());
game.state.add("GameOver", new BürgermeisterRun.GameOver());
game.state.add("QuizScreen", new BürgermeisterRun.QuizScreen());
game.state.add("Option", new BürgermeisterRun.Option());
game.state.add("Option_control", new BürgermeisterRun.Option_control());
game.state.add("Option_instruction", new BürgermeisterRun.Option_instruction());
game.state.add("WinState", new BürgermeisterRun.WinState());


var next_level=1;

/**
 * Start the Game
 * Give the level data as json file
 * start(key, clearWorld, clearCache, parameter)
 * src:https://phaser.io/docs/2.4.4/Phaser.StateManager.html#start
 */
game.state.start("MainMenu", true, false, next_level);
