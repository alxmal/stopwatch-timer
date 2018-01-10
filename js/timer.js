var countdown, secondsLeft, lastTime, dataTime;
var timerDisplay = document.querySelector('.display__time-left');
var timerPresetBlock = document.querySelector('.timer__presets');
var timePresetButtons = document.querySelectorAll('[data-time]');
var timerControls = document.querySelector('.timer__controls');
var repeatButton = document.querySelector('.repeat');
var resetButton = document.querySelector('.reset');
var pauseButton = document.querySelector('.pause');
var continueButton = document.querySelector('.continue');
var timerRepeatButton = document.querySelector('.timer__repeat');
var countdownBar = document.querySelector('.countdown-bar');
var countdownBarInitial = countdownBar.offsetWidth;
// var countdownBarWidth = countdownBarInitial;

function startTimer(seconds) {
  clearInterval(countdown);
  var countdownBarWidth = countdownBarInitial;
  var now = Date.now();
  var then =  now + seconds * 1000;
  // var step = Math.round(countdownBarWidth / seconds);
  var step = countdownBarWidth / seconds;
  lastTime = seconds;
  displayTimeLeft(seconds);
  
  countdown = setInterval(function() {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    countdownBar.style.width = (countdownBarWidth - step) + 'px';
    countdownBarWidth = countdownBarWidth - step;
    console.log(countdownBarWidth);
    console.log(countdownBarInitial);
    console.log(secondsLeft);

      if (secondsLeft === 0) {
        timerDisplay.classList.remove('scale-up');
        timerControls.classList.remove('fade-in-up');
        timerRepeatButton.classList.add('fade-in-up');
        toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
        countdownBar.style.width = 0;
      }

      if (secondsLeft < 0) {
        timerDisplay.classList.add('fade-on-pause');
        clearInterval(countdown);
        return;
      }
      
      displayTimeLeft(secondsLeft);
    }, 1000);
}

function toggleClassDelayed(elem, cssClass, delay) {
  // debugger;
  var count = 0;
  var delayTimer = setInterval(function() {
    // console.log(count);
    if (count < elem.children.length) {
      elem.children[count].classList.toggle(cssClass);
      count++;
    } else {
      clearInterval(delayTimer);
    }
  }, delay);
}

function displayTimeLeft(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainSeconds = seconds % 60;
  var display = minutes + '<span class="semicolon">:</span>' + (remainSeconds < 10 ? '0' : '') + remainSeconds;
  document.title = display;
  timerDisplay.innerHTML = display;
}

function setTimePreset() {
  var seconds = parseInt(this.dataset.time);
  dataTime = seconds;
  // clearInterval(countdown);
  countdownBar.style.width = countdownBarInitial + 'px';
  repeatButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title> refresh</title><rect width="24" height="24" fill="none"/><path d="M17.64,6.35A8,8,0,0,0,11.16,4a8,8,0,1,0,8.56,10H17.64A6,6,0,1,1,12,6a5.91,5.91,0,0,1,4.22,1.78L13,11h7V4L17.64,6.35Z"/></svg>Запустить заново ' + (dataTime / 60) + (dataTime < 61 ? ' минуту' : ' минут');
  startTimer(seconds);
  timerDisplay.classList.remove('fade-on-pause');
  timerDisplay.classList.add('scale-up');
  timerControls.classList.add('fade-in-up');
  timerRepeatButton.classList.remove('fade-in-up');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
}

timePresetButtons.forEach(function(button) {
  button.addEventListener('click', setTimePreset)
});

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // clearInterval(countdown);
  var mins = this.minutes.value;
  seconds = mins * 60;
  startTimer(seconds);
  timerDisplay.classList.remove('fade-on-pause');
  timerDisplay.classList.add('scale-up');
  timerControls.classList.add('fade-in-up');
  timerRepeatButton.classList.remove('fade-in-up');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
  this.reset();
});

resetButton.addEventListener('click', function(e) {
  countdownBar.style.width = countdownBarInitial + 'px';
  timerDisplay.innerHTML = '0<span class="semicolon">:</span>00';
  timerDisplay.classList.remove('fade-on-pause');
  timerControls.classList.remove('fade-in-up');
  timerDisplay.classList.remove('scale-up');
  continueButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  document.title = '0:00';
  clearInterval(countdown);
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
});

repeatButton.addEventListener('click', function(e) {
  countdownBar.style.width = countdownBarInitial + 'px';
  startTimer(lastTime);
  timerDisplay.classList.remove('fade-on-pause');
  timerControls.classList.add('fade-in-up');
  timerDisplay.classList.add('scale-up');
  timerRepeatButton.classList.remove('fade-in-up');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
});

pauseButton.addEventListener('click', function(e) {
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