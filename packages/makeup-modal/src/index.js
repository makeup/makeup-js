'use strict';

const keyboardTrap = require('makeup-keyboard-trap');
const screenreaderTrap = require('makeup-screenreader-trap');
const makeupHoist = require('makeup-hoist-element');

let modalEl;
let options;

function unmodal() {
    if (modalEl) {
        screenreaderTrap.untrap(modalEl);
        keyboardTrap.untrap(modalEl);
        if (options.hoist) {
            makeupHoist.unhoist(modalEl);
        }

        // let observers know the keyboard is now trapped
        const event = document.createEvent('Event');
        event.initEvent('unmodal', false, true);
        modalEl.dispatchEvent(event);

        options = null;
        modalEl = null;
    }
    return modalEl;
}

function modal(el, optionsParam = {}) {
    unmodal();
    modalEl = el;
    options = optionsParam;
    if (options.hoist) {
        makeupHoist.hoist(modalEl);
    }
    screenreaderTrap.trap(modalEl, options);
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
