import axios from "axios";

const addCommentForm = document.getElementById("addComment-js");
const commentContainer = document.getElementById("commentContainer-js");

const increaseCountComment = () => {
  // window.location.reload();
  //   document.getElementById("myFrame").reload();
};

const createComment = (comment) => {
  // console.log(commentContainer.innerHTML);
  const username = document.getElementById("username").innerText;
  const userAvatar = document.getElementById("userAvatar").getAttribute("src");
  const userDetail = document.getElementById("userDetail").getAttribute("href");
  const apiComment = `
  <li class="comment__list" id="600430c002cf21178b6eaaa9">
	<div class="comment__creator">
		<div class="comment__creator-avatar">
			<a href="${userDetail}">
				<img src="${userAvatar}">
			</a>
		</div>
		<div class="comment__creator-details">
			<div class="comment__creator-info">
				<span class="comment__creator-name">${username}</span>
				<span class="video__createdAt comment__creator-time">Just now</span>
			</div>
			<div class="comment__text">
				<span>${comment}</span>
			</div>
		</div>
	</div>
	<div class="comment__edit">
		<div class="comment__edit__btn commentBtn-js">
			<i class="fas fa-ellipsis-v"></i>
		</div>
		<div class="comment__edit__container commentOptions-js">
			<ul class="comment__edit-options">
				<li class="commentEditBtn-js">
					<i class="fas fa-pen"></i>
					<span>Edit</span></li>
				<li class="commentDeleteBtn-js">
					<i class="fas fa-trash"></i>
					<span>Delete</span>
				</li>
			</ul>
		</div>
	</div>
</li>`;
  commentContainer.insertAdjacentHTML("afterbegin", apiComment);
  increaseCountComment();
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
