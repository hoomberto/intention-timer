class Activity {
  constructor(category, description, minutes, seconds) {
     this.category = category;
     this.description = description;
     this.minutes = minutes;
     this.seconds = seconds;
     this.completed = false;
     this.id = Date.now();
  }

  countdown() {
    timerCountDown(currentActivity.minutes, currentActivity.seconds);
    startTimerButton.disabled = true;
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    if (!localStorage.getItem("pastActivities")) {
      resetStorage()
    }
    var parsedActivities = JSON.parse(localStorage.getItem("pastActivities"))
    parsedActivities.push(this);
    localStorage.setItem("pastActivities", JSON.stringify(parsedActivities))

  }
}
