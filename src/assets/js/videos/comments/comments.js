import axios from "axios";
import { handleClickLike, handleClickDislike } from "./cmntLikeBtn";
import { timeCalc } from "../postedAt";
import routes from "../../../../routes";

const commentsContainer = document.getElementById("commentContainer-js");
const commentForm = document.getElementById("addComment-js");
const commentInput = document.getElementById("comment-js");
const mainCmtBtns = document.querySelector(".createCommentBtns-js");
const ellipsisBtns = document.querySelectorAll(".commentBtn-js");
const WEBSITE = "https://immense-fortress-16208.herokuapp.com";

const downCmntCount = () => {
  const cmntCount = document.getElementById("countComment-js");
  const downCount = parseInt(cmntCount.innerText, 10) - 1;
  const countCmntText = document.getElementById("countCmntText-js");
  cmntCount.innerText = downCount;
  if (cmntCount.innerText === "1" || cmntCount.innerText === "0")
    countCmntText.innerText = " comment";
  else countCmntText.innerText = " comments";
};

const upCmntCount = () => {
  const cmntCount = document.getElementById("countComment-js");
  const upCount = parseInt(cmntCount.innerText, 10) + 1;
  const countCmntText = document.getElementById("countCmntText-js");
  cmntCount.innerText = upCount;
  if (cmntCount.innerText === "1" || cmntCount.innerText === "0")
    countCmntText.innerText = " comment";
  else countCmntText.innerText = " comments";
};

const processDeleteComment = (commentList) => {
  commentList.parentNode.removeChild(commentList);
  downCmntCount();
};

