// Selecting the buttons and the slide containers for the left and right slides
const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
const leftSlide = document.querySelector(".left-slide");
const rightSlide = document.querySelector(".right-slide");

// Get the total number of slides
const totalSlides = leftSlide.children.length;

// Initialize the starting indices for right and left slides
let rightIndex = 0,
  leftIndex = totalSlides - 1;

// Set the initial position of the leftSlide
leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;

// Function to move the slides upwards
function moveImgUp() {
  // Increment the rightIndex and decrement the leftIndex
  rightIndex++;
  leftIndex--;

  // Translate both slides vertically based on the updated indices
  rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
  leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;

  // If the indices go out of bounds, reset them
  if (rightIndex > totalSlides - 1 && leftIndex < 0) {
    // Reset the indices to their initial values
    rightIndex = 0;
    leftIndex = totalSlides - 1;

    // Reset the positions of the slides to their starting positions
    rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
    leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;
  }
}

// Function to move the slides downwards
function moveImgDown() {
  // Decrement the rightIndex and increment the leftIndex
  rightIndex--;
  leftIndex++;

  // Translate both slides vertically based on the updated indices
  rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
  leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;

  // If the indices go out of bounds, reset them
  if (leftIndex > totalSlides - 1 && rightIndex < 0) {
    // Reset the indices to their initial values
    rightIndex = totalSlides - 1;
    leftIndex = 0;

    // Reset the positions of the slides to their starting positions
    rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
    leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;
  }
}
