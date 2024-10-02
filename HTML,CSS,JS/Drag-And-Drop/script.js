// const dragItems = document.getElementById("dragItems");
// const dropZone = document.getElementById("dropZone");

// const item1 = document.getElementById("item1");
// const item2 = document.getElementById("item2");
// const item3 = document.getElementById("item3");

const items = document.querySelectorAll(".item");
const boxes = document.querySelectorAll(".box");

function itemFunc() {
  items.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      console.log("item dragged");
      console.log(e.target.id);
      e.dataTransfer.setData("text/plain", e.target.id);
    });
    item.addEventListener("dragend", () => {
      console.log("item releasd");
    });
  });

  boxes.forEach((box) => {
    box.addEventListener("dragover", (e) => {
      box.classList.add("dragover");
      e.preventDefault();
    });

    box.addEventListener("dragleave", () => box.classList.remove("dragover"));

    box.addEventListener("drop", (e) => {
      box.classList.remove("dragover");
      let selectedItem = e.dataTransfer.getData("text/plain");
      box.appendChild(document.getElementById(selectedItem));
    });
  });
}

itemFunc();
