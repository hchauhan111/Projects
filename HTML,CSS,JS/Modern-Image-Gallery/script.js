const gallery = document.querySelector(".gallery");
const galleryImg = document.querySelectorAll(".gallery-img");
const figcaption = document.querySelectorAll("figcaption");
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxCaption = document.querySelector("#lightbox-caption");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

let imgIndex;

// Event listeners
gallery.addEventListener("click", showLightbox);
lightbox.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrevImg);
nextBtn.addEventListener("click", showNextImg);

function showLightbox(e) {
  if (e.target.classList.contains("gallery-img")) {
    galleryImg.forEach((image, index) => {
      if (image === e.target) {
        imgIndex = index;
      }
    });
    updateLightbox();
    lightbox.style.display = "flex";
  }
}

function closeLightbox(e) {
  if (e.target === lightbox || e.target.classList.contains("close"))
    lightbox.style.display = "none";
}

function showPrevImg() {
  imgIndex--;
  if (imgIndex < 0) imgIndex = galleryImg.length - 1;
  updateLightbox();
}

function showNextImg() {
  imgIndex++;
  if (imgIndex >= galleryImg.length) imgIndex = 0;
  updateLightbox();
}

function updateLightbox() {
  lightboxImg.src = galleryImg[imgIndex].src;
  lightboxCaption.textContent = figcaption[imgIndex].textContent;
}
