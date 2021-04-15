var currentView = document.querySelector('.current-activity');
var timerContainer = document.querySelector('.current-activity');
var timerNumbers = document.querySelector('.timer-numbers')
var timerCategory = document.querySelector('#actual-timer-container p')
var startTimerButton = document.querySelector('.start-timer')

startTimerButton.addEventListener('click', startCountDown);

//get input from user form
// input.value


// var currentActivity = new Activity(category, description, minutes, seconds);

var currentActivity = {
  category: "Deep Breathing",
  minutes: 10,
  seconds: 2
}

var savedActivities;

function renderCurrentActivity() {
  timerCategory.innerText = currentActivity.category;
  formatUserTime(currentActivity.minutes, currentActivity.seconds);
}

renderCurrentActivity();

function countDown(minutes, seconds) {
  var totalSeconds = (minutes * 60) + seconds;
  var time = totalSeconds;
  var counting = setInterval(function() {
    time --;
    formatTime(time);
    if (time === 0) {
      clearInterval(counting);
      alert("The activity is complete")
    }
  }, 1000);
}

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  displayTime(minutes, seconds);
}
