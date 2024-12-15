const sansSerif = document.querySelector(".sans-serif");
const serif = document.querySelector(".serif");
const monospace = document.querySelector(".monospace");
const defFonts = document.querySelector("#defFont");

const saveFonts = localStorage.getItem("fontFamily");
const saveDefFont = localStorage.getItem("defFont");

if (saveFonts) {
  document.body.style.fontFamily = saveFonts;
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = saveFonts;
  });
}

if (saveDefFont) {
  defFonts.textContent = saveDefFont;
}

sansSerif.addEventListener("click", () => {
  document.body.style.fontFamily = "sans-serif";
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = "sans-serif";
  });
  defFonts.textContent = "Sans Serif";
  localStorage.setItem("fontFamily", "sans-serif");
  localStorage.setItem("defFont", "Sans Serif");
});

serif.addEventListener("click", () => {
  document.body.style.fontFamily = "serif";
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = "serif";
  });
  defFonts.textContent = "Serif";
  localStorage.setItem("fontFamily", "serif");
  localStorage.setItem("defFont", "Serif");
});

monospace.addEventListener("click", () => {
  document.body.style.fontFamily = "monospace";
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = "monospace";
  });
  defFonts.textContent = "Mono";
  localStorage.setItem("fontFamily", "monospace");
  localStorage.setItem("defFont", "Mono");
});
