const dropdown = document.getElementById("dropdown-js");
const dropdownContent = document.getElementById("dropdownContent-js");

const handleDropdown = () => {
  if (!dropdownContent.style.display) {
    dropdownContent.style.display = "block";
  } else if (dropdownContent.style.display === "none") {
    dropdownContent.style.display = "block";
  } else {
    dropdownContent.style.display = "none";
  }
};

const init = () => {
  dropdown.addEventListener("click", handleDropdown);
};

init();
