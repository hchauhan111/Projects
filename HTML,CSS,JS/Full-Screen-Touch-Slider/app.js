// Select the slider container and all the individual slides
const sliderContainer = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");

// Variables to keep track of dragging status and positions
let isDragging = false;
let StartPosition = 0;
let currentIndex = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = 0;

// Attach event listeners to each slide for touch and mouse events
slides.forEach((slide, i) => {
  const slideImg = slide.querySelector("img");

  // Prevent the default drag behavior of images
  slideImg.addEventListener("dragstart", onDragStart);

  // Add touch and mouse events to handle dragging
  slide.addEventListener("touchstart", onTouchStart(i));
  slide.addEventListener("touchend", onTouchEnd);
  slide.addEventListener("touchmove", onTouchMove);
  slide.addEventListener("mousedown", onTouchStart(i));
  slide.addEventListener("mouseup", onTouchEnd);
  slide.addEventListener("mouseleave", onTouchEnd);
  slide.addEventListener("mousemove", onTouchMove);
});

// Prevent the context menu from appearing on right-click
window.oncontextmenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

// Prevent image drag event to allow smooth dragging
function onDragStart(e) {
  e.preventDefault();
}

// Function to handle the start of touch or mouse dragging
function onTouchStart(i) {
  return function (e) {
    isDragging = true;
    currentIndex = i;
    StartPosition = getPosition(e);
    animationId = requestAnimationFrame(animation);
    sliderContainer.classList.add("grabbing");
  };
}

// Function to handle the end of touch or mouse dragging
function onTouchEnd() {
  isDragging = false;
  sliderContainer.classList.remove("grabbing");
  const movedBy = currentTranslate - prevTranslate;

  // If moved enough to the left, go to the next slide
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;

  // If moved enough to the right, go to the previous slide
  if (movedBy > 100 && currentIndex > 0) currentIndex--;

  // Set the new translate position based on the current slide index
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;

  // Move the slider to the new position
  moveSlider();

  // Stop the animation loop
  cancelAnimationFrame(animationId);
}

// Function to handle the dragging movement (touch or mouse)
function onTouchMove(e) {
  if (isDragging) {
    let currentPosition = getPosition(e);
    currentTranslate = prevTranslate + currentPosition - StartPosition;
  }
}

// Helper function to get the position (x-coordinate) of the touch or mouse event
function getPosition(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

// Function to move the slider based on the translate value
function moveSlider() {
  sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
}

// Animation loop to move the slider while dragging
function animation() {
  if (!isDragging) return;
  moveSlider();
  if (isDragging) requestAnimationFrame(animation);
}
