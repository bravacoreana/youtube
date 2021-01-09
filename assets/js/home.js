const sidebar = document.getElementById("sidebar-js");
const sidebarMini = document.getElementById("sidebarMini-js");
const btnBar = document.getElementById("sidebarBtn-js");
const boxContainer = document.getElementById("homeContainer-js");
const wrap = document.getElementById("videoWrap-js");

const mediaQueryListXSmall = window.matchMedia("screen and (max-width:1056px)");
const mediaQueryListMedium = window.matchMedia(
  "screen and (min-width:1056px) and (max-width:1729px)"
);
const mediaQueryListLarge = window.matchMedia("screen and (min-width:1730px)");

const handleMainBox = () => {
  if (boxContainer) {
    if (boxContainer.offsetWidth > 2100) {
      wrap.style.gridTemplateColumns = "repeat(6,1fr)";
    } else if (boxContainer.offsetWidth > 1566) {
      wrap.style.gridTemplateColumns = "repeat(5,1fr)";
    } else if (boxContainer.offsetWidth > 1180) {
      wrap.style.gridTemplateColumns = "repeat(4,1fr)";
    } else if (boxContainer.offsetWidth > 873) {
      wrap.style.gridTemplateColumns = "repeat(3,1fr)";
    } else if (boxContainer.offsetWidth > 400) {
      wrap.style.gridTemplateColumns = "repeat(2,1fr)";
    } else {
      wrap.style.gridTemplateColumns = "repeat(1,1fr)";
    }
  }
};

const mainBox = () => {
  window.addEventListener("resize", handleMainBox);
};

const firstLoad = () => {
  if (wrap) {
    if (window.innerWidth < "480") {
      wrap.style.gridTemplateColumns = "repeat(1,1fr)";
    } else if (window.innerWidth < "768") {
      wrap.style.gridTemplateColumns = "repeat(2,1fr)";
    } else if (window.innerWidth < "1128") {
      wrap.style.gridTemplateColumns = "repeat(3,1fr)";
    } else if (window.innerWidth < "1952") {
      wrap.style.gridTemplateColumns = "repeat(4,1fr)";
    } else if (window.innerWidth < "2288") {
      wrap.style.gridTemplateColumns = "repeat(5,1fr)";
    } else if (window.innerWidth > "2288") {
      wrap.style.gridTemplateColumns = "repeat(6,1fr)";
    } else {
      console.log("ERROR AT LOADING GRID TEMPLATE COLUMNS");
    }
    if (window.innerWidth < 1056) {
      sidebarMini.style.display = "none";
      sidebar.style.display = "none";
    } else if (window.innerWidth < 1730) {
      sidebarMini.style.display = "block";
      sidebar.style.display = "none";
    } else {
      sidebarMini.style.display = "none";
      sidebar.style.display = "block";
    }
    mainBox();
  }
};

const handleSidebar = () => {
  if (mediaQueryListXSmall.matches && sidebar.style.display === "block") {
    sidebar.style.display = "none";
    sidebarMini.style.display = "none";
  } else if (mediaQueryListXSmall.matches && sidebar.style.display === "none") {
    sidebar.style.display = "block";
    sidebarMini.style.display = "none";
  } else if (
    mediaQueryListMedium.matches &&
    sidebar.style.display === "block"
  ) {
    sidebar.style.display = "none";
    sidebarMini.style.display = "block";
    sidebarMini.style.visibility = "visible";
  } else if (mediaQueryListMedium.matches && sidebar.style.display === "none") {
    sidebar.style.display = "block";
    sidebarMini.style.display = "none";
  } else if (mediaQueryListLarge.matches && sidebar.style.display === "block") {
    sidebar.style.display = "none";
    sidebarMini.style.display = "block";
    sidebarMini.style.visibility = "visible";
  } else if (mediaQueryListLarge.matches && sidebar.style.display === "none") {
    sidebar.style.display = "block";
    sidebarMini.style.display = "none";
  } else {
    console.log("ERROR AT LOADING SIDEBAR");
  }
  mainBox();
  handleMainBox();
};

const mediaQueryXSmall = (event) => {
  if (event.matches) {
    sidebarMini.style.display = "none";
  } else {
    sidebarMini.style.display = "block";
  }
};

const mediaQueryMedium = (event) => {
  if (event.matches) {
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
const init = () => {
  btnBar.addEventListener("click", handleSidebar);
  firstLoad();
  mediaQueryListXSmall.addEventListener("change", mediaQueryXSmall, false);
  mediaQueryListMedium.addEventListener("change", mediaQueryMedium, false);
  mediaQueryListLarge.addEventListener("change", mediaQueryLarge, false);
  handleMainBox();
};
init();
