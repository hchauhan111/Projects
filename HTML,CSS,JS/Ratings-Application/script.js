// Get the product dropdown, rating input, rate button, star display spans, numeric ratings, and error alert elements
const productSelect = document.getElementById("productSelect");
const ratingInput = document.getElementById("ratingInput");
const rateButton = document.getElementById("rateButton");
const spans = document.querySelectorAll(".stars");
const numericRatings = document.querySelectorAll(".numeric-rating");
const productTable = document.querySelector("#productTable");
const errorAlert = document.querySelector(".error");

// Display the initial star ratings for all products
displayRating();

// Add click event listener to the rate button
rateButton.addEventListener("click", changeRating);

// Function to handle rating change when 'Rate' button is clicked
function changeRating() {
  // Get selected product and input rating values
  const productSelectValue = productSelect.value;
  const ratingInputValue = ratingInput.value;

  // Check if both the product and rating are entered
  if (productSelectValue !== "" && ratingInputValue !== "") {
    // Validate that the rating is between 1 and 5
    if (ratingInputValue > 5 || ratingInputValue < 1) {
      showErr("Enter a rating between 1-5.");
    } else {
      // Loop through each row of the product table
      Array.from(productTable.rows).forEach((row) => {
        // Find the row where the selected product matches
        if (productSelectValue === row.cells[0].textContent) {
          // Update the data-rating attribute and numeric rating display for the selected product
          row.cells[1].children[0].setAttribute(
            "data-rating",
            ratingInputValue
          );
          row.cells[1].children[1].textContent = ratingInputValue;

          // Refresh the star rating display after updating
          displayRating();
        }
      });
    }
  } else {
    // Show an error if required fields are not filled
    showErr("Please enter all fields.");
  }
}

// Function to display star ratings based on the data-rating attribute
function displayRating() {
  // Loop through each element with the class 'stars'
  spans.forEach((span) => {
    // Get the current rating from the data-rating attribute
    let rating = span.getAttribute("data-rating");
    let ratingInt = Math.floor(rating);
    let ratingFloat = Math.round(rating % ratingInt);

    // Clear existing stars before rendering new ones
    span.innerHTML = "";

    // Render full stars
    for (let i = 0; i < ratingInt; i++) {
      span.innerHTML += `<i class="fas fa-star star"></i>`;
    }

    // Render half star if rating has a decimal part >= 0.5
    let unratedStar = 5 - ratingInt;
    if (ratingFloat === 1) {
      span.innerHTML += `<i class="fas fa-star-half-alt star"></i>`;
      unratedStar--;
    }

    // Render empty stars for the remaining slots
    for (let i = 0; i < unratedStar; i++) {
      span.innerHTML += `<i class="far fa-star"></i>`;
    }
  });
}

// Function to display error messages in the alert box
function showErr(text) {
  // Set the error message text and make the error box visible
  errorAlert.innerHTML = `<strong>Error!</strong> ${text}`;
  errorAlert.style.display = "block";

  // Hide the error alert after 3 seconds
  setTimeout(() => (errorAlert.style.display = "none"), 3000);
}
