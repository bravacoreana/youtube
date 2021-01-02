const sidebar = document.getElementById("sidebar-js");
const sidebarBtn = document.getElementById("sidebarBtn-js");
const sidebarBtn2 = document.getElementById("sidebarBtn2-js");

const handleSidebar = () => {
  if (!sidebar.style.display) {
    sidebar.style.display = "block";
  } else if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
};

const init = () => {
  sidebarBtn.addEventListener("click", handleSidebar);
  sidebarBtn2.addEventListener("click", handleSidebar);
};

init();
