'use strict';

const keyboardTrap = require('makeup-keyboard-trap');
const screenreaderTrap = require('makeup-screenreader-trap');

let modalEl;

function unmodal() {
    if (modalEl) {
        screenreaderTrap.untrap(modalEl);
        keyboardTrap.untrap(modalEl);

        // let observers know the keyboard is now trapped
        const event = document.createEvent('Event');
        event.initEvent('unmodal', false, true);
        modalEl.dispatchEvent(event);

        modalEl = null;
    }
    return modalEl;
}

function modal(el) {
    unmodal();
    modalEl = el;
    screenreaderTrap.trap(modalEl);
    keyboardTrap.trap(modalEl);

    // let observers know the element is now modal
    const event = document.createEvent('Event');
    event.initEvent('modal', false, true);
    modalEl.dispatchEvent(event);

    return modalEl;
}

module.exports = {
    modal,
    unmodal
};
