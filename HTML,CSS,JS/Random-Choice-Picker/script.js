const textarea = document.getElementById("textarea");
const selectBtn = document.getElementById("selectBtn");
const tags = document.getElementById("tags");

textarea.addEventListener("input", showChoices);
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    chooseRandom();
    e.preventDefault();
  }
});
selectBtn.addEventListener("click", chooseRandom);

function showChoices() {
  tags.innerHTML = "";
  let choices = this.value.split(",");
  choices.forEach((choice) => {
    if (choice.trim() === "") return;
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.textContent = choice;
    tags.appendChild(tag);
  });
}

function chooseRandom() {
  let timerId = setInterval(() => {
    const randomTag = pickRandom();
    if (randomTag) {
      highlightTag(randomTag);
    }
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(timerId);
    const randomTag = pickRandom();
    highlightTag(randomTag);
  }, 3000);
}

function pickRandom() {
  const choices = tags.children;
  return choices[Math.floor(Math.random() * tags.children.length)];
}

function highlightTag(choice) {
  choice.classList.add("highlight");
}

function unHighlightTag(choice) {
  choice.classList.remove("highlight");
}
