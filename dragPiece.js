for(let i = 0; i<8;i++)
{
    for(let y = 0; y<8;y++)
    {
        const ev = document.getElementsByClassName('piece');
        function allowDrop(ev) {
            ev.preventDefault();
        }
          
        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }
    }                    
}