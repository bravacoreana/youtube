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

const adviseLogin = () => {
  const modal = document.getElementById("adviseLoginSubscribe-js");
  modal.classList.remove("hidden");
  document.addEventListener("click", (event) => {
    const isClickInside = modal.contains(event.target);
    if (!isClickInside) modal.classList.add("hidden");
  });
};

const postAccessPermission = async (event) => {
  event.preventDefault();
  const response = await axios({
    url: "/api/access-permission",
    method: "POST",
  });
  if (response.stats === 200) handleSubscribe();
  else adviseLogin();
};

const init = () => {
  getSubscribe();
  subscribeBtn.addEventListener("click", postAccessPermission);
};
if (subscribeBtn) init();
