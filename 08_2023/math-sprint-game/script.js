// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0s';
// Scroll
let valueY = 0 ;

// stop timer, process results 
function checkTime(){
  console.log(timePlayed)
  if(playerGuessArray.length == questionAmount){
    clearInterval(timer)
    // check for wrong guesses , add penalty time
    equationsArray.forEach((equation,index)=>{
      if(equation.evaluated === playerGuessArray[index]){
        // corredt guess , no penalty
      }else{
        // incorrect guess, add penalty
        penaltyTime += 0.5;
      }
    })
    finalTime = timePlayed + penaltyTime;
  }
}
// add a tenth of a second to timeplayed
function addTime(){
  timePlayed += 0.1;
  checkTime();
}
// start timer when game page is clicked
function startTimer(){
  // reset Time
  timePlayed = 0;
  penaltyTime = 0;
  finalTime = 0;
  timer = setInterval(addTime,100);
  gamePage.removeEventListener('click',startTimer);
}
// scroll, store user selection in playerGuessArray
function select (guessedTrue){
  console.log('layer guess array ',playerGuessArray)
  // scroll 80px
  valueY +=80;
  itemContainer.scroll(0,valueY);
  // add palyer guess to array
  return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false')
}
// displays game page 
function showGamePage(){
    gamePage.hidden = false;
    countdownPage.hidden = true;
}

// get random Number up to a max number 
function getRandomInt(max){
  return Math.floor(Math.random()* Math.floor(max));
}
// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 6} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber + 9} x ${secondNumber} = ${equationValue - 3}`;
    wrongFormat[2] = `${firstNumber + 4} x ${secondNumber} = ${equationValue - 2}`;
    const formatChoice = secondNumber = getRandomInt(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray)
}

// add equations to DOM
function equationsToDOM(){
  equationsArray.forEach((equation)=>{
    // item
    const item = document.createElement('div');
    item.classList.add('item');
    // Equation Text
    const equationText = document.createElement('h1');
    equationText.textContent = equation.value;
    // append
    item.appendChild(equationText);
    itemContainer.appendChild(item);
  })
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationsToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// count down 3,2,1 g0g0
function countdownStart(){
  countdown.textContent='3';
  setTimeout(()=>{
    countdown.textContent = '2';
  },1000)
  setTimeout(()=>{
    countdown.textContent = '1';
  },2000)
  setTimeout(()=>{
    countdown.textContent = 'G0!';
  },3000)
}
//  navigate from splash page to countdown page
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdownStart()
  createEquations()
  populateGamePage()
  setTimeout(showGamePage,4000)
}


// get the value from selected raio button
function getRadioValue(){
  let radioValue;
  radioInputs.forEach((radioInput)=>{
    if(radioInput.checked){
      radioValue = radioInput.value;
    }
  })
  return radioValue;
}


// form that decides amount of questions 
function slectQuestionAmount(e){
  e.preventDefault();
  questionAmount = getRadioValue();
  console.log(questionAmount);
  if(questionAmount){
    showCountdown()
  }
}


startForm.addEventListener('click',()=>{
  radioContainers.forEach((radioEl) =>{
    // remove Selected label styling
    radioEl.classList.remove('selected-label');
    // add it back if radio input is checked
    if(radioEl.children[1].checked){
        radioEl.classList.add('selected-label');
    }
  });
});

// event listeners
startForm.addEventListener('submit',slectQuestionAmount);
gamePage.addEventListener('click',startTimer);