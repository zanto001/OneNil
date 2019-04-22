var BürgermeisterRun = BürgermeisterRun || {};
var next;
var current_level_label;
var current_level_label_x_position;
var current_level_label_y_position;

var attempts;
var attempts_label;

var question;
var correctAnswer;
var wrongAnswer1;
var wrongAnswer2;
var wrongAnswer3;

var quiz_data_index_counter;

var answers_y_coordinates = [350,460,570,680];

var answer1_button, answer1_correct_button, answer1_wrong_button;
var answer2_button, answer2_correct_button, answer2_wrong_button;
var answer3_button, answer3_correct_button, answer3_wrong_button;
var answer4_button, answer4_correct_button, answer4_wrong_button;

// in milliseconds, 1 second that is
var delay_after_correct_answer = 1000;

BürgermeisterRun.QuizScreen = function () {
    "use strict";
    Phaser.State.call(this);
};

BürgermeisterRun.QuizScreen.prototype.preload = function () {
    "use strict";
    game.load.image('1','assets/images/button_level_1.png');
    game.load.image('frage_button','assets/images/frage_button.png');
    game.load.image('antwort_button','assets/images/antwort_button.png');
    game.load.image('richtig_button','assets/images/richtig_button.png');
    game.load.image('falsch_button','assets/images/falsch_button.png');
    game.scale.setGameSize(1600, 850);

};

BürgermeisterRun.prototype = Object.create(Phaser.State.prototype);
BürgermeisterRun.prototype.constructor = BürgermeisterRun.QuizScreen;

BürgermeisterRun.QuizScreen.prototype.init = function (game_state, next_level) {
    "use strict";
    next = next_level;

    adjust_level_label_position();
    answers_y_coordinates = shuffle(answers_y_coordinates);
};

BürgermeisterRun.QuizScreen.prototype.create = function () {
    "use strict";
    game.stage.backgroundColor = "#4488AA";

    // ### HEADER ###
    attempts = 1;
    quiz_data_index_counter = 0;

    // Level info
    current_level_label = game.add.text(current_level_label_x_position,current_level_label_y_position,'Level: ' + current_level_loading_state);
    current_level_label.anchor.set(0.5,0.5);
    current_level_label.font = "Arial Black";
    current_level_label.fontSize = 20;
    current_level_label.fill = "#000000";
    current_level_label.align = "center";

    // Attempts left info
    attempts_label = game.add.text(70,70,'Versuche: ' + attempts);
    attempts_label.anchor.set(0.5,0.5);
    attempts_label.font = "Arial Black";
    attempts_label.fontSize = 20;
    attempts_label.fill = "#000000";
    attempts_label.align = "center";

    create_buttons_for_quiz_data();
    set_quiz_data(quiz_data_index_counter);
};


function set_quiz_data(quiz_data_index_counter) {

    question = game.add.text(830,150,current_level_data[infobox_index[quiz_data_index_counter]]['question']);
    question.anchor.set(0.5,0.5);
    question.font = "Arial Black";
    question.fontSize = 25;
    question.fill = "#000000";
    question.align = "center";

    correctAnswer = game.add.text(830,answers_y_coordinates[0],current_level_data[infobox_index[quiz_data_index_counter]]['correctAnswer']);
    correctAnswer.anchor.set(0.5,0.5);
    correctAnswer.font = "Arial Black";
    correctAnswer.fontSize = 25;
    correctAnswer.fill = "#000000";
    correctAnswer.align = "center";
    correctAnswer.inputEnabled = true;
    correctAnswer.events.onInputDown.add(answerCallback,{param1:answers_y_coordinates[0],param2: "correct"},this);

    wrongAnswer1 = game.add.text(830,answers_y_coordinates[1],current_level_data[infobox_index[quiz_data_index_counter]]['wrongAnswer1']);
    wrongAnswer1.anchor.set(0.5,0.5);
    wrongAnswer1.font = "Arial Black";
    wrongAnswer1.fontSize = 25;
    wrongAnswer1.fill = "#000000";
    wrongAnswer1.align = "center";
    wrongAnswer1.inputEnabled = true;
    wrongAnswer1.events.onInputDown.add(answerCallback,{param1: answers_y_coordinates[1],param2: "wrong"},this);

    wrongAnswer2 = game.add.text(830,answers_y_coordinates[2],current_level_data[infobox_index[quiz_data_index_counter]]['wrongAnswer2']);
    wrongAnswer2.anchor.set(0.5,0.5);
    wrongAnswer2.font = "Arial Black";
    wrongAnswer2.fontSize = 25;
    wrongAnswer2.fill = "#000000";
    wrongAnswer2.align = "center";
    wrongAnswer2.inputEnabled = true;
    wrongAnswer2.events.onInputDown.add(answerCallback,{param1: answers_y_coordinates[2],param2: "wrong"},this);

    wrongAnswer3 = game.add.text(830,answers_y_coordinates[3],current_level_data[infobox_index[quiz_data_index_counter]]['wrongAnswer3']);
    wrongAnswer3.anchor.set(0.5,0.5);
    wrongAnswer3.font = "Arial Black";
    wrongAnswer3.fontSize = 25;
    wrongAnswer3.fill = "#000000";
    wrongAnswer3.align = "center";
    wrongAnswer3.inputEnabled = true;
    wrongAnswer3.events.onInputDown.add(answerCallback,{param1: answers_y_coordinates[3],param2: "wrong"},this);
}

