addEventListeners()
doOtherThings()



const categoryContainer = document.querySelectorAll('.category-container')
const titleContainer = document.querySelectorAll('.title-container')

// create function
categoryContainer.forEach((element,index) => {
    element.addEventListener("click", (event)=>{
        if(element.children[1].classList.contains("show")) {
            element.children[1].classList.remove("show");
            element.children[1].classList.add("reverse");
        } else {
            element.children[1].classList.remove("reverse");
            element.children[1].classList.add("show");
        }
    titleContainer[index].children[2].classList.contains('exit')?titleContainer[index].children[2].classList.remove('exit'):titleContainer[index].children[2].classList.add('exit')
})})

const  addEventListeners1=()=>{
    el1()
    el2()
    el3()
}

function addEventListeners2(){
    el1()
    el2()
    el3()
}

const questionContainer = document.querySelectorAll('.question-answer-container')
const answer = document.querySelectorAll('.answer')
const question = document.querySelectorAll('.question')
questionContainer.forEach((element,index) => {
    element.addEventListener("click",() =>{
if(answer[index].classList.contains("show")) {
            answer[index].classList.remove("show");
            answer[index].classList.add("reverse");
        } else {
            answer[index].classList.remove("reverse");
            answer[index].classList.add("show");
        }
        question[index].children[0].classList.contains('fa-circle-arrow-down')?question[index].children[0].className = "fa-solid fa-circle-arrow-up":question[index].children[0].className = "fa-solid fa-circle-arrow-down"
    })
})

const menuBtn = document.getElementById('menu-button')
const links = document.querySelector('.nav-links-container')
let menuOpen = false;
let headerContainer = document.getElementById('header');

menuBtn.addEventListener('click', ()=>{
    menuBtn.classList.contains('open')?menuBtn.classList.remove('open'):menuBtn.classList.add('open')
    links.classList.contains('show-links')?links.classList.remove('show-links'):links.classList.add('show-links')
    menuOpen === false?menuOpen = true:menuOpen = false;
    if(menuOpen)
        headerContainer.style.height = `${headerContainer.getBoundingClientRect().height + links.getBoundingClientRect().height}px`;
    else
        headerContainer.style.height = '53px'
})

const mq = window.matchMedia("(max-width: 925px)");
const careers = document.getElementById('careers')
const innerCareers = document.getElementById('inner-careers')
let CareersMenuOpen = false;
    careers.addEventListener('click', () =>{
        if(mq.matches)
        {
            innerCareers.classList.toggle("open-careers");
            CareersMenuOpen === false?CareersMenuOpen = true:CareersMenuOpen = false;
            if(CareersMenuOpen)
            headerContainer.style.height = `${headerContainer.getBoundingClientRect().height + innerCareers.getBoundingClientRect().height}px`;
        else
            headerContainer.style.height = '558px';
        }
});


if(mq.matches)
    innerCareers.style.display === 'none';
const sumbitContactBtn = document.getElementById('submit-contact-container')
const submitDesktop = document.getElementById('submit-desktop')
var regex = /^[a-zA-Z\s]+$/;
sumbitContactBtn.addEventListener('click',function(e){
    checkSubmit('name-contact-container','phone-contact-container','email-contact-container',e)
})
submitDesktop.addEventListener('click',function(e){
    checkSubmit('name-desktop','phone-desktop','email-desktop',e)
})

function checkSubmit(name1,phone,email,e)
{
    let isValid = true;
    name1 = document.getElementById(name1)
    if(!regex.test(name1.value)){   
        e.preventDefault();
        name1.value = ''
        name1.placeholder = "*נא להזין שם תקין";
        isValid = false;
    }
    phone = document.getElementById(phone)
    if(phone.value.toString().length !== 10){
        e.preventDefault(); 
        phone.value=''
        phone.placeholder = "*נא להזין מספר טלפון";
        isValid = false;
    }
    email = document.getElementById(email)
    if(!isValidEmail(email.value))
    {
        e.preventDefault(); 
        email.value=''
        email.placeholder = "*נא להזין כתובת מייל";
        isValid = false;
    }
    if(isValid){
        e.preventDefault();
        document.querySelector("#gray-background").classList.remove('show-modal');
        thanksModal.style.display = 'flex';
    }
}
function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}    
setTimeout(function(){
    document.querySelector("#gray-background").classList.add('show-modal');
}, 3000);

