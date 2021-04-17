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
    console.log("Toad Noises");
    timerCountDown(currentActivity.minutes, currentActivity.seconds);
    startTimerButton.disabled = true;
  }

  markComplete() {

  }

  saveToStorage() {


  }
}
