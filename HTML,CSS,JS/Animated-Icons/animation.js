// Get elements by their IDs
const link = document.getElementById("link");
const battery = document.getElementById("battery");
const hourglass = document.getElementById("hourglass");

// Function to toggle between link and broken link icons
const linkFunc = () => {
  // Array of class names representing different link states
  const linkStates = ["fa-solid fa-link", "fa-solid fa-chain-broken"];

  // Iterate over each link state with a delay
  linkStates.forEach((linkState, index) =>
    setTimeout(() => {
      // Change link icon based on the index, updating every second
      link.className = linkState;
    }, index * 1000)
  );
};

// Call linkFunc immediately to set the initial state and then every 2 seconds
linkFunc();
setInterval(linkFunc, 2000);

// Function to cycle through battery icons from empty to full
const batteryFunc = () => {
  // Array of class names representing different battery levels
  const batteryStates = [
    "fa-solid fa-battery-empty",
    "fa-solid fa-battery-quarter",
    "fa-solid fa-battery-half",
    "fa-solid fa-battery-three-quarters",
    "fa-solid fa-battery-full",
  ];

  // Iterate over each battery state with a delay
  batteryStates.forEach((batteryState, index) =>
    setTimeout(() => {
      // Change battery icon based on the index, updating every second
      battery.className = batteryState;
    }, index * 1000)
  );
};

// Call batteryFunc immediately and then every 5 seconds
batteryFunc();
setInterval(batteryFunc, 5000);

// Function to cycle through hourglass icons representing start, half, and end
const hourglassFunc = () => {
  // Array of class names representing different hourglass states
  const hourglassStates = [
    "fa-solid fa-hourglass-start",
    "fa-solid fa-hourglass-half",
    "fa-solid fa-hourglass-end",
  ];

  // Iterate over each hourglass state with a delay
  hourglassStates.forEach((hourglassState, index) =>
    setTimeout(() => {
      // Change hourglass icon based on the index, updating every second
      hourglass.className = hourglassState;
    }, index * 1000)
  );
};

// Call hourglassFunc immediately and then every 3 seconds
hourglassFunc();
setInterval(hourglassFunc, 3000);