function create_buttons_for_quiz_data() {
    // Buttons
    game.add.button(100, 80, 'frage_button', actionOnClick(0), this, 2, 1, 0);

    answer1_button = game.add.button(100, 280, 'antwort_button', actionOnClick(0), this, 2, 1, 0);
    answer1_correct_button = game.add.button(100, 280, 'richtig_button', actionOnClick(0), this, 2, 1, 0);
    answer1_wrong_button = game.add.button(100, 280, 'falsch_button', actionOnClick(0), this, 2, 1, 0);
    answer1_correct_button.visible = false;
    answer1_wrong_button.visible = false;

    answer2_button = game.add.button(100, 390, 'antwort_button', actionOnClick(0), this, 2, 1, 0);
    answer2_correct_button = game.add.button(100, 390, 'richtig_button', actionOnClick(0), this, 2, 1, 0);
    answer2_wrong_button = game.add.button(100, 390, 'falsch_button', actionOnClick(0), this, 2, 1, 0);
    answer2_correct_button.visible = false;
    answer2_wrong_button.visible = false;

    answer3_button = game.add.button(100, 500, 'antwort_button', actionOnClick(0), this, 2, 1, 0);
    answer3_correct_button = game.add.button(100, 500, 'richtig_button', actionOnClick(0), this, 2, 1, 0);
    answer3_wrong_button = game.add.button(100, 500, 'falsch_button', actionOnClick(0), this, 2, 1, 0);
    answer3_correct_button.visible = false;
    answer3_wrong_button.visible = false;

    answer4_button = game.add.button(100, 610, 'antwort_button', actionOnClick(0), this, 2, 1, 0);
    answer4_correct_button = game.add.button(100, 610, 'richtig_button', actionOnClick(0), this, 2, 1, 0);
    answer4_wrong_button = game.add.button(100, 610, 'falsch_button', actionOnClick(0), this, 2, 1, 0);
    answer4_correct_button.visible = false;
    answer4_wrong_button.visible = false;
}

function update_quiz_data (quiz_data_index_counter){

    attempts = 1;
    attempts_label.setText("Versuche: " + attempts);

    answer4_button.visible = true;
    answer4_correct_button.visible = false;
    answer4_wrong_button.visible = false;

    answer3_button.visible = true;
    answer3_correct_button.visible = false;
    answer3_wrong_button.visible = false;

    answer2_button.visible = true;
    answer2_correct_button.visible = false;
    answer2_wrong_button.visible = false;

    answer1_button.visible = true;
    answer1_correct_button.visible = false;
    answer1_wrong_button.visible = false;

    question.destroy();
    correctAnswer.destroy();
    wrongAnswer1.destroy();
    wrongAnswer2.destroy();
    wrongAnswer3.destroy();

    answers_y_coordinates = shuffle(answers_y_coordinates);
    this.set_quiz_data(quiz_data_index_counter);
};



