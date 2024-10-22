// Get elements from the DOM
const textarea = document.getElementById("textarea");
const selectBtn = document.getElementById("selectBtn");
const tags = document.getElementById("tags");

// Add event listeners for the textarea
textarea.addEventListener("input", showChoices);
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // If Enter key is pressed, choose a random tag
    chooseRandom();
    e.preventDefault();
  }
});

// Add event listener for the button
selectBtn.addEventListener("click", chooseRandom);

// Function to show the choices based on the user's input
function showChoices() {
  tags.innerHTML = "";
  let choices = this.value.split(",");
  choices.forEach((choice) => {
    if (choice.trim() === "") return;
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.textContent = choice.trim();
    tags.appendChild(tag);
  });
}

// Function to randomly highlight tags for a short period
function chooseRandom() {
  let timerId = setInterval(() => {
    // Start interval to continuously highlight random tags
    const randomTag = pickRandom();
    if (randomTag) {
      highlightTag(randomTag);
    }
    // Unhighlight the tag after a short delay
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  // After 3 seconds, stop the interval and highlight one final random tag
  setTimeout(() => {
    clearInterval(timerId);
    const randomTag = pickRandom();
    highlightTag(randomTag);
  }, 3000);
}

// Function to pick a random tag
function pickRandom() {
  const choices = tags.children;
  return choices[Math.floor(Math.random() * tags.children.length)];
}

// Function to highlight a tag
function highlightTag(choice) {
  choice.classList.add("highlight");
}

// Function to unhighlight a tag
function unHighlightTag(choice) {
  choice.classList.remove("highlight");
}
