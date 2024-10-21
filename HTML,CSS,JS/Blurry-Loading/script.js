// Select the background element and the loading text element
const bg = document.querySelector(".bg");
const loadingText = document.querySelector(".loading-text");

// Initialize the load value to 0
let load = 0;

// Set up a repeating timer to increment the load value every 30ms
let timerId = setInterval(() => {
  // Increment the load value
  load++;

  // Stop the timer when load exceeds 100
  if (load > 100) {
    clearInterval(timerId);
  }

  // Update the loading text with the current load percentage
  loadingText.textContent = `${load}%`;

  // Adjust the blur effect on the background image, gradually reducing it
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;

  // Gradually decrease the opacity of the loading text as the load increases
  loadingText.style.opacity = scale(load, 0, 100, 1, 0);
}, 30);

// Function to scale a number from one range to another
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
