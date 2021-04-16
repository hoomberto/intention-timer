var currentView = document.querySelector('.current-activity');
var timerContainer = document.querySelector('.current-activity');
var timerNumbers = document.querySelector('.timer-numbers')
var timerCategory = document.querySelector('#actual-timer-container p')
var startTimerButton = document.querySelector('.start-timer')

var iconSection = document.querySelector("#categoriesIcons");
var studySection = document.querySelector("#study");
var meditateSection = document.querySelector("#meditate");
var exerciseSection = document.querySelector("#exercise");

var studyIcon = document.querySelector("#studyIcon");
var meditateIcon = document.querySelector("#meditateIcon");
var exerciseIcon = document.querySelector("#exerciseIcon");

var activeStudyIcon = document.querySelector("#activeStudyIcon");
var activeMeditateIcon = document.querySelector("#activeMeditateIcon");
var activeExerciseIcon = document.querySelector("#activeExerciseIcon");

var newActivitySection = document.querySelector(".new-activity");
var inputFields = document.querySelectorAll('input[name="field"]');
var startActivityBtn = document.querySelector('.start-activity-btn');
var errorMsg = document.querySelectorAll('.error');
var iconCtrs = document.querySelectorAll('.img-container');
var intentionCtr = document.querySelector('.intention-container');
var secondsInput = document.querySelector('#seconds');
var minutesInput = document.querySelector('#minutes');
var intentionsInput = document.querySelector('#intentions');

// EVENT LISTENERS

startTimerButton.addEventListener('click', startCountDown);
startActivityBtn.addEventListener("click", validate);
iconSection.addEventListener("click", facilitateIconChange);

//get input from user form
// input.value

var currentActivity = {};

// var currentActivity = new Activity(category, description, minutes, seconds);

var savedActivities;

function renderCurrentActivity() {
  timerCategory.innerText = currentActivity.description;
  formatUserTime(currentActivity.minutes, currentActivity.seconds);
}


function startCountDown() {
  countDown(currentActivity.minutes, currentActivity.seconds);
  startTimerButton.disabled = true;
}

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

function formatUserTime(minutes, seconds) {
  var userMinutes = minutes;
  var userSeconds = seconds;
  if (minutes < 10) {
    userMinutes = `0${minutes}`
  }
  if (seconds < 10) {
    userSeconds = `0${seconds}`;
  }
  displayTime(userMinutes, userSeconds);
}

function displayTime(minutes, seconds) {
  timerNumbers.innerText = `${minutes}:${seconds}`;
}

function addError(msgIndex) {
  errorMsg[msgIndex].classList.remove("hidden");
}

function hideError(msgIndex) {
  errorMsg[msgIndex].classList.add("hidden");
}

function resetFields() {
 secondsInput.value = "";
 minutesInput.value = "";
 intentionsInput.value = "";
}

function validateIcons() {
  var activeCount = 0;
  for (var icon of iconCtrs) {
    if (icon.classList.contains("active")) {
      hideError(0)
      return icon;
      // break
    }
    else {
      activeCount++
      if (activeCount === 3) {
      addError(0);
      break;
      }
    }
  }
}

function validate(event) {
  event.preventDefault()
  var secondsValue = secondsInput.value;
  var minutesValue = minutesInput.value;
  var intentionsValue = intentionsInput.value;
  var parsedSeconds = parseInt(secondsValue);
  var parsedMinutes = parseInt(minutesValue);

  var icon = validateIcons();

  if (secondsValue && minutesValue && intentionsValue && icon) {
    hideError(0);
    hideError(1);
    hideError(2);
    hideError(3);

    currentActivity = new Activity(icon.getAttribute("name"), intentionsValue, parsedMinutes, parsedSeconds);
    resetFields();
    currentView.classList.remove("hidden");
    newActivitySection.classList.add("hidden");
    renderCurrentActivity();
    return
  }
  if (!intentionsValue) {
    addError(1);
    }
  if (intentionsValue) {
    hideError(1);
  }
  if (minutesValue) {
    hideError(2);
  }
  if (!minutesValue) {
    addError(2);
  }
  if (secondsValue) {
    hideError(3);
  }
  if (!secondsValue) {
    addError(3);
  }
  return
}



// {
//   category: "Deep Breathing",
//   minutes: 10,
//   seconds: 2
// }



function displayIcons(icon1, icon2, icon3) {
  icon1.classList.remove("hidden");
  icon2.classList.remove("hidden");
  icon3.classList.remove("hidden");
}

function hideIcons(icon1, icon2, icon3) {
  icon1.classList.add("hidden");
  icon2.classList.add("hidden");
  icon3.classList.add("hidden");
}


function removeFromClassList(section, iconId) {
  section.classList.remove(iconId);

}

function addToClassList(section, iconId) {
  section.classList.add(iconId);
}


function facilitateIconChange() {
  if (event.target.closest("#study")) {
    hideIcons(studyIcon, activeMeditateIcon, activeExerciseIcon);
    displayIcons(activeStudyIcon, meditateIcon, exerciseIcon);
    addToClassList(studySection, "study-active")
    addToClassList(studySection, "active");
    removeFromClassList(meditateSection, "meditate-active");
    removeFromClassList(exerciseSection, "exercise-active");
    removeFromClassList(meditateSection, "active");
    removeFromClassList(exerciseSection, "active");
  } else if (event.target.closest("#meditate")) {
    hideIcons(meditateIcon, activeStudyIcon, activeExerciseIcon);
    displayIcons(studyIcon, exerciseIcon, activeMeditateIcon);
    addToClassList(meditateSection, "meditate-active");
    addToClassList(meditateSection, "active");
    removeFromClassList(studySection, "study-active");
    removeFromClassList(exerciseSection, "exercise-active");
    removeFromClassList(studySection, "active");
    removeFromClassList(exerciseSection, "active");
  } else if (event.target.closest("#exercise")) {
    hideIcons(exerciseIcon, activeMeditateIcon, activeStudyIcon);
    displayIcons(activeExerciseIcon, meditateIcon, studyIcon);
    addToClassList(exerciseSection, "exercise-active");
    addToClassList(exerciseSection, "active");
    removeFromClassList(meditateSection, "meditate-active");
    removeFromClassList(studySection, "study-active")
    removeFromClassList(meditateSection, "active");
    removeFromClassList(studySection, "active")
  }
}

//single param functions

// function hideIcon(iconType) {
//   iconType.classList.add("hidden")
// }
//event handler for displaying the original svg
// function displayIcon(iconType) {
//   iconType.classList.remove("hidden")
// }
