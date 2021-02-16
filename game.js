var gamePattern = [];
var userClickedPattern = [];
var timesPlayed = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour)

  level ++;
  $("#level-title").html("Level " + level);

}

$(document).on("keypress", function () {
  timesPlayed ++;
  // $("h1").html("Level 0");
  if (timesPlayed === 1) {
    nextSequence();
  }
});


$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  var activeButton = $("#" + currentColour);

  activeButton.addClass("pressed");

  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if  (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("right");

    if (userClickedPattern.length === gamePattern.length){


      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  timesPlayed = 0;
}
