// List of top movies
const topMoviesList = [
  "Avengers: Endgame",
  "Avengers: Infinity War",
  "Spider-Man: No Way Home",
  "The Avengers",
  "Avengers: Age of Ultron",
  "Black Panther",
  "Iron Man 3",
  "Captain America: Civil War",
  "Spider-Man: Far from Home",
  "Captain Marvel",
];

// Get the DOM element where the draggable list will be displayed
const draggableList = document.getElementById("draggable-list");

// Array to hold the randomly ordered list of movies
const randomMovieList = [];

// Function to display the movie list in random order
function displayRandomList() {
  // Randomly push or unshift movies to the randomMovieList
  topMoviesList.forEach((movie) => {
    const randomNo = Math.random();
    randomNo >= 0.5
      ? randomMovieList.push(movie)
      : randomMovieList.unshift(movie);
  });

  // Display each movie as a draggable list item
  randomMovieList.forEach((movie, i) => {
    draggableList.innerHTML += `<li data-index=${i}>
        <span class="number">${i + 1}</span>
        <div class="draggable" draggable=true>
          <p class="movie-name">${movie}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      </li>`;
  });

  // Initialize drag and drop functionality
  onDrag();
}

// Call the function to display the list
displayRandomList();

// Function to handle drag and drop events
function onDrag() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll("#draggable-list li");

  // Add dragstart event to each draggable element
  draggables.forEach((draggable) =>
    draggable.addEventListener("dragstart", dragStart)
  );

  // Add dragover, drop, dragenter, and dragleave events to each list item
  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", drop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

// Variable to store the index of the dragged item
let startIndex;

// Function triggered when dragging starts
function dragStart() {
  startIndex = this.closest("li").getAttribute("data-index");
}

// Prevent default behavior to allow dropping
function dragOver(e) {
  e.preventDefault();
}

// Function triggered when an item is dropped
function drop() {
  const endIndex = this.getAttribute("data-index");
  this.classList.remove("over");
  swapItems(startIndex, endIndex);
}

// Function triggered when dragging enters a droppable area
function dragEnter() {
  this.classList.add("over");
}

// Function triggered when dragging leaves a droppable area
function dragLeave() {
  this.classList.remove("over");
}

// Function to swap the positions
function swapItems(fromIndex, toIndex) {
  const firstItem =
    draggableList.children[fromIndex].querySelector(".draggable");
  const secondItem =
    draggableList.children[toIndex].querySelector(".draggable");

  draggableList.children[fromIndex].appendChild(secondItem);
  draggableList.children[toIndex].appendChild(firstItem);
}

// Check button
document.getElementById("check").addEventListener("click", checkOrder);

// Function to check if the current order matches the original order
function checkOrder() {
  document.querySelectorAll(".movie-name").forEach((movie, i) => {
    if (movie.textContent.trim() === topMoviesList[i]) {
      movie.parentElement.parentElement.classList.add("right");
      movie.parentElement.parentElement.classList.remove("wrong");
    } else {
      movie.parentElement.parentElement.classList.add("wrong");
      movie.parentElement.parentElement.classList.remove("right");
    }
  });
}
