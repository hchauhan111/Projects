// Get DOM elements
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

// Add event listeners for previous, play, and next buttons
prev.addEventListener("click", goToPrevSong);
play.addEventListener("click", playSong);
next.addEventListener("click", goToNextSong);

// Array of song titles
const songs = ["hey", "summer", "ukulele"];

// Default song index
let songIndex = 1;

// Function to load song based on the current index
function loadSong() {
  cover.src = `images/${songs[songIndex]}.jpg`;
  audio.src = `music/${songs[songIndex]}.mp3`;
  title.innerHTML = songs[songIndex];
}
loadSong();

// Function to play or pause the song
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

// Function to switch to the previous song
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

// Function to switch to the next song
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

// Update song time information and progress bar
audio.addEventListener("timeupdate", updateInfo);

// Function to update current time and progress bar
function updateInfo(e) {
  songDurUpdate(e);
  updateProgress(e);
}

// Function to display current time and total duration
function songDurUpdate(e) {
  let currentTime = e.srcElement.currentTime;
  let totalDuratoin = e.srcElement.duration;
  // Update total duration display
  durTime.innerText = `${Math.floor(totalDuratoin / 60)}:${Math.floor(
    totalDuratoin % 60
  )}`;
  // Update current time display with leading zeros if needed
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

// Function to update the progress bar width based on current time
function updateProgress(e) {
  let currentTime = e.srcElement.currentTime;
  let totalDuratoin = e.srcElement.duration;
  progress.style.width = `${(currentTime / totalDuratoin) * 100}%`;
}

// Function to set the current time of the audio based on the clicked position on the progress bar
function updateProgressAgain(e) {
  audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
}

// Event listener to change song position on progress bar click
progressContainer.addEventListener("click", updateProgressAgain);

// Event listener to move to the next song when the current song ends
audio.addEventListener("ended", goToNextSong);
