'use strict';

const keyboardTrap = require('makeup-keyboard-trap');
const screenreaderTrap = require('makeup-screenreader-trap');
const defaultOptions = { hoist: false };

let hoistEl;
let hoistedElementPlaceholder;
let inertContentEl;
let bodyChildIndexes = [];

function unhoist() {
    if (hoistEl) {
        [...inertContentEl.childNodes].forEach((child) => {
            if (!child.src) {
                const index = bodyChildIndexes.shift();
                if (index > document.body.childNodes.length) {
                    document.body.appendChild(child);
                } else {
                    document.body.insertBefore(child, document.body.childNodes[index + 1]);
                }
            }
        });
        inertContentEl.remove();
        inertContentEl = null;
        bodyChildIndexes = [];

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

    hoistedElementPlaceholder = document.createElement('div');
    hoistEl.parentElement.insertBefore(hoistedElementPlaceholder, hoistEl);

    inertContentEl = document.createElement('div');
    [...document.body.childNodes].forEach((child, index) => {
        if (!child.src) {
            inertContentEl.appendChild(child);
            bodyChildIndexes.push(index);
        }
    });

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
