'use strict';

const keyboardTrap = require('makeup-keyboard-trap');
const screenreaderTrap = require('makeup-screenreader-trap');

let hoistEl;
let hoistedElementPlaceholder;
let containerDiv;
let bodyChildIndexes = [];

function unhoist() {
    if (hoistEl) {
        if (containerDiv) {
            [...containerDiv.childNodes].forEach((child) => {
                if (!child.src) {
                    const index = bodyChildIndexes.shift();
                    if (index > document.body.childNodes.length) {
                        document.body.appendChild(child);
                    } else {
                        document.body.insertBefore(child, document.body.childNodes[index + 1]);
                    }
                }
            });
            containerDiv.remove();
            containerDiv = null;
            bodyChildIndexes = [];
        }

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

    containerDiv = document.createElement('div');
    [...document.body.childNodes].forEach((child, index) => {
        if (!child.src) {
            containerDiv.appendChild(child);
            bodyChildIndexes.push(index);
        }
    });

    document.body.prepend(containerDiv);

    document.body.appendChild(hoistEl);

    return hoistEl;
}

let modalEl;

function unmodal() {
    if (modalEl) {
        screenreaderTrap.untrap(modalEl);
        keyboardTrap.untrap(modalEl);
        unhoist(modalEl);

        // let observers know the keyboard is now trapped
        const event = document.createEvent('Event');
        event.initEvent('unmodal', false, true);
        modalEl.dispatchEvent(event);

        modalEl = null;
    }
    return modalEl;
}

function modal(el, options = {}) {
    unmodal();
    modalEl = el;
    screenreaderTrap.trap(modalEl, options);
    keyboardTrap.trap(modalEl);
    if (options.hoist) {
        hoist(modalEl);
    }

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
