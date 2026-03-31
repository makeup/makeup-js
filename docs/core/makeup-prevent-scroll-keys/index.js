import { add, remove } from "makeup-prevent-scroll-keys";

const widgetEl = document.querySelector(".widget");
const scrollOutput = document.getElementById("scroll-y");
const toggleBtn = document.getElementById("toggle");
let enabled = true;

add(widgetEl);

window.addEventListener("scroll", () => {
  scrollOutput.textContent = Math.round(window.scrollY);
});

toggleBtn.addEventListener("click", () => {
  if (enabled) {
    remove(widgetEl);
    toggleBtn.textContent = "Enable prevention";
  } else {
    add(widgetEl);
    toggleBtn.textContent = "Disable prevention";
  }
  enabled = !enabled;
});
