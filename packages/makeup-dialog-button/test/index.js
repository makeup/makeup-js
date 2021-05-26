const DialogButton = require('../src/index.js');

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe('given a dialog button with default markup', function() {
    document.body.innerHTML = defaultMarkup;

    const dialogButton1 = new DialogButton(document.querySelector('.dialog-button'));
});
