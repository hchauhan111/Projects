// Select DOM elements for interaction
const betAmount = document.getElementById("betAmount");
const mineCount = document.getElementById("mineCount");
const startButton = document.getElementById("startButton");
const gameBoard = document.getElementById("gameBoard");
const cashoutButton = document.getElementById("cashoutButton");
const status = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const safeSound = document.getElementById("safeSound");
const mineSound = document.getElementById("mineSound");
const cashoutSound = document.getElementById("cashoutSound");
const alertBox = document.getElementById("alertBox");

// Stores the indices of the tiles containing mines
let minesCount = new Set();

// Attach event listeners for starting the game and cashing out
startButton.addEventListener("click", mainFunc);
cashoutButton.addEventListener("click", cashoutFunc);

// Main function triggered on game start
function mainFunc() {
  const betAmountVal = +betAmount.value;

  // Validate bet amount input
  if (Number.parseFloat(betAmount.value) < 1) {
    showAlert("Please enter valid amount!");
    return;
  }

  // Validate number of mines input
  if (
    Number.parseInt(mineCount.value) < 1 ||
    Number.parseInt(mineCount.value) > 24
  ) {
    showAlert("Please enter valid no. of mines!");
    return;
  }

  // Display the game board and hide start button
  showBoard();
  startButton.style.display = "none";
  cashoutButton.style.display = "block";
  status.textContent = `Bet Placed: $${betAmountVal}`;

  // Disable inputs to prevent further changes after starting the game
  betAmount.setAttribute("disabled", true);
  mineCount.setAttribute("disabled", true);

  // Enable clicking on the game board
  gameBoard.addEventListener("click", handleClick);
}

// Function to show the game board and place mines
function showBoard() {
  // Reset the set of mine positions
  minesCount = new Set();

  const mineCountVal = mineCount.value;

  // Create 25 tiles (5x5 grid) and assign mines randomly
  for (let i = 0; i < 25; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gameBoard.appendChild(tile);

    const img = document.createElement("img");
    img.src = `/images/diamond.png`;
    tile.appendChild(img);

    // Generate random mines and assign them
    generateMines(mineCountVal).forEach((mineIndex) => {
      if (i === mineIndex) {
        img.src = `/images/explosion.png`;
        tile.setAttribute("data-mine", true);
      }
    });
  }
}

// Handles click events on the game board
function handleClick(e) {
  // Check if the clicked element is a tile
  if (e.target.classList.contains("tile")) {
    // If the tile is not a mine
    if (e.target.dataset.mine !== "true") {
      e.target.className = "tile clicked";
      safeSound.play();
    } else {
      // If the tile is a mine
      e.target.className = "tile mine";
      mineSound.play();

      // Disable further clicks and show all tiles
      gameBoard.style.cursor = "default";
      gameBoard.removeEventListener("click", handleClick);

      const tiles = document.querySelectorAll(".tile");
      tiles.forEach((tile) => {
        tile.style.cursor = "default";
        if (tile.dataset.mine) tile.className = "tile mine";
      });

      cashoutButton.style.display = "none";
      resetButton.style.display = "block";
      status.textContent = `Game Over! You hit a mine!`;
    }
  }
}

// Generates a set of random mine positions
function generateMines(givenMines) {
  // Continue generating mines until the desired count is reached
  while (Array.from(minesCount).length < givenMines) {
    minesCount.add(Math.floor(Math.random() * 25));
  }
  console.log(minesCount);
  return Array.from(minesCount);
}

// Handles the cashout functionality
function cashoutFunc() {
  let clickedTiles = 0;

  // Count the number of clicked (safe) tiles
  document.querySelectorAll(".tile").forEach((tile) => {
    if (tile.classList.contains("clicked")) {
      clickedTiles++;
      tile.classList.add("highlight");
    }
  });

  // Prevent cashout if no tiles were clicked
  if (clickedTiles === 0) {
    showAlert("Unable to cashout now!");
    return;
  }

  // Disable further clicks and display reset button
  cashoutButton.style.display = "none";
  resetButton.style.display = "block";
  gameBoard.removeEventListener("click", handleClick);
  gameBoard.style.cursor = "default";

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.style.cursor = "default";
  });

  // Variables for calculation
  var m = +mineCount.value,
    d = clickedTiles,
    bet = +betAmount.value;

  var n = 25,
    x = 25 - m;
  // Factorial function to calculate combinations
  function factorial(number) {
    var value = number;
    for (var i = number; i > 1; i--) value *= i - 1;
    return value;
  }

  // Combination function to calculate "n choose d"
  function combination(n, d) {
    if (n == d) return 1;
    return factorial(n) / (factorial(d) * factorial(n - d));
  }

  // Repeated combination function for safe tiles (can be removed or renamed)
  function combination(x, d) {
    if (x == d) return 1;
    return factorial(x) / (factorial(d) * factorial(x - d));
  }

  // Calculate the probability and win amount
  var first = combination(n, d);
  var second = combination(x, d);
  var result = 0.99 * (first / second);
  result = Math.round(result * 100) / 100;
  var win = (bet * result).toFixed(2);

  status.textContent = `Cash Out: $${win}`;

  cashoutSound.play();
}

// Handles the game reset functionality
resetButton.addEventListener("click", resetFunc);
function resetFunc() {
  document.querySelector(".game-container").classList.add("fadeOut");

  setTimeout(() => {
    // Reset the game board and status
    gameBoard.innerHTML = "";
    status.textContent = "";
    resetButton.style.display = "none";
    startButton.style.display = "block";
    betAmount.removeAttribute("disabled");
    mineCount.removeAttribute("disabled");

    // Fade in the game container for a new round
    document.querySelector(".game-container").classList.remove("fadeOut");
    document.querySelector(".game-container").classList.add("fadeIn");
  }, 1000);
}

// Displays alert messages for invalid input or errors
function showAlert(text) {
  alertBox.style.display = "block";
  alertBox.textContent = text;
  alertBox.classList.add("error");

  // Hide the alert box after 3 seconds
  setTimeout(() => (alertBox.style.display = "none"), 3000);
}
