// Get references to HTML elements
const generateForm = document.getElementById("generate-form");
const urlEl = document.getElementById("url");
const sizeEl = document.getElementById("size");
const notification = document.getElementById("notification");
const spinner = document.getElementById("spinner");
const qrcode = document.getElementById("qrcode");
const generated = document.getElementById("generated");

// Attach event listener to the form submit event
generateForm.addEventListener("submit", generateQR);

// Main function to handle QR code generation
function generateQR(e) {
  e.preventDefault();

  // Get values from input fields
  const url = urlEl.value;
  const size = sizeEl.value;

  showSpinner();
  qrcode.innerHTML = "";

  // Simulate loading delay, then generate the QR code
  setTimeout(() => {
    hideSpinner();
    createQR(url, size);

    // Short delay before showing the download button
    setTimeout(() => saveImg(), 50);
  }, 1000);

  // Remove any existing save button
  const oldSaveBtn = document.getElementById("save-btn");
  if (oldSaveBtn) {
    oldSaveBtn.remove();
  }
}

// Show the loading spinner
function showSpinner() {
  spinner.style.display = "block";
}

// Hide the loading spinner
function hideSpinner() {
  spinner.style.display = "none";
}

// Function to create a QR code
function createQR(url, size) {
  const qr = new QRCode("qrcode", {
    text: url,
    height: size,
    width: size,
  });
}

// Function to save the QR code image
function saveImg() {
  const url = document.querySelector("#qrcode img").src;
  const saveBtn = document.createElement("a");
  saveBtn.innerText = "Save Image";
  text;
  saveBtn.id = "save-btn";
  saveBtn.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5 cursor-pointer"; // Apply styling classes
  saveBtn.href = url;
  saveBtn.download = "qrcode.png";
  generated.appendChild(saveBtn);
}
