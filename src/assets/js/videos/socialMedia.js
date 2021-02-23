const shareBtn = document.querySelector(".shareBtn-js");
const shareContainer = document.querySelector(".shareContainer-js");
const shareCloseBtn = document.getElementById("shareClose-js");

const facebookBtn = document.querySelector(".facebookBtn-js");
const whatsappBtn = document.querySelector(".whatsappBtn-js");
const twitterBtn = document.querySelector(".twitterBtn-js");
const pinterestBtn = document.querySelector(".pinterestBtn-js");
const linkedInBtn = document.querySelector(".linkedinBtn-js");
const redditBtn = document.querySelector(".redditBtn-js");
const wordPressBtn = document.querySelector(".wordpressBtn-js");
// const emailBtn = document.querySelector(".emailBtn-js");

const closeModal = (event) => {
  const isClickInside = shareBtn.contains(event.target);
  if (!isClickInside || shareCloseBtn === event.target)
    shareContainer.classList.add("hidden");
};

const openShare = () => {
  shareContainer.classList.add("share__show");
  if (shareContainer.classList.contains("hidden"))
    shareContainer.classList.remove("hidden");
  document.addEventListener("click", closeModal);
};

const share = () => {
  const postUrl = encodeURI(document.location.href);
  const postTitle = document.querySelector(".video__title").innerHTML;
  const videoUrl = document.querySelector("video").src;
  const postDesc = document.querySelector(".video__description").innerHTML;

  facebookBtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );
  whatsappBtn.setAttribute(
    "href",
    `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`
  );
  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  );
  pinterestBtn.setAttribute(
    "href",
    `https://pinterest.com/pin/create/bookmarklet/?url=${postUrl}&is_video=${videoUrl}&description=${postTitle}`
  );
  linkedInBtn.setAttribute(
    "href",
    `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
  );
  redditBtn.setAttribute(
    "href",
    `https://reddit.com/submit?url=${postUrl}&title=${postTitle}`
  );
  wordPressBtn.setAttribute(
    "href",
    `https://wordpress.com/press-this.php?u=${postUrl}&t=${postTitle}&s=${postDesc}`
  );
};

const init = () => {
  shareBtn.addEventListener("click", openShare);
  if (facebookBtn) facebookBtn.addEventListener("click", share);
  if (whatsappBtn) whatsappBtn.addEventListener("click", share);
  if (twitterBtn) twitterBtn.addEventListener("click", share);
  if (pinterestBtn) pinterestBtn.addEventListener("click", share);
  if (linkedInBtn) linkedInBtn.addEventListener("click", share);
  if (redditBtn) redditBtn.addEventListener("click", share);
  if (wordPressBtn) wordPressBtn.addEventListener("click", share);
};

if (shareBtn) init();
