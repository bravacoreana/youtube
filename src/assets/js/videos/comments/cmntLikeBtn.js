/* eslint-disable no-plusplus */
import axios from "axios";

const cmntLikeBtns = document.querySelectorAll(".cmntLikeBtn-js");
const cmntDislikeBtns = document.querySelectorAll(".cmntDislikeBtn-js");
// let likeClicked = false;

const cancelCmntDislikeCount = async (count, cmntId) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment-dislike`,
    method: "DELETE",
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
  await axios({
    url: `/api/${videoId}/comment-like`,
    method: "DELETE",
    data: {
      count,
      cmntId,
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("succeed");
    }
  });
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

export const handleClickDislike = (dislikeBtn) => {
  const cmntList = dislikeBtn.parentNode.parentNode.parentNode.parentNode;
  const cmntId = cmntList.id;
  const count = cmntList.querySelector(".cmntDislikeCount-js");
  const likeBtn = cmntList.querySelector(".cmntLikeBtn-js");

  if (!dislikeBtn.classList.contains("selectedCmnt")) {
    const countUp = parseInt(count.innerText, 10) + 1;
    dislikeBtn.classList.add("selectedCmnt");
    likeBtn.style.pointerEvents = "none";
    count.innerText = countUp;
    sendCmntDislikeCount(countUp, cmntId);
  } else {
    const countDown = parseInt(count.innerText, 10) - 1;
    dislikeBtn.classList.remove("selectedCmnt");
    likeBtn.style.pointerEvents = "";
    count.innerText = countDown;
    cancelCmntDislikeCount(countDown, cmntId);
  }
};

export const handleClickLike = (likeBtn) => {
  const cmntList = likeBtn.parentNode.parentNode.parentNode.parentNode;
  const cmntId = cmntList.id;
  const count = cmntList.querySelector(".cmntLikeCount-js");
  const dislikeBtn = cmntList.querySelector(".cmntDislikeBtn-js");
  if (!likeBtn.classList.contains("selectedCmnt")) {
    const countUp = parseInt(count.innerText, 10) + 1;
    likeBtn.classList.add("selectedCmnt");
    dislikeBtn.style.pointerEvents = "none";
    count.innerText = countUp;
    sendCmntLikeCount(countUp, cmntId);
  } else {
    const countDown = parseInt(count.innerText, 10) - 1;
    likeBtn.classList.remove("selectedCmnt");
    dislikeBtn.style.pointerEvents = "";
    count.innerText = countDown;
    cancelCmntLikeCount(countDown, cmntId);
  }
};

const redirectSignIn = () => {
  window.location.href = "http://localhost:4000/signIn";
};

const postAccessPermission = async (event) => {
  const response = await axios({
    url: "/api/access-permission",
    method: "POST",
  });
  if (response.status === 200) {
    cmntLikeBtns.forEach((btn) => {
      if (btn.contains(event.target)) handleClickLike(btn);
    });
    cmntDislikeBtns.forEach((btn) => {
      if (btn.contains(event.target)) handleClickDislike(btn);
    });
  } else {
    redirectSignIn();
  }
};

const commentPreferences = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/comment`,
    method: "GET",
  }).then((res) => {
    const likedCmnts = res.data.like;
    const dislikedCmnts = res.data.dislike;
    const edited = res.data.isUpdated;
    const cmntLists = document.querySelectorAll(".comment__list");

    cmntLists.forEach((li) => {
      const likeBtn = li.querySelector(".cmntLikeBtn-js");
      const dislikeBtn = li.querySelector(".cmntDislikeBtn-js");
      if (likedCmnts && likedCmnts.includes(li.id)) {
        if (!likeBtn.classList.contains("selectedCmnt")) {
          likeBtn.classList.add("selectedCmnt");
          dislikeBtn.style.pointerEvents = "none";
        }
      }
      if (dislikedCmnts && dislikedCmnts.includes(li.id)) {
        if (!dislikeBtn.classList.contains("selectedCmnt")) {
          dislikeBtn.classList.add("selectedCmnt");
          likeBtn.style.pointerEvents = "none";
        }
      }
      if (edited.includes(li.id)) {
        const cmntDeta = li.querySelector(".commentDeta-js");
        const spanEdited = document.createElement("span");
        spanEdited.classList.add("comment__creator-updated");
        spanEdited.innerHTML = "(Edited)";
        cmntDeta.appendChild(spanEdited);
      }
    });
  });
};

const init = () => {
  commentPreferences();
  cmntLikeBtns.forEach((btn) => {
    btn.addEventListener("click", postAccessPermission);
  });
  cmntDislikeBtns.forEach((btn) => {
    btn.addEventListener("click", postAccessPermission);
  });
};

if (document.querySelector(".comments-block")) init();

// const getCmntDislike = async () => {
//   const videoId = window.location.href.split("/videos/")[1];
//   await axios({
//     url: `/api/${videoId}/comment-dislike`,
//     method: "GET",
//   }).then((res) => {
//     const dislikedCmnts = res.data;
//     const cmntLists = document.querySelectorAll(".comment__list");
//     cmntLists.forEach((li) => {
//       if (dislikedCmnts.includes(li.id)) {
//         const likeBtn = li.querySelector(".cmntLikeBtn-js");
//         const dislikeBtn = li.querySelector(".cmntDislikeBtn-js");
//         if (!dislikeBtn.classList.contains("selectedCmnt")) {
//           dislikeBtn.classList.add("selectedCmnt");
//           likeBtn.style.pointerEvents = "none";
//         }
//       }
//     });
//   });
// };

// const getCmntLike = async () => {
//   const videoId = window.location.href.split("/videos/")[1];
//   await axios({
//     url: `/api/${videoId}/comment-like`,
//     method: "GET",
//   }).then((res) => {
//     const likedCmnts = res.data;
//     const cmntLists = document.querySelectorAll(".comment__list");
//     cmntLists.forEach((li) => {
//       if (likedCmnts.includes(li.id)) {
//         const likeBtn = li.querySelector(".cmntLikeBtn-js");
//         const dislikeBtn = li.querySelector(".cmntDislikeBtn-js");
//         if (!likeBtn.classList.contains("selectedCmnt")) {
//           likeBtn.classList.add("selectedCmnt");
//           dislikeBtn.style.pointerEvents = "none";
//         }
//       }
//     });
//   });
// };
