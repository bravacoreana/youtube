import axios from "axios";

// const commentContainer = document.getElementById("commentContainer-js");
const commentBtns = document.querySelectorAll(".commentBtn-js");
// const optionBtns = document.querySelectorAll(".commentOptions-js");

const processDeleteComment = (commentList) => {
  commentList.parentNode.removeChild(commentList);
};

const handleDeleteComment = async (target) => {
  const commentList = target.parentNode.parentNode.parentNode.parentNode;
  const commentId = commentList.id;
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId,
    },
  })
    .then(() => {
      processDeleteComment(commentList);
    })
    .catch((error) => {
      console.log(error);
    });
  // if (response.status === 200) {
  //   console.log("gagaga");
  // }
};

const handleEditComment = (target) => {
  console.log(target);
};

const handleOption = (event) => {
  if (event.target.innerText.includes("Edit")) handleEditComment(event.target);
  if (event.target.innerText.includes("Delete"))
    handleDeleteComment(event.target);
};

const openOptions = (event) => {
  const optionList = event.target.parentNode.nextElementSibling;
  optionList.classList.toggle("show");
  optionList.addEventListener("mouseleave", () => {
    optionList.classList.remove("show");
  });
  optionList.addEventListener("click", handleOption);
};

const init = () => {
  commentBtns.forEach((commentBtn) => {
    commentBtn.addEventListener("click", openOptions);
  });
};

if (commentBtns) init();
