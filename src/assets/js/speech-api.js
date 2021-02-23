const searchForm = document.querySelector("#searchForm");
const searchFormInput = searchForm.querySelector("input");

let recognition;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) recognition = new SpeechRecognition();

let recording = false;

const searchRecognition = (value) => {
  if (value) {
    setTimeout(() => {
      searchForm.submit();
    }, 1000);
  } else {
    return "";
  }
};

const processSpeechRecognition = (event) => {
  const micIcon = searchForm.querySelector("i");
  micIcon.classList.remove("fa-microphone-slash");
  micIcon.classList.add("fa-microphone");
  const transcript = event.results[event.resultIndex][0].transcript;
  searchFormInput.value = transcript;
  searchRecognition(searchFormInput.value);
};

const toggleRecording = () => {
  const micIcon = searchForm.querySelector("i");
  if (!recording || recording === false) {
    recording = true;
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    recognition.start();
  } else {
    recording = false;
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    recognition.stop();
  }
  recognition.addEventListener("result", processSpeechRecognition);
};

const init = () => {
  const micBtn = document.querySelector(".fa-microphone");
  micBtn.addEventListener("click", toggleRecording);
};

if (SpeechRecognition) init();
