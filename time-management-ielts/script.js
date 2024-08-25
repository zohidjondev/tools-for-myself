document.getElementById('reading-button').addEventListener('click', () => {
  document.querySelector('.buttons-container').style.display = 'none';
  document.getElementById('main-header').style.display = 'none';
  
  const timerContainer = document.getElementById('timer-container');
  timerContainer.style.display = 'flex';
  
  let duration = 3600; // 1 hour in seconds
  const circle = document.querySelector('#circle-timer circle:nth-child(2)');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
  }

  const timerText = document.getElementById('timer-text');
  const audio40 = document.getElementById('audio-40');
  const audio20 = document.getElementById('audio-20');
  const audio0 = document.getElementById('audio-0');

  function updateTimer() {
      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;
      timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      
      const progress = (3600 - duration) / 3600 * 100; // Update progress for 1 hour
      setProgress(progress);

      if (duration === 2400) { // 40 minutes left (3600 - 2400)
          audio40.play();
      } else if (duration === 1200) { // 20 minutes left (3600 - 1200)
          audio20.play();
      } else if (duration === 0) {
          audio0.play();
          clearInterval(timerInterval);
      }

      duration--;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
});
