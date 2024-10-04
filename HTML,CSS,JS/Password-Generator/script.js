// DOM elements are selected using their respective IDs.
const spinner = document.getElementById("spinner");
const result = document.getElementById("result");
const clipboard = document.getElementById("clipboard");
const length = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const alertBox = document.getElementById("alertBox");

// An object that stores functions to generate random characters (uppercase, lowercase, number, symbol).
const randomObj = {
  upper: generateUpper,
  lower: generateLower,
  number: generateNumber,
  symbol: generateSymbol,
};

// Event listener for the generate button.
// On click, it gets the values and conditions, validates them, and then generates the password.
generateBtn.addEventListener("click", () => {
  const lengthVal = +length.value;
  const hasUpper = uppercase.checked;
  const hasLower = lowercase.checked;
  const hasNumber = numbers.checked;
  const hasSymbol = symbols.checked;

  // Validate input values (length and at least one type selected).
  if (!validateInput(lengthVal, hasUpper, hasLower, hasNumber, hasSymbol))
    return;

  // Clear the result text and show the spinner (loading indicator).
  result.textContent = "";
  spinner.classList.remove("hidden");

  // After a 1-second delay, generate the password and hide the spinner.
  setTimeout(() => {
    result.textContent = generatePass(
      lengthVal,
      hasUpper,
      hasLower,
      hasNumber,
      hasSymbol
    );
    spinner.classList.add("hidden");
  }, 1000);
});

// Function to validate input (password length and character types).
function validateInput(length, upper, lower, number, symbol) {
  if (length < 4 || length > 20) {
    showAlert(
      "Password length should be between 4 and 20 characters.",
      "error"
    );
    return false;
  }

  // Ensure at least one character type is selected.
  if (!upper && !lower && !number && !symbol) {
    showAlert("Please select at least one character type.", "error");
    return false;
  }
  return true;
}

// Function to display an alert message with the provided text and alert class (for styling).
function showAlert(text, alertClass) {
  alertBox.style.display = "block";
  alertBox.textContent = text;
  alertBox.classList.add(alertClass);

  // Hide the alert box after 3 seconds.
  setTimeout(() => (alertBox.style.display = "none"), 3000);
}

// Function to generate the password.
function generatePass(length, upper, lower, number, symbol) {
  let pass = "";
  const choicesCount = upper + lower + number + symbol;

  // Filter the character types based on which are selected.
  const filteredChoices = [{ upper }, { lower }, { number }, { symbol }].filter(
    (choice) => Object.values(choice)[0]
  );

  // Loop through and add random characters to the password.
  for (let i = 0; i < length; i += choicesCount) {
    filteredChoices.forEach((choice) => {
      pass += randomObj[Object.keys(choice)[0]]();
    });
  }
  return pass.slice(0, length);
}

// Functions to generate random characters for uppercase, lowercase, numbers, and symbols.
function generateUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function generateLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}
function generateNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}
function generateSymbol() {
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Clipboard event listener to copy the generated password.
clipboard.addEventListener("click", copyToClipboard);

// Function to copy the password to the clipboard.
function copyToClipboard() {
  if (result.textContent === "") return;

  // Create a temporary textarea element to hold the password.
  const textarea = document.createElement("textarea");
  textarea.value = result.textContent;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  showAlert("Password copied to clipboard!", "success");
}
