// console.log('connected');

// file containing all code related to game
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
    id: () => {
      return Math.floor(Math.random() * 4);
    },
    previd: null,
    startPoint: -Math.floor((window.innerHeight * 80) / 100),
    height: Math.floor((window.innerHeight * 60 * 30 * 35) / 1000000),
    endPoint: -Math.floor((window.innerHeight * 80 * 30) / 10000),
  },
};

// setting up collector
function collectorSetup() {
  //drawing collector with 30% to the gameArena which is 60% to the body.
  $("#collector").css({
    "border-color": "red green blue yellow",
    "border-style": "solid",
    "border-width": game.collector.height + "px",
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
function ballSetup(ballID) {
  // setting up ball's starting point
  $("#ball").css({ top: game.ball.startPoint + "px" });
  // creating differrent color ball based on ballID
  switch (ballID) {
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

// gameOver function
function gameOver() {
  clearTimeout();
  game.currentScore = 0;
  $("#currentScore").html(game.currentScore);
  $(".gameArena").toggleClass("hide");
  $(".container").css({
    "grid-template-areas": '"navbar""welcomeScreen""footer"',
  });
  $("#welcomeScreen")
    .toggleClass("hide")
    .html('Restart <br><span style = "margin-left: 30%;">Game');
  if (parseInt(localStorage.gameHighScore)) {
    if (parseInt(localStorage.gameHighScore) < game.highScore) {
      localStorage.gameHighScore = game.highScore;
    }
  } else {
    localStorage.setItem("gameHighScore", game.highScore);
  }
}
// creating a function to start the game
function gameStart() {
  let ballID = game.ball.id();
  // making sure ball doesn't get generated of same color in a row.
  if (ballID == game.ball.previd) {
    ballID = game.ball.id();
    game.ball.previd = ballID;
  } else {
    game.ball.previd = ballID;
  }
  ballSetup(ballID);
  clearTimeout();
  setTimeout(() => {
    match(ballID, game.collector.angle);
  }, game.level + 10);
}

// creating a function to check ball and collector color
function match(BALL_ID, COLLECTOR_ANGLE) {
  // $("#ball").css({ top: game.startPoint + "px" });
  if (
    (BALL_ID == 0 && COLLECTOR_ANGLE == 0) ||
    (BALL_ID == 0 && COLLECTOR_ANGLE == 360) ||
    (BALL_ID == 1 && COLLECTOR_ANGLE == 270) ||
    (BALL_ID == 2 && COLLECTOR_ANGLE == 180) ||
    (BALL_ID == 3 && COLLECTOR_ANGLE == 90)
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
    // changing game level on score
    switch (game.currentScore) {
      case 100:
        game.level = 4000;
        break;
      case 200:
        game.level = 3000;
        break;
      case 300:
        game.level = 2000;
        break;
      case 400:
        game.level = 1500;
        break;
    }
    gameStart();
  } else {
    gameOver();
  }
}
