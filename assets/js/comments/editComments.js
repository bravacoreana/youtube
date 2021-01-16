const commentBtns = document.querySelectorAll(".commentBtn-js");
const optionBtns = document.querySelectorAll(".commentOptions-js");

const handleOption = () => {
  console.log("hh");
};

const openOptions = (event) => {
  const optionList = event.target.parentNode.nextElementSibling;
  optionList.classList.toggle("show");
};

const init = () => {
  commentBtns.forEach((commentBtn) => {
    commentBtn.addEventListener("click", openOptions);
  });
};
if (commentBtns) init();

// const commentBtn = document.querySelectorAll(".commentBtn-js");
// const commentOptions = document.querySelector(".commentOptions-js");
// const editBtns = document.querySelectorAll(".commentEditBtn-js");

// const handleEditComment = () => {};

// const handleEditOptions = (event) => {
//   // const ul = event.target.nextElementSibling;
//   // if (ul.style.display === "none" || !ul.style.display) {
//   //   ul.style.display = "block";
//   // } else {
//   //   ul.style.display = "none";
//   // }
//   // editBtns.forEach((editBtn) => {
//   //   editBtn.addEventListener("click", handleEditComment);
//   // });
// };

// const init = () => {
//   // editOptions.forEach((editOption) => {
//   //   editOption.addEventListener("click", handleEditOptions);
//   // });
// };

// if (editBtns) {
//   init();
// }
