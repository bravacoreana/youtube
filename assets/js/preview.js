const thumbnailFile = document.querySelector("#thumbnailFile");
const previewThumbnail = document.querySelector("#previewThumbnail");

const handleThumbnail = (event) => {
  const file = event.target.files;
  const image = document.createElement("img");
  const reader = new FileReader();

  reader.onload = ((imgFile) => {
    return (e) => {
      imgFile.src = e.target.result;
    };
  })(image);

  if (file) {
    reader.readAsDataURL(file[0]);
  }

  previewThumbnail.appendChild(image);
};

const init = () => {
  if (thumbnailFile) {
    thumbnailFile.addEventListener("change", handleThumbnail);
  }
};

init();