const handleDeleteBtn = async (target) => {
  const commentList = target.parentNode.parentNode.parentNode.parentNode;
  const commentId = commentList.id;
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment`,
    method: "DELETE",
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

const closeEdit = () => {
  const cmntList = document.querySelector(".cmntEditActivated");
  const commentDeta = cmntList.querySelector(".commentDeta-js");
  const commentText = cmntList.querySelector(".commentText-js");
  const editFormBox = cmntList.querySelector(".cmntEditForm-js");

  commentDeta.classList.remove("hide");
  commentText.classList.remove("hide");
  editFormBox.classList.remove("show");
  [].forEach.call(ellipsisBtns, (btn) => {
    btn.classList.remove("hide");
  });
  cmntList.classList.remove("cmntEditActivated");
};

const updateComment = async (event) => {
  event.preventDefault();
  const cmntList = document.querySelector(".cmntEditActivated");
  const videoId = window.location.href.split("/videos/")[1];
  const newComment = cmntList.querySelector("#newComment").value;
  const commentId = cmntList.id;
  await axios({
    url: `/api/${videoId}/comment`,
    method: "PUT",
    data: {
      newComment,
      commentId,
    },
  }).then((response) => {
    if (response.status === 200) {
      const comment = cmntList.querySelector(".commentText-js");
      const cmntDeta = cmntList.querySelector(".commentDeta-js");
      if (!cmntDeta.querySelector(".comment__creator-updated")) {
        const spanEdited = document.createElement("span");
        spanEdited.classList.add("comment__creator-updated");
        spanEdited.innerHTML = "(Edited)";
        cmntDeta.appendChild(spanEdited);
      }
      comment.innerText = newComment;
      closeEdit();
    }
  });
};

const cancelEdit = (cmntList, cmntDetail, cmntText, editFormBox) => {
  const oldComment = document.querySelector(".commentText-js").innerText;
  const newComment = cmntList.querySelector("#newComment");
  newComment.value = oldComment;

  cmntDetail.classList.remove("hide");
  cmntText.classList.remove("hide");
  editFormBox.classList.remove("show");
  [].forEach.call(ellipsisBtns, (btn) => {
    btn.classList.remove("hide");
  });
  cmntList.classList.remove("cmntEditActivated");
};

const handleEditBtn = (element) => {
  const cmntList = element.parentNode.parentNode.parentNode.parentNode;
  const cmntDetail = cmntList.querySelector(".commentDeta-js");
  const cmntText = cmntList.querySelector(".commentText-js");
  const editFormBox = cmntList.querySelector(".cmntEditForm-js");
  const editForm = editFormBox.querySelector("form");

  cmntList.classList.add("cmntEditActivated");
  cmntDetail.classList.add("hide");
  cmntText.classList.add("hide");
  editFormBox.classList.add("show");
  [].forEach.call(ellipsisBtns, (btn) => {
    btn.classList.add("hide");
  });

  const cancelBtn = editFormBox.querySelector("button");
  if (cancelBtn)
    cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      cancelEdit(cmntList, cmntDetail, cmntText, editFormBox);
    });

  editForm.addEventListener("submit", updateComment);
};

const handleOption = (event) => {
  const tg = event.target;
  const tgEdit = tg.parentNode.classList.contains("commentEditBtn-js");
  const tgDelete = tg.parentNode.classList.contains("commentDeleteBtn-js");
  const tagName = tg.tagName.toLowerCase();
  if (tg.classList.contains("commentEditBtn-js")) handleEditBtn(tg);
  if (tagName === "span" && tgEdit) handleEditBtn(tg.parentNode);
  if (tagName === "i" && tgEdit) handleEditBtn(tg.parentNode);
  if (tg.classList.contains("commentDeleteBtn-js")) handleDeleteBtn(tg);
  if (tagName === "span" && tgDelete) handleDeleteBtn(tg.parentNode);
  if (tagName === "i" && tgDelete) handleDeleteBtn(tg.parentNode);
};

const openOptions = (event) => {
  const cmntEditContainer = event.target.parentNode.nextElementSibling;
  cmntEditContainer.classList.toggle("show");
  cmntEditContainer.addEventListener("mouseleave", () => {
    cmntEditContainer.classList.remove("show");
  });
  cmntEditContainer.addEventListener("click", handleOption);
};

const createComment = (username, avatarUrl, comment, commentId, createdAt) => {
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
  if (avatarUrl.includes("uploads/avatars/")) imgAvatar.src = `/${avatarUrl}`;
  else imgAvatar.src = avatarUrl;

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
  spanCmtCreatedTime.innerHTML = timeCalc(createdAt);

  const divCmtText = document.createElement("div");
  divCmtText.classList.add("comment__text");
  divCmtText.classList.add("commentText-js");

  const pCmtText = document.createElement("p");
  pCmtText.innerHTML = comment;

  const divCmtEditForm = document.createElement("div");
  divCmtEditForm.classList.add("comment__edit-form");
  divCmtEditForm.classList.add("cmntEditForm-js");

  const formCmt = document.createElement("form");
  formCmt.setAttribute("method", "post");
  formCmt.id = "editComment";
  formCmt.classList.add("edit-comment");

  const divTextareaBox = document.createElement("div");
  divTextareaBox.classList.add("textarea-box");

  const textareaCmt = document.createElement("textarea");
  textareaCmt.setAttribute("name", "newComment");
  textareaCmt.setAttribute("rows", "1");
  textareaCmt.id = "newComment";
  textareaCmt.innerHTML = comment;

  const divCmtSubmit = document.createElement("div");
  divCmtSubmit.classList.add("comment__edit--submit");

  const btnCancel = document.createElement("button");
  btnCancel.innerHTML = "CANCEL";

  const inputSubmit = document.createElement("input");
  inputSubmit.setAttribute("type", "submit");
  inputSubmit.value = "COMMENT";

  // COMMENT LIKE&DISLIKE BTNS
  const divCmntBtns = document.createElement("div");
  divCmntBtns.classList.add("comment__btns");

  const divCmntLikeBtn = document.createElement("div");
  divCmntLikeBtn.classList.add("comment__btn");
  divCmntLikeBtn.classList.add("cmntLikeBtn-js");

  const iCmntLike = document.createElement("i");
  iCmntLike.classList.add("fas");
  iCmntLike.classList.add("fa-thumbs-up");
  iCmntLike.classList.add("cmntLikeIcon-js");

  const spanCmntLike = document.createElement("span");
  spanCmntLike.classList.add("cmntLikeCount-js");
  spanCmntLike.innerText = "0";

  const divCmntDislikeBtn = document.createElement("div");
  divCmntDislikeBtn.classList.add("comment__btn");
  divCmntDislikeBtn.classList.add("cmntDislikeBtn-js");

  const iCmntDislike = document.createElement("i");
  iCmntDislike.classList.add("fas");
  iCmntDislike.classList.add("fa-thumbs-down");
  iCmntDislike.classList.add("cmntDislikeIcon-js");

  const spanCmntDislike = document.createElement("span");
  spanCmntDislike.classList.add("cmntDislikeCount-js");
  spanCmntDislike.innerText = "0";

  // COMMENT EDIT
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
  divCmtText.appendChild(pCmtText);
  divCmtCreatorDetails.appendChild(divCmtEditForm);
  divCmtEditForm.appendChild(formCmt);
  formCmt.appendChild(divTextareaBox);
  divTextareaBox.appendChild(textareaCmt);
  formCmt.appendChild(divCmtSubmit);
  divCmtSubmit.appendChild(btnCancel);
  divCmtSubmit.appendChild(inputSubmit);

  // comment Like&Dislike
  divCmtCreatorDetails.appendChild(divCmntBtns);
  divCmntBtns.appendChild(divCmntLikeBtn);
  divCmntLikeBtn.appendChild(iCmntLike);
  divCmntLikeBtn.appendChild(spanCmntLike);
  divCmntBtns.appendChild(divCmntDislikeBtn);
  divCmntDislikeBtn.appendChild(iCmntDislike);
  divCmntDislikeBtn.appendChild(spanCmntDislike);

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
  formCmt.addEventListener("submit", updateComment);

  divCmntLikeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleClickLike(divCmntLikeBtn);
  });

  divCmntDislikeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleClickDislike(divCmntDislikeBtn);
  });
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
    createComment(
      username,
      avatarUrl,
      comment,
      response.data.id,
      response.data.createdAt
    );
    upCmntCount();
  }
};

const requestInfo = async (event) => {
  event.preventDefault();
  await axios({
    url: "/api/user-info",
    method: "POST",
  }).then((response) => {
    if (response.status === 200) {
      const {
        data: { username, avatarUrl },
      } = response;
      const comment = commentInput.value;
      if (comment.trim() === "") return false;
      sendComment(username, avatarUrl, comment);
      commentInput.value = "";
    }
    return "";
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
  // window.location.href = WEBSITE ? WEBSITE : "http://localhost:4000/signIn";
  window.location.href = WEBSITE + routes.signIn;
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
  if (ellipsisBtns)
    ellipsisBtns.forEach((btn) => {
      btn.addEventListener("click", openOptions);
    });
};

if (commentsContainer) init();
