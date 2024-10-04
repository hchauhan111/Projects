// Select all elements with the class "counter"
const counters = document.querySelectorAll(".counter");

// Define the speed of the counter increment
const speed = 200;

// Loop through each counter element
counters.forEach((counter) => {
  // Define the function that will update the counter's number
  const updateCount = () => {
    // Get the target value from the "data-target" attribute of the counter
    const target = +counter.getAttribute("data-target");

    // Get the current displayed number of the counter (convert to number using the '+' operator)
    const count = +counter.textContent;

    // Calculate the increment value based on the target and speed
    const inc = target / speed;

    // Check if the current count is less than the target value
    if (count < target) {
      // Update the counter display by adding the increment (and rounding up using Math.ceil)
      counter.textContent = Math.ceil(count + inc);

      // Use setTimeout to recursively call updateCount after a delay of 1 millisecond
      setTimeout(updateCount, 1);
    } else {
      // If the target is reached or exceeded, set the counter to the exact target value
      counter.textContent = target;
    }
  };

  // Start the counter update process
  updateCount();
});
