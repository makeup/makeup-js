const Menu = require('../src/index.js');

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe('given a menu with default markup', function() {
    document.body.innerHTML = defaultMarkup;

    const menu1 = new Menu(document.querySelector('.menu'));
});
