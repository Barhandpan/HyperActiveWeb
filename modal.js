const modal = document.getElementById('modal')
const modalBox = document.getElementById('modal-box')
const buttonCloseModal = document.getElementById('button-close-modal')
const buttonOpenModal = document.getElementById('button-open-modal')


buttonOpenModal.addEventListener('click',() => {
    modal.className = 'modal'
})
modal.addEventListener('click',() => {
    modal.className = 'none'
})
buttonCloseModal.addEventListener('click',() =>{
    modal.className = 'none'
})
modalBox.addEventListener('click',(event) => {
    event.stopPropagation();
})

