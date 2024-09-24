// Selecting elements
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const speakBtn = document.getElementById("speak-btn");

const synth = window.speechSynthesis;
let voices = [];

// Fetch and populate the list of voices
function getVoices() {
  voices = synth.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-name", voice.name);
    option.setAttribute("data-lang", voice.lang);
    voiceSelect.appendChild(option);
  });
}

// Ensure voices are loaded properly
getVoices();
if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = getVoices;

// Speak button event listener
speakBtn.addEventListener("click", speak);

function speak() {
  if (synth.speaking) {
    console.error("Already Speaking...");
    return;
  }

  const inputValue = textInput.value.trim();

  if (inputValue !== "") {
    const speakText = new SpeechSynthesisUtterance(inputValue);

    // Disable the button while speaking
    speakBtn.disabled = true;
    speakBtn.textContent = "Speaking...";

    speakText.onend = () => {
      console.log("Finished speaking");
      speakBtn.disabled = false;
      speakBtn.textContent = "Speak";
    };

    speakText.onerror = () => {
      console.log("Something went wrong");
      speakBtn.disabled = false;
      speakBtn.textContent = "Speak";
    };

    // Set the selected voice
    const selectedVoice =
      voiceSelect.selectedOptions[0].getAttribute("data-name");
    voices.forEach((voice) => {
      if (voice.name === selectedVoice) speakText.voice = voice;
    });

    // Speak the text
    synth.speak(speakText);
  }
}
