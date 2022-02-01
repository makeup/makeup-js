import Dialog from '../src/index.js';

const defaultMarkup = `<span class="switch">
  <span class="switch__control" role="switch" tabindex="0"></span>
  <span class="switch__button"></span>
</span>`;

describe('given a lightbox-dialog with default markup', function() {
    document.body.innerHTML = defaultMarkup;

    const dialog1 = new Dialog(document.querySelector('.lightbox-dialog'));
});
