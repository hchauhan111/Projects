// Select necessary DOM elements for buttons, input fields, and other UI components
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const inputField = document.getElementById("input-field");
const inputLabel = document.getElementById("input-label");
const inputProgress = document.getElementById("input-progress");
const progressBar = document.getElementById("progress-bar");
const inputGroup = document.getElementById("input-group");
const formBox = document.getElementById("form-box");

// Array of questions for the multi-step form
const ques = [
  { question: "Enter Your First Name", type: "text" },
  { question: "Enter Your Last Name", type: "text" },
  { question: "Enter Your Email", type: "text", mode: "email" },
  { question: "Enter Your Password", type: "password" },
];

let quesIndex = 0;

// Initialize the first question when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", startingQues);

// Event listener for the 'Next' button click
nextBtn.addEventListener("click", () => {
  // If the current input field is text
  if (inputField.getAttribute("type") === "text") {
    // If the input field is empty, show error
    if (inputField.value.trim() === "") {
      errEffect();
    }
    // If the current question requires email validation
    else if (ques[quesIndex].mode === "email") {
      if (validEmail.test(inputField.value)) {
        mainFunc();
        successEffect();
        return;
      } else {
        errEffect();
      }
    } else {
      mainFunc();
      successEffect();
    }
  }
  // If the input type is password
  else {
    mainFunc();
    successEffect();
  }
});

// Regular expression for basic email validation
const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Event listener for pressing 'Enter' in the input field
inputField.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    // Similar logic as the 'Next' button, handling input submission
    if (inputField.getAttribute("type") === "text") {
      if (inputField.value.trim() === "") {
        errEffect();
      } else if (ques[quesIndex].mode === "email") {
        if (validEmail.test(inputField.value)) {
          mainFunc();
          successEffect();
          return;
        } else {
          errEffect();
        }
      } else {
        if (quesIndex === 0)
          inputGroup.setAttribute("data-userName", inputField.value);
        mainFunc();
        successEffect();
      }
    }
    // Handling password input field submission
    else if (inputField.getAttribute("type") === "password") {
      if (inputField.value.trim() === "") {
        errEffect();
      } else {
        mainFunc();
        successEffect();
      }
    }
  }
});

// Function to initialize the first question
function startingQues() {
  prevBtn.className = "fas fa-user";
  prevBtn.style.pointerEvents = "none";
  inputField.setAttribute("type", ques[quesIndex].type);
  inputGroup.style.opacity = 1;
  inputLabel.textContent = ques[quesIndex].question;
  inputProgress.style.width = "100%";
}

// Error effect function: shakes the form box to indicate an error
function errEffect() {
  formBox.classList.add("error");
  formBox.style.transform = "translateX(12px)";
  setTimeout(() => {
    formBox.style.transform = "translateX(-24px)";
  }, 100);
  setTimeout(() => {
    formBox.style.transform = "translateX(24px)";
  }, 200);
  setTimeout(() => {
    formBox.style.transform = "translateX(-24px)";
  }, 300);
  setTimeout(() => {
    formBox.style.transform = "translateX(24px)";
  }, 400);
  setTimeout(() => {
    formBox.style.transform = "translateX(0px)";
  }, 500);
}

// Success effect function: slightly moves the form box to indicate success
function successEffect() {
  formBox.classList.remove("error");
  formBox.style.transform = "translateY(2px)";
  setTimeout(() => {
    formBox.style.transform = "translateY(0px)";
  }, 100);
}

// Main function to switch between questions and update the UI
function mainFunc() {
  inputField.value = "";
  quesIndex++;
  prevBtn.className = "fas fa-arrow-left";
  prevBtn.style.pointerEvents = "all";
  progressBar.style.width = `${(100 / ques.length) * quesIndex}%`;

  // If there are more questions to display
  if (quesIndex < ques.length) {
    inputField.setAttribute("type", ques[quesIndex].type);
    inputLabel.textContent = ques[quesIndex].question;

    // Reset and animate the progress indicator
    inputProgress.style.transition = "none";
    inputProgress.style.width = 0;
    setTimeout(() => {
      inputProgress.style.transition = " width 0.4s ease-in-out";
      inputProgress.style.width = "100%";
    }, 50);
  }
  // If no more questions, display the completion message
  else if (quesIndex < 0) {
    errEffect();
  } else {
    formBox.classList.add("close");
    const endMsg = document.createElement("h1");
    // Create a thank-you message with the user's first name capitalized
    endMsg.textContent = `Thanks ${
      inputGroup.getAttribute("data-userName")[0].toUpperCase() +
      inputGroup.getAttribute("data-userName").slice(1)
    } You are registered and will get an email shortly`;
    endMsg.classList.add("end");
    setTimeout(() => {
      formBox.parentElement.appendChild(endMsg);
      setTimeout(() => (endMsg.style.opacity = 1), 100);
    }, 1000);
  }
}

// Event listener for the 'Previous' button click
prevBtn.addEventListener("click", () => {
  quesIndex -= 2;
  mainFunc();

  // If at the start, reinitialize the first question
  if (quesIndex === 0) {
    startingQues();
    successEffect();
    return;
  }
  successEffect();
});
