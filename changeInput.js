const Blank = document.getElementById('Blank');
setTimeout(()=>{
    Blank.innerHTML = 'Hello World'
},500)
const stamButton =document.getElementById('stambutton')
stamButton.addEventListener('click',() => {Blank.innerHTML = ''})
const pButton = document.getElementById('p-button')
const pInput = document.getElementById('pInput')
pButton.addEventListener('click',()=>{
    let newP = document.getElementById('newP')
    const p = document.createElement('p')
    p.innerHTML = pInput.value;
    newP.appendChild(p)  
    pInput.value=""
})
