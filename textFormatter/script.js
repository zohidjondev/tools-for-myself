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

  // Remove numbers and periods following them
  let formattedText = inputText
    .replace(/\d+\.\s*/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
