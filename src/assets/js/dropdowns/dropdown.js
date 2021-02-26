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
    dropdownMain.classList.remove("block");
    dropdownBtn.addEventListener("click", openDropdown);
  }
};

const backToMain = () => {
  dropdownMain.classList.add("block");
  themeBox.classList.remove("block");
};

const openThemeBox = () => {
  themeBox && themeBox.classList.add("block");
  dropdownMain.classList.remove("block");
  themeGoBack.addEventListener("click", backToMain);
};

const closeDropdown = () => {
  dropdownMain.classList.remove("block");
  if (themeBox.classList.contains("block")) themeBox.classList.remove("block");
  dropdownBtn.removeEventListener("click", closeDropdown);
  dropdownBtn.addEventListener("click", openDropdown);
};

const openDropdown = () => {
  dropdownMain.classList.add("block");
  themeBtn.addEventListener("click", openThemeBox);
  dropdownBtn.removeEventListener("click", openDropdown);
  dropdownBtn.addEventListener("click", closeDropdown);
};

const init = () => {
  dropdownBtn.addEventListener("click", openDropdown);
  document.addEventListener("click", closeAll);
};

init();
