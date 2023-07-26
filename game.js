
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keydown(function () {
    if(!started) {
        $("level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id"); 

    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});



function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence(); 
            }, 1000);  
        }
    }
    else{
        playSound("wrong");
        // $("body").classList.add("game-over");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            // $("body").classList.remove("game-over");
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
    
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    // return randomChosenColour;

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}
// nextSequence();
//console.log(gamePattern);



function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function playSound(name) {

    var music = new Audio("./sounds/" + name + ".mp3" );

    music.play();

}

function startOver() {
    level = 0;
    gamePattern =[];
    started = false;

}






