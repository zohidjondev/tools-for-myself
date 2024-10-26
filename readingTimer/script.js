let timerDisplay = document.getElementById("timer-display");
let startPauseBtn = document.getElementById("start-pause-btn");
let resetBtn = document.getElementById("reset-btn");
let audio20 = document.getElementById("audio20");
let audio25 = document.getElementById("audio25");

let totalTime = 25 * 60; // 25 minutes
let timeLeft = totalTime;
let timerInterval = null;
let isPaused = true;

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();

      if (timeLeft === 5 * 60) {
        audio20.play();
      }

      if (timeLeft === 0) {
        audio25.play();
        clearInterval(timerInterval);
      }
    }
  }, 1000);
}

startPauseBtn.addEventListener("click", () => {
  if (isPaused) {
    startTimer();
    startPauseBtn.textContent = "Pause";
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Resume";
  }
  isPaused = !isPaused;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timeLeft = totalTime;
  updateDisplay();
  startPauseBtn.textContent = "Start";
  isPaused = true;
});

updateDisplay(); // Initial display update
