const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const limit = document.getElementById("limit");
const sort = document.getElementById("sort");
const results = document.getElementById("results");

searchForm.addEventListener("submit", onSearch);

function onSearch(e) {
  e.preventDefault();

  let searchInputValue = searchInput.gitvalue.trim();
  let limitValue = limit.value;
  let sortValue = sort.value;

  // Clear previous results
  results.innerHTML = "";
  showLoading();

  // Fetch data from Reddit API
  fetch(
    `https://www.reddit.com/search.json?q=${encodeURIComponent(
      searchInputValue
    )}&sort=${sortValue}&limit=${limitValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      // Clear the loading message
      results.innerHTML = ``;

      // Check if there are results
      if (data.data.children.length === 0) {
        showNoResults();
        return;
      }

      // Display the posts
      data.data.children.forEach((post) => {
        displayCards(post);
      });

      // Clear the search input
      searchInput.value = "";
    })
    .catch((error) => {
      results.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
    });
}

// Function to show a 'No results found' message
function showNoResults() {
  results.innerHTML = `<p class="no-results">No results found. Try another search.</p>`;
}

// Function to show a loading message
function showLoading() {
  results.innerHTML = `<p class="loading">Loading...</p>`;
}

// Function to truncate text to a specific word limit
function truncateText(text, limit) {
  const postText = text.split(" ");
  if (postText.length > limit) {
    return postText.slice(0, limit).join(" ") + "...";
  }
  return text;
}

// Function to display a single post
function displayCards(post) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
        <h2>${post.data.title}</h2>
        <p>${truncateText(post.data.selftext, 50)}</p>
        <a href="${post.data.url}" target="_blank">Read More</a>`;

  results.appendChild(card);
}
