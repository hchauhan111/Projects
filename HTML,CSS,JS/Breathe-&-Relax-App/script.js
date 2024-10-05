// Get references to the container and text elements from the DOM
const container = document.getElementById("container");
const text = document.getElementById("text");

// Function that controls the main breathing animation sequence
function main() {
  // This will start the "Breathe In" animation
  text.innerText = "Breathe In!";
  container.className = "container grow";

  // After 3 seconds (3000 ms), change the text to "Hold" to indicate holding breath
  setTimeout(() => {
    text.textContent = "Hold";
  }, 3000);

  // This will start the "Breathe Out" animation
  setTimeout(() => {
    text.textContent = "Breathe Out!";
    container.className = "container shrink";
  }, 4500);
}

// Run the `main` function to initiate the breathing animation when the page loads
main();

// Repeat the breathing animation every 7.5 seconds using `setInterval`
setInterval(main, 7500);
