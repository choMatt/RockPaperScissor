const gestureBtns = document.querySelectorAll('.gesture-btn')
const menuBtns = document.querySelectorAll('.menu-btn')
const display = document.querySelector('.text-display')
const images = document.querySelectorAll('.gesture-img')
const gestureDisplay = document.querySelectorAll('.gesture-display')
const p1Display = document.querySelector('#p1Display')
const p2Display = document.querySelector('#p2Display')
let isGameActive = true;
let winningScore = 3;
let p1Score = 0;
let p2Score = 0;

function playerOne(e){
    const playerGesture = e.target.id
    return playerGesture
}

function playerTwo(){
    const arr =['Rock', 'Paper', 'Scissor']
    const randNum = Math.floor(Math.random() * arr.length)
    const computerGesture = arr[randNum]
    return computerGesture
}

function win(){
    p1Score += 1
    p1Display.textContent = p1Score
    display.textContent = 'You Win'
    p1Score != winningScore && countDown()
    gestureBtns.forEach((btn) => {
        btn.classList.add('btn-disabled')
    }) 
}

function lose(){
    p2Score += 1
    p2Display.textContent = p2Score
    display.textContent = 'You Lose'
    p2Score != winningScore && countDown()
    gestureBtns.forEach((btn) => {
        btn.classList.add('btn-disabled')
    }) 
}

function tie(){
    display.textContent = 'TIE'
    countDown()
    gestureBtns.forEach((btn) => {
        btn.classList.add('btn-disabled')
    }) 
}

function countDown(){
    const roshambo = (gesture, delay) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                display.textContent = gesture
                resolve()
            }, delay)
        })
    }
    roshambo('Rock', 300)
        .then(() => roshambo('Paper', 300))
        .then(() => roshambo('Scissor', 300))
        .then(() => roshambo('Shoot', 300))
        .then(() => gestureBtns.forEach(btn => btn.classList.remove('btn-disabled')))
}

function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = p1Score
    p2Display.textContent = p2Score
    display.textContent = 'Game Reset'
    menuBtns[0].classList.remove('btn-disabled')
    setTimeout(() => display.textContent = 'Press Start to Play', 1000)
    gestureDisplay[0].setAttribute('src', `gestures/Rock.png`)
    gestureDisplay[1].setAttribute('src', `gestures/Rock.png`)
}

function imgDisplay(player1, player2){
    const p1GestureImg = player1;
    const p2GestureImg = player2;
    const p1GestureDisplay = gestureDisplay[0]
    const p2GestureDisplay = gestureDisplay[1]
    p1GestureDisplay.setAttribute('src', `gestures/${p1GestureImg}.png`)
    p2GestureDisplay.setAttribute('src', `gestures/${p2GestureImg}.png`)

}

function game(player1, player2 ){
    if (player1 === player2) tie()
    else if (player1 == 'Rock' && player2 == 'Scissor') win()
    else if (player1 == 'Rock' && player2 == 'Paper') lose()
    else if (player1 == 'Paper' && player2 == 'Rock') win()
    else if (player1 == 'Paper' && player2 == 'Scissor') lose()
    else if (player1 == 'Scissor' && player2 == 'Paper') win()
    else if (player1 == 'Scissor' && player2 == 'Rock') lose()
}

function btnAnimation(btn){
    btn.classList.add('btn-clicked')
    setTimeout(() => btn.classList.remove('btn-clicked'), 100)
}

gestureBtns.forEach((btn) => btn.classList.add('btn-disabled'))

menuBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let playerInput = e.target.id
        btnAnimation(btn)
        if (playerInput == 'start'){
            countDown()
            menuBtns[0].classList.add('btn-disabled')
            isGameActive = true;
            display.textContent = 'Game Start'
            p1Score = 0;
            p2Score = 0;
            p1Display.textContent = p1Score
            p2Display.textContent = p2Score
        } else if (playerInput == 'reset') {
            gestureBtns.forEach((btn) => {
                btn.classList.add('btn-disabled')
            })
            reset()
        }
    })
})

gestureBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const computer = playerTwo()
        const player = playerOne(e)
        imgDisplay(player, computer)
        btnAnimation(btn)
        if (isGameActive){
            console.log(isGameActive)
            game(player, computer)
            if (p1Score == winningScore){
                isGameActive = false;
                display.textContent = 'Player 1 Wins'
                gestureBtns.forEach((btn) => {
                    btn.classList.add('btn-disabled')
                })
                menuBtns[0].classList.remove('btn-disabled')
            } else if (p2Score == winningScore){
                isGameActive = false;
                display.textContent = 'Player 2 Wins'
                gestureBtns.forEach((btn) => {
                    btn.classList.add('btn-disabled')
                })
                menuBtns[0].classList.remove('btn-disabled')
            }
            
        } 
    })
})
