/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
const dropdownContent = document.getElementById("dropdownContent-js");
const themeBtn = document.getElementById("themeBtn-js");
const themeDropdown = document.getElementById("dropdownTheme-js");
const goBackBtns = document.querySelectorAll(".goBack-js");
const preferBtn = document.getElementById("preferColorScheme-js");
const darkModeBtn = document.getElementById("darkColorScheme-js");
const lightModeBtn = document.getElementById("lightColorScheme-js");
const themeShow = document.getElementById("themeShow-js");

const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const darkModeSetting = localStorage.getItem("darkMode");

const handleGoBack = () => {
  dropdownContent.style.display = "block";
  themeDropdown.style.display = "none";
};

const handlePreferMode = () => {
  if (darkModeSetting) {
    localStorage.removeItem("darkMode");
  }
  if (userPrefersDark) {
    document.body.classList.add("darkmode");
  } else {
    document.body.classList.remove("darkmode");
  }
  if (themeShow) {
    themeShow.innerText = "Appearance: Device theme";
  }
};

const handleDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
  if (themeShow) {
    themeShow.innerText = "Appearance: Dark theme";
  }
};

const handleLightMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", "disabled");
  if (themeShow) {
    themeShow.innerText = "Appearance: Light theme";
  }
};

const handleTheme = () => {
  dropdownContent.style.display = "none";
  themeDropdown.style.display = "block";
};

const firstLoadColorScheme = () => {
  if (darkModeSetting) {
    darkModeSetting === "enabled" ? handleDarkMode() : handleLightMode();
  } else {
    handlePreferMode();
  }
};

const colorScheme = () => {
  preferBtn.addEventListener("click", handlePreferMode);
  darkModeBtn.addEventListener("click", handleDarkMode);
  lightModeBtn.addEventListener("click", handleLightMode);
};

const moveOption = () => {
  themeBtn.addEventListener("click", handleTheme);
  for (let i = 0; i < goBackBtns.length; i++) {
    goBackBtns[i].addEventListener("click", handleGoBack);
  }
};

const init = () => {
  moveOption();
  firstLoadColorScheme();
  colorScheme();
};

init();
