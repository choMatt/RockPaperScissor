const gestureBtns = document.querySelectorAll(".gesture-btn");
const menuBtns = document.querySelectorAll(".menu-btn");
const display = document.querySelector(".text-display");
const images = document.querySelectorAll(".gesture-img");
const gestureDisplay = document.querySelectorAll(".gesture-display");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
const pContainer = document.querySelector(".player-container")
const cContainer = document.querySelector(".computer-container")
let isGameActive = true;
let winningScore = 3;
let p1Score = 0;
let p2Score = 0;
let timeout;


//todo : add comments to clarify the code for other devs
//todo : fix the tie function on line 115
//todo : make the code more DRY


function gameLoop() {

function gestureButtonState(isButtonActive){
  if(isButtonActive){
    gestureBtns.forEach(btn => btn.classList.remove("btn-disabled"));
  } else {
    gestureBtns.forEach(btn => btn.classList.add("btn-disabled"));
  }
}

function menuButtonState(isButtonActive){
  if(isButtonActive){

  } else {

  }
}

//* This sets the gesture buttons to a disabled state
gestureButtonState(false)

 
// * Player 1 (You)
// * Get the ID of the button that was clicked and assign it to a variable
//* Return the selected option (rock, paper, or scissors)
  function playerOne(e) {
    const selectedOption = e.target.id;
    return selectedOption;
  }

//* Player2 (Computer)
//* Generate a random number between 0 and the number of options
//* Use the random number to select a gesture from the options array
//* Return the selected gesture (rock, paper, or scissors)
  function playerTwo() {
    const options = ["Rock", "Paper", "Scissor"];
    const randNum = Math.floor(Math.random() * options.length);
    const computerGesture = options[randNum];
    return computerGesture;
  }


//* This function takes two parameters, "player1" and "player2".
//* this code determines who is the winner of the game
function getWinner(player1, player2) {
  if (player1 === player2) tie();
  else if (player1 == "Rock" && player2 == "Scissor") winOrLose(true);
  else if (player1 == "Rock" && player2 == "Paper") winOrLose(false);
  else if (player1 == "Paper" && player2 == "Rock") winOrLose(true);
  else if (player1 == "Paper" && player2 == "Scissor") winOrLose(false);
  else if (player1 == "Scissor" && player2 == "Paper") winOrLose(true);
  else if (player1 == "Scissor" && player2 == "Rock") winOrLose(false);
}

  gestureBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      computer = playerTwo();
      player = playerOne(e);
      btnAnimation(btn);
      gestureButtonState(false)
      if (isGameActive) {
        getWinner(player, computer);
      }
    });
  });

//! Incorrect code sequence check line 115
  function animateAndDisplay(isPlayer1Winner, resultText) {
    animateElement();
    timeout = setTimeout(() => {
      let score = isPlayer1Winner ? ++p1Score : ++p2Score;
      const scoresDisplay = isPlayer1Winner ? p1Display : p2Display;
      scoresDisplay.textContent = score;
      display.textContent = resultText;
      imgDisplay(player, computer);
      setTimeout(() => {
        p1GestureDisplay.setAttribute("src", `gestures/Rock.png`);
        p2GestureDisplay.setAttribute("src", `gestures/Rock.png`);
      }, 1000);

      if (score === winningScore) {
        const winnerText = isPlayer1Winner ? 'Player 1 Wins' : 'Player 2 Wins';
        isGameActive = false;
        display.textContent = winnerText;
        gestureButtonState(false)
        menuBtns[0].classList.remove("btn-disabled");
      } else {
        setTimeout(() => {
          gestureBtns.forEach(btn => btn.classList.remove("btn-disabled"));
        }, 1000);
      }
    }, 680);
  }

  function winOrLose(isPlayer1Winner) {
    const resultText = isPlayer1Winner ? "You Win" : "You lose";
    animateAndDisplay(isPlayer1Winner, resultText);
  }

//! Bug - This still adds a score to the computer even a tie game
  function tie() {
    animateAndDisplay(false, "TIE");
  }

  function imgDisplay(player1, player2) {
    [p1GestureImg, p2GestureImg] = [player1, player2];
    [p1GestureDisplay, p2GestureDisplay] = [gestureDisplay[0], gestureDisplay[1]]
    p1GestureDisplay.setAttribute("src", `gestures/${p1GestureImg}.png`);
    p2GestureDisplay.setAttribute("src", `gestures/${p2GestureImg}.png`);
  }



  function btnAnimation(btn) {
    btn.classList.add("btn-clicked");
    setTimeout(() => btn.classList.remove("btn-clicked"), 100);
  }

  menuBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let playerInput = e.target.id;
      btnAnimation(btn);

      function start(){
        [p1Score, p2Score] = [0, 0];
        [p1Display.textContent, p2Display.textContent] = [0, 0];
        menuBtns[0].classList.add("btn-disabled");
        isGameActive = true;
        gestureButtonState(true)
      }

      function reset(){
        clearInterval(timeout);
        [p1Score, p2Score] = [0, 0];
        [p1Display.textContent, p2Display.textContent, display.textContent] = [0, 0, 'Game reset'];
        menuBtns[0].classList.add("btn-disabled");
        gestureDisplay.forEach(gd => gd.setAttribute("src", `gestures/Rock.png`));
        gestureButtonState(false)
        setTimeout(() => {
          display.textContent = "Press Start to Play"
          menuBtns[0].classList.remove("btn-disabled");
        },1800)
        
      }
      
      playerInput == "start" ? start() : reset();

    });
  });

  // let computer;
  // let player;


  function animateElement(){
    const containers = [pContainer, cContainer];
    containers.forEach(container => container.classList.add("gesture-animation"))
    setTimeout(() => {
      containers.forEach(container => container.classList.remove("gesture-animation"))
    }, 1100)
  }

}

gameLoop()




git push --set-upstream https://github.com/choMatt/RockPaperScissor.git main
