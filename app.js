const allBtns = document.querySelectorAll('.btn')
const display = document.querySelector('.text-display')
const images = document.querySelectorAll('.gesture-img')
const gestureDisplay = document.querySelectorAll('.gesture-display')
const score = document.querySelectorAll('.score')
let playerScore = 0;
let computerScore = 0;


function computer(){
    const gestureArr = ['Scissor', 'Rock', 'Paper'];
    const randNum = Math.floor(Math.random() * gestureArr.length);
    const cGesture = gestureArr[randNum];
    return cGesture
}

function player(e){
    const pGesture = e.target.id
    return pGesture
}

function imageDisplay(computer, player){
    const playerDisplay = gestureDisplay[0]
    const computerDisplay = gestureDisplay[1]
    const playerGesture = `gestures/${player}.png`
    const computerGesture = `gestures/${computer}.png`
        if (player == 'reset'){
            playerDisplay.setAttribute('src', `gestures/Rock.png`)
            computerDisplay.setAttribute('src', `gestures/Rock.png`)
            playerScore = 0;
            computerScore = 0;
            display.innerHTML = 'Game Reset'
            setTimeout(() => display.innerHTML = 'Press Start to Play', 1200)
            score[0].innerText = playerScore;
            score[1].innerText = computerScore;
        } else if (player == 'start'){
            game
        } else  {
            playerDisplay.setAttribute('src', playerGesture)
            computerDisplay.setAttribute('src', computerGesture)
        }
}

function gameMechanics(computer, player){
    if (player == computer) tie()
    else if (player == 'Rock' && computer == 'Scissor') win()
    else if (player == 'Rock' && computer == 'Paper') lose()
    else if (player == 'Paper' && computer == 'Rock') win()
    else if (player == 'Paper' && computer == 'Scissor') lose()
    else if (player == 'Scissor' && computer == 'Paper') win()
    else if (player == 'Scissor' && computer == 'Rock') lose()
}

function btnAnimation(btn){
    const btnClass = btn.classList
    btnClass.add('btn-clicked');
    setTimeout(() => btnClass.remove('btn-clicked'), 100)
}

// * Win, Lose, Tie logic
function win(){
    display.innerHTML = 'You Win'
    playerScore++
    score[0].innerText = playerScore;
}

function lose(){
    display.innerHTML = 'You Lose'
    computerScore++
    score[1].innerText = computerScore;
}

function tie(){
    display.innerHTML = 'Tie'
}

function game(){
    allBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const computerGesture = computer()
            const playerGesture = player(e)
            btnAnimation(btn)
            imageDisplay(computerGesture, playerGesture)
            gameMechanics(computerGesture, playerGesture)
        })
    })
}


game()