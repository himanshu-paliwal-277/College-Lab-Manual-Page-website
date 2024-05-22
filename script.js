const pagesContainer = document.getElementById("pagesContainer");
const pageTemplate = document.getElementById("pageTemplate").content;

let addPageButton = document.getElementById("addPageButton");

addPageButton.addEventListener("click", () => {
  const newPage = document.importNode(pageTemplate, true);
  pagesContainer.appendChild(newPage);

  // Update references to dynamically added elements
  const newPageElement = pagesContainer.lastElementChild;

  const Subject_name_input = newPageElement.querySelector(
    ".Subject_name_input"
  );
  const Subject_code_span = newPageElement.querySelector(".Subject_code_span");
  const Subject_code_input = newPageElement.querySelector(
    ".Subject_code_input"
  );
  const Semester_span = newPageElement.querySelector(".Semester_span");
  const Semester_input = newPageElement.querySelector(".Semester_input");
  const Prof_name_span = newPageElement.querySelector(".Prof_name_span");
  const Prof_name_input = newPageElement.querySelector(".Prof_name_input");
  const Your_name_span = newPageElement.querySelector(".Your_name_span");
  const Your_name_input = newPageElement.querySelector(".Your_name_input");
  const Your_Roll_no_span = newPageElement.querySelector(".Your_Roll_no_span");
  const Your_Roll_no_input = newPageElement.querySelector(
    ".Your_Roll_no_input"
  );

  Subject_name_input.addEventListener("input", () => {
    if (Subject_name_input.value.length <= 20) {
      newPageElement.querySelector("h3").innerText = Subject_name_input.value;
    }
  });

  Subject_code_input.addEventListener("input", () => {
    if (Subject_code_input.value.length <= 10) {
      Subject_code_span.innerText = Subject_code_input.value;
    }
  });

  Semester_input.addEventListener("input", () => {
    if (Semester_input.value.length <= 3) {
      Semester_span.innerText = Semester_input.value;
    }
  });

  Prof_name_input.addEventListener("input", () => {
    if (Prof_name_input.value.length <= 20) {
      Prof_name_span.innerText = Prof_name_input.value;
    }
  });

  Your_name_input.addEventListener("input", () => {
    if (Your_name_input.value.length <= 20) {
      Your_name_span.innerText = Your_name_input.value;
    }
  });

  Your_Roll_no_input.addEventListener("input", () => {
    if (Your_Roll_no_input.value.length <= 12) {
      Your_Roll_no_span.innerText = Your_Roll_no_input.value;
    }
  });
});
setTimeout(() => {
  addPageButton.click();
}, 1000);

document.getElementById("downloadButton").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const pages = document.querySelectorAll(".page");

  Promise.all(
    Array.from(pages).map((page) =>
      html2canvas(page, { backgroundColor: "#ffffff", scale: 2 })
    )
  )
    .then((canvases) => {
      canvases.forEach((canvas, index) => {
        if (index > 0) {
          pdf.addPage();
        }
        const imgData = canvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      });
      pdf.save("lab-manual.pdf");
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
});
