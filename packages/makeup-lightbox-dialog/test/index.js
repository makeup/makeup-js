const AlertDialog = require("../src/index.js");

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe("given a alert-dialog with default markup", function () {
  document.body.innerHTML = defaultMarkup;

  const dialog1 = new AlertDialog(document.querySelector(".alert-dialog"));
});
