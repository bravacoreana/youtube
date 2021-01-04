/* eslint-disable no-plusplus */
const createdDate = document.getElementById("createdDate-js");

const dateSplit = () => {
  const date = createdDate.innerText.split(" ", 4);
  const month = date[1];
  const day = date[2];
  const year = date[3];
  const fullDate = `${month} ${day} ${year}`;
  createdDate.innerText = fullDate;
};
dateSplit();
