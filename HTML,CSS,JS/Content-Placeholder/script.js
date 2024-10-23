// Grabbing elements from the DOM
const header = document.getElementById("header");
const title = document.getElementById("title");
const name = document.getElementById("name");
const date = document.getElementById("date");
const excerpt = document.getElementById("excerpt");
const profileImg = document.getElementById("profile_img");
const animatedBgElements = document.querySelectorAll(".animated-bg");
const animatedBgTextElements = document.querySelectorAll(".animated-bg-text");

// Setting a timeout
setTimeout(() => {
  updateContent();
}, 2500);

// Function to update the content of the webpage
function updateContent() {
  // Remove the "animated-bg" class
  animatedBgElements.forEach((bg) => bg.classList.remove("animated-bg"));

  // Remove the "animated-bg-text" class
  animatedBgTextElements.forEach((bgText) =>
    bgText.classList.remove("animated-bg-text")
  );

  // Update the header element
  header.innerHTML = `<img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80" alt="" />`;

  // Update the title
  title.innerHTML = "Lorem ipsum dolor sit amet";

  // Update the excerpt
  excerpt.innerHTML =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore perferendis";

  // Update the profile image
  profileImg.innerHTML =
    '<img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" />';

  // Update the name field
  name.innerHTML = "John Doe";

  // Update the date field
  date.innerHTML = "Oct 08, 2020";
}
