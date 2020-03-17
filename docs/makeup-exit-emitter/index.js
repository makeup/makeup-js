// requires NodeList.forEach polyfill for IE
// conditional check due to https://github.com/imagitama/nodelist-foreach-polyfill/issues/7
if (typeof window !== 'undefined') {
    require('nodelist-foreach-polyfill');
}

const ExitEmitter = require('../../packages/makeup-exit-emitter');

document.querySelectorAll('.widget').forEach((el) => {
    ExitEmitter.addFocusExit(el);

    el.addEventListener('focusin', function() {
        this.classList.add('focusin');
    });

    el.addEventListener('focusExit', function() {
        this.classList.remove('focusin');
    });
});
