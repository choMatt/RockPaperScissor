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



function animateElement(){
  const containers = [pContainer, cContainer];
  containers.forEach(container => container.classList.add("gesture-animation"))
  setTimeout(() => {
    containers.forEach(container => container.classList.remove("gesture-animation"))
  }, 1140)
}

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
  gestureBtns.forEach((btn) => {
    btn.classList.add("btn-disabled");
  });
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

menuBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let playerInput = e.target.id;
    btnAnimation(btn);

    function start(){
      [p1Score, p2Score] = [0, 0];
      [p1Display.textContent, p2Display.textContent] = [0, 0];
      menuBtns[0].classList.add("btn-disabled");
      isGameActive = true;

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

let computer;
let player;


gestureBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
     computer = playerTwo();
     player = playerOne(e);
    btnAnimation(btn);
    handleClick()


    // if (isGameActive) {
    //   game(player, computer);
    //   if (p1Score == winningScore) {
    //     isGameActive = false;
    //     gestureBtns.forEach((btn) => {
    //       btn.classList.add("btn-disabled");
    //     });
    //     menuBtns[0].classList.remove("btn-disabled");
    //   } else if (p2Score == winningScore) {
    //     isGameActive = false;
    //     gestureBtns.forEach((btn) => {
    //       btn.classList.add("btn-disabled");
    //     });
    //     menuBtns[0].classList.remove("btn-disabled");
    //   }
    // }
  });
});

function delay(playerClicked){
  if (playerClicked){
      animateElement()
      setTimeout(() => {
        imgDisplay(player, computer);
      }, 900)
  }
}

function handleClick(){
  delay(true)
}