const exitButton = document.querySelector('.modal-exit-button')
const sumbitButton = document.getElementById('submit-modal')
const thanksExitButton = document.getElementById('thanks-x')
const thanksModal = document.querySelector('.thanks-modal')

sumbitButton.addEventListener('click',function(e){
    let isValid = true;
    let name1 = document.getElementById('name')
    if(!regex.test(name1.value)){   
        e.preventDefault();
        name1.value = ''
        name1.classList.add("invalid-input");
        name1.placeholder = "*נא להזין שם תקין";
        isValid = false;
        name1.addEventListener("input", function(){
            if(regex.test(this.value)){
                this.classList.remove("invalid-input");
            }
        });
    }
    let phone = document.getElementById('phone')
    if(phone.value.toString().length !== 10){
        e.preventDefault(); 
        phone.value=''
        phone.classList.add("invalid-input");
        phone.placeholder = "*נא להזין מספר טלפון";
        isValid = false;
        phone.addEventListener("input", function(){
            if(regex.test(this.value)){
                this.classList.remove("invalid-input");
            }
        });
    }
    let email = document.getElementById('email')
    if(!isValidEmail(email.value))
    {
        e.preventDefault(); 
        email.value=''
        email.classList.add("invalid-input");
        email.placeholder = "*נא להזין כתובת מייל";
        isValid = false;
        email.addEventListener("input", function(){
            if(regex.test(this.value)){
                this.classList.remove("invalid-input");
            }
        });
    }
    if(isValid){
        e.preventDefault();
        document.querySelector("#gray-background").classList.remove('show-modal');
        thanksModal.style.display = 'flex';
    }
})
thanksExitButton.addEventListener('click', () =>{
    thanksModal.style.display = 'none';
})

exitButton.addEventListener('click', () =>{
    document.querySelector("#gray-background").classList.remove('show-modal');
})
document.getElementById("us-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#why-us-container").offset().top
    }, 1000);
});
document.getElementById("company-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#companies-container").offset().top
    }, 1000);
});
document.getElementById("about-us-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#about-us").offset().top
    }, 1000);
});
document.getElementById("work-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#how-it-works").offset().top
    }, 1000);
});
document.getElementById("question-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#questions").offset().top
    }, 1000);
});
document.getElementById("public-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#public-container").offset().top
    }, 1000);
});
document.getElementById("form-click").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#contact-container").offset().top
    }, 1000);
});
document.getElementById("details").addEventListener("click", function(e){
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#contact-container").offset().top
    }, 1000);
});
document.getElementById("promise-click").addEventListener("click", function(e){
    e.preventDefault();
    Array.from(answer).forEach((a) =>{ a.classList.remove("show");});
    answer[15].classList.add("show");
    $('html, body').animate({
        scrollTop: $("#profit").offset().top
    }, 1000);
    question[15].children[0].className = "fa-solid fa-circle-arrow-up"
});
document.getElementById("marketing-click").addEventListener("click", function(e){
    e.preventDefault();
    Array.from(answer).forEach((a) =>{ a.classList.remove("show");});
    answer[16].classList.add("show");
    $('html, body').animate({
        scrollTop: $("#profit").offset().top
    }, 1000);
    question[16].children[0].className = "fa-solid fa-circle-arrow-up"
});

const privacy = document.querySelectorAll('.privacy')
const privacyModal = document.querySelectorAll('.privacy-modal')
const exitPrivacyModal = document.querySelectorAll('.exit-button')
Array.from(privacy).forEach((p) => {
    p.addEventListener("click", ()=>{
        if(p.innerHTML === 'הצהרת נגישות')
        {
            privacyModal[1].style.display = 'block'
        }
        if(p.innerHTML === 'מדיניות פרטיות משתמשים')
        {
            privacyModal[0].style.display = 'block'
        }
})})
exitPrivacyModal.forEach(e => {
    e.addEventListener('click',() => {
        privacyModal[0].style.display = 'none'; 
        privacyModal[1].style.display = 'none';    
    })
})



