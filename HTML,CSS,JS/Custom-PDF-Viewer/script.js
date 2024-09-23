// selecting elements
const nextPageBtn = document.getElementById("next-page");
const prevPageBtn = document.getElementById("prev-page");
const currentPage = document.getElementById("page-num");
const totalPage = document.getElementById("page-count");
const canvas = document.getElementById("pdf-render");
const pdfContainer = document.getElementById("pdf-container");

// pdf url
const url = "SAMPLE-PDF.pdf";

// global variables
let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 1,
  context = canvas.getContext("2d");

// render the page
function renderPage(num) {
  pageIsRendering = true;

  // get the page
  pdfDoc.getPage(num).then((page) => {
    // viewport
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // context object
    const renderContext = {
      canvasContext: context,
      viewport,
    };

    // render
    page.render(renderContext).promise.then(() => {
      pageIsRendering = false;
      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    // displaying current pageNumber
    currentPage.textContent = num;
  });
}

// check the page rendering
function queueRenderPage(num) {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
}

// go to next page
nextPageBtn.addEventListener("click", nextPage);
function nextPage() {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
}

// go to previous page
prevPageBtn.addEventListener("click", prevPage);
function prevPage() {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
}

// getting pdf document
pdfjsLib
  .getDocument(url)
  .promise.then((_pdfDoc) => {
    pdfDoc = _pdfDoc;

    // displaying total pageNumber
    totalPage.textContent = pdfDoc.numPages;
    renderPage(pageNum);
  })
  .catch((err) => {
    const errBar = document.createElement("div");
    errBar.className = "error-bar";
    errBar.appendChild(document.createTextNode(err.message));
    document.querySelector("body").insertBefore(errBar, pdfContainer);
    pdfContainer.style.display = "none";
  });
