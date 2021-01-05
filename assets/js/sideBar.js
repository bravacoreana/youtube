const sidebar = document.getElementById("sidebar-js");
const sidebarBtn = document.getElementById("sidebarBtn-js");
const sidebarMini = document.getElementById("sidebarMini-js");
const mediaQueryListXSmall = window.matchMedia("(max-width:750px)");
const mediaQueryListSmall = window.matchMedia("(max-width:1200px)");
const mediaQueryListLarge = window.matchMedia("(min-width:1200px)");

const handleSidebar = () => {
  if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
    sidebarMini.style.display = "none";
  } else if (
    sidebar.style.display === "block" &&
    mediaQueryListXSmall.matches
  ) {
    sidebar.style.display = "none";
    sidebarMini.style.display = "none";
  } else if (sidebar.style.display === "block" && mediaQueryListSmall.matches) {
    sidebar.style.display = "none";
    sidebarMini.style.display = "block";
  } else {
    sidebar.style.display = "none";
    sidebarMini.style.display = "block";
  }
};

const firstLoading = () => {
  if (mediaQueryListXSmall.matches) {
    sidebarMini.style.display = "none";
    sidebar.style.display = "none";
  } else if (mediaQueryListSmall.matches) {
    sidebarMini.style.display = "block";
    sidebar.style.display = "none";
  } else {
    sidebarMini.style.display = "none";
    sidebar.style.display = "block";
  }
};

const mediaQueryXSmall = (event) => {
  if (event.matches) {
    sidebarMini.style.display = "none";
  } else {
    sidebarMini.style.display = "block";
  }
};

const mediaQueryLarge = (event) => {
  if (event.matches) {
    sidebar.style.display = "block";
    sidebarMini.style.display = "none";
  } else {
    sidebar.style.display = "none";
  }
};

const mediaQuerySmall = (event) => {
  if (event.matches) {
    sidebarMini.style.display = "block";
  } else {
    sidebarMini.style.display = "none";
  }
};

const init = () => {
  firstLoading();
  sidebarBtn.addEventListener("click", handleSidebar);
  mediaQueryListXSmall.addEventListener("change", mediaQueryXSmall, false);
  mediaQueryListSmall.addEventListener("change", mediaQuerySmall, false);
  mediaQueryListLarge.addEventListener("change", mediaQueryLarge, false);
};

init();
