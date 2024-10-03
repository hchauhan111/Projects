const restartBtn = document.getElementById("restart");
const score = document.getElementById("score");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const modal = document.querySelector(".modal");
const result = document.querySelector("#result");

// Retrieve previous scores from localStorage or set to 0 if not available
let playerScore = localStorage.getItem("player-score") || 0;
let compScore = localStorage.getItem("comp-score") || 0;

// Variables for storing results and computer choice
let finalResult, compChoiceText, compChoiceIcon, resultClass;

// Display the initial scores on page load
displayScore(playerScore, compScore);

// Add event listeners for player choices
rock.addEventListener("click", () => playRound("rock"));
paper.addEventListener("click", () => playRound("paper"));
scissors.addEventListener("click", () => playRound("scissors"));

function playRound(playerChoice) {
  let compChoice = getCompChoice();
  let result = getResult(playerChoice, compChoice);

  // Update scores based on result
  if (result.result == "win") playerScore++;
  if (result.result == "lose") compScore++;

  // Display result in the modal
  displayModal(
    result.compChoiceText,
    result.compChoiceIcon,
    result.finalResult,
    result.resultClass
  );

  // Update scores in the UI and localStorage
  addScore(playerScore, compScore);
  displayScore(playerScore, compScore);

  // Show the reset button after the first round
  ResetBtnFunc();
}

function getCompChoice() {
  const choices = ["rock", "paper", "scissors"];
  let compChoice = Math.floor(Math.random() * 3);
  return choices[compChoice];
}

function getResult(playerChoice, compChoice) {
  const choices = {
    rock: { rock: "draw", paper: "lose", scissors: "win" },
    paper: { rock: "win", paper: "draw", scissors: "lose" },
    scissors: { rock: "lose", paper: "win", scissors: "draw" },
  };

  let result = choices[playerChoice][compChoice];

  return {
    result: result,
    compChoiceText: capitalize(compChoice),
    compChoiceIcon: compChoice,
    finalResult:
      result === "win"
        ? "You Won"
        : result === "lose"
        ? "You Lose"
        : `It's A Draw`,
    resultClass: result,
  };
}

function displayModal(
  compChoiceText,
  compChoiceIcon,
  finalResult,
  resultClass
) {
  modal.style.display = "block";
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) modal.style.display = "none";
  });

  // Display the result and computer's choice in the modal
  result.innerHTML = `<h1 class='text-${resultClass}'>${finalResult}</h1>
        <i id="${compChoiceIcon}" class="choice fas fa-hand-${compChoiceIcon} fa-10x"></i>
        <p>Computer Chose ${compChoiceText}</p>`;
}

function displayScore(playerScore, compScore) {
  score.firstElementChild.textContent = `Player: ${playerScore}`;
  score.lastElementChild.textContent = `Computer: ${compScore}`;
}

function addScore(playerScore, compScore) {
  localStorage.setItem("player-score", playerScore);
  localStorage.setItem("comp-score", compScore);
}

function ResetBtnFunc() {
  restartBtn.style.display = "inline-block";
  restartBtn.addEventListener("click", () => {
    playerScore = 0;
    compScore = 0;
    localStorage.clear();
    displayScore(playerScore, compScore);
  });
}

function capitalize(text) {
  return text[0].toUpperCase() + text.slice(1);
}
