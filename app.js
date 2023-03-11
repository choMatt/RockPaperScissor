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

let player;
let computer;




//todo : add comments to clarify the code for other devs
//todo : make the code more DRY


function gestureReset(){
  setTimeout(() => {
    p1GestureDisplay.setAttribute("src", `gestures/Rock.png`);
    p2GestureDisplay.setAttribute("src", `gestures/Rock.png`);
  }, 1700);
}

function gestureButtonState(isButtonActive){
  if(isButtonActive){
    gestureBtns.forEach(btn => btn.classList.remove("btn-disabled"));
  } else {
    gestureBtns.forEach(btn => btn.classList.add("btn-disabled"));
  }
}

function menuButtonState(isButtonActive){
  if(isButtonActive){
    menuBtns[0].classList.remove("btn-disabled");
  } else {
    menuBtns[0].classList.add("btn-disabled");
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




function gameLoop(){

  gestureBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      computer = playerTwo();
      player = playerOne(e);
      btnAnimation(btn);
      
      if (isGameActive) {
        getWinner(player, computer);
      }

      //* this code determines who is the winner of the game
      function getWinner(player1, player2) {
        if (player1 === player2) timer("Tie");
        else if (player1 == "Rock" && player2 == "Scissor") timer(true);
        else if (player1 == "Rock" && player2 == "Paper") timer(false);
        else if (player1 == "Paper" && player2 == "Rock") timer(true);
        else if (player1 == "Paper" && player2 == "Scissor") timer(false);
        else if (player1 == "Scissor" && player2 == "Paper") timer(true);
        else if (player1 == "Scissor" && player2 == "Rock") timer(false);
      }

  

      function isPlayer1Winner(state){
        timeout = setTimeout(() => {
          let score = state ? ++p1Score : ++p2Score;
          let winLose = state ? "You Win" : "You lose";
          let scoreBoard = state ? p1Display : p2Display;
          display.textContent = winLose
          scoreBoard.textContent = score
          // gestureButtonState(true)

          if (state == 'Tie'){
            display.textContent = state
          } 

          if(score === winningScore){
            let declareWinner = state ? "Player 1 Wins" : "Player 2 Wins"
            display.textContent = declareWinner
            menuButtonState(true)
            gestureButtonState(false)
          } else {
            setTimeout(() => gestureButtonState(true) , 900) 
          }
        }, 800)

     
       
      }

      async function timer(state){
        await animateElement() 
        await isPlayer1Winner(state)
        await gestureReset()
      }
    


      // function winOrLose(isPlayer1Winner) {
      //   let score = isPlayer1Winner ? ++p1Score : ++p2Score;
      //     if(isPlayer1Winner == "Tie"){
      //       timeout = setTimeout(() => {
      //           display.textContent = "TIE"
      //           imgDisplay(player, computer);
      //           gestureReset()
      //         }, 800)
      //     } else {
      //        timeout = setTimeout(() =>  {
      //           let scoresDisplay = isPlayer1Winner ? p1Display : p2Display;
      //           let gameStatus = isPlayer1Winner ? "You win" : "You Lose"
      //           scoresDisplay.textContent = score;
      //           display.textContent = gameStatus;
      //           imgDisplay(player, computer);
      //           gestureReset()
      //         }, 800)

      //         if (score === winningScore) {
      //           winnerText = isPlayer1Winner ? 'Player 1 Wins' : 'Player 2 Wins';
      //           isGameActive = false;
      //           display.textContent = winnerText;
      //           gestureButtonState(false)
      //           menuButtonState(true)
      //         } else {
      //           setTimeout(() => gestureButtonState(true), 1200);
      //         }
      //     }
          
      // }

    });
  });
}
  

menuBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let playerInput = e.target.id;
    btnAnimation(btn);

    function start(){
      [p1Score, p2Score] = [0, 0];
      [p1Display.textContent, p2Display.textContent] = [0, 0];
      isGameActive = true;
      menuButtonState(false)
      gestureButtonState(true)
    }

    function reset() {
      [p1Score, p2Score] = [0, 0];
      [p1Display.textContent, p2Display.textContent, display.textContent] = [0, 0, 'Game reset'];
      gestureDisplay.forEach(gd => gd.setAttribute("src", `gestures/Rock.png`));
      menuButtonState(false)
      gestureButtonState(false)
      setTimeout(() => {
        display.textContent = "Press Start to Play"
        menuButtonState(true)
      },1800)
      
    }
    
    playerInput == "start" ? start() : reset();

  });
});
 

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


  function animateElement(){
    const pContainer = document.querySelector(".player-container")
    const cContainer = document.querySelector(".computer-container")
    const containers = [pContainer, cContainer];
    containers.forEach(container => container.classList.add("gesture-animation"))
   timeout =  setTimeout(() => {
      containers.forEach(container => container.classList.remove("gesture-animation"))
      imgDisplay(player, computer)
    }, 849)
    gestureButtonState(false)
  }




gameLoop()