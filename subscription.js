const username = document.getElementById('name')
const age = document.getElementById('age')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const submit = document.getElementById('submit')
const container = document.getElementById('container')
const checkName = document.getElementById('checkName')
const checkAge = document.getElementById('checkAge')
const checkPassword = document.getElementById('checkPassword')
const checkPassword2 = document.getElementById('checkPassword2')
const nameDisplay = document.getElementById('nameDisplay')
const ageDisplay = document.getElementById('ageDisplay')
const passwordDisplay = document.getElementById('passwordDisplay')
const password2Display = document.getElementById('password2Display')

submit.disabled = true;
username.addEventListener('focus', (event) => {
    checkName.className = 'inline-block'   
})
username.addEventListener('blur', (event) =>{
    if(username.value !== 'moshe')
        checkName.className = 'none'
})
age.addEventListener('focus',(event) => {
    checkAge.className = 'inline-block'  
})
age.addEventListener('blur', (event) =>{
    if(age.value > 12)
        checkAge.className = 'none'
})
password.addEventListener('focus',(event) => {
    checkPassword.className = 'inline-block'   
})
password.addEventListener('input', (event) =>{
    if(password.value.length >= 6)
        checkPassword.className = 'none'
})
password2.addEventListener('focus',(event) => {
    checkPassword2.className = 'inline-block'  
    })
password2.addEventListener('input', (event) =>{
        if(password2.value === password.value)
            checkPassword2.className ='none'   
})
container.addEventListener('input',(event) => {
    if(password2.value === password.value && password.value.length >= 6 && age.value > 12 && username.value !== 'moshe')
        submit.disabled = false;    

})
submit.addEventListener('click',(event) => {
    event.preventDefault()
    nameDisplay.innerHTML ='Name: ' + username.value
    ageDisplay.innerHTML = 'Age: ' + age.value
    passwordDisplay.innerHTML = 'Password: ' + password.value
})

