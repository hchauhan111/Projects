// Selecting elements
const openModalBtn = document.getElementById("openModalBtn");
const myModal = document.getElementById("myModal");

// Event listeners
openModalBtn.addEventListener("click", openModal);
myModal.addEventListener("click", closeModal);

// Function to open modal
function openModal() {
  myModal.classList.add("show");
}

// Function to close modal
function closeModal(e) {
  if (
    e.target.classList.contains("close") ||
    e.target.classList.contains("modal")
  ) {
    myModal.classList.remove("show");
  }
}
