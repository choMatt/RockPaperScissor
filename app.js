const gestureBtns = document.querySelectorAll('.gesture-btn')
const menuBtns = document.querySelectorAll('.menu-btn')
const display = document.querySelector('.text-display')
const images = document.querySelectorAll('.gesture-img')
const gestureDisplay = document.querySelectorAll('.gesture-display')
const scores = document.querySelectorAll('.score')
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
    playerDisplay.setAttribute('src', playerGesture)
    computerDisplay.setAttribute('src', computerGesture)
}

function reset(){
    playerScore = 0;
    computerScore = 0;
    display.innerText = 'Game Reset';
    setTimeout(() => display.innerText = 'Press Start to Play', 1000)
    gestureDisplay.forEach(display => display.src = 'gestures/Rock.png')
    scores.forEach((score) => score.innerText = 0 )
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
    display.innerText = 'You Win'
    playerScore++
    scores[0].innerText = playerScore;
}

function lose(){
    display.innerText = 'You Lose'
    computerScore++
    scores[1].innerText = computerScore;
}

function tie(){
    display.innerHTML = 'Tie'
}

menuBtns.forEach((btn) =>{
    btn.addEventListener('click', (e) => {
        const pMenuTarget = e.target.id
        btnAnimation(btn)
        if (pMenuTarget == 'reset'){
            reset()
            return;
        } else if (pMenuTarget == 'start'){
                setTimeout(() => display.innerText = 'Rock', 1000)
                setTimeout(() => display.innerText = 'Paper', 2000)
                setTimeout(() => display.innerText = 'Scissor', 4000)
                setTimeout(() => display.innerText = 'Shoot', 800)
                start()
        }
    })
})

function gameStart(){
    gestureBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const computerGesture = computer()
            const playerGesture = player(e)
            btnAnimation(btn)
            imageDisplay(computerGesture, playerGesture)
            gameMechanics(computerGesture, playerGesture)
        })
    })
}

function start(){
    const fight = gameStart()
    return fight
}