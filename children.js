const select = document.querySelectorAll('.circle')
for(let i = 0; i<3;i++)
{
    select[i].addEventListener('click',() => {
        select[i].remove('div')
    })
}