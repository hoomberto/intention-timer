// New activity view
var newActivitySection = document.querySelector(".new-activity");
var inputFields = document.querySelectorAll('input[name="field"]');
var startActivityBtn = document.querySelector(".start-activity-btn");
var errorMsg = document.querySelectorAll(".error");
var iconCtrs = document.querySelectorAll(".img-container");
var intentionCtr = document.querySelector(".intention-container");
var secondsInput = document.querySelector("#seconds");
var minutesInput = document.querySelector("#minutes");
var intentionsInput = document.querySelector("#intentions");
var iconSection = document.querySelector("#categoriesIcons");
var studySection = document.querySelector("#study");
var meditateSection = document.querySelector("#meditate");
var exerciseSection = document.querySelector("#exercise");

// Icons
var studyIcon = document.querySelector("#studyIcon");
var meditateIcon = document.querySelector("#meditateIcon");
var exerciseIcon = document.querySelector("#exerciseIcon");
var activeStudyIcon = document.querySelector("#activeStudyIcon");
var activeMeditateIcon = document.querySelector("#activeMeditateIcon");
var activeExerciseIcon = document.querySelector("#activeExerciseIcon");

// Timer elements
var currentView = document.querySelector(".current-activity");
var timerContainer = document.querySelector(".current-activity");
var timerNumbers = document.querySelector(".timer-numbers");
var timerCategory = document.querySelector("#timer-container h3");
var startTimerButton = document.querySelector(".start-timer");

// Completed activity view
var completedActivityView = document.querySelector(".completed-activity");
var logActivityButton = document.querySelector(".log-activity");
var pastActivitiesCards = document.querySelector(".activity-cards");
var createNewActivityButton = document.querySelector(".create-new-activity");

// EVENT LISTENERS
window.onload = renderPastActivities();
startTimerButton.addEventListener("click", startCountDown);
startActivityBtn.addEventListener("click", validateForm);
iconSection.addEventListener("click", facilitateIconChange);
logActivityButton.addEventListener("click", logActivity);
createNewActivityButton.addEventListener("click", displayNewActivity);
secondsInput.addEventListener("keydown", checkForDigitsOnly);
minutesInput.addEventListener("keydown", checkForDigitsOnly);

var currentActivity = {};

// Local storage functions
function resetStorage() {
  var resetActivities = [];
  var strActivities = JSON.stringify(resetActivities);
  localStorage.setItem("pastActivities", strActivities);
}

function checkLocalStorage() {
  if (!localStorage.getItem("pastActivities")) {
    resetStorage()
  }
}

//form validation

function checkForDigitsOnly(event) {
  var validCodes = [39, 37, 8, 9, 91, 13, 38, 40];

  if (event.keyCode >= 48 && event.keyCode <= 57 || validCodes.includes(event.keyCode)) {
    return
  }
  event.preventDefault();
  return
}

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

function activateStudyIcon() {
  hideIcons(studyIcon, activeMeditateIcon, activeExerciseIcon);
  displayIcons(activeStudyIcon, meditateIcon, exerciseIcon);
  addToClassList(studySection, "study-active")
  addToClassList(studySection, "active");
  removeFromClassList(meditateSection, "meditate-active");
  removeFromClassList(exerciseSection, "exercise-active");
  removeFromClassList(meditateSection, "active");
  removeFromClassList(exerciseSection, "active");
}

function activateMeditateIcon() {
  hideIcons(meditateIcon, activeStudyIcon, activeExerciseIcon);
  displayIcons(studyIcon, exerciseIcon, activeMeditateIcon);
  addToClassList(meditateSection, "meditate-active");
  addToClassList(meditateSection, "active");
  removeFromClassList(studySection, "study-active");
  removeFromClassList(exerciseSection, "exercise-active");
  removeFromClassList(studySection, "active");
  removeFromClassList(exerciseSection, "active");
}

function activateExerciseIcon() {
  hideIcons(exerciseIcon, activeMeditateIcon, activeStudyIcon);
  displayIcons(activeExerciseIcon, meditateIcon, studyIcon);
  addToClassList(exerciseSection, "exercise-active");
  addToClassList(exerciseSection, "active");
  removeFromClassList(meditateSection, "meditate-active");
  removeFromClassList(studySection, "study-active")
  removeFromClassList(meditateSection, "active");
  removeFromClassList(studySection, "active")
}

