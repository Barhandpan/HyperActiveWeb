const box = document.getElementById('box')
box.addEventListener('mousemove',(event) => {
    const x = event.offsetX
    const y = event.offsetY
    if(x < 151)
    {
     box.className = y < 151 ? 'box red' : 'box purple'
    }
    else
    {
        alert(consol.log('Hi'))
     box.className = y < 151 ? 'box green' : 'box orange'
    }

})
const box1 = document.getElementsByClassName('box');    
