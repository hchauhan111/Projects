// Select the search input element from the DOM
const searchInput = document.getElementById("search-input");

// Select the search button element from the DOM
const searchButton = document.getElementById("search-button");

// Select the results container element from the DOM where search results will be displayed
const results = document.getElementById("results");

// Add a click event listener to the search button
searchButton.addEventListener("click", showResults);

// Function to be called when the search button is clicked
function showResults() {
  // Get the value of the search input field
  const searchInputVal = searchInput.value;

  // Clear the previous results (if any) from the results container
  results.innerHTML = "";

  // If the search input is empty, show a message and stop further execution
  if (searchInputVal === "") {
    results.textContent = "Please enter something to search!";
    return;
  }

  // Show a loading message while the fetch request is in progress
  results.textContent = "Loading...";

  // Fetch data from Wikipedia's API using the search term entered by the user
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=${encodeURIComponent(
      searchInputVal
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      // Extract the search results from the response
      const resultsArr = data.query.search;

      // If no results are found, show a "Not Found" message
      if (!resultsArr.length) {
        results.textContent = "Not Found!";
        return;
      }

      // Clear the loading message and previous results
      results.innerHTML = "";

      // Loop through the array of search results
      resultsArr.forEach((result) => {
        // Append each result to the results container as a new HTML element
        results.innerHTML += `
        <div class="result-item">
          <a href=https://en.wikipedia.org/?curid=${result.pageid} target='_blank';>${result.title}</a>
          <p>${result.snippet}...</p>
        </div>`;
      });
    })
    .catch((err) => {
      // If an error occurs during the fetch request, display an error message
      results.textContent = `Error fetching data: ${err.message}`;
    });

  // Clear the search input field after the search is performed
  searchInput.value = "";
}
