// Select elements from the HTML page
const score = document.querySelectorAll(".score");
const highScore = document.querySelectorAll(".highScore");
const canvas = document.getElementById("gameCanvas");
const restartBtn = document.getElementById("restart-btn");
const myModal = document.getElementById("myModal");
const fruitImg = document.getElementById("fruit");
const scoreBoard = document.querySelector(".score-board");
const music = document.querySelector("#music");
const eatSound = document.querySelector("#eatSound");
const gameover = document.querySelector("#gameover");
const move = document.querySelector("#move");

const cxt = canvas.getContext("2d");

// Define snake object with its properties
const snake = {
  w: 20,
  h: 20,
  body: [{ x: 20, y: 20 }],
  dx: 0,
  dy: 0,
  speed: 4,
};

// Define fruit object with its properties
const fruit = {
  w: 20,
  h: 20,
  x: Math.floor(Math.random() * (canvas.width - 20)),
  y: Math.floor(Math.random() * (canvas.height - 20)),
};

let animeId;
let currScore = 0;
let highScoreLocal = localStorage.getItem("high-score") || currScore;

highScore[0].textContent = highScoreLocal;

// Add event listeners for key press and restart button
document.addEventListener("keydown", onKeyDown);
restartBtn.addEventListener("click", restartGame);

// Function to draw the snake on the canvas
function drawSnake() {
  cxt.fillStyle = "green";
  snake.body.forEach((segment) => {
    cxt.fillRect(segment.x, segment.y, snake.w, snake.h);
  });
}

// Function to draw the fruit on the canvas
function drawFruit() {
  cxt.drawImage(fruitImg, fruit.x, fruit.y, fruit.w, fruit.h);
}

// Function to clear the canvas for the next frame
function clear() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move the snake
function moveSnake() {
  // Move the snake body by copying positions of the segment in front
  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = { ...snake.body[i - 1] };
  }
  // Move the snake's head according to its direction
  snake.body[0].x += snake.dx;
  snake.body[0].y += snake.dy;
}

// Function to handle key presses for controlling the snake
function onKeyDown(e) {
  music.play();

  // Change direction based on arrow key input, ensuring no reverse direction
  if (e.key === "ArrowRight" && snake.dx === 0) {
    move.play();
    snake.dx = snake.speed;
    snake.dy = 0;
  } else if (e.key === "ArrowLeft" && snake.dx === 0) {
    move.play();
    snake.dx = -snake.speed;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    move.play();
    snake.dy = -snake.speed;
    snake.dx = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    move.play();
    snake.dy = snake.speed;
    snake.dx = 0;
  }
}

// Function to check if the snake hits the wall
function checkWallCollision() {
  if (
    snake.body[0].x + snake.w > canvas.width ||
    snake.body[0].x < 0 ||
    snake.body[0].y + snake.h > canvas.height ||
    snake.body[0].y < 0
  ) {
    gameOver();
  }
}

// Function to check if the snake eats the fruit
function checkFruitCollision() {
  if (
    snake.body[0].x < fruit.x + fruit.w &&
    snake.body[0].x + snake.w > fruit.x &&
    snake.body[0].y < fruit.y + fruit.h &&
    snake.body[0].y + snake.h > fruit.y
  ) {
    eatSound.play();

    // Move the fruit to a new random location
    fruit.x = Math.floor(Math.random() * (canvas.width - 20));
    fruit.y = Math.floor(Math.random() * (canvas.height - 20));
    handleScore();
    growSnake();
  }
}

// Function to grow the snake when it eats a fruit
function growSnake() {
  const lastSegment = snake.body[snake.body.length - 1];
  snake.body.push({ x: lastSegment.x, y: lastSegment.y });
}

// Function to handle score updates
function handleScore() {
  currScore++;
  score[0].textContent = currScore;
  score[1].textContent = currScore;

  // Check if the current score is higher than the high score
  if (currScore >= highScoreLocal) {
    highScoreLocal = currScore;
    localStorage.setItem("high-score", highScoreLocal);
  }
}

// Function to handle game over
function gameOver() {
  if (!isGameOver) {
    // If game over hasn't happened yet
    isGameOver = true;
    gameover.play();
    cancelAnimationFrame(animeId);
    document.removeEventListener("keydown", onKeyDown);
    highScore[1].textContent = highScoreLocal;
    openModal();
    scoreBoard.style.display = "none";
  }
}

// Function to restart the game
function restartGame() {
  isGameOver = false;
  snake.body = [{ x: 20, y: 20 }];
  snake.dx = 0;
  snake.dy = 0;
  closeModal();
  document.addEventListener("keydown", onKeyDown);
  scoreBoard.style.display = "block";
  currScore = 0;
  score[0].textContent = currScore;
  highScore[0].textContent = highScoreLocal;
  update();
}

let isGameOver = false;

// Main game loop
function update() {
  if (isGameOver) return;
  clear();
  drawSnake();
  drawFruit();
  moveSnake();
  checkWallCollision();
  checkFruitCollision();
  if (!isGameOver) animeId = requestAnimationFrame(update);
}

// Function to open the game over modal
function openModal() {
  myModal.classList.add("show");
}

// Function to close the game over modal
function closeModal() {
  myModal.classList.remove("show");
}

update();
