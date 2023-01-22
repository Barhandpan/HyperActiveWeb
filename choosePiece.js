

for(let i = 0; i<8;i++)
{
    for(let y = 0; y<8;y++)
    {   
        const container = document.getElementsByClassName('grid-container')
        const box = document.createElement('div');
        box.classList.add('box');
        const piece = document.createElement('div');
        container[0].appendChild(box)
        piece.forEach('click',(event) => {
           event.target.className = 'green'
        });
    }                    
}
