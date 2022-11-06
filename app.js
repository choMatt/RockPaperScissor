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
    const pDisplay = gestureDisplay[0]
    const cDisplay = gestureDisplay[1]
    pDisplay.setAttribute('src', `gestures/${player}.png`)
    cDisplay.setAttribute('src', `gestures/${computer}.png`)
}

function gameMechanics(computer, player){
    if (player == computer){
        return tie()
    } else if (player == 'Rock' && computer == 'Scissor'){
        return win()
    } else if (player == 'Rock' && computer == 'Paper'){
        return lose()
    } else if (player == 'Paper' && computer == 'Rock'){
        return win()
    } else if (player == 'Paper' && computer == 'Scissor'){
        return lose()
    } else if (player == 'Scissor' && computer == 'Paper'){
        return win()
    } else if (player == 'Scissor' && computer == 'Rock'){
        return lose()
    };
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

