// Get DOM elements by their IDs
const wordInput = document.getElementById("word-input");
const time = document.getElementById("time");
const score = document.getElementById("score");
const highscore = document.getElementById("highscore");
const message = document.getElementById("message");
const seconds = document.getElementById("seconds");
const currentWord = document.getElementById("current-word");

// Sound effects
const correctSound = document.getElementById("correct-sound");
const gameoverSound = document.getElementById("gameover-sound");

// Configure sound effects
correctSound.volume = 0.5;
gameoverSound.loop = false;

// Initialize variables
let totalTime = Number.parseInt(seconds.textContent);
let currScore = 0;
let highScoreVal = localStorage.getItem("highScore") || 0;
let countdown;

// Display the initial random word
currentWord.textContent = words[Math.floor(Math.random() * words.length)];

// Display the high score from localStorage
highscore.textContent = localStorage.getItem("highScore") || 0;

// Start the timer when the game begins
timer();

// Event listener for word input field
wordInput.addEventListener("input", () => {
  const wordInputVal = wordInput.value;

  // Check if the entered word matches the current word
  if (wordInputVal === currentWord.textContent) {
    // Pick a new random word and display it
    currentWord.textContent = words[Math.floor(Math.random() * words.length)];
    wordInput.value = "";
    currScore++;

    // Update the high score if the current score exceeds the previous high score
    if (currScore > localStorage.getItem("highScore")) {
      highScoreVal = currScore;
      localStorage.setItem("highScore", highScoreVal);
    }

    // Play the correct answer sound
    correctSound.play();

    // Update the score and display a "Correct!" message
    score.textContent = currScore;
    message.textContent = "Correct!";

    // Clear the message after a short delay
    setTimeout(() => (message.textContent = ""), 500);

    // Restart the timer
    clearInterval(countdown);
    timer();
  }

  // Update the high score display
  highscore.textContent = localStorage.getItem("highScore") || 0;
});

// Timer function
function timer() {
  totalTime = Number.parseInt(seconds.textContent);
  time.textContent = totalTime;

  // Set interval for countdown
  countdown = setInterval(() => {
    totalTime--;
    time.textContent = totalTime;

    // If the time reaches 0, game over
    if (totalTime === 0) {
      clearInterval(countdown);
      gameoverSound.play();
      message.textContent = "Game Over!!";
      wordInput.value = "";
      totalTime = Number.parseInt(seconds.textContent);
      currScore = -1;
    }
  }, 1000);
}
