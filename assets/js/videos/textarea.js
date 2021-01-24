// const tx = document.getElementsByTagName("textarea");
// const tx = document.getElementById("comment-js");
// console.log(tx);
// const OnInput = () => {
//   this.style.height = "auto";
//   this.style.height = this.scrollHeight + "px";
// };

// for (let i = 0; i < tx.length; i++) {
//   tx[i].setAttribute(
//     "style",
//     "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
//   );
//   tx[i].addEventListener("input", OnInput, false);
// }

const textarea = document.querySelector("textarea");
const cmntTextarea = document.getElementById("newComment");

if (textarea) textarea.addEventListener("keydown", autosize);
if (cmntTextarea) cmntTextarea.addEventListener("keydown", autosize);

function autosize() {
  const el = this;
  setTimeout(() => {
    el.style.cssText = "height:auto; padding:0";
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = `height: ${el.scrollHeight}px`;
  }, 0);
}
