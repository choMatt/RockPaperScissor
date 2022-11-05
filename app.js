const allBtns = document.querySelectorAll('.btn')
const display = document.querySelector('.text-display')
const images = document.querySelectorAll('.gesture-img')
const gestureDisplay = document.querySelectorAll('.gesture-display')
const playerScore = 0;
const computerScore = 0;

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
    const cGestureDisplay = computer
    const pGestureDisplay = player
    const cDisplay = gestureDisplay[1].setAttribute('src', `gestures/${cGestureDisplay}.png`)
    const pDisplay = gestureDisplay[0].setAttribute('src', `gestures/${pGestureDisplay}.png`)
}


function gameMechanics(){
    allBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            // * 3D Button animation
            const btnClass = btn.classList
            btnClass.add('btn-clicked');
            setTimeout(() => btnClass.remove('btn-clicked'), 100)

            const computerGesture = computer()
            const playerGesture = player(e)
            imageDisplay(computerGesture, playerGesture)
            if (playerGesture == computerGesture){
                tie()
            } else if (playerGesture == 'Rock' && computerGesture == 'Scissor'){
                win()
            } else if (playerGesture == 'Rock' && computerGesture == 'Paper'){
                lose()
            } else if (playerGesture == 'Paper' && computerGesture == 'Rock'){
                win()
            } else if (playerGesture == 'Paper' && computerGesture == 'Scissor'){
                lose()
            } else if (playerGesture == 'Scissor' && computerGesture == 'Paper'){
                win()
            } else if (playerGesture == 'Scissor' && computerGesture == 'Rock'){
                lose()
            };
        })
    })
    

}


// * Win, Lose, Tie logic
function win(){
    display.innerHTML = 'You Win'
}

function lose(){
    display.innerHTML = 'You Lose'
}

function tie(){
    display.innerHTML = 'Tie'
}

gameMechanics()


