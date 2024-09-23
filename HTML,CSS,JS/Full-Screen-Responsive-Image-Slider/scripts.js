// Selecting elements
const dots = document.querySelectorAll(".dot");
const slides = document.querySelector(".slides");

let slideIndex = 0;

// Show the first slide initially
showSlide(slideIndex);

function plusSlide(n) {
  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = dots.length - 1;
  }
  if (slideIndex >= dots.length) slideIndex = 0;

  showSlide(slideIndex);
}

function currentSlide(n) {
  showSlide(n - 1);
}

// Main-function
function showSlide(n) {
  slides.style.transform = `translateX(${-n * 100}%)`;
  updateDots(n);
}

function updateDots(n) {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[n].classList.add("active");
}

// Auto-play
var autoplay = setInterval(() => plusSlide(1), 5000);
