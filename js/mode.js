const mode = document.querySelector("#dark-mode");

const darkModeSetting = JSON.parse(localStorage.getItem("darkMode"));

if (darkModeSetting) {
  mode.checked = true;
  document.body.classList.add("dark");
}

mode &&
  mode.addEventListener("click", function () {
    if (mode.checked) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", JSON.stringify(true));
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", JSON.stringify(false));
    }
  });
