const videoContainer = document.getElementById("videoPlayer-js");
const videoPlayer = document.querySelector("#videoPlayer-js video");
const playBtn = document.getElementById("playBtn-js");
const playBtnLg = document.getElementById("playBtnLg-js");
const volumeBtn = document.getElementById("volumeBtn-js");
const volumeRange = document.getElementById("volume-js");
const fullScreenBtn = document.getElementById("fullScreenBtn-js");
const playBar = document.getElementById("playBar-js");

const currentTime = document.getElementById("currentTime-js");
const totalTime = document.getElementById("totalTime-js");

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

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

// const handlePlayBar = () => {
//   const a = playBar.offsetWidth / videoPlayer.duration;
//   if (videoPlayer.currentTime === 0) {
//     videoPlayer.currentTime = 1;
//   }
//   const PlayedBar = videoPlayer.currentTime * a;
//   console.log(PlayedBar);
// };

// const handleProgressBar = () => {
//   const max = Math.floor(videoPlayer.duration);
//   const current = Math.floor(videoPlayer.currentTime);
//   const percent = 100 * (current / max);
//   const progressBar = document.createElement("div");
//   progressBar.style.height = "5px";
//   progressBar.style.backgroundColor = "red";
//   progressBar.style.width = `${percent}%`;
//   playBar.appendChild(progressBar);
//   console.log(max, current, percent, progressBar.style.width);
// };

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    playBtnLg.innerHTML = '<i class="fas fa-pause"></i>';
    // handlePlayBar();
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    playBtnLg.innerHTML = '<i class="fas fa-play"></i>';
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
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBtnLg.innerHTML = '<i class="fas fa-play"></i>';
};

// const videoAutoPlay = (event) => {
//   const promise = videoPlayer.play();
//   if (promise !== undefined) {
//     promise
//       .catch((error) => {
//         console.log("Auto-play failed");
//         // Auto-play was failed
//       })
//       .then(() => {
//         console.log("Auto-play started");
//         // Auto-play started
//       });
//   }
// };
const init = () => {
  playBtn.addEventListener("click", handlePlayClick);
  playBtnLg.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", handleFullScreen);
  // videoPlayer.addEventListener("timeupdate", handleProgressBar);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolumeDrag);
  // document.addEventListener("DOMContentLoaded", videoAutoPlay);
};

if (videoContainer) {
  init();
}
