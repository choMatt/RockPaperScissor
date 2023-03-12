const gestureBtns = document.querySelectorAll(".gesture-btn");
const menuBtns = document.querySelectorAll(".menu-btn");
const display = document.querySelector(".text-display");
const images = document.querySelectorAll(".gesture-img");
const gestureDisplay = document.querySelectorAll(".gesture-display");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");

let winningScore = 3;
let p1Score = 0;
let p2Score = 0;

//todo : add comments to clarify the code for other devs

//* This sets the gesture buttons to a disabled state.
gestureButtonState(false);


// ---------- PLAYERS  ----------

// * Player 1 options.
function playerOne(e) {
  const selectedOption = e.target.id;
  return selectedOption;
}

//* Player 2 options.
function playerTwo() {
  const options = ["Rock", "Paper", "Scissor"];
  const randNum = Math.floor(Math.random() * options.length);
  const computerGesture = options[randNum];
  return computerGesture;
}


// ---------- GAME SEQUENCE/LOOP ----------

//* Winner and animation handler.
async function runGameRound(e) {
  const player1 = playerOne(e);
  const player2 = playerTwo();
  const isPlayerwinner = getWinner(player1, player2);
  btnAnimation(e.target);
  menuButtonState(1, false);
  await animateElement();
  await imgDisplay(player1, player2);
  updateScoreBoard(isPlayerwinner);
  await gestureReset();
}

//* Win and Lose function.
function getWinner(player1, player2) {
  if (player1 == player2) return "TIE";
  else if (player1 == "Rock" && player2 == "Scissor") return true;
  else if (player1 == "Rock" && player2 == "Paper") return false;
  else if (player1 == "Paper" && player2 == "Rock") return true;
  else if (player1 == "Paper" && player2 == "Scissor") return false;
  else if (player1 == "Scissor" && player2 == "Paper") return true;
  else if (player1 == "Scissor" && player2 == "Rock") return false;
}

//* Scoring function.
function updateScoreBoard(isPlayerwinner) {
  setTimeout(() => {
    const isTie = isPlayerwinner === "TIE";
    const scoreBoard = isPlayerwinner ? p1Display : p2Display;
    const winLose = isPlayerwinner ? "You Win" : "You lose";
    const declareWinner = isPlayerwinner ? "Player 1 Wins" : "Player 2 Wins";
    const score = isTie ? scoreBoard.textContent : ++scoreBoard.textContent;
    display.textContent = isTie ? "Tie" : winLose;
    scoreBoard.textContent = score;

    if (score === winningScore) {
      display.textContent = declareWinner;
      setTimeout(() => {
        display.textContent = "Press start to play again";
      }, 2000);
      menuButtonState(1, true);
      menuButtonState(0, true);
    } else {
      setTimeout(() => {
        gestureButtonState(true);
        menuButtonState(1, true);
        display.textContent = "Pick";
      }, 900);
    }
  }, 800);
}

gestureBtns.forEach((btn) => btn.addEventListener("click", runGameRound));



// ---------- START AND RESET ----------

// * Start and Reset function.
function startOrReset(e) {
  const selectedMenu = e.target.id;
  [p1Score, p2Score] = [0, 0];
  [p1Display.textContent, p2Display.textContent] = [0, 0];
  btnAnimation(e.target);
  
  if (selectedMenu === "start") {
    display.textContent = "Pick";
    menuButtonState(0, false);
    gestureButtonState(true);
  } else {
    display.textContent = "Game reset";
    menuButtonState(0, false);
    gestureButtonState(false);
    setTimeout(() => {
      display.textContent = "Press Start to Play";
      menuButtonState(0, true);
    }, 1800);
  }
}

menuBtns.forEach((btn) => btn.addEventListener("click", startOrReset));



// ---------- BUTTONS, ANIMATION, & IMAGE DISPLAY ----------


//* ----- IMAGE FUNCTIONS -----

//* Gesture image display function.
function imgDisplay(player1, player2) {
  setTimeout(() => {
    [p1GestureImg, p2GestureImg] = [player1, player2];
    [p1GestureDisplay, p2GestureDisplay] = [gestureDisplay[0], gestureDisplay[1],];
    p1GestureDisplay.setAttribute("src", `gestures/${p1GestureImg}.png`);
    p2GestureDisplay.setAttribute("src", `gestures/${p2GestureImg}.png`);
  }, 849);
}

//* Gesture image animation function.
function animateElement() {
  const pContainer = document.querySelector(".player-container");
  const cContainer = document.querySelector(".computer-container");
  const containers = [pContainer, cContainer];
  containers.forEach((container) =>
    container.classList.add("gesture-animation")
  );
  timeout = setTimeout(() => {
    containers.forEach((container) =>
      container.classList.remove("gesture-animation")
    );
  }, 849);
  gestureButtonState(false);
}

//* Gesture image reset function.
function gestureReset() {
  setTimeout(() => {
    p1GestureDisplay.setAttribute("src", `gestures/Rock.png`);
    p2GestureDisplay.setAttribute("src", `gestures/Rock.png`);
  }, 1700);
}


//* ----- BUTTON FUNCTIONS -----

//* Buttons Animation.
function btnAnimation(btn) {
  btn.classList.add("btn-clicked");
  setTimeout(() => btn.classList.remove("btn-clicked"), 100);
}

//* Gesture Buttons on & off.
function gestureButtonState(isButtonActive) {
  if (isButtonActive) {
    gestureBtns.forEach((btn) => btn.classList.remove("btn-disabled"));
  } else {
    gestureBtns.forEach((btn) => btn.classList.add("btn-disabled"));
  }
}

//* Menu Buttons on & off.
function menuButtonState(index, isButtonActive) {
  if (isButtonActive) {
    menuBtns[index].classList.remove("btn-disabled");
  } else {
    menuBtns[index].classList.add("btn-disabled");
  }
}



