// Check for dark mode preference in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
  document.body.classList.toggle("dark", darkModeEnabled);
  document.getElementById("darkModeToggle").checked = darkModeEnabled;
});

function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle("dark");

  // Save preference to localStorage
  if (isDarkMode) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}

function processText() {
  let inputText = document.getElementById("inputText").value;
  let formattedText = inputText.replace(/\s+/g, " ").trim();
  let wordCount = formattedText === "" ? 0 : formattedText.split(" ").length;

  document.getElementById("formattedText").textContent = formattedText;
  document.getElementById("wordCount").textContent = `${wordCount} * 3 = ${
    wordCount * 3
  }`;
}

function copyToClipboard() {
  let formattedText = document.getElementById("formattedText").textContent;
  navigator.clipboard
    .writeText(formattedText)
    .then(() => {
      alert("Formatted text copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}
