document.addEventListener('DOMContentLoaded', () => {
  const startMenu = document.getElementById('startMenu');
  const inputTextArea = document.getElementById('inputTextArea');
  const startPracticeButton = document.getElementById('startPracticeButton');
  const practiceArea = document.getElementById('practiceArea');
  const textDisplay = document.getElementById('textDisplay');
  const inputField = document.getElementById('inputField');
  const resultScreen = document.getElementById('resultScreen');
  const resultText = document.getElementById('resultText');
  const restartSessionButton = document.getElementById('restartSessionButton');

  let words = [];
  let wordIndex = 0;
  let typedWords = 0;

  // Start practice when user clicks the button
  startPracticeButton.addEventListener('click', () => {
    const inputText = inputTextArea.value.trim();
    if (inputText) {
      words = inputText.split(/\s+/);
      wordIndex = 0;
      typedWords = 0;
      startMenu.style.display = 'none';
      practiceArea.style.display = 'block';
      renderTextDisplay();
    }
  });

  inputField.addEventListener('input', () => {
    updateTextDisplay();
    const typedInput = inputField.value;
    const currentWord = words[wordIndex];

    if (typedInput.endsWith(' ') || typedInput === currentWord) {
      if (typedInput.trim() === currentWord) {
        wordIndex++;
        typedWords++;
        inputField.value = ''; // Reset the input field for the next word
      }

      if (wordIndex >= words.length) {
        showResult();
      } else {
        renderTextDisplay();
      }
    }
  });

  restartSessionButton.addEventListener('click', () => {
    restartSession();
  });

  function renderTextDisplay() {
    const maxVisibleWords = 30;
    const startWordIndex = Math.max(0, wordIndex - 4);  // Remove words that are 4-5 words away
    const endWordIndex = Math.min(wordIndex + maxVisibleWords, words.length);
    const visibleWords = words.slice(startWordIndex, endWordIndex).join(' ');

    textDisplay.innerHTML = `<span style="color:gray;">${words.slice(0, wordIndex).join(' ')}</span> ${visibleWords}`;
  }

  function updateTextDisplay() {
    const typedInput = inputField.value;
    const currentWord = words[wordIndex];
    const typedPortion = currentWord.slice(0, typedInput.length);
    const remainingPortion = currentWord.slice(typedInput.length);

    const maxVisibleWords = 30;
    const startWordIndex = Math.max(0, wordIndex - 4);
    const visibleWords = words.slice(wordIndex + 1, wordIndex + maxVisibleWords).join(' ');

    textDisplay.innerHTML = `<span style="color:gray;">${words.slice(0, wordIndex).join(' ')}</span> <span style="color:gray;">${typedPortion}</span>${remainingPortion} ${visibleWords}`;
  }

  function showResult() {
    practiceArea.style.display = 'none';
    resultScreen.style.display = 'block';
    resultText.innerHTML = `You typed ${typedWords} words correctly!`;
  }

  function restartSession() {
    wordIndex = 0;
    typedWords = 0;
    practiceArea.style.display = 'block';
    resultScreen.style.display = 'none';
    renderTextDisplay();
  }
});
