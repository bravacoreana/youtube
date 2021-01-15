import axios from "axios";

const addCommentForm = document.getElementById("addComment-js");
const commentContainer = document.getElementById("commentContainer-js");

// const countComment = document.getElementById("countComment-js");
// const commentList = document.getElementById("commentList-js");

const increaseCountComment = () => {};

const createComment = (comment) => {
  const username = document.getElementById("username").innerText;
  const userAvatar = document.getElementById("userAvatar").getAttribute("src");
  const userDetail = document.getElementById("userDetail").getAttribute("href");
  const apiComment = `
  <li class="comment" id="coomentList-js">
  <div class="comment__creator-avatar">
    <a href="${userDetail}">
      <img src="${userAvatar}">
    </a>
   </div>
   <div class="comment__details">
    <div class="comment__creator-info">
      <span>${username}</span>
      <span class="video__createdAt">Just now</span>
    </div>
    <div class="comment__text">
      <span>${comment}</span>
    </div>
  </div>
  <div class="comment__edit">
  <i class="fas fa-ellipsis-v"></i>
  </div>
  </li>`;
  commentContainer.insertAdjacentHTML("afterbegin", apiComment);
  increaseCountComment();
  // const li = document.createElement("li");
  // const writerImg = document.createElement("img");
  // const span = document.createElement("span");
  // writerImg.src = commentAvatar;
  // span.innerHTML = comment;
  // li.appendChild(span);
  // li.appendChild(writerImg);
  // commentList.prepend(li);
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    createComment(comment);
    // commentUL.load(window.location.href + commentUL);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
};

if (addCommentForm) {
  init();
}