function answerCallback () {
    console.log("param1 : " + this.param1);
    if (this.param1 === 680) {

         if (this.param2 === "correct"){
             answer4_button.visible = false;
             answer4_correct_button.visible = true;

             setTimeout(function() {
                 quiz_data_index_counter++;
                 console.log(quiz_data_index_counter);
                 if (quiz_data_index_counter < 3){
                     this.update_quiz_data(quiz_data_index_counter);
                 } else {
                     game.stage.backgroundColor = "#000000";
                     if (this.next===5|| this.next==="5"){
                         game.state.start("WinState", true, false, this.next-1);
                     }
                     else{
                         game.state.start("MainMenu", true, false, this.next);
                     }
                 }
             }, delay_after_correct_answer);


         } else {
             answer4_button.visible = false;
             answer4_wrong_button.visible = true;
             update_data_by_wrong_answer()
         }

    } else if (this.param1 === 570){

        if (this.param2 === "correct"){
            answer3_button.visible = false;
            answer3_correct_button.visible = true;

            setTimeout(function() {
                quiz_data_index_counter++;
                console.log(quiz_data_index_counter);
                if (quiz_data_index_counter < 3){
                    this.update_quiz_data(quiz_data_index_counter);
                } else {
                    game.stage.backgroundColor = "#000000";
                    if (this.next===5|| this.next==="5"){
                        game.state.start("WinState", true, false, this.next-1);
                    }
                    else{
                        game.state.start("MainMenu", true, false, this.next);
                    }
                }
            }, delay_after_correct_answer);



        } else {
            answer3_button.visible = false;
            answer3_wrong_button.visible = true;
            update_data_by_wrong_answer()
        }

    } else if (this.param1 === 460){

        if (this.param2 === "correct"){
            answer2_button.visible = false;
            answer2_correct_button.visible = true;

            setTimeout(function() {
                quiz_data_index_counter++;
                console.log(quiz_data_index_counter);
                if (quiz_data_index_counter < 3){
                    this.update_quiz_data(quiz_data_index_counter);
                } else {
                    game.stage.backgroundColor = "#000000";
                    if (this.next===5|| this.next==="5"){
                        game.state.start("WinState", true, false, this.next-1);
                    }
                    else{
                        game.state.start("MainMenu", true, false, this.next);
                    }
                }
            }, delay_after_correct_answer);




        } else {
            answer2_button.visible = false;
            answer2_wrong_button.visible = true;
            update_data_by_wrong_answer()
        }
    } else {

        if (this.param2 === "correct"){
            answer1_button.visible = false;
            answer1_correct_button.visible = true;

            setTimeout(function() {
                quiz_data_index_counter++;
                console.log(quiz_data_index_counter);
                if (quiz_data_index_counter < 3){
                    this.update_quiz_data(quiz_data_index_counter);
                } else {
                    game.stage.backgroundColor = "#000000";
                    if (this.next===5|| this.next==="5"){
                        game.state.start("WinState", true, false, this.next-1);
                    }
                    else{
                        game.state.start("MainMenu", true, false, this.next);
                    };
                }
            }, delay_after_correct_answer);

        } else {
            answer1_button.visible = false;
            answer1_wrong_button.visible = true;
            update_data_by_wrong_answer()
        }

    }
};

function update_data_by_wrong_answer(){
    attempts--;

    if (attempts < 0){
        game.stage.backgroundColor = "#000000";
        game.state.start("GameOver", true, false,this.next-1);
    }
    attempts_label.setText("Versuche: " + attempts);
}



function adjust_level_label_position(){
    if (current_level_loading_state === 'russische-kirche'){

        current_level_label_x_position = 135;
        current_level_label_y_position = 40;

    } else if (current_level_loading_state === 'neroberg'){

        current_level_label_x_position = 90;
        current_level_label_y_position = 40;

    } else if (current_level_loading_state === 'kurhaus'){

        current_level_label_x_position = 85;
        current_level_label_y_position = 40;

    } else {

        current_level_label_x_position = 122;
        current_level_label_y_position = 40;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// leave this as it is !
function buttonCallback(level){}
