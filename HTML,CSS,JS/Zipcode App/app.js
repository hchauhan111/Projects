const zipcode = document.getElementById("zipcode");
const searchBtn = document.getElementById("searchBtn");
const output = document.getElementById("output");

searchBtn.addEventListener("click", onsearch);

function onsearch() {
  let zipcodeValue = zipcode.value.trim();
  searchBtn.disabled = true;
  output.innerHTML = "";

  // Validate ZIP code input
  if (zipcodeValue === "" || zipcodeValue.length != 5 || isNaN(zipcodeValue)) {
    displayErr("Please enter a valid 5-digit ZIP code.");
    searchBtn.disabled = false;
    return;
  }

  // Fetch ZIP code data
  fetch(`https://api.zippopotam.us/us/${zipcodeValue}`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Invalid ZIP Code");
      }
      return res.json();
    })
    .then((data) => {
      output.innerHTML = `<p><b>City</b>: ${data.places[0]["place name"]}</p>
      
      <p><b>State</b>: ${data.places[0]["state"]}</p>
      
      <p><b>Longitude</b>: ${data.places[0]["longitude"]}</p>
      
      <p><b>Latitude</b>: ${data.places[0]["latitude"]}</p>`;
    })
    .catch((err) => {
      displayErr(`Invalid Zipcode. Please try again.`);
    })
    .finally(() => (searchBtn.disabled = false));
}

// Function to display error messages
function displayErr(msg) {
  const errMsg = document.createElement("p");
  errMsg.id = "error-message";
  errMsg.textContent = msg;
  output.appendChild(errMsg);
}
