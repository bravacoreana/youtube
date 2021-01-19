/* eslint-disable no-plusplus */
import axios from "axios";

const likeBtn = document.querySelector(".likeBtn-js");
const dislikeBtn = document.querySelector(".dislikeBtn-js");

let likeClicked = false;
let dislikeClicked = false;

const cancelDislikeCount = async (count) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/undo-dislike`,
    method: "POST",
    data: {
      count,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const sendDislikeCount = async (count) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/dislike`,
    method: "POST",
    data: {
      count,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const cancelLikeCount = async (count) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/undo-like`,
    method: "POST",
    data: {
      count,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const sendLikeCount = async (count) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/like`,
    method: "POST",
    data: {
      count,
    },
  });
  if (response.status === 200) {
    console.log("succeed");
  }
};

const handleClickDislike = () => {
  const count = dislikeBtn.children[1];
  if (!dislikeClicked) {
    dislikeClicked = true;
    count.textContent++;
    dislikeBtn.classList.add("selectedVideo");
    likeBtn.style.pointerEvents = "none";
    sendDislikeCount(count.textContent);
  } else {
    dislikeClicked = false;
    count.textContent--;
    dislikeBtn.classList.remove("selectedVideo");
    dislikeBtn.style.pointerEvents = "";
    cancelDislikeCount(count.textContent);
  }
};

const handleClickLike = () => {
  const count = likeBtn.children[1];
  if (!likeClicked) {
    likeClicked = true;
    count.textContent++;
    likeBtn.classList.add("selectedVideo");
    dislikeBtn.style.pointerEvents = "none";
    sendLikeCount(count.textContent);
  } else {
    likeClicked = false;
    count.textContent--;
    likeBtn.classList.remove("selectedVideo");
    dislikeBtn.style.pointerEvents = "";
    cancelLikeCount(count.textContent);
  }
};

const getLike = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/like`,
    method: "GET",
  });
  if (response.data === true) {
    likeClicked = true;
    likeBtn.classList.add("selectedVideo");
    dislikeBtn.style.pointerEvents = "none";
  } else {
    likeClicked = false;
  }
};

const getDislike = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/dislike`,
    method: "GET",
  });
  if (response.data === true) {
    dislikeClicked = true;
    dislikeBtn.classList.add("selectedVideo");
    likeBtn.style.pointerEvents = "none";
  } else {
    dislikeClicked = false;
  }
};

const init = () => {
  likeBtn.addEventListener("click", handleClickLike);
  dislikeBtn.addEventListener("click", handleClickDislike);
  getLike();
  getDislike();
};

if (likeBtn || dislikeBtn) init();