function facilitateIconChange() {
  if (event.target.closest("#study")) {
    activateStudyIcon();
  } else if (event.target.closest("#meditate")) {
    activateMeditateIcon();
  } else if (event.target.closest("#exercise")) {
    activateExerciseIcon();
  }
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

function hideAllErrors() {
  hideError(0);
  hideError(1);
  hideError(2);
  hideError(3);
}

function validateIcons() {
  var activeCount = 0;
  for (var icon of iconCtrs) {
    if (icon.classList.contains("active")) {
      hideError(0)
      return icon;
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

function checkInputs(secondsValue, minutesValue, intentionsValue) {
  (intentionsValue) ? hideError(1) : addError(1);
  (minutesValue) ? hideError(2) : addError(2);
  (secondsValue) ? hideError(3) : addError(3);
}

function validateForm(event) {
  event.preventDefault()
  var secondsValue = secondsInput.value;
  var minutesValue = minutesInput.value;
  var intentionsValue = intentionsInput.value;
  var parsedSeconds = parseInt(secondsValue);
  var parsedMinutes = parseInt(minutesValue);
  var icon = validateIcons();

  if (secondsValue && minutesValue && intentionsValue && icon) {
    hideAllErrors();
    updateCurrentActivity(icon.getAttribute("name"), intentionsValue, parsedMinutes, parsedSeconds);
    displayInitialTimer()
    return
  }
  checkInputs(secondsValue, minutesValue, intentionsValue)
  return
}

function updateCurrentActivity(category, description, minutes, seconds) {
  currentActivity = new Activity(category, description, minutes, seconds);
  resetFields();
}

// Timer functions
function displayInitialTimer() {
  currentView.classList.remove("hidden");
  newActivitySection.classList.add("hidden");
  renderCurrentActivity();
}

function renderCurrentActivity() {
  timerCategory.innerText = currentActivity.description;
  startTimerButton.classList.add(`${currentActivity.category}`)
  startTimerButton.classList.add("hover");
  startTimerButton.innerText = "START!";
  startTimerButton.disabled = false;
  logActivityButton.classList.add("invisibility");
  formatUserTime(currentActivity.minutes, currentActivity.seconds);
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

function startCountDown() {
  currentActivity.countdown();
}

function timerCountDown(minutes, seconds) {
  var totalSeconds = (minutes * 60) + seconds;
  var time = totalSeconds;
  var counting = setInterval(function() {
    time --;
    formatTime(time);
    if (time <= 0) {
      clearInterval(counting);
      //alert("The activity is complete")
      completeCountdown();
    }
  }, 1000);
}

function completeCountdown() {
  startTimerButton.innerText = "COMPLETE!";
  startTimerButton.classList.remove("hover");
  logActivityButton.classList.remove("invisibility");
  currentActivity.markComplete();
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

function displayTime(minutes, seconds) {
  timerNumbers.innerText = `${minutes}:${seconds}`;
}

function displayNewActivity() {
  completedActivityView.classList.add("hidden");
  newActivitySection.classList.remove("hidden");
}

function logActivity() {
  completedActivityView.classList.remove("hidden");
  currentView.classList.add("hidden");
  currentActivity.saveToStorage();
  renderPastActivities();
}

function showDefaultLogMessage() {
  pastActivitiesCards.innerHTML =
  `
    <div class="no-activities-text">
      <p>You haven't logged any activities yet.</p>
      <p>Complete the form to the left to get started!</p>
    </div>
  `
}

function renderCards(parsedActivities) {
  for (var activity of parsedActivities) {
    pastActivitiesCards.innerHTML +=
    `
      <div class="past-activity-card">
        <div class="card-border ${activity.category}">
        </div>
        <div class="card-text">
          <h3>${activity.category}</h3>
          <h4>${activity.minutes} MIN</h4>
          <p>${activity.description}</p>
        </div>
      </div>
    `
  }
}

function renderPastActivities() {
  checkLocalStorage();
  var parsedActivities = JSON.parse(localStorage.getItem("pastActivities"));
  pastActivitiesCards.innerHTML = "";
  if (!parsedActivities.length) {
    showDefaultLogMessage();
    return
  } else {
    renderCards(parsedActivities);
  }
}
