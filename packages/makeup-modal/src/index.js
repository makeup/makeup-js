'use strict';

const keyboardTrap = require('makeup-keyboard-trap');
const screenreaderTrap = require('makeup-screenreader-trap');
const defaultOptions = { hoist: false };
const SCRIPT = 'script';
const LINK = 'link';

let hoistEl;
let hoistedElementPlaceholder;
let inertContentEl;
let originalPositionIndexes = [];

function wrapBodyChildrenExceptModal() {
    hoistedElementPlaceholder = document.createElement('div');
    hoistEl.parentElement.insertBefore(hoistedElementPlaceholder, hoistEl);

    inertContentEl = document.createElement('div');
    [...document.body.children].forEach((child, index) => {
        // checking for the script and link tags is necessary because moving them could cause issues.
        // for example, moving a script to the top of the body could freeze the page while the script loads.
        if (!(child.tagName.toLowerCase() === SCRIPT || child.tagName === LINK)) {
            inertContentEl.appendChild(child);
            originalPositionIndexes.push(index);
        }
    });
}

function unwrapBodyChildrenExceptModal() {
    [...inertContentEl.children].forEach((child) => {
        if (!(child.tagName.toLowerCase() === SCRIPT || child.tagName === LINK)) {
            const index = originalPositionIndexes.shift();
            if (index > document.body.children.length) {
                document.body.appendChild(child);
            } else {
                document.body.insertBefore(child, document.body.children[index + 1]);
            }
        }
    });
}

function unhoist() {
    if (hoistEl) {
        unwrapBodyChildrenExceptModal();
        inertContentEl.remove();
        inertContentEl = null;
        originalPositionIndexes = [];

        if (hoistedElementPlaceholder) {
            hoistedElementPlaceholder.replaceWith(hoistEl);
            hoistedElementPlaceholder = null;
        }
        hoistEl = null;
    }
    return hoistEl;
}

function hoist(el) {
    unhoist();
    hoistEl = el;

    wrapBodyChildrenExceptModal();

    document.body.prepend(inertContentEl);

    document.body.appendChild(hoistEl);

    return hoistEl;
}

let modalEl;

function unmodal() {
    if (modalEl) {
        keyboardTrap.untrap(modalEl);
        screenreaderTrap.untrap(modalEl);
        unhoist(modalEl);

        // let observers know the keyboard is now trapped
        const event = document.createEvent('Event');
        event.initEvent('unmodal', false, true);
        modalEl.dispatchEvent(event);

        modalEl = null;
    }
    return modalEl;
}

function modal(el, options) {
    const _options = Object.assign({}, defaultOptions, options);
    unmodal();
    modalEl = el;
    if (_options.hoist) {
        hoist(modalEl);
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
