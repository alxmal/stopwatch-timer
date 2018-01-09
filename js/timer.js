var countdown;
var secondsLeft;
var timerDisplay = document.querySelector('.display__time-left');
var timerPresetBlock = document.querySelector('.timer__presets');
var timePresetButtons = document.querySelectorAll('[data-time]');
var timerControls = document.querySelector('.timer__controls');
var repeatButton = document.querySelector('.repeat');
var resetButton = document.querySelector('.reset');
var pauseButton = document.querySelector('.pause');
var continueButton = document.querySelector('.continue');
// var bgColors = ['#091c6b', '#66ecdb'];

function startTimer(seconds) {
  clearInterval(countdown);
  var now = Date.now();
  var then =  now + seconds * 1000;
  displayTimeLeft(seconds);
  
  countdown = setInterval(function() {
      secondsLeft = Math.round((then - Date.now()) / 1000);
      
      if(secondsLeft < 0) {
        timerDisplay.classList.add('fade-on-pause');
        timerDisplay.classList.remove('scale-up');
        toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
        timerControls.classList.remove('fade-in-up');
        // repeatButton.classList.remove('hidden');
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
    console.log(count);
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
  timerDisplay.classList.remove('fade-on-pause');
  timerDisplay.classList.add('scale-up');
  clearInterval(countdown);
  startTimer(seconds);
  timerControls.classList.add('fade-in-up');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
}

timePresetButtons.forEach(function(button) {
  button.addEventListener('click', setTimePreset)
});

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearInterval(countdown);
  var mins = this.minutes.value;
  seconds = mins * 60;
  startTimer(mins * 60);
  repeatButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  timerDisplay.classList.remove('fade-on-pause');
  toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
  this.reset();
});

resetButton.addEventListener('click', function(e) {
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

// repeatButton.addEventListener('click', function(e) {
//   startTimer(secondsLeft);
//   startButton.classList.add('hidden');
//   pauseButton.classList.remove('hidden');
//   timerDisplay.classList.remove('fade-on-pause');
//   toggleClassDelayed(timerPresetBlock, 'fade-out-up', 30);
// });

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