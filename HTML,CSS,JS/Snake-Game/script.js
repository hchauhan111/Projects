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

const snake = {
  w: 20,
  h: 20,
  body: [{ x: 20, y: 20 }],
  dx: 0,
  dy: 0,
  speed: 4,
};

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

document.addEventListener("keydown", onKeyDown);
restartBtn.addEventListener("click", restartGame);

function drawSnake() {
  cxt.fillStyle = "green";
  snake.body.forEach((segment) => {
    cxt.fillRect(segment.x, segment.y, snake.w, snake.h);
  });
}

function drawFruit() {
  cxt.drawImage(fruitImg, fruit.x, fruit.y, fruit.w, fruit.h);
}

function clear() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
  for (let i = snake.body.length - 1; i > 0; i--) {
    snake.body[i] = { ...snake.body[i - 1] };
  }

  snake.body[0].x += snake.dx;
  snake.body[0].y += snake.dy;
}

function onKeyDown(e) {
  music.play();
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

function checkFruitCollision() {
  if (
    snake.body[0].x < fruit.x + fruit.w &&
    snake.body[0].x + snake.w > fruit.x &&
    snake.body[0].y < fruit.y + fruit.h &&
    snake.body[0].y + snake.h > fruit.y
  ) {
    eatSound.play();
    fruit.x = Math.floor(Math.random() * (canvas.width - 20));
    fruit.y = Math.floor(Math.random() * (canvas.height - 20));
    handleScore();
    growSnake();
  }
}

function growSnake() {
  const lastSegment = snake.body[snake.body.length - 1];
  snake.body.push({ x: lastSegment.x, y: lastSegment.y });
}

function handleScore() {
  currScore++;
  score[0].textContent = currScore;
  score[1].textContent = currScore;
  if (currScore >= highScoreLocal) {
    highScoreLocal = currScore;
    localStorage.setItem("high-score", highScoreLocal);
  }
}

function gameOver() {
  if (!isGameOver) {
    isGameOver = true;
    gameover.play();
    cancelAnimationFrame(animeId);
    document.removeEventListener("keydown", onKeyDown);
    highScore[1].textContent = highScoreLocal;
    openModal();
    scoreBoard.style.display = "none";
  }
}

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

function openModal() {
  myModal.classList.add("show");
}

function closeModal() {
  myModal.classList.remove("show");
}

update();
