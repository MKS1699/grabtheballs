// console.log("js connected.");

// setting up page display
function gameSetup() {
  // setting up font sizes of different elements respective to screen sizes
  $("#highScore").css({ "font-size": game.fontSize + "px" });
  $("#welcomeScreen").css({ "font-size": game.fontSize + "px" });
  $("#currentScore").css({ "font-size": game.fontSize / 2 + "px" });
  $(".restart").css({ "font-size": game.fontSize + "px" });
  // showing the highScore
  $("#highScore").html(game.highScore);
  // showing the collector
  collectorSetup();
  // setting up game start on click on start game
  $("#welcomeScreen").on("click", () => {
    $("#welcomeScreen").toggleClass("hide");
    $(".container").css({
      "grid-template-areas": '"navbar""gameArena""footer"',
    });
    $(".gameArena").toggleClass("hide");
    gameStart();
  });
}

// creating a function to start the game
function gameStart() {
  const BALL_NUMBER = Math.floor(Math.random() * 4);
  ballSetup(BALL_NUMBER);
  setTimeout(() => {
    match(BALL_NUMBER, game.collector.angle);
  }, game.level);
}

// starting the game when the page is fully loaded.
$(document).ready(function () {
  gameSetup();
});
