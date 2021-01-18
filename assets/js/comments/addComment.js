import axios from "axios";

const addCommentForm = document.getElementById("addComment-js");
const commentContainer = document.getElementById("commentContainer-js");
const countComment = document.getElementById("countComment-js");
const commentBtns = document.querySelectorAll(".commentBtn-js");

const increaseCountComment = () => {
  countComment.textContent++;
  // window.location.reload();
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

// const handleCancel = () => {
//   // TODO: HIDE BUTTONS
// };

// Comment Edit Start //
const processDeleteComment = (commentList) => {
  commentList.parentNode.removeChild(commentList);
  // TODO: Decrease Count of Comment
};

const handleDeleteBtn = async (target) => {
  const commentList = target.parentNode.parentNode.parentNode.parentNode;
  const commentId = commentList.id;
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment/delete`,
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
};

const handleEditBtn = (target) => {
  // TODO: EDIT COMMENT

  console.log(target);
  const creatorDetails = document.querySelectorAll(".commentEdit-js");
  const editForm = document.querySelector("#editComment");
  creatorDetails.forEach((creatorDetail) => {
    creatorDetail.classList.add("hide");
  });
  editForm.style.display = "block";
};

const handleOption = (event) => {
  if (event.target.innerText.includes("Edit")) handleEditBtn(event.target);
  if (event.target.innerText.includes("Delete")) handleDeleteBtn(event.target);
};

const openOptions = (event) => {
  const optionList = event.target.parentNode.nextElementSibling;
  optionList.classList.toggle("show");
  optionList.addEventListener("mouseleave", () => {
    optionList.classList.remove("show");
  });
  optionList.addEventListener("click", handleOption);
};
// Comment Edit End

const init = () => {
  addCommentForm.addEventListener("submit", handleSubmit);
  commentBtns.forEach((commentBtn) => {
    commentBtn.addEventListener("click", openOptions);
  });
};

if (addCommentForm) init();
