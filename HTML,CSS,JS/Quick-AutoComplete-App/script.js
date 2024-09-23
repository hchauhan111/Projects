// Selecting elements
const searchInput = document.getElementById("search");
const resultList = document.getElementById("results");

// Event listener for input field
searchInput.addEventListener("keyup", filterData);

function filterData() {
  // Clear previous results
  resultList.innerHTML = "";

  // Variable to track if a result is found
  let isResultFound = false;

  // Storing search value in variable
  const searchInputValue = searchInput.value.trim().toLowerCase();

  // Only search if the input is not empty
  if (searchInputValue !== "") {
    data.forEach((dataObj) => {
      // Check if search term matches state or capital
      if (
        dataObj.state.toLowerCase().includes(searchInputValue) ||
        dataObj.capital.toLowerCase().includes(searchInputValue)
      ) {
        // Create and append list item
        const li = document.createElement("li");
        li.innerHTML = `<b>${dataObj.state}</b> - Capital: ${dataObj.capital}`;
        resultList.appendChild(li);

        // displaying state if clicked
        li.addEventListener("click", () => {
          searchInput.value = dataObj.state;
          resultList.innerHTML = ""; // Clear results on selection
        });

        isResultFound = true;
      }
    });

    // If no matching results were found
    if (!isResultFound) {
      resultList.innerHTML = `<li class='no-results'>No Result Found</li>`;
    }
  }
}
