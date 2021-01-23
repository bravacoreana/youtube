import axios from "axios";

const commentsContainer = document.getElementById("commentContainer-js");
const commentForm = document.getElementById("addComment-js");
const commentInput = document.getElementById("comment-js");
const mainCmtBtns = document.querySelector(".createCommentBtns-js");
const commentBtns = document.querySelectorAll(".commentBtn-js");

const downCmntCount = () => {
  const cmntCount = document.getElementById("countComment-js");
  const downCount = parseInt(cmntCount.innerText, 10) - 1;
  const countCmntText = document.getElementById("countCmntText-js");
  cmntCount.innerText = downCount;
  if (cmntCount.innerText === "1" || cmntCount.innerText === "0") {
    countCmntText.innerText = " comment";
  } else {
    countCmntText.innerText = " comments";
  }
};

const processDeleteComment = (commentList) => {
  commentList.parentNode.removeChild(commentList);
  downCmntCount();
};

const upCmntCount = () => {
  const cmntCount = document.getElementById("countComment-js");
  const upCount = parseInt(cmntCount.innerText, 10) + 1;
  const countCmntText = document.getElementById("countCmntText-js");
  cmntCount.innerText = upCount;
  if (cmntCount.innerText === "1" || cmntCount.innerText === "0") {
    countCmntText.innerText = " comment";
  } else {
    countCmntText.innerText = " comments";
  }
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

const closeEdit = (commentDeta, commentText, editFormBox) => {
  const ellipsisBtns = document.getElementsByClassName("commentBtn-js");
  commentDeta.classList.remove("hide");
  commentText.classList.remove("hide");
  editFormBox.classList.remove("show");
  [].forEach.call(ellipsisBtns, (btn) => {
    btn.classList.remove("hide");
  });
};

const updateComment = async (event) => {
  event.preventDefault();
  const videoId = window.location.href.split("/videos/")[1];
  const newComment = event.target.querySelector("#newComment").value;
  const cmntList = event.target.parentNode.parentNode.parentNode.parentNode;
  const commentId = cmntList.id;
  console.log("updated");
  await axios({
    url: `/api/${videoId}/comment-update`,
    method: "POST",
    data: {
      newComment,
      commentId,
    },
  }).then((response) => {
    if (response.status === 200) {
      const comment = cmntList.querySelector(".commentText-js");
      console.log("YEAY!");
      comment.innerText = newComment;
      const commentDeta = cmntList.querySelector(".commentDeta-js");
      const commentText = cmntList.querySelector(".commentText-js");
      const editFormBox = event.target.parentNode;
      const ellipsisBtns = document.getElementsByClassName("commentBtn-js");
      closeEdit(commentDeta, commentText, editFormBox, ellipsisBtns);
    }
  });
};

const handleEditBtn = (target) => {
  const targetComme = target.parentNode.parentNode.parentNode.parentNode;
  const commentDeta = targetComme.querySelector(".commentDeta-js");
  const commentText = targetComme.querySelector(".commentText-js");
  const editFormBox = targetComme.querySelector(".cmntEditForm-js");
  const editForm = editFormBox.querySelector("form");
  const ellipsisBtns = document.getElementsByClassName("commentBtn-js");
  commentDeta.classList.add("hide");
  commentText.classList.add("hide");
  editFormBox.classList.add("show");
  [].forEach.call(ellipsisBtns, (btn) => {
    btn.classList.add("hide");
  });
  const cancelBtn = editFormBox.querySelector("button");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      closeEdit(commentDeta, commentText, editFormBox);
    });
  }
  // const submitBtn = targetComme.querySelector('input[type="submit"]');
  editForm.addEventListener("submit", updateComment);
  // editForm.addEventListener("keydown", (e) => {
  //   if (e.key === "Enter") updateComment();
  // });
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

const createComment = (username, avatarUrl, comment, commentId) => {
  const liCmntList = document.createElement("li");
  liCmntList.classList.add("comment__list");
  liCmntList.id = commentId;

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
  divCmtCreatorInfo.classList.add("commentDeta-js");

  const spanCmtCreatorName = document.createElement("span");
  spanCmtCreatorName.classList.add("comment__creator-name");
  spanCmtCreatorName.innerHTML = username;

  const spanCmtCreatedTime = document.createElement("span");
  spanCmtCreatedTime.classList.add("video__createdAt");
  spanCmtCreatedTime.classList.add("comment__creator-time");
  spanCmtCreatedTime.innerHTML = "Just now";

  const divCmtText = document.createElement("div");
  divCmtText.classList.add("comment__text");
  divCmtText.classList.add("commentText-js");

  const spanCmtText = document.createElement("span");
  spanCmtText.innerHTML = comment;

  const divCmtEditForm = document.createElement("div");
  divCmtEditForm.classList.add("comment__edit-form");
  divCmtEditForm.classList.add("cmntEditForm-js");

  const formCmt = document.createElement("form");
  formCmt.setAttribute("method", "post");
  formCmt.id = "editComment";
  formCmt.classList.add("edit-comment");

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

  commentsContainer.insertAdjacentElement("afterbegin", liCmntList);
  liCmntList.appendChild(divCmtCreator);
  divCmtCreator.appendChild(divCmtCreatorAvatar);
  divCmtCreator.appendChild(divCmtCreatorDetails);
  divCmtCreatorAvatar.appendChild(aAvatarUrl);
  aAvatarUrl.appendChild(imgAvatar);
  divCmtCreatorDetails.appendChild(divCmtCreatorInfo);
  divCmtCreatorInfo.appendChild(spanCmtCreatorName);
  divCmtCreatorInfo.appendChild(spanCmtCreatedTime);
  divCmtCreatorDetails.appendChild(divCmtText);
  divCmtText.appendChild(spanCmtText);
  divCmtCreatorDetails.appendChild(divCmtEditForm);
  divCmtEditForm.appendChild(formCmt);
  formCmt.appendChild(inputCmt);
  formCmt.appendChild(divCmtSubmit);
  divCmtSubmit.appendChild(btnCancel);
  divCmtSubmit.appendChild(inputSubmit);
  //
  liCmntList.appendChild(divCmtEdit);
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
    upCmntCount();
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
