const title = document.getElementById("title");
const progress = document.getElementById("progress");
const currTime = document.getElementById("currTime");
const durTime = document.getElementById("durTime");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const musicContainer = document.getElementById("music-container");
const progressContainer = document.getElementById("progress-container");

prev.addEventListener("click", goToPrevSong);
play.addEventListener("click", playSong);
next.addEventListener("click", goToNextSong);

const songs = ["hey", "summer", "ukulele"];

let songIndex = 1;

function loadSong() {
  cover.src = `images/${songs[songIndex]}.jpg`;
  audio.src = `music/${songs[songIndex]}.mp3`;
  title.innerHTML = songs[songIndex];
}
loadSong();

function playSong() {
  let icon = play.innerHTML.includes("play")
    ? `<i class='fas fa-pause'></i>`
    : `<i class='fas fa-play'></i>`;
  play.innerHTML = icon;
  if (icon === `<i class='fas fa-pause'></i>`) {
    audio.play();
    musicContainer.classList.add("play");
  } else {
    audio.pause();
    musicContainer.classList.remove("play");
  }
}

function goToPrevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong();
  if (!play.innerHTML.includes("play")) {
    audio.play();
  }
}

function goToNextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong();
  if (!play.innerHTML.includes("play")) {
    audio.play();
  }
}

audio.addEventListener("timeupdate", updateInfo);

function updateInfo(e) {
  songDurUpdate(e);
  updateProgress(e);
}

function songDurUpdate(e) {
  let currentTime = e.srcElement.currentTime;
  let totalDuratoin = e.srcElement.duration;
  durTime.innerText = `${Math.floor(totalDuratoin / 60)}:${Math.floor(
    totalDuratoin % 60
  )}`;
  currTime.innerText = `${
    Math.floor(currentTime / 60).toString().length === 1
      ? "0" + Math.floor(currentTime / 60)
      : Math.floor(currentTime / 60)
  }:${
    Math.floor(currentTime % 60).toString().length === 1
      ? "0" + Math.floor(currentTime % 60)
      : Math.floor(currentTime % 60)
  }`;
}

function updateProgress(e) {
  let currentTime = e.srcElement.currentTime;
  let totalDuratoin = e.srcElement.duration;
  progress.style.width = `${(currentTime / totalDuratoin) * 100}%`;
}

function updateProgressAgain(e) {
  audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
}

progressContainer.addEventListener("click", updateProgressAgain);

audio.addEventListener("ended", goToNextSong);
