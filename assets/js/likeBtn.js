/* eslint-disable no-plusplus */
import axios from "axios";

const likeBtn = document.querySelector(".likeBtn-js");
const dislikeBtn = document.querySelector(".dislikeBtn-js");

let clicked = false;

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

const handleDislike = (event) => {
  const btn = event.target.parentNode;
  const count = btn.children[1];
  // const likeBtn = btn.parentNode.children[0];
  if (!clicked) {
    clicked = true;
    btn.style.color = "#017FFE";
    count.textContent++;
    likeBtn.style.pointerEvents = "none";
    sendDislikeCount(count.textContent);
  } else {
    clicked = false;
    btn.style.color = "#828282";
    count.textContent--;
    likeBtn.style.pointerEvents = "";
    cancelDislikeCount(count.textContent);
  }
};

const handleLike = (event) => {
  const btn = event.target.parentNode;
  const count = btn.children[1];
  // const dislikeBtn = btn.parentNode.children[1];
  if (!clicked) {
    clicked = true;
    btn.style.color = "#017FFE";
    count.textContent++;
    dislikeBtn.style.pointerEvents = "none";
    sendLikeCount(count.textContent);
  } else {
    clicked = false;
    btn.style.color = "#828282";
    count.textContent--;
    dislikeBtn.style.pointerEvents = "";
    cancelLikeCount(count.textContent);
  }
};

const init = () => {
  likeBtn.addEventListener("click", handleLike);
  dislikeBtn.addEventListener("click", handleDislike);
};

if (likeBtn || dislikeBtn) init();

// const likeBtns = document.querySelectorAll(".likeBtn-js");
// const dislikeBtns = document.querySelectorAll(".dislikeBtn-js");

// let clicked = false;

// const handleDislike = (event) => {
//   const btn = event.target.parentNode;
//   const count = btn.children[1];
//   const likeBtn = btn.parentNode.children[0];
//   if (!clicked) {
//     clicked = true;
//     btn.style.color = "#017FFE";
//     count.textContent++;
//     likeBtn.style.pointerEvents = "none";
//   } else {
//     clicked = false;
//     btn.style.color = "#828282";
//     count.textContent--;
//     likeBtn.style.pointerEvents = "";
//   }
// };

// const cancelLikeCount = async (count) => {
//   const videoId = window.location.href.split("/videos/")[1];
//   const response = await axios({
//     url: `/api/${videoId}/undo-like`,
//     method: "POST",
//     data: {
//       count,
//     },
//   });
//   if (response.status === 200) {
//     console.log("succeed");
//   }
// };

// const sendLikeCount = async (count) => {
//   const videoId = window.location.href.split("/videos/")[1];
//   const response = await axios({
//     url: `/api/${videoId}/like`,
//     method: "POST",
//     data: {
//       count,
//     },
//   });
//   if (response.status === 200) {
//     console.log("succeed");
//   }
// };

// const handleLike = (event) => {
//   const btn = event.target.parentNode;
//   const count = btn.children[1];
//   const dislikeBtn = btn.parentNode.children[1];
//   if (!clicked) {
//     clicked = true;
//     btn.style.color = "#017FFE";
//     count.textContent++;
//     dislikeBtn.style.pointerEvents = "none";
//     sendLikeCount(count.textContent);
//   } else {
//     clicked = false;
//     btn.style.color = "#828282";
//     count.textContent--;
//     dislikeBtn.style.pointerEvents = "";
//     cancelLikeCount(count.textContent);
//   }
// };

// const init = () => {
//   likeBtns.forEach((likeBtn) => {
//     likeBtn.addEventListener("click", handleLike);
//   });
//   dislikeBtns.forEach((dislikeBtn) => {
//     dislikeBtn.addEventListener("click", handleDislike);
//   });
// };

// if (likeBtns || dislikeBtns) init();
