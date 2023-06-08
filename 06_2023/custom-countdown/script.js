const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountDown

const second = 1000 ;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Set Date Input Min with today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Populate Countdown / Complete UI
function updateDOM(){
countdownActive = setInterval(()=>{
    const now = new Date().getTime();
    const distance = countdownValue - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour /minute));
    const seconds = Math.floor((distance % minute) / second);
    
    // Hide Input
    inputContainer.hidden = true

    // if the countdown has ended, show complete
    if (distance < 0){
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    }
    else{
        // else, show the countdown in progeress
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }
},second);
}
// Take Values from form input
function updateCountdown (e){
    e.preventDefault()
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountDown = {
        title: countdownTitle,
        date : countdownDate,
    }
    localStorage.setItem('countdown',JSON.stringify(savedCountDown))
    // check for valid date 
    if(countdownDate === ''){
        alert("please add date")
    }
    else{
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    }
}
// Reset All values
function reset(){
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // stop the count down
    clearInterval(countdownActive);
    // reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')
}
// 
function restorePreviousCountdown(){
    // get countdown from localStorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountDown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountDown.title;
        countdownDate = savedCountDown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}
// Event Listeners
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

// on Load, check localStorage
restorePreviousCountdown();