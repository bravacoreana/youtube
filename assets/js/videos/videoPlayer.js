const videoContainer = document.getElementById("videoPlayer-js");
const video = document.querySelector("#videoPlayer-js video");
const videoToggleBtn = document.getElementById("playBtn-js");
const videoToggleBtnLg = document.getElementById("playBtnLg-js");
const volumeBar = document.getElementById("volume-js");
const volumeBtn = document.getElementById("volumeBtn-js");
const fullScreenBtn = document.getElementById("fullScreenBtn-js");
const skipBtn = document.getElementById("skipBtn-js");
const progress = document.getElementById("videoBar-js");
const progressBar = document.getElementById("videoProgressBar-js");
const videoCurrentTime = document.getElementById("currentTime-js");
const totalTime = document.getElementById("totalTime-js");

const PAUSE = '<i class="fas fa-pause"></i>';
const PLAY = '<i class="fas fa-play"></i>';
const VOLUME_UP = '<i class="fas fa-volume-up"></i>';
const VOLUME_DOWN = '<i class="fas fa-volume-down"></i>';
const VOLUME_OFF = '<i class="fas fa-volume-off"></i>';
const MUTE = '<i class="fas fa-volume-mute"></i>';
const EXPAND = '<i class="fas fa-expand"></i>';
const COMPRESS = '<i class="fas fa-compress"></i>';

let mousedown = false;

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

const handleEnded = () => {
  registerView();
  video.currentTime = 0;
  videoToggleBtn.innerHTML = PLAY;
  videoToggleBtnLg.innerHTML = PLAY;
};

const formatTime = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;
  if (hours === "00") return `${minutes}:${totalSeconds}`;

  return `${hours}:${minutes}:${totalSeconds}`;
};

const getCurrentTime = () => {
  videoCurrentTime.innerHTML = formatTime(Math.floor(video.currentTime));
};

const setTotalTime = () => {
  const totalTimeString = formatTime(video.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

const togglePlay = () => {
  const method = video.paused ? "play" : "pause";
  video[method]();
};

const updateButton = () => {
  const icon = video.paused ? PLAY : PAUSE;
  videoToggleBtn.innerHTML = icon;
  videoToggleBtnLg.innerHTML = icon;
};

const skipVideo = (event) => {
  if (event.key === "ArrowRight") video.currentTime += 5;
  if (event.key === "ArrowLeft") video.currentTime -= 5;
  if (event.target === skipBtn) video.currentTime += 5;
};

const updateVolume = (event) => {
  const {
    target: { value },
  } = event;
  video.volume = value;

  if (value > 0.7) volumeBtn.innerHTML = VOLUME_UP;
  else if (value >= 0.4) volumeBtn.innerHTML = VOLUME_DOWN;
  else if (value >= 0.1) volumeBtn.innerHTML = VOLUME_OFF;
  else volumeBtn.innerHTML = MUTE;
};

const handleVolumeClick = () => {
  if (video.muted) {
    video.muted = false;
    volumeBar.value = video.volume;
    if (video.volume > 0.7) volumeBtn.innerHTML = VOLUME_UP;
    else if (video.volume >= 0.4) volumeBtn.innerHTML = VOLUME_DOWN;
    else if (video.volume >= 0.1) volumeBtn.innerHTML = VOLUME_OFF;
    else volumeBtn.innerHTML = MUTE;
  } else {
    video.muted = true;
    volumeBtn.innerHTML = MUTE;
    volumeBar.value = 0;
  }
};

const exitFullScreen = () => {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
  video.style.maxWidth = "1300px";
  fullScreenBtn.innerHTML = EXPAND;

  fullScreenBtn.removeEventListener("click", exitFullScreen);
  fullScreenBtn.addEventListener("click", handleFullScreen);
};

const handleFullScreen = () => {
  if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
  else if (videoContainer.mozRequestFullScreen)
    videoContainer.mozRequestFullScreen();
  else if (videoContainer.webkitRequestFullscreen)
    videoContainer.webkitRequestFullscreen();
  else if (videoContainer.msRequestFullscreen)
    videoContainer.msRequestFullscreen();

  video.style.maxWidth = "none";
  fullScreenBtn.innerHTML = COMPRESS;
  fullScreenBtn.removeEventListener("click", handleFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
};

const handleProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

const scrubProgressBar = (e) => {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

const init = () => {
  video.addEventListener("click", togglePlay);
  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("timeupdate", handleProgress);
  video.addEventListener("loadedmetadata", setTotalTime);
  video.addEventListener("ended", handleEnded);
  video.addEventListener("timeupdate", handleProgress);
  videoToggleBtn.addEventListener("click", togglePlay);
  videoToggleBtnLg.addEventListener("click", togglePlay);
  window.addEventListener("keydown", skipVideo);
  volumeBar.addEventListener("input", updateVolume);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", handleFullScreen);
  skipBtn.addEventListener("click", skipVideo);
  progress.addEventListener("click", scrubProgressBar);
  progress.addEventListener(
    "mousemove",
    (e) => mousedown && scrubProgressBar(e)
  );
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mouseup", () => (mousedown = false));
};

if (videoContainer) init();
