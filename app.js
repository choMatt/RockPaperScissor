const allBtns = document.querySelectorAll('.btn')
const display = document.querySelector('.display')
const images = document.querySelectorAll('.gesture-img')
const playerScore = 0;
const computerScore = 0;


// * 3D Buttons animation
for (let btns of allBtns){
    btns.addEventListener('click', (e) => {
        const btnClass = btns.classList
        btnClass.add('btn-clicked');
        setTimeout(() => btnClass.remove('btn-clicked'), 100)
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


function gameMechanics(){
  
    allBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            
            // * Computer Gesture Logic: 
            const computer = ['Rock', 'Paper', 'Scissor'];
            const randNum = Math.floor(Math.random() * computer.length);
            const computerGesture = computer[randNum];

            // * Player Gesture & win, lose declaration
            const playerGesture = e.target.id
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

gameMechanics()


