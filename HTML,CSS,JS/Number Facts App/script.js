// Get DOM elements
const numberInput = document.getElementById("numberInput");
const getFactBtn = document.getElementById("getFactBtn");
const factText = document.getElementById("factText");

// Event listener for button click
getFactBtn.addEventListener("click", getFact);

function getFact() {
  if (numberInput.value !== "") {
    // Fetch fact from Numbers API
    fetch(`http://numbersapi.com/${numberInput.value}/trivia`)
      .then((res) => res.text())
      .then((fact) => {
        factText.textContent = fact;
        factText.style.color = "#444";
      })
      .catch((err) => {
        factText.textContent =
          "Check your internet connection. Try again later!!";
        factText.style.color = "red";
      });
  } else {
    factText.textContent = "Please enter a number...";
    factText.style.color = "red";
  }
}
