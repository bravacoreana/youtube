const editBtns = document.querySelectorAll(".commentEditBtn-js");

const handleEditOptions = (event) => {
  const ul = event.target.nextElementSibling;
  if (ul.style.display === "none" || !ul.style.display) {
    ul.style.display = "block";
  } else {
    ul.style.display = "none";
  }
};

const init = () => {
  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", handleEditOptions);
  });
};

if (editBtns) {
  init();
}
