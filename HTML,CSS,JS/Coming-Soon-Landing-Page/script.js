// Get necessary elements from the DOM for form, email input, countdown timers, and success message
const subscribeForm = document.querySelector(".subscribe");
const email = document.getElementById("email");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const successAlert = document.querySelector(".success");

// Add event listener to the form's submit event to handle email subscription
subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show the success message for 3 seconds
  successAlert.style.display = "block";
  setTimeout(() => (successAlert.style.display = "none"), 3000);

  // Clear the email input field after submission
  email.value = "";
});

// Countdown functionality that updates the time remaining every second
const countDown = setInterval(() => {
  let todayDate = new Date();
  const launchDate = new Date("2024-10-26");

  let timeDifference = launchDate - todayDate;

  // If the launch date has passed, stop the countdown and display a "We are live!" message
  if (timeDifference < 0) {
    clearInterval(countDown);
    document.getElementById("countdown").textContent = "We are live!";
    return;
  }

  // Calculate the remaining time components (days, hours, minutes, seconds)
  let totalDays = timeDifference / 86400000;
  let totalHours = (timeDifference % 86400000) / 3600000;
  let totalMinutes = ((timeDifference % 86400000) % 3600000) / 60000;
  let totalSeconds = (((timeDifference % 86400000) % 3600000) % 60000) / 1000;

  // Update the countdown elements in the HTML with the calculated values
  days.textContent = Math.floor(totalDays);
  hours.textContent = Math.floor(totalHours);
  minutes.textContent = Math.floor(totalMinutes);
  seconds.textContent = Math.floor(totalSeconds);
}, 1000);
