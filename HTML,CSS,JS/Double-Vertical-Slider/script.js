const upBtn = document.querySelector(".up-button");
const downBtn = document.querySelector(".down-button");
const leftSlide = document.querySelector(".left-slide");
const rightSlide = document.querySelector(".right-slide");

const totalSlides = leftSlide.children.length;
let rightIndex = 0,
  leftIndex = totalSlides - 1;

leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;

function moveImgUp() {
  rightIndex++;
  leftIndex--;
  rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
  leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;
  if (rightIndex > totalSlides - 1 && leftIndex < 0) {
    rightIndex = 0;
    leftIndex = totalSlides - 1;
    rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
    leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;
  }
}
function moveImgDown() {
  rightIndex--;
  leftIndex++;
  rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
  leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;
  if (leftIndex > totalSlides - 1 && rightIndex < 0) {
    rightIndex = totalSlides - 1;
    leftIndex = 0;
    rightSlide.style.transform = `translateY(${-rightIndex * 100}vh)`;
    leftSlide.style.transform = `translateY(${-leftIndex * 100}vh)`;
  }
}
