// Selecting elements
const siteName = document.getElementById("siteName");
const siteURL = document.getElementById("siteURL");
const bookmarkForm = document.getElementById("bookmarkForm");
const bookmarksList = document.getElementById("bookmarksList");

// adding event to submit button
bookmarkForm.addEventListener("submit", addBookmark);

// Function to add Bookmark
function addBookmark(e) {
  // preventing form submit
  e.preventDefault();

  // input values
  const siteNameValue = siteName.value;
  const siteURLValue = siteURL.value;

  // adding bookmarks to localStorage
  let bookmarkArr = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const bookmarkObj = {
    name: siteNameValue,
    url: siteURLValue,
  };
  bookmarkArr.push(bookmarkObj);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));

  displayBookmark(bookmarkArr);

  // Clearing input fields after adding bookmark
  siteName.value = "";
  siteURL.value = "";
}

// function to display bookmark to UI
function displayBookmark(arr) {
  // clearing existing bookmarks
  bookmarksList.innerHTML = "";
  arr.forEach((obj, index) => {
    bookmarksList.innerHTML += `<div class="bookmark">
      <a href='${obj.url}' target='_blank'>${obj.name}</a>
      <button onclick='deleteBookmark(${index})'>Delete</button>
    </div>`;
  });
}

// function to delete bookmark
function deleteBookmark(index) {
  let bookmarkArr = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarkArr.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
  displayBookmark(bookmarkArr);
}

// displaying data on page reload
document.addEventListener("DOMContentLoaded", () => {
  let bookmarkArr = JSON.parse(localStorage.getItem("bookmarks")) || [];
  displayBookmark(bookmarkArr);
});
