const bg = document.querySelector(".bg");
const loadingText = document.querySelector(".loading-text");

let load = 0;

let timerId = setInterval(() => {
  load++;
  if (load > 100) {
    clearInterval(timerId);
  }
  loadingText.textContent = `${load}%`;
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  loadingText.style.opacity = scale(load, 0, 100, 1, 0);
}, 30);

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
