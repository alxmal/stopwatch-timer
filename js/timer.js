var countdown, secondsLeft, lastTime, pausedTime, countdownBarPaused;
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

function startTimer(seconds, countdownBarWidth) {
  clearInterval(countdown);
  var now = Date.now();
  var then =  now + seconds * 1000;
  var step = countdownBarWidth / seconds;
  displayTimeLeft(seconds);
  
  countdown = setInterval(function() {
    secondsLeft = Math.round((then - Date.now()) / 1000);
    countdownBar.style.width = (countdownBarWidth - step) + 'px';
    countdownBarWidth = countdownBarWidth - step;

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
  var count = 0;
  var delayTimer = setInterval(function() {
    if (count < elem.children.length) {
      elem.children[count].classList.toggle(cssClass);
      count++;
    } else {
      clearInterval(delayTimer);
    }
  }, delay);
}

function displayTimeLeft(seconds) {
  var remainSeconds = seconds % 60;
  var minutes = Math.floor(seconds / 60);
  var remainMinutes = minutes % 60;
  var hours = Math.floor(minutes / 60);
  console.log(remainMinutes);
  console.log(hours);
  var display = (hours > 0 ? (hours + '<span class="semicolon">:</span>') : '') + ((remainMinutes < 10 ? '0' : '') + remainMinutes) + '<span class="semicolon">:</span>' + (remainSeconds < 10 ? '0' : '') + remainSeconds;
  timerDisplay.innerHTML = display;
}

function setTimePreset() {
  var seconds = parseInt(this.dataset.time);
  lastTime = seconds;
  countdownBar.style.width = countdownBarInitial + 'px';
  repeatButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title> refresh</title><rect width="24" height="24" fill="none"/><path d="M17.64,6.35A8,8,0,0,0,11.16,4a8,8,0,1,0,8.56,10H17.64A6,6,0,1,1,12,6a5.91,5.91,0,0,1,4.22,1.78L13,11h7V4L17.64,6.35Z"/></svg>Запустить заново ' + (lastTime / 60) + (lastTime < 61 ? ' минуту' : (lastTime > 61 && lastTime < 300 ? ' минуты' : ' минут'));
  startTimer(seconds, countdownBarInitial);
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
  var mins = this.minutes.value;
  seconds = mins * 60;
  lastTime = seconds;
  countdownBar.style.width = countdownBarInitial + 'px';
  repeatButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title> refresh</title><rect width="24" height="24" fill="none"/><path d="M17.64,6.35A8,8,0,0,0,11.16,4a8,8,0,1,0,8.56,10H17.64A6,6,0,1,1,12,6a5.91,5.91,0,0,1,4.22,1.78L13,11h7V4L17.64,6.35Z"/></svg>Запустить заново ' + (lastTime / 60) + (lastTime < 61 ? ' минуту' : (lastTime > 61 && lastTime < 300 ? ' минуты' : ' минут'));
  startTimer(seconds, countdownBarInitial);
  timerDisplay.classList.remove('fade-on-pause');
  timerDisplay.classList.add('scale-up');
  timerControls.classList.add('fade-in-up');
  timerRepeatButton.classList.remove('fade-in-up');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
  this.reset();
});

resetButton.addEventListener('click', function(e) {
  clearInterval(countdown);
  countdownBar.style.width = countdownBarInitial + 'px';
  timerDisplay.innerHTML = '00<span class="semicolon">:</span>00';
  timerDisplay.classList.remove('fade-on-pause');
  timerControls.classList.remove('fade-in-up');
  timerDisplay.classList.remove('scale-up');
  continueButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
});

repeatButton.addEventListener('click', function(e) {
  countdownBar.style.width = countdownBarInitial + 'px';
  startTimer(lastTime, countdownBarInitial);
  timerDisplay.classList.remove('fade-on-pause');
  timerControls.classList.add('fade-in-up');
  timerDisplay.classList.add('scale-up');
  timerRepeatButton.classList.remove('fade-in-up');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
});

pauseButton.addEventListener('click', function(e) {
  pausedTime = secondsLeft;
  countdownBarPaused = countdownBar.style.width.slice(0, -4);
  clearInterval(countdown);
  displayTimeLeft(secondsLeft);
  pauseButton.classList.add('hidden');
  continueButton.classList.remove('hidden');
  timerDisplay.classList.add('fade-on-pause');
});

continueButton.addEventListener('click', function(e) {
  startTimer(pausedTime, countdownBarPaused);
  pauseButton.classList.remove('hidden');
  continueButton.classList.add('hidden');
  timerDisplay.classList.remove('fade-on-pause');
});