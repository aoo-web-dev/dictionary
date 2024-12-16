const sansSerif = document.querySelector(".sans-serif");
const serif = document.querySelector(".serif");
const monospace = document.querySelector(".monospace");
const defaultFont = document.querySelector("#defaultFont");

const saveFont = localStorage.getItem("fontFamily");
const saveDefaultFont = localStorage.getItem("defaultFont");

if (saveFont) {
  document.body.style.fontFamily = saveFont;
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = saveFont;
  });
}

if (saveDefaultFont) {
  defaultFont.textContent = saveDefaultFont;
}

sansSerif.addEventListener("click", () => {
  document.body.style.fontFamily = "sans-serif";
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = "sans-serif";
  });
  defaultFont.textContent = "Sans Serif";
  localStorage.setItem("fontFamily", "sans-serif");
  localStorage.setItem("defaultFont", "Sans Serif");
});

serif.addEventListener("click", () => {
  document.body.style.fontFamily = "serif";
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = "serif";
  });
  defaultFont.textContent = "Serif";
  localStorage.setItem("fontFamily", "serif");
  localStorage.setItem("defaultFont", "Serif");
});

monospace.addEventListener("click", () => {
  document.body.style.fontFamily = "monospace";
  document.querySelectorAll("body *").forEach((value) => {
    value.style.fontFamily = "monospace";
  });
  defaultFont.textContent = "Mono";
  localStorage.setItem("fontFamily", "monospace");
  localStorage.setItem("defaultFont", "Mono");
});
