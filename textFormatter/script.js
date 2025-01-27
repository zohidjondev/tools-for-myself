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

  // Process the input text
  let formattedText = inputText
    .split("\n") // Split input by new lines
    .map((item) => item.replace(/^\d+\.\s*/, "").trim()) // Remove numbering and trim spaces
    .filter((item) => item.length > 0) // Skip empty lines
    .map((word) => Array(10).fill(word).join(" ")) // Repeat each word 20 times
    .join("|"); // Join the results with '|'

  document.getElementById("formattedText").textContent = `${formattedText}`;
}

function copyToClipboard() {
  let formattedText = document.getElementById("formattedText").textContent;
  navigator.clipboard
    .writeText(formattedText)
    .then(() => {
      showCustomAlert("Formatted text copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      showCustomAlert("Failed to copy text. Please try again.");
    });
}

function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert");
  alertBox.textContent = message; // Set the custom message
  alertBox.classList.add("show"); // Show the alert with animation

  // Hide the alert after 3 seconds
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}
