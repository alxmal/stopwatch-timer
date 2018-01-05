var countdown;
var tempTime = 0;
var secondsLeft;
var timerDisplay = document.querySelector('.display__time-left');
var timePresetButtons = document.querySelectorAll('[data-time]');
var startButton = document.querySelector('.start');
var resetButton = document.querySelector('.reset');
var pauseButton = document.querySelector('.pause');
var continueButton = document.querySelector('.continue');

function startTimer(seconds) {
  clearInterval(countdown);
  var now = Date.now();
  var then =  now + seconds * 1000;
  displayTimeLeft(seconds);
  
  countdown = setInterval(function() {
      secondsLeft = Math.round((then - Date.now()) / 1000);
      
      if(secondsLeft < 0) {
        timerDisplay.classList.add('fade-on-pause');
        clearInterval(countdown);
        return;
      }
      
      displayTimeLeft(secondsLeft);
    }, 1000);
}

// function pause() {
//   clearInterval(countdown);
//   displayTimeLeft(secondsLeft);
// }

function displayTimeLeft(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainSeconds = seconds % 60;
  var display = minutes + ':' + (remainSeconds < 10 ? '0' : '') + remainSeconds;
  document.title = display;
  timerDisplay.textContent = display;
}

function setTimePreset() {
  var seconds = parseInt(this.dataset.time);
  timerDisplay.classList.remove('fade-on-pause');
  clearInterval(countdown);
  tempTime += seconds;
  displayTimeLeft(tempTime);
}

timePresetButtons.forEach(function(button) {
  button.addEventListener('click', setTimePreset)
});

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearInterval(countdown);
  var mins = this.minutes.value;
  tempTime = mins * 60;
  displayTimeLeft(tempTime);
  // startTimer(mins * 60);
  this.reset();
});

resetButton.addEventListener('click', function(e) {
  timerDisplay.textContent = '0:00';
  timerDisplay.classList.remove('fade-on-pause');
  startButton.classList.remove('hidden');
  pauseButton.classList.add('hidden');
  continueButton.classList.add('hidden');
  document.title = '0:00';
  tempTime = 0;
  clearInterval(countdown);
});

startButton.addEventListener('click', function(e) {
  startTimer(tempTime);
  startButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  timerDisplay.classList.remove('fade-on-pause');
});

pauseButton.addEventListener('click', function(e) {
  // startTimer(tempTime);
  clearInterval(countdown);
  displayTimeLeft(secondsLeft);
  pauseButton.classList.add('hidden');
  continueButton.classList.remove('hidden');
  timerDisplay.classList.add('fade-on-pause');
});

continueButton.addEventListener('click', function(e) {
  startTimer(secondsLeft);
  pauseButton.classList.remove('hidden');
  continueButton.classList.add('hidden');
  timerDisplay.classList.remove('fade-on-pause');
});