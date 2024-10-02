// Selecting DOM elements
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
const userName = document.getElementById("name");
const focus = document.getElementById("focus");
const body = document.body;

// Function to update time, greeting, and background every second
setInterval(() => {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();

  // Format time: Convert 24-hour time to 12-hour format and pad minutes with 0 if less than 10
  time.innerHTML = `${hour % 12 || 12}:${minute.toString().padStart(2, "0")}`;

  // Determine which part of the day it is and set the appropriate background and greeting
  let dayPhase;
  if (hour >= 5 && hour < 12) {
    dayPhase = "morning";
    body.style.backgroundImage = "url('img/morning.jpg')";
  } else if (hour >= 12 && hour < 17) {
    dayPhase = "afternoon";
    body.style.backgroundImage = "url('img/afternoon.jpg')";
  } else if (hour >= 17 && hour < 21) {
    dayPhase = "evening";
    body.style.backgroundImage = "url('img/evening.jpg')";
  } else {
    dayPhase = "night";
    body.style.backgroundImage = "url('img/night.jpg')";
  }

  // Set the greeting based on the time of day
  greeting.innerHTML = `Good ${dayPhase},`;
}, 1000);

// Function to allow editing of name
function nameEdit() {
  userName.classList.add("name");
  userName.setAttribute("contenteditable", "true");

  // Add event listener to handle when user presses a key while editing
  userName.addEventListener("keypress", handleNameInput);
}

// Function to handle saving or resetting the name when "Enter" is pressed
function handleNameInput(e) {
  if (e.key === "Enter") {
    // Check if the pressed key is "Enter"
    if (userName.textContent.trim() !== "") {
      // Ensure name is not empty
      localStorage.setItem("user-name", userName.textContent);
      userName.removeAttribute("contenteditable");
      userName.classList.remove("name");
    } else {
      // If the name is empty, restore the saved name or show default placeholder
      userName.removeAttribute("contenteditable");
      userName.classList.remove("name");
      userName.textContent = localStorage.getItem("user-name") || "_____";
    }
    // Remove the event listener to prevent adding it multiple times
    userName.removeEventListener("keypress", handleNameInput);
  }
}

// Function to allow editing of the focus field
function focusEdit() {
  focus.classList.add("focus");
  focus.setAttribute("contenteditable", "true");

  // Add event listener to handle when user presses a key while editing
  focus.addEventListener("keypress", handleFocusInput);
}

// Function to handle saving or resetting the focus when "Enter" is pressed
function handleFocusInput(e) {
  if (e.key === "Enter") {
    // Check if the pressed key is "Enter"
    if (focus.textContent.trim() !== "") {
      // Ensure focus is not empty
      localStorage.setItem("focus", focus.textContent);
      focus.removeAttribute("contenteditable");
      focus.classList.remove("focus");
    } else {
      // If the focus is empty, restore the saved focus or show default placeholder
      focus.removeAttribute("contenteditable");
      focus.classList.remove("focus");
      focus.textContent = localStorage.getItem("focus") || "_____";
    }
    // Remove the event listener to prevent adding it multiple times
    focus.removeEventListener("keypress", handleFocusInput);
  }
}

// Initialize the name and focus fields with stored values or default placeholders
userName.textContent = localStorage.getItem("user-name") || "_____";
focus.textContent = localStorage.getItem("focus") || "_____";
