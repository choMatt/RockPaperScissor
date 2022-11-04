const allBtns = document.querySelectorAll('.btn')


// * 3D Buttons animation
for (let btns of allBtns){
    btns.addEventListener('click', () => {
        const btnClass = btns.classList
        btnClass.add('btn-clicked');
        setTimeout(() => btnClass.remove('btn-clicked'), 100)
   })
}


function gameMechanics(){
    allBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            // * Computer Gesture Logic: 
            const computer = ['Rock', 'Paper', 'Scissor']
            const randNum = Math.floor(Math.random() * computer.length)
            const computerGesture = computer[randNum]
            const playerGesture = e.target.id
            if (playerGesture == computerGesture){
                console.log('TIE')
            }
        })
    })
    

}

gameMechanics()
