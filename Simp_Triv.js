
//var of trivia questions, their guess options in an array,
// and the array index number that is the correct answer
var questions = [{
    question: "How old is Ned Flanders?",
    choices: [ 40, 60, 45, 50],
    correctAnswer: 1
  }, {
    question: "What country does Bart make a prank phone call to?",
    choices: ["England", "Japan", "Australia", "Canada"],
    correctAnswer: 2
  }, {
    question: "Who wears a purple beanie?",
    choices: ["Jimbo", "Nelson", "Kearny", "Martin"],
    correctAnswer: 0
  }, {
    question: "What town has NOT had a monorail?",
    choices: ["Ogdenville", "Springfield", "Langly", "North Haverbrook"],
    correctAnswer: 2
  }, {
    question: "What is Chief Wiggum's first name?",
    choices: ["Clem", "Clark", "Carl", "Clancy"],
    correctAnswer: 3
  }, {
    question: "Who is the character who sells computers, cars, and real estate?", 
    choices: ["Jim", "Gil", "Guy" ,"Jervis?"],
    correctAnswer: 1
  }, {
    question: "Which character was never a police officer?", 
    choices: ["Moe", "Marge", "Lou", "Eddie"],
    correctAnswer: 0
  }, {
    question: "Bart bought issue #1 of Radioactive man, with which 2 other boys?",
    choices: ["Nelson and Milhouse", "Milhouse and Martin", "Jimbo and Nelson", "Martin and Jimbo"],
    correctAnswer: 1
  }, {
    question: "When they enforced prohibition in Springfield, how did Homer transport the alcohol to Moe's?",
    choices: ["Pipeline", "Bathtubs", "Bowling Balls", "Water Jugs"],
    correctAnswer: 2
  }, {
    question: "What was the name of the first Itchy cartoon??",
    choices: ["Mississippi Mischeif", "Trouble Town", "Dirty Downtown", "Manhatten Madness"],
    correctAnswer: 3
  }, {
  }];

//variables for keeping score
var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

//this hides the question area and clock timer when the page is first loaded
$(document).ready(function () {
    $(".quizContainer").toggle(false);

//this is the onclick event that displays the questions
        $("#play").click(function(){
        $(".quizContainer").toggle(true);
        $("#pic2").toggle(false);
        $("#play").toggle(false);

//this is the 1minute timer
function timer(){
    var i=$('.timer').attr('id');
    var timer=i;
    $('.timer').text(timer);
    setInterval(function(){
        timer--;
        if(timer>=0){
            $('.timer').text(timer);
        }
        if(timer==0){
// this makes the score display if time runs out            
            displayScore();
            $("#play").toggle(false);
            $(".question").toggle(false);
            $(".choiceList").toggle(false);
            $(".timer").toggle(false);
            $("#pic2").toggle(true);

            console.log("display score, reset option");
// NEED TO FIX THIS, borrowed code has "selections" undefined error 
//but page wont load properly if I alter this
           {
            var score = $('<p>',{id: 'question'});
            for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
            numCorrect++;
                    }
                }
            }
        }
    },1000);
}

// Start
timer();

    });

// This displays the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

// Onclick event that shows the following (next) question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

//this prompts an answer if the 'next' button is clicked without having made a guess
            if (value == undefined) {
                $(document).find(".quizMessage").text("Choose an answer");
                $(document).find(".quizMessage").show();
            } else {
                
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
//if/else statement.... (IF) game is still going.
                currentQuestion++; 
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();  
//          or (ELSE) game is over.
                  
                } else {
                    displayScore();
                    $(".question").toggle(false);
                    $(".choiceList").toggle(false);
                    $(".timer").toggle(false);
                    $("#pic2").toggle(true);

// Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { 
//When the quiz is over, and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
             location.reload();
        }
    });

});

// This displays the current question and the choices
function displayCurrentQuestion() {
    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");

    var numChoices = questions[currentQuestion].choices.length;

// Sets the questionClass text to the current question
    $(questionClass).text(question);

// Remove all list element dots 
    $(choiceList).find("li").remove();

//var choice is "radio" button so only one choice can be made from the choices
    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

//resets the quiz
function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}
//disaplays score
function displayScore() {
    $(document).find(".quizContainer > .result").text("Correct Answer: " + correctAnswers + " out of: 10");
    $(document).find(".quizContainer > .result").show();
}

//hides the score
function hideScore() {
    $(document).find(".result").hide();
}