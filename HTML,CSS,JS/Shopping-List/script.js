// Select elements from the DOM
const itemInputEl = document.querySelector("#item-input");
const itemForm = document.querySelector("#item-form");
const clear = document.querySelector("#clear");
const itemList = document.querySelector("#item-list");
const alertBox = document.querySelector("#alertBox");
const alertMsg = document.querySelector("#alert-message");
const filter = document.querySelector("#filter");

// Add event listener for the form submission
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addItems();
});

// Function to add items to the list
function addItems() {
  const itemInput = itemInputEl.value.trim();

  // If input is empty, show error alert
  if (itemInput === "") {
    showAlert("error", "Please enter an item !");
    return;
  }
  const itemsArr = JSON.parse(localStorage.getItem("items")) || [];

  // Check if the item already exists in the list
  if (itemsArr.includes(itemInput)) {
    showAlert("error", "Item already in list!");
    itemInputEl.value = "";
    return;
  } else {
    itemsArr.push(itemInput);
  }

  // Save updated array to localStorage
  localStorage.setItem("items", JSON.stringify(itemsArr));
  itemList.innerHTML = "";
  itemInputEl.value = "";
  displayItems(itemsArr);
  showAlert("success", "Item added successfully.");
  showUI();
}

// Function to display items in the list
function displayItems(itemsArr) {
  itemsArr.forEach((item) => {
    const li = document.createElement("li");
    const editIcon = document.createElement("i");
    const i = document.createElement("i");
    li.textContent = item;
    li.setAttribute("data-name", item);
    editIcon.className = "fa-solid fa-pen-to-square edit-item";
    i.className = "fa-solid fa-xmark remove-item";
    li.appendChild(editIcon);
    li.appendChild(i);
    itemList.appendChild(li);
  });
}

// Event listener for item list (handles both editing and removal)
itemList.addEventListener("click", (e) => {
  removeItem(e);
  enterEditMode(e);
});

// Function to remove an item
function removeItem(e) {
  const itemsArr = JSON.parse(localStorage.getItem("items")) || [];
  if (e.target.classList.contains("remove-item")) {
    e.target.parentElement.remove();
    itemsArr.forEach((item, index) => {
      if (
        item.trim().toLowerCase() ===
        e.target.parentElement.getAttribute("data-name")
      ) {
        itemsArr.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(itemsArr));
    showAlert("success", "Item removed successfully.");
    if (itemsArr.length === 0) {
      clearUI();
    }
  }
}

// Function to filter displayed items based on input
function filterItems() {
  const filterVal = this.value;
  const itemsArr = Array.from(itemList.children);
  itemsArr.forEach((item) => {
    const itemName = item.getAttribute("data-name");
    if (itemName.includes(filterVal)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// Function to enable editing of an item
function enterEditMode(e) {
  if (e.target.classList.contains("edit-item")) {
    const item = e.target.parentElement;
    const input = document.createElement("input");
    input.type = "text";
    input.value = item.getAttribute("data-name");
    input.className = "edit-input";
    item.innerHTML = "";
    item.appendChild(input);
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save-btn";
    item.appendChild(saveBtn);
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-btn";
    item.appendChild(cancelBtn);
    input.focus();
    saveBtn.addEventListener("click", () => saveEdit(item, input));
    cancelBtn.addEventListener("click", () => cancelEdit(item));
  }
}

// Function to save edited item
function saveEdit(item, updatedTextEl) {
  const updatedText = updatedTextEl.value;
  if (updatedText.trim() !== "") {
    const itemsArr = JSON.parse(localStorage.getItem("items")) || [];
    itemsArr[itemsArr.indexOf(item.getAttribute("data-name"))] = updatedText;
    localStorage.setItem("items", JSON.stringify(itemsArr));
    const editIcon = document.createElement("i");
    const i = document.createElement("i");
    item.textContent = updatedText;
    item.setAttribute("data-name", updatedText);
    editIcon.className = "fa-solid fa-pen-to-square edit-item";
    i.className = "fa-solid fa-xmark remove-item";
    item.appendChild(editIcon);
    item.appendChild(i);
    showAlert("success", "Item updated successfully.");
  }
}

// Function to cancel editing
function cancelEdit(item) {
  const editIcon = document.createElement("i");
  const i = document.createElement("i");
  item.textContent = item.getAttribute("data-name");
  editIcon.className = "fa-solid fa-pen-to-square edit-item";
  i.className = "fa-solid fa-xmark remove-item";
  item.appendChild(editIcon);
  item.appendChild(i);
}

// Event listener for filter input
filter.addEventListener("input", filterItems);

// Event listener for clear button
clear.addEventListener("click", (e) => clearUI(e));

// Function to show UI elements
function showUI() {
  clear.style.display = "block";
  filter.style.display = "block";
}

// Function to clear all items from UI and storage
function clearUI(e) {
  clear.style.display = "none";
  filter.style.display = "none";
  if (itemList.children.length !== 0) {
    Array.from(itemList.children).forEach((li) => li.remove());
    const itemsArr = JSON.parse(localStorage.getItem("items")) || [];
    itemsArr.length = 0;
    localStorage.setItem("items", JSON.stringify(itemsArr));
    showAlert("success", "All items removed successfully.");
  }
}

// Function to display alert messages
function showAlert(status, message) {
  alertBox.className = `show ${status}`;
  alertMsg.textContent = message;
}

// Function to close alert
function closeAlert() {
  alertBox.classList.remove("show");
}

// Initialize the app on page load
document.addEventListener("DOMContentLoaded", () => {
  itemInputEl.focus();
  const itemsArr = JSON.parse(localStorage.getItem("items")) || [];
  displayItems(itemsArr);
  showUI();
  if (itemsArr.length === 0) {
    clearUI();
  }
});
