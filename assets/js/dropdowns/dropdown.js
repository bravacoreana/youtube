const dropdown = document.getElementById("dropdown-js");
const dropdownContent = document.getElementById("dropdownContent-js");
const themeBox = document.getElementById("dropdownTheme-js");

const handleDropdown = () => {
  if (!dropdownContent.style.display) {
    dropdownContent.style.display = "block";
  } else if (dropdownContent.style.display === "none") {
    if (themeBox.style.display === "block") {
      dropdownContent.style.display = "none";
      themeBox.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  } else {
    dropdownContent.style.display = "none";
  }
};

// const test = (event) => {
//   const targetElement = event.target;
//   console.log(targetElement);
// };

const init = () => {
  dropdown.addEventListener("click", handleDropdown);
  // document.addEventListener("click", test);
};

init();
