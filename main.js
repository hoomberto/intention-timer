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
