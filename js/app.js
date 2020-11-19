// console.log("js connected.");
// creating game object with all the details required to start the game.
let game = {
  fontSize: Math.floor((window.innerHeight * 15) / 100),
  highScore: localStorage.gameHighScore
    ? parseInt(localStorage.gameHighScore)
    : 0,
  currentScore: 0,
  level: 5000,
  collector: {
    height: Math.floor((window.innerHeight * 60 * 30) / 10000),
    angle: 0,
  },
  ball: {
    startPoint: -Math.floor((window.innerHeight * 80) / 100),
    height: Math.floor((window.innerHeight * 60 * 30 * 35) / 1000000),
    endPoint: -Math.floor((window.innerHeight * 80 * 30) / 10000),
  },
};
// setting up collector
function collectorSetup() {
  //drawing collector with 30% to the gameArena which is 60% to the body.
  $("#collector").css({
    "border-top": game.collector.height + "px solid red",
    "border-right": game.collector.height + "px solid green",
    "border-bottom": game.collector.height + "px solid blue",
    "border-left": game.collector.height + "px solid yellow",
  });
  // rotating the collector 90 deg with each click
  $("#collector").on("click", function () {
    // checking collector angle
    if (game.collector.angle == 360) {
      game.collector.angle = 0;
    }
    // changing the collector angle value to which it is rotated.
    game.collector.angle += 90;
    $(this).css({ transform: "rotate(" + game.collector.angle + "deg)" });
  });
}
// setting up ball
function ballSetup(BALL_NUMBER) {
  // setting up ball's starting point
  $("#ball").css({ top: game.ball.startPoint + "px", "z-index": "-1" });
  // creating differrent color ball based on BALL_NUMBER
  switch (BALL_NUMBER) {
    case 0:
      $("#ball").css({ border: game.ball.height + "px solid red" });
      break;
    case 1:
      $("#ball").css({ border: game.ball.height + "px solid green" });
      break;
    case 2:
      $("#ball").css({ border: game.ball.height + "px solid blue" });
      break;
    case 3:
      $("#ball").css({ border: game.ball.height + "px solid yellow" });
      break;
    default:
      document.write(
        "Erorr while generating ball color. Please reload the page."
      );
  }
  // dropping the ball
  $("#ball").animate({ top: game.ball.endPoint + "px" }, game.level);
}
function gameOver() {
  game.currentScore = 0;
  $("#welcomeScreen").toggleClass("hide");
  if (parseInt(localStorage.getItem("gameHighScore")) < game.highScore) {
    localStorage.setItem("gameHighScore", game.highScore);
  }
}
// creating a function to check ball and collector color
function match(BALL_NUMBER, COLLECTOR_ANGLE) {
  if (
    (BALL_NUMBER == 0 && COLLECTOR_ANGLE == 0) ||
    (BALL_NUMBER == 0 && COLLECTOR_ANGLE == 360) ||
    (BALL_NUMBER == 1 && COLLECTOR_ANGLE == 270) ||
    (BALL_NUMBER == 2 && COLLECTOR_ANGLE == 180) ||
    (BALL_NUMBER == 3 && COLLECTOR_ANGLE == 90)
  ) {
    if (game.highScore == 0 || game.highScore == game.currentScore) {
      game.currentScore += 10;
      game.highScore = game.currentScore;
      $("#highScore").html(game.highScore);
      $("#currentScore").html(game.currentScore);
    } else {
      game.currentScore += 10;
      $("#currentScore").html(game.currentScore);
    }
  } else {
    gameOver();
  }
  $("#ball").css({ top: game.ball.startPointl + "px" });
}
// starting the game when the page is fully loaded.
$(document).ready(function () {
  // setting up font sizes of different elements respective to screen sizes
  $("#highScore").css({ "font-size": game.fontSize + "px" });
  $("#currentScore").css({ "font-size": game.fontSize / 2 + "px" });
  $(".restart").css({ "font-size": game.fontSize + "px" });
  // showing the highScore
  $("#highScore").html(game.highScore);
  // showing the collector
  collectorSetup();
  // creating a function to start the game
  function gameStart() {
    const BALL_NUMBER = Math.floor(Math.random() * 4);
    ballSetup(BALL_NUMBER);
    clearTimeout();
    setTimeout(() => {
      match(BALL_NUMBER, game.collector.angle);
    }, game.level);
  }
  gameStart();
  setInterval(gameStart, game.level);
});
