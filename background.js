const textbox = document.getElementById('comment');

textbox.addEventListener('input',(event) =>{
    switch(event.target.value.length % 3)
    {
        case 1: event.target.className ='red';
        break;
        case 2: event.target.className = 'blue';
        break;
        case 3: event.target.className = 'green';
    }
})
textbox.addEventListener('focus',(event)=>{
    event.target.className = 'input-focus'
})
textbox.addEventListener('blur',(event)=>{
    event.target.className = 'input-blur'
})
 

