var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var difficulty = "easy";

$(".dificulty-slider").click(function () {
    if ($("#difficulty-toggle").hasClass("fa-rotate-180")) {
        difficulty = "hard";
        $("#difficulty-toggle").removeClass("fa-rotate-180");
    }
    else {
        difficulty = "easy";
        $("#difficulty-toggle").addClass("fa-rotate-180");
    }
})


// Start Game

$(document).keydown(function () {
    if (gamePattern.length === 0) {
        $("#header").hide();
        $("#level-title").text("level " + level);
        nextSequence();
    }
})

// Play Game

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, Press Any Key to Restart");
        startOver();
    }
}

// Restart Game

function startOver() {
    level = 0;
    gamePattern = [];
    $("#header").show();
}

// Choose next item in the sequence and push to gamePattern array

function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 3) + 1);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    if (difficulty === "easy") {
        $("#" + randomChosenColour).fadeOut(500).fadeIn(250);
    }
    else {
        $("#" + randomChosenColour).fadeOut(25).fadeIn(25);
    }
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level " + level);
    userClickedPattern = [];
}

// Record the users choice the userClickedPattern array

$(".btn").click(function () {
    if (gamePattern.length !== 0) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
}
)

// Play sound

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animate on button press

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}





