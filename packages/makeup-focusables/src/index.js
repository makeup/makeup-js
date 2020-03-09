'use strict';

const focusableElList = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'embed',
    'iframe',
    'input:not([disabled])',
    'object',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '*[tabindex]',
    '*[contenteditable]'
];

const focusableElSelector = focusableElList.join();

module.exports = function(el, keyboardOnly = false) {
    let focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusableElSelector));

    // filter out elements with display: none
    focusableEls = focusableEls.filter(function(focusableEl) {
        return window.getComputedStyle(focusableEl).display !== 'none';
    });

    if (keyboardOnly === true) {
        focusableEls = focusableEls.filter(function(focusableEl) {
            return focusableEl.getAttribute('tabindex') !== '-1';
        });
    }

    return focusableEls;
};
