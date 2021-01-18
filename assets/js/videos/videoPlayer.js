const videoContainer = document.getElementById("videoPlayer-js");
const videoPlayer = document.querySelector("#videoPlayer-js video");
const playBtn = document.getElementById("playBtn-js");
const playBtnLg = document.getElementById("playBtnLg-js");
const volumeBtn = document.getElementById("volumeBtn-js");
const volumeRange = document.getElementById("volume-js");
const fullScreenBtn = document.getElementById("fullScreenBtn-js");
const basedBar = document.getElementById("videoBar-js");
const progressBar = document.getElementById("videoProgressBar-js");
const videoCurrentTime = document.getElementById("currentTime-js");
const totalTime = document.getElementById("totalTime-js");
let updateBar;

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  if (hours === "00") {
    return `${minutes}:${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

const getCurrentTime = () => {
  videoCurrentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
};

const setTotalTime = () => {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

const handleVideoMove = (event) => {
  if (!videoPlayer.ended) {
    const mouseX = event.pageX - basedBar.offsetLeft;
    const newTime = (mouseX * videoPlayer.duration) / basedBar.offsetWidth;
    videoPlayer.currentTime = newTime;
    progressBar.style.width = `${mouseX}px`;
  }
};

const handleFillBar = () => {
  if (!videoPlayer.ended) {
    const size =
      (videoPlayer.currentTime * basedBar.offsetWidth) / videoPlayer.duration;
    progressBar.style.width = `${size}px`;
  } else {
    progressBar.style.width = "0px";
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    window.clearInterval(updateBar);
  }
};

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtnLg.innerHTML = '<i class="fas fa-pause"></i>';
    updateBar = setInterval(handleFillBar, 1);
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtnLg.innerHTML = '<i class="fas fa-play"></i>';
    window.clearInterval(updateBar);
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
};

const handleVolumeDrag = (event) => {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value > 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.4) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  videoPlayer.style.maxWidth = "1300px";
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.removeEventListener("click", exitFullScreen);
  fullScreenBtn.addEventListener("click", handleFullScreen);
};

const handleFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  videoPlayer.style.maxWidth = "none";
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", handleFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
};

const handleEnded = () => {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBtnLg.innerHTML = '<i class="fas fa-play"></i>';
};

const init = () => {
  playBtn.addEventListener("click", handlePlayClick);
  playBtnLg.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", handleFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolumeDrag);
  basedBar.addEventListener("click", handleVideoMove);
};

if (videoContainer) {
  init();
}
