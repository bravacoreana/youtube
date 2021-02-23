import axios from "axios";

const subscribeBtn = document.querySelector(".subscribe-js");
let subscribe = false;

const checkSubscribe = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  if (subscribe === true) {
    console.log("subscribed");
    await axios({
      url: `/api/${videoId}/subscription`,
      method: "POST",
      data: {
        id: videoId,
      },
    });
  } else {
    console.log("canceled");
    await axios({
      url: `/api/${videoId}/subscription`,
      method: "DELETE",
      data: {
        id: videoId,
      },
    });
  }
};

const handleSubscribe = () => {
  if (subscribe === false) {
    subscribe = true;
    subscribeBtn.classList.add("subscribed");
    checkSubscribe();
  } else {
    subscribe = false;
    subscribeBtn.classList.remove("subscribed");
    checkSubscribe();
  }
};

const getSubscribe = async () => {
  const videoId = window.location.href.split("/videos/")[1];
  await axios({
    url: `/api/${videoId}/subscription`,
    method: "GET",
    data: {
      id: videoId,
    },
  }).then((response) => {
    if (response.data === true) {
      subscribeBtn.classList.add("subscribed");
      subscribe = true;
    }
    if (response.data === false) {
      subscribeBtn.classList.remove("subscribed");
      subscribe = false;
    }
    if (response.data === "none") {
      subscribeBtn.classList.add("subscribed");
      subscribeBtn.removeEventListener("click", handleSubscribe);
    }
  });
};

const init = () => {
  getSubscribe();
  subscribeBtn.addEventListener("click", handleSubscribe);
};
if (subscribeBtn) init();
