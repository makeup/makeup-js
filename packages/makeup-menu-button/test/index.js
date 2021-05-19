const MenuButton = require('../src/index.js');

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe('given a menu button with default markup', function() {
    document.body.innerHTML = defaultMarkup;

    const menuButton1 = new MenuButton(document.querySelector('.menu-button'));
});
