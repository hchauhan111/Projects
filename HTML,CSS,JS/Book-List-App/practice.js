// selecting elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const isbn = document.getElementById("isbn");
const submitBtn = document.getElementById("submit");
const bookTable = document.getElementById("book-list");
const alertBox = document.getElementById("alert-box");

// book add event
submitBtn.addEventListener("click", addBookToStorage);

// book add function
function addBookToStorage() {
  let titleValue = title.value;
  let authorValue = author.value;
  let isbnValue = isbn.value;

  // form validation
  if (titleValue === "" || authorValue === "" || isbnValue === "") {
    alertBox.innerHTML = `
    <span id="alert-message">Fill all the fields</span>
    `;
    alertBox.classList.add("alert-warning");
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
      alertBox.classList.remove("alert-warning");
    }, 3 * 1000);
  } else {
    // Adding book to localStorage
    const bookArr = JSON.parse(localStorage.getItem("books")) || [];
    bookArr.push({
      title: titleValue,
      author: authorValue,
      isbn: isbnValue,
    });
    localStorage.setItem("books", JSON.stringify(bookArr));

    // clearing input fields
    title.value = "";
    author.value = "";
    isbn.value = "";

    // running book display function
    displayBooks();
    bookAddAlert();
  }
}

// book display function
function displayBooks() {
  bookTable.tBodies[0].innerHTML = "";
  const bookArr = JSON.parse(localStorage.getItem("books")) || [];
  bookArr.forEach((book) => {
    const bookRow = document.createElement("tr");
    bookRow.setAttribute("data-isbn", book.isbn);
    bookRow.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><button class="delete">X</button></td>`;
    bookTable.tBodies[0].appendChild(bookRow);
  });
}

// book delete event
bookTable.tBodies[0].addEventListener("click", deleteBook);

// book delete function
function deleteBook(e) {
  if (e.target.classList.contains("delete")) {
    const row = e.target.closest("tr");

    // removing book row from table
    row.remove();

    // removing book from localStorage
    const deletedIsbn = row.getAttribute("data-isbn");
    const bookArr = JSON.parse(localStorage.getItem("books")) || [];
    bookArr.splice(
      bookArr.findIndex((book) => book.isbn === deletedIsbn),
      1
    );
    localStorage.setItem("books", JSON.stringify(bookArr));
  }
  bookRemoveAlert();
}

// Running book display function on page load
document.addEventListener("DOMContentLoaded", displayBooks);

// book added alert function
function bookAddAlert() {
  alertBox.innerHTML = `
    <span id="alert-message">Book Added Successfully!!</span>
    `;
  alertBox.classList.add("alert-success");
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
    alertBox.classList.remove("alert-success");
  }, 3 * 1000);
}

// book removed alert function
function bookRemoveAlert() {
  alertBox.innerHTML = `
    <span id="alert-message">Book Removed Successfully!!</span>
    `;
  alertBox.classList.add("alert-danger");
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
    alertBox.classList.remove("alert-danger");
  }, 3 * 1000);
}
