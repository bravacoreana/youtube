const darkModeSetting = localStorage.getItem("darkMode");
const themeShow = document.getElementById("themeShow-js");
const preferBtn = document.getElementById("preferColorScheme-js");
const darkModeBtn = document.getElementById("darkColorScheme-js");
const lightModeBtn = document.getElementById("lightColorScheme-js");

const userPrefersDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const handleDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
  if (themeShow) themeShow.innerText = "Appearance: Dark theme";
};

const handleLightMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", "disabled");
  if (themeShow) themeShow.innerText = "Appearance: Light theme";
};

const handlePreferMode = () => {
  if (darkModeSetting) localStorage.removeItem("darkMode");
  userPrefersDark
    ? document.body.classList.add("darkmode")
    : document.body.classList.remove("darkmode");
  if (themeShow) themeShow.innerText = "Appearance: Device theme";
};

const colorScheme = () => {
  preferBtn.addEventListener("click", handlePreferMode);
  darkModeBtn.addEventListener("click", handleDarkMode);
  lightModeBtn.addEventListener("click", handleLightMode);
};

const firstLoadColorScheme = () => {
  if (darkModeSetting)
    darkModeSetting === "enabled" ? handleDarkMode() : handleLightMode();
  else handlePreferMode();
};

const init = () => {
  firstLoadColorScheme();
  colorScheme();
};
init();
