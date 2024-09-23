// selecting elements
const weightInput = document.getElementById("weightInput");
const unitSelect = document.getElementById("unitSelect");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");

// weight convert event
convertBtn.addEventListener("click", onConvert);

// Weight Convert Function
function onConvert() {
  // converting input to number
  const weight = Number.parseFloat(weightInput.value);

  // form validation
  if (!isNaN(weight) && weight >= 0) {
    // calling function according to conversion
    if (unitSelect.value === "kg") {
      kgToLb();
    } else {
      lbToKg();
    }
  } else {
    result.textContent = `Enter a Valid Weight`;
  }
}

// kg to lb function
function kgToLb() {
  const convertedValue = Math.round(weightInput.value * 2.205 * 1000) / 1000;
  result.textContent = `Converted Weight: ${convertedValue} pounds`;
}

// lb to kg function
function lbToKg() {
  const convertedValue = Math.round((weightInput.value / 2.205) * 1000) / 1000;
  result.textContent = `Converted Weight: ${convertedValue} kilograms`;
}
