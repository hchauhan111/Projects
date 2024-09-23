const typewriterText = document.getElementById("typewriter-text");

const words = ["A Coder", "A Player", "A Student"];

// Initial variables
let typingSpeed = 200,
  deletingSpeed = 50,
  wordIndex = 0,
  charIndex = 0,
  isDeleting = false;

// Typewriter function
function typewriter() {
  const word = words[wordIndex];
  // Typing mode
  if (!isDeleting) {
    typewriterText.textContent = word.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === word.length) {
      setTimeout(() => {
        isDeleting = true;
        typewriter();
      }, 2000);
    } else {
      setTimeout(typewriter, typingSpeed);
    }
  } else {
    // Deleting mode
    typewriterText.textContent = word.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      if (wordIndex === words.length) {
        wordIndex = 0;
      }
      setTimeout(typewriter, 500);
    } else {
      setTimeout(typewriter, deletingSpeed);
    }
  }
}

typewriter();
