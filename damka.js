const div = document.createElement('div');
div.classList.add('white');
const div1 = document.createElement('div');
div1.classList.add('black');
const container = document.getElementsByClassName('grid-container')
for(let i = 0; i<8;i++)
{
    for(let y = 0; y<8;y++)
    {
        const box = document.createElement('div');
        box.classList.add('box');
        const piece = document.createElement('div');
        container[0].appendChild(box)
        if(isWhite(i,undefined))
            isWhite(undefined,y)?box.classList.add('white'):box.classList.add('black');
        else
            isWhite(undefined,y+1)?box.classList.add('white'):box.classList.add('black');            
        if(i<3 && !isWhite(undefined,y))
        {
          piece.classList.add('blackSoldier');
          const box = document.getElementsByClassName('box');
          box[(i*8+y)].appendChild(piece)
          piece.draggable = true;    
        } 
        if(i>4 && isWhite(undefined,y))
        {
          piece.classList.add('whiteSoldier');
          const box = document.getElementsByClassName('box');
          box[(i*8+y)].appendChild(piece)
          piece.draggable = true;

        }               
    }                    
}
function isWhite(i,y)
{
        if(y === undefined?i%2 === 0:y%2 === 0)
        {
            return true;
        }
        else
        {
            return false;
        } 
}