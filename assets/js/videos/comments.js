import axios from "axios";

const commentsContainer = document.getElementById("commentContainer-js");
const commentForm = document.getElementById("addComment-js");
const commentInput = document.getElementById("comment-js");
const mainCmtBtns = document.querySelector(".createCommentBtns-js");
const commentBtns = document.querySelectorAll(".commentBtn-js");

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

///

const createComment = (username, avatarUrl, comment, commentId) => {
  const li = document.createElement("li");
  li.classList.add("comment__list");
  li.id = commentId;

  const divCmtCreator = document.createElement("div");
  divCmtCreator.classList.add("comment__creator");

  const divCmtCreatorAvatar = document.createElement("div");
  divCmtCreatorAvatar.classList.add("comment__creator-avatar");

  const aAvatarUrl = document.createElement("a");
  aAvatarUrl.href = document.getElementById("userDetail").getAttribute("href");

  const imgAvatar = document.createElement("img");
  imgAvatar.src = avatarUrl;

  const divCmtCreatorDetails = document.createElement("div");
  divCmtCreatorDetails.classList.add("comment__creator-details");
  divCmtCreatorDetails.id = "commentCreatorDetails-js";

  const divCmtCreatorInfo = document.createElement("div");
  divCmtCreatorInfo.classList.add("comment__creator-info");
  divCmtCreatorInfo.classList.add("commentEdit-js");

  const spanCmtCreatorName = document.createElement("span");
  spanCmtCreatorName.classList.add("comment__creator-name");
  spanCmtCreatorName.innerHTML = username;

  const spanCmtCreatedTime = document.createElement("span");
  spanCmtCreatedTime.classList.add("comment__creator-time");
  spanCmtCreatedTime.innerHTML = "Just now";

  const divCmtText = document.createElement("div");
  divCmtText.classList.add("commentEdit-js");

  const spanCmtText = document.createElement("span");
  spanCmtText.innerHTML = comment;

  const formCmt = document.createElement("form");
  formCmt.setAttribute("method", "post");
  formCmt.id = "editComment";

  const inputCmt = document.createElement("input");
  inputCmt.setAttribute("type", "text");
  inputCmt.name = "comment";
  inputCmt.value = comment;

  const divCmtSubmit = document.createElement("div");
  divCmtSubmit.classList.add("video__comments-submit");

  const btnCancel = document.createElement("button");
  btnCancel.innerHTML = "CANCEL";

  const inputSubmit = document.createElement("input");
  inputSubmit.setAttribute("type", "submit");
  inputSubmit.value = "COMMENT";

  const divCmtEdit = document.createElement("div");
  divCmtEdit.classList.add("comment__edit");

  const divCmtEditBtn = document.createElement("div");
  divCmtEditBtn.classList.add("comment__edit__btn");
  divCmtEditBtn.classList.add("commentBtn-js");

  const iEllipsis = document.createElement("i");
  iEllipsis.classList.add("fas");
  iEllipsis.classList.add("fa-ellipsis-v");

  const divCmtEditContainer = document.createElement("div");
  divCmtEditContainer.classList.add("comment__edit__container");
  divCmtEditContainer.classList.add("commentOptions-js");

  const ulCmtEditOptions = document.createElement("ul");
  ulCmtEditOptions.classList.add("comment__edit-options");

  const liCmtEditBtn = document.createElement("li");
  liCmtEditBtn.classList.add("commentEditBtn-js");

  const iCmtEditBtn = document.createElement("i");
  iCmtEditBtn.classList.add("fas");
  iCmtEditBtn.classList.add("fa-pen");

  const spanCmtEditBtn = document.createElement("span");
  spanCmtEditBtn.innerHTML = "Edit";

  const liCmtDeleteBtn = document.createElement("li");
  liCmtDeleteBtn.classList.add("commentDeleteBtn-js");

  const iCmtDeleteBtn = document.createElement("i");
  iCmtDeleteBtn.classList.add("fas");
  iCmtDeleteBtn.classList.add("fa-trash");

  const spanCmtDeleteBtn = document.createElement("span");
  spanCmtDeleteBtn.innerHTML = "Delete";

  commentsContainer.insertAdjacentElement("afterbegin", li);
  li.appendChild(divCmtCreator);
  divCmtCreator.appendChild(divCmtCreatorAvatar);
  divCmtCreator.appendChild(divCmtCreatorDetails);
  divCmtCreatorAvatar.appendChild(aAvatarUrl);
  aAvatarUrl.appendChild(imgAvatar);
  divCmtCreatorDetails.appendChild(divCmtCreatorInfo);
  divCmtCreatorInfo.appendChild(spanCmtCreatorName);
  divCmtCreatorInfo.appendChild(spanCmtCreatedTime);
  divCmtCreatorDetails.appendChild(divCmtText);
  divCmtText.appendChild(spanCmtText);
  divCmtCreatorDetails.appendChild(formCmt);
  formCmt.appendChild(inputCmt);
  formCmt.appendChild(divCmtSubmit);
  divCmtSubmit.appendChild(btnCancel);
  divCmtSubmit.appendChild(inputSubmit);
  //
  li.appendChild(divCmtEdit);
  divCmtEdit.appendChild(divCmtEditBtn);
  divCmtEditBtn.appendChild(iEllipsis);
  divCmtEdit.appendChild(divCmtEditContainer);
  divCmtEditContainer.appendChild(ulCmtEditOptions);
  ulCmtEditOptions.appendChild(liCmtEditBtn);
  liCmtEditBtn.appendChild(iCmtEditBtn);
  liCmtEditBtn.appendChild(spanCmtEditBtn);
  ulCmtEditOptions.appendChild(liCmtDeleteBtn);
  liCmtDeleteBtn.appendChild(iCmtDeleteBtn);
  liCmtDeleteBtn.appendChild(spanCmtDeleteBtn);

  divCmtEditBtn.addEventListener("click", openOptions);
};

const sendComment = async (username, avatarUrl, comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    createComment(username, avatarUrl, comment, response.data.id);
  }
};

const requestInfo = (event) => {
  event.preventDefault();
  axios({
    url: "/api/user-info",
    method: "POST",
  }).then((response) => {
    if (response.status === 200) {
      const {
        data: { username, avatarUrl },
      } = response;
      const comment = commentInput.value;
      sendComment(username, avatarUrl, comment);
      commentInput.value = "";
    }
  });
};

const closeComment = () => {
  // const isClickInside = commentForm.contains(event.target);
  // if (!isClickInside)
  mainCmtBtns.classList.remove("button__show");
};

const openButtons = () => {
  mainCmtBtns.classList.add("button__show");
  commentForm.addEventListener("submit", requestInfo);
  const cancelBtn = document.getElementById("cancel-js");
  cancelBtn.addEventListener("click", closeComment);
};

const redirectSignIn = () => {
  window.location.href = "http://localhost:4000/signIn";
};

const noInputAllowed = () => {
  commentInput.disabled = true;
  commentInput.style.cursor = "text";
  commentForm.addEventListener("click", redirectSignIn);
};

const accessPermission = async () => {
  const response = await axios({
    url: "/api/access-permission",
    method: "POST",
  });
  if (response.status === 200) {
    commentInput.addEventListener("focus", openButtons);
  } else {
    noInputAllowed();
  }
};

const init = () => {
  accessPermission();
  if (commentBtns)
    commentBtns.forEach((commentBtn) => {
      commentBtn.addEventListener("click", openOptions);
    });
};
if (commentForm) init();
