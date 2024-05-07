import Listbox from "../src/index.js";

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe("given a listbox with default markup", function () {
  document.body.innerHTML = defaultMarkup;

  const listbox1 = new Listbox(document.querySelector(".listbox"));
});
