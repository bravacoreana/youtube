const search = document.querySelector(".search-js");
const items = document.querySelectorAll(".header-js");
const btn = document.querySelector(".headerBtn-js");
const formBox = document.querySelector(".formBox-js");
const form = document.querySelector(".searchForm-js");
const screenWidth = window.matchMedia("screen and (min-width:652px)");

const newForm = `
    <form action="/results" method="get" id="searchForm" class="full-search">
      <input type="text" placeholder="Search"
      name="search_query" autocomplete="off" id="searchFormInput"><button type="submit"><i class="fas fa-search"></i></button></form>
    `;

const closeFullSearch = () => {
  items.forEach((item) => {
    item.classList.remove("none");
  });
  formBox.style.width = "60%";
  form.style.display = "none";
  btn.innerHTML = '<i class="fas fa-bars" id="sidebarBtn-js"></i>';
  btn.removeEventListener("click", closeFullSearch);
};

const openFullSearch = () => {
  items.forEach((item) => {
    item.classList.add("none");
  });
  btn.innerHTML = '<i class="fas fa-arrow-left"></i>';
  formBox.style.width = "100%";
  if (!form.style.display || form.style.display === "none") {
    form.style.display = "flex";
    form.style.width = "100%";
  }
  btn.addEventListener("click", closeFullSearch);
};

const toggleSearchBar = (event) => {
  if (event.matches) {
    form.style.display = "flex";
    formBox.style.width = "60%";
    items.forEach((item) => {
      item.classList.remove("none");
    });
    btn.innerHTML = '<i class="fas fa-bars" id="sidebarBtn-js"></i>';
    btn.removeEventListener("click", closeFullSearch);
  } else {
    form.style.display = "none";
  }
};

const init = () => {
  search.addEventListener("click", openFullSearch);
  screenWidth.addEventListener("change", toggleSearchBar);
};

init();
