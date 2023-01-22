const greenSquare = document.getElementsByClassName('box greenSquare')
for(let box of greenSquare)
{
    box.addEventListener('click', () =>{
        box.classList.remove('greenSquare')
        box.classList.add('yellow')
    })
}

