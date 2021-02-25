const searchIcon = document.querySelector(".search-js");
const items = document.querySelectorAll(".header-js");
const btn = document.querySelector(".headerBtn-js");
const sidebarBtn = document.querySelector(".sidebar-js");
const formBox = document.querySelector(".formBox-js");
const form = document.querySelector(".searchForm-js");
const screenWidth = window.matchMedia("screen and (min-width:652px)");

const searchInput = form.querySelector("input");

let arrowLeft;
const NEW_FORM_WIDTH = "100%";
const ORIGINAL_FORM_STYLE = "flex";
const ORIGINAL_FORM_WIDTH = "60%";

const closeFullSearch = () => {
  items.forEach((item) => {
    item.classList.remove("none");
  });
  formBox.style.width = ORIGINAL_FORM_WIDTH;
  form.style.display = "none";
  arrowLeft.removeEventListener("click", closeFullSearch);
  btn.removeChild(arrowLeft);
  sidebarBtn.style.display = "block";
};

const openFullSearch = () => {
  items.forEach((item) => {
    item.classList.add("none");
  });
  sidebarBtn.style.display = "none";
  arrowLeft = document.createElement("i");
  arrowLeft.classList.add("fas");
  arrowLeft.classList.add("fa-arrow-left");
  btn.appendChild(arrowLeft);
  formBox.style.width = NEW_FORM_WIDTH;
  if (!form.style.display || form.style.display === "none") {
    form.style.display = ORIGINAL_FORM_STYLE;
    form.style.width = NEW_FORM_WIDTH;
  }
  arrowLeft.addEventListener("click", closeFullSearch);
};

const toggleSearchBar = (event) => {
  if (event.matches) {
    form.style.display = ORIGINAL_FORM_STYLE;
    formBox.style.width = ORIGINAL_FORM_WIDTH;
    items.forEach((item) => {
      item.classList.remove("none");
    });
    if (arrowLeft) {
      arrowLeft.removeEventListener("click", closeFullSearch);
    }
    sidebarBtn.style.display = "block";
  } else {
    form.style.display = "none";
  }
};

const validateForm = () => {
  const searchBtn = form.querySelector("button");
  searchInput.value === ""
    ? (searchBtn.disabled = true)
    : (searchBtn.disabled = false);
};

const init = () => {
  searchIcon.addEventListener("click", openFullSearch);
  screenWidth.addEventListener("change", toggleSearchBar);
  form.addEventListener("submit", validateForm);
};

init();
