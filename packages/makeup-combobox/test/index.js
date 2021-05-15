const Combobox = require('../src/index.js');

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe('given a listbox with default markup', function() {
    document.body.innerHTML = defaultMarkup;

    const combobox1 = new Combobox(document.querySelector('.combobox'));
});
