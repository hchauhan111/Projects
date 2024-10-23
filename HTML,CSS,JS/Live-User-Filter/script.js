// Get references to the DOM elements
const filter = document.getElementById("filter");
const resultEl = document.getElementById("result");

// Initially display a loading spinner
resultEl.innerHTML = '<div class="loading-spinner"></div>';

// Fetch random user data
fetch("https://randomuser.me/api/?results=50")
  .then((res) => res.json())
  .then((data) => {
    resultEl.innerHTML = "";

    // Store the user data
    const results = data.results;

    // Iterate over each user
    results.forEach((user) => {
      // Create a new list item (li) for each user
      const li = document.createElement("li");

      // Set the inner HTML of the list item
      li.innerHTML = `<img src="${user.picture.large}" alt="${user.name.first}">
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>`;

      // Append the list item to the result container
      resultEl.appendChild(li);
    });
  });

// Add an input event listener to the filter field
filter.addEventListener("input", filterUser);

// Function to filter users based on input text
function filterUser() {
  // Convert users to an array and iterate over each user
  Array.from(resultEl.children).forEach((user) => {
    // Check if the user's text content includes the filter input
    if (
      !user.textContent.toLowerCase().includes(this.value.toLowerCase().trim())
    ) {
      // If the input doesn't match
      user.classList.add("hide");
      user.style.opacity = 0;
    } else {
      // If the input matches
      user.classList.remove("hide");
      user.style.opacity = 1;
    }
  });
}
