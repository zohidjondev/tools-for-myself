document.addEventListener('DOMContentLoaded', () => {
  const loadJsonButton = document.getElementById('loadJsonButton');
  const createJsonButton = document.getElementById('createJsonButton');
  const fileInput = document.getElementById('fileInput');
  const settingsMenu = document.getElementById('settingsMenu');
  const startPracticeButton = document.getElementById('startPracticeButton');
  const repeatCountInput = document.getElementById('repeatCount');
  const practiceArea = document.getElementById('practiceArea');
  const wordDisplay = document.getElementById('wordDisplay');
  const inputField = document.getElementById('inputField');
  const resultScreen = document.getElementById('resultScreen');
  const resultText = document.getElementById('resultText');
  const restartSessionButton = document.getElementById('restartSessionButton');
  const reloadJsonButton = document.getElementById('reloadJsonButton');
  const createJsonMenu = document.getElementById('createJsonMenu');
  const wordsTextarea = document.getElementById('wordsTextarea');
  const saveJsonButton = document.getElementById('saveJsonButton');

  let words = [];
  let wordIndex = 0;
  let totalWords = 0;
  let typedWords = 0;
  let wordCounts = {};

  loadJsonButton.addEventListener('click', () => {
    fileInput.click();
  });

  createJsonButton.addEventListener('click', () => {
    document.getElementById('startMenu').style.display = 'none';
    createJsonMenu.style.display = 'block';
  });

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      words = JSON.parse(e.target.result).words;
      document.getElementById('startMenu').style.display = 'none';
      settingsMenu.style.display = 'block';
    };
    reader.readAsText(file);
  });

  startPracticeButton.addEventListener('click', () => {
    const repeatCount = parseInt(repeatCountInput.value);
    totalWords = words.length * repeatCount;
    words = Array(repeatCount).fill(words).flat();
    shuffle(words);
    settingsMenu.style.display = 'none';
    practiceArea.style.display = 'block';
    showNewWord();
  });

  inputField.addEventListener('input', () => {
    if (inputField.value === wordDisplay.textContent) {
      if (!wordCounts[wordDisplay.textContent]) {
        wordCounts[wordDisplay.textContent] = 0;
      }
      wordCounts[wordDisplay.textContent]++;
      typedWords++;
      if (typedWords === totalWords) {
        showResult();
      } else {
        showNewWord();
      }
    }
  });

  saveJsonButton.addEventListener('click', () => {
    const wordsArray = wordsTextarea.value.trim().split(/\s+/);
    const jsonContent = JSON.stringify({ words: wordsArray }, null, 2);
    downloadJsonFile(jsonContent);
  });

  restartSessionButton.addEventListener('click', () => {
    restartSession();
  });

  reloadJsonButton.addEventListener('click', () => {
    window.location.reload();
  });

  function showNewWord() {
    wordDisplay.textContent = words[wordIndex];
    inputField.value = '';
    wordIndex++;
  }

  function showResult() {
    practiceArea.style.display = 'none';
    resultScreen.style.display = 'block';

    let resultMessage = `You typed ${typedWords} words in total.<br><br>`;
    for (const [word, count] of Object.entries(wordCounts)) {
      resultMessage += `Word: ${word}, Count: ${count}<br>`;
    }

    resultText.innerHTML = resultMessage;
  }

  function restartSession() {
    wordIndex = 0;
    typedWords = 0;
    wordCounts = {};
    practiceArea.style.display = 'block';
    resultScreen.style.display = 'none';
    showNewWord();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function downloadJsonFile(content) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'words.json';
    a.click();
    URL.revokeObjectURL(a.href);
    alert('JSON file has been saved.');
    createJsonMenu.style.display = 'none';
    document.getElementById('startMenu').style.display = 'block';
  }
});
