const playerScoreEl = document.getElementById('playerScore')
const playerChoiceEl = document.getElementById('playerChoice')
const computerScoreEl = document.getElementById('computerScore')
const computerChoiceEl = document.getElementById('computerChoice')
const resultText = document.getElementById('resultText')
// Player
const playerRock = document.getElementById('playerRock')
const playerPaper = document.getElementById('playerPaper')
const playerScissors = document.getElementById('playerScissors')
const playerLizard = document.getElementById('playerLizard')
const playerSpock = document.getElementById('playerSpock')
// Computer
const computerRock = document.getElementById('computerRock')
const computerPaper = document.getElementById('computerPaper')
const computerScissors = document.getElementById('computerScissors')
const computerLizard = document.getElementById('computerLizard')
const computerSpock = document.getElementById('computerSpock')

const allGameIcons = document.querySelectorAll('.far')

const choices = {
  Rock: { name: 'Rock', defeats: ['Scissors', 'Lizard'] },
  Paper: { name: 'Paper', defeats: ['Rock', 'Spock'] },
  Scissors: { name: 'Scissors', defeats: ['Paper', 'Lizard'] },
  Lizard: { name: 'Lizard', defeats: ['Paper', 'Spock'] },
  Spock: { name: 'Spock', defeats: ['Scissors', 'Rock'] },
};
let playerScore = 0;
let computerScore = 0;

let computerChoice = '';
// reset icons
function resetSelected() {
  allGameIcons.forEach(function(icon){
    icon.classList.remove('selected')
    import('./confetti.js')
        .then((module)=>{
          module.stopConfetti();
          module.removeConfetti();
        });
  })
}

// reset score & playerChoice/Computerchoice
function resetAll(){
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  playerChoiceEl.textContent = ''
  computerChoiceEl.textContent = ''
  resultText.textContent=''
  import('./confetti.js')
        .then((module)=>{
          module.removeConfetti();
        });
}
// update score
function updateScore(playerChoice){
  if( playerChoice === computerChoice){
    resultText.textContent = ' Hue keo`'
  }else{
    const choice = choices[playerChoice]
    if(choice.defeats.indexOf(computerChoice) > -1 ){
      import('./confetti.js')
        .then((module)=>{
          module.startConfetti();
          resultText.textContent = 'an keo'
          playerScore++;
          playerScoreEl.textContent = playerScore;
        });
    }
    else{
      resultText.textContent = 'thua keo'
      computerScore++;
      computerScoreEl.textContent = computerScore;
    }
  }
}
// check result
function checkResult(playerChoice){
  resetSelected();
  computercomputerChoice();
  displayComputerChoice();
  updateScore(playerChoice);
}
// computer Choice 
function computercomputerChoice(){
  const computerNumerRandom = Math.random();
  if(computerNumerRandom < 0.2){
    computerChoice = 'Rock';
  }else if(computerNumerRandom <= 0.4 ){
    computerChoice = 'Paper';
  }else if(computerNumerRandom <= 0.6 ){
    computerChoice = 'Scissors';
  }else if(computerNumerRandom <= 0.8 ){
    computerChoice = 'Lizard';
  }else{
    computerChoice = 'Spock';
  }
}
// Player Select
function select(playerChoice){
  checkResult(playerChoice)
  switch(playerChoice){
    case 'Rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock'
      break;
    case 'Paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper'
      break;
    case 'Scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors'
      break;
    case 'Lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard'
      break;
    case 'Spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock'
      break;  
  }
}

// Computer select
function displayComputerChoice(){
  switch(computerChoice){
    case 'Rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock'
      break;
    case 'Paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper'
      break;
    case 'Scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors'
      break;
    case 'Lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard'
      break;
    case 'Spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock'
      break;  
  }
}

// on starup, set initial values
resetAll();
