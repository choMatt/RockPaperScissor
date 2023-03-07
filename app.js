const gestureBtns = document.querySelectorAll(".gesture-btn");
const menuBtns = document.querySelectorAll(".menu-btn");
const display = document.querySelector(".text-display");
const images = document.querySelectorAll(".gesture-img");
const gestureDisplay = document.querySelectorAll(".gesture-display");
const p1Display = document.querySelector("#p1Display");
const p2Display = document.querySelector("#p2Display");
let isGameActive = true;
let winningScore = 5;
let p1Score = 0;
let p2Score = 0;
let timeout;

function playerOne(e) {
  const selectedOption = e.target.id;
  return selectedOption;
}

function playerTwo() {
  const options = ["Rock", "Paper", "Scissor"];
  const randNum = Math.floor(Math.random() * options.length);
  const computerGesture = options[randNum];
  return computerGesture;
}

function winOrLose(isPlayer1Winner){
  const score = isPlayer1Winner ? ++p1Score : ++p2Score
  const scoresDisplay = isPlayer1Winner ? p1Display : p2Display
  const gameResult = isPlayer1Winner ? "You Win" : "You lose"
  scoresDisplay.textContent = score;
  display.textContent = gameResult
  score != winningScore && setTimeout(() => countDown(), 800 ) 
  gestureBtns.forEach(btn =>  btn.classList.add("btn-disabled"));

  if (score === winningScore){
    const winnerText = isPlayer1Winner ? 'Player 1 Wins' : 'Player 2 Wins';
    isGameActive = false
    display.textContent = winnerText;
    gestureBtns.forEach(btn => btn.classList.add("btn-disabled"));
  }
}

function tie() {
  display.textContent = "TIE";
  setTimeout(() => countDown(), 800 ) 
  gestureBtns.forEach((btn) => {
    btn.classList.add("btn-disabled");
  });
}

function countDown() {
  gestureDisplay[0].setAttribute("src", `gestures/Rock.png`);
  gestureDisplay[1].setAttribute("src", `gestures/Rock.png`);
  const executeGestureTimer  = (gesture, delay) => {
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        display.textContent = gesture;
        resolve();
      }, delay);
    });
  };


  async function executeTimers() {
    const waitTime = 400;
    const gestureDisplay = ["Rock", "Paper", "Scissor", "Shoot"]
    for (const gesture of gestureDisplay) {
      await executeGestureTimer(gesture, waitTime);
    }
    gestureBtns.forEach(btn => btn.classList.remove("btn-disabled"));
  }

 
  executeTimers()
}

function imgDisplay(player1, player2) {
  [p1GestureImg, p2GestureImg] = [player1, player2];
  [p1GestureDisplay, p2GestureDisplay] = [gestureDisplay[0], gestureDisplay[1]]
  p1GestureDisplay.setAttribute("src", `gestures/${p1GestureImg}.png`);
  p2GestureDisplay.setAttribute("src", `gestures/${p2GestureImg}.png`);
}

function game(player1, player2) {
  if (player1 === player2) tie();
  else if (player1 == "Rock" && player2 == "Scissor") winOrLose(true);
  else if (player1 == "Rock" && player2 == "Paper") winOrLose(false);
  else if (player1 == "Paper" && player2 == "Rock") winOrLose(true);
  else if (player1 == "Paper" && player2 == "Scissor") winOrLose(false);
  else if (player1 == "Scissor" && player2 == "Paper") winOrLose(true);
  else if (player1 == "Scissor" && player2 == "Rock") winOrLose(false);
}

function btnAnimation(btn) {
  btn.classList.add("btn-clicked");
  setTimeout(() => btn.classList.remove("btn-clicked"), 100);
}

gestureBtns.forEach((btn) => btn.classList.add("btn-disabled"));

menuBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let playerInput = e.target.id;
    btnAnimation(btn);

    function start(){
      [p1Score, p2Score] = [0, 0];
      [p1Display.textContent, p2Display.textContent] = [0, 0];
      menuBtns[0].classList.add("btn-disabled");
      isGameActive = true;
      countDown();
    }

    function reset(){
      clearInterval(timeout);
      [p1Score, p2Score] = [0, 0];
      [p1Display.textContent, p2Display.textContent, display.textContent] = [0, 0, 'Game reset'];
      menuBtns[0].classList.add("btn-disabled");
      gestureDisplay.forEach(gd => gd.setAttribute("src", `gestures/Rock.png`));
      gestureBtns.forEach(btn => btn.classList.add("btn-disabled"));
      setTimeout(() => {
        display.textContent = "Press Start to Play"
        menuBtns[0].classList.remove("btn-disabled");
      },1800)
      
    }
    
    playerInput == "start" ? start() : reset();

  });
});

gestureBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const computer = playerTwo();
    const player = playerOne(e);
    imgDisplay(player, computer);
    btnAnimation(btn);
    if (isGameActive) {
      game(player, computer);
      if (p1Score == winningScore) {
        isGameActive = false;
        gestureBtns.forEach((btn) => {
          btn.classList.add("btn-disabled");
        });
        menuBtns[0].classList.remove("btn-disabled");
      } else if (p2Score == winningScore) {
        isGameActive = false;
        gestureBtns.forEach((btn) => {
          btn.classList.add("btn-disabled");
        });
        menuBtns[0].classList.remove("btn-disabled");
      }
    }
  });
});
