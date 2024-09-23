// Selecting Elements
const searchInput = document.getElementById("searchInput");
const contactList = document.getElementById("contactList");

// Search Name event
searchInput.addEventListener("input", onSearch);

// Searching Contact Function
function onSearch() {
  const contactsArr = Array.from(contactList.children);
  contactsArr.forEach((contact) => {
    contact.style.display = contact
      .querySelector(".name")
      .textContent.trim()
      .toLowerCase()
      .includes(searchInput.value.trim().toLowerCase())
      ? "block"
      : "none";
  });
}
