const dropdownBtn = document.getElementById("dropdownBtn-js");
const dropdownMain = document.getElementById("dropdownContent-js");
const themeBtn = document.getElementById("themeBtn-js");
const themeBox = document.getElementById("dropdownTheme-js");
const themeGoBack = document.getElementById("themeGoBack-js");

const closeAll = (event) => {
  const isClickMain = dropdownMain.contains(event.target);
  const isClickTheme = themeBox.contains(event.target);
  const isClickBtn = dropdownBtn.contains(event.target);
  if (!isClickMain && !isClickTheme && !isClickBtn) {
    dropdownMain.classList.remove("open-dropdown");
    dropdownBtn.addEventListener("click", openDropdown);
  }
};

const backToMain = () => {
  dropdownMain.classList.add("open-dropdown");
  themeBox.classList.remove("open-dropdown");
};

const openThemeBox = () => {
  themeBox && themeBox.classList.add("open-dropdown");
  dropdownMain.classList.remove("open-dropdown");
  themeGoBack.addEventListener("click", backToMain);
};

const closeDropdown = () => {
  dropdownMain.classList.remove("open-dropdown");
  if (themeBox.classList.contains("open-dropdown"))
    themeBox.classList.remove("open-dropdown");
  dropdownBtn.removeEventListener("click", closeDropdown);
  dropdownBtn.addEventListener("click", openDropdown);
};

const openDropdown = () => {
  dropdownMain.classList.add("open-dropdown");
  themeBtn.addEventListener("click", openThemeBox);
  dropdownBtn.removeEventListener("click", openDropdown);
  dropdownBtn.addEventListener("click", closeDropdown);
};

const init = () => {
  dropdownBtn.addEventListener("click", openDropdown);
  document.addEventListener("click", closeAll);
};

init();
