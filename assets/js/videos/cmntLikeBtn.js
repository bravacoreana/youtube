/* eslint-disable no-plusplus */
import axios from "axios";

const cmntLikeBtns = document.querySelectorAll(".cmntLikeBtn-js");
const cmntDislikeBtns = document.querySelectorAll(".cmntDislikeBtn-js");
let likeClicked = false;
let dislikeClicked = false;

const cancelCmntDislikeCount = async (count, cmntId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/undo-comment-dislike`,
    method: "POST",
    data: {
      count,
      cmntId,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const cancelCmntLikeCount = async (count, cmntId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/undo-comment-like`,
    method: "POST",
    data: {
      count,
      cmntId,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const sendCmntLikeCount = async (count, cmntId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment-like`,
    method: "POST",
    data: {
      count,
      cmntId,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const sendCmntDislikeCount = async (count, cmntId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment-dislike`,
    method: "POST",
    data: {
      count,
      cmntId,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

export const handleClickDislike = (dislikeBtn) => {
  const cmntList = dislikeBtn.parentNode.parentNode.parentNode.parentNode;
  const cmntId = cmntList.id;
  const count = cmntList.querySelector(".cmntDislikeCount-js");
  const likeBtn = cmntList.querySelector(".cmntLikeBtn-js");

  if (!dislikeClicked) {
    dislikeClicked = true;
    count.textContent++;
    dislikeBtn.classList.add("selectedCmnt");
    likeBtn.style.pointerEvents = "none";
    sendCmntDislikeCount(count.textContent, cmntId);
  } else {
    dislikeClicked = false;
    count.textContent--;
    dislikeBtn.classList.remove("selectedCmnt");
    likeBtn.style.pointerEvents = "";
    cancelCmntDislikeCount(count.textContent, cmntId);
  }
};

export const handleClickLike = (likeBtn) => {
  const cmntList = likeBtn.parentNode.parentNode.parentNode.parentNode;
  const cmntId = cmntList.id;
  const count = cmntList.querySelector(".cmntLikeCount-js");
  const dislikeBtn = cmntList.querySelector(".cmntDislikeBtn-js");

  if (!likeClicked) {
    likeClicked = true;
    count.textContent++;
    likeBtn.classList.add("selectedCmnt");
    dislikeBtn.style.pointerEvents = "none";
    sendCmntLikeCount(count.textContent, cmntId);
  } else {
    likeClicked = false;
    count.textContent--;
    likeBtn.classList.remove("selectedCmnt");
    dislikeBtn.style.pointerEvents = "";
    cancelCmntLikeCount(count.textContent, cmntId);
  }
};

const redirectSignIn = () => {
  window.location.href = "http://localhost:4000/signIn";
};

const getCmntDislike = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment-dislike`,
    method: "GET",
  }).then((res) => {
    const dislikedCmnts = res.data;
    const cmntLists = document.querySelectorAll(".comment__list");
    cmntLists.forEach((li) => {
      if (dislikedCmnts.includes(li.id)) {
        dislikeClicked = true;
        const likeBtn = li.querySelector(".cmntLikeBtn-js");
        const dislikeBtn = li.querySelector(".cmntDislikeBtn-js");
        dislikeBtn.classList.add("selectedCmnt");
        likeBtn.style.pointerEvents = "none";
      }
    });
  });
};

const getCmntLike = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment-like`,
    method: "GET",
  }).then((res) => {
    const likedCmnts = res.data;
    const cmntLists = document.querySelectorAll(".comment__list");
    cmntLists.forEach((li) => {
      if (likedCmnts.includes(li.id)) {
        likeClicked = true;
        const likeBtn = li.querySelector(".cmntLikeBtn-js");
        const dislikeBtn = li.querySelector(".cmntDislikeBtn-js");
        likeBtn.classList.add("selectedCmnt");
        dislikeBtn.style.pointerEvents = "none";
      }
    });
  });
};

const postAccessPermission = async (event) => {
  const response = await axios({
    url: "/api/access-permission",
    method: "POST",
  });
  if (response.status === 200) {
    cmntLikeBtns.forEach((btn) => {
      const cmntLikeBtn = event.target.parentNode;
      if (event.target.parentNode === btn) handleClickLike(cmntLikeBtn);
    });
    cmntDislikeBtns.forEach((btn) => {
      const cmntDislikeBtn = event.target.parentNode;
      if (event.target.parentNode === btn) handleClickDislike(cmntDislikeBtn);
    });
  } else if (response.status === 204) {
    redirectSignIn();
  }
};

const init = () => {
  getCmntLike();
  getCmntDislike();
  cmntLikeBtns.forEach((btn) => {
    btn.addEventListener("click", postAccessPermission);
  });
  cmntDislikeBtns.forEach((btn) => {
    btn.addEventListener("click", postAccessPermission);
  });
};
if (cmntLikeBtns || cmntDislikeBtns) init();
