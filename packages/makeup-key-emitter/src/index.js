'use strict';

// requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const CustomEvent = require('custom-event');

const util = require('./util.js');

function onKeyDownOrUp(evt, el, keyEventType) {
    if (!evt.shiftKey) {
        const key = util.keyCodeToKeyMap[evt.keyCode];

        switch (key) {
            case 'Enter':
            case 'Escape':
            case 'Spacebar':
            case 'PageUp':
            case 'PageDown':
            case 'End':
            case 'Home':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
                el.dispatchEvent(new CustomEvent(util.uncapitalizeFirstLetter(`${key}Key${keyEventType}`), {
                    detail: evt,
                    bubbles: true
                }));
                break;
            default:
                return;
        }
    }
}

function onKeyDown(e) {
    onKeyDownOrUp(e, this, 'Down');
}

function onKeyUp(e) {
    onKeyDownOrUp(e, this, 'Up');
}

function addKeyDown(el) {
    el.addEventListener('keydown', onKeyDown);
}

function addKeyUp(el) {
    el.addEventListener('keyup', onKeyUp);
}

function removeKeyDown(el) {
    el.removeEventListener('keydown', onKeyDown);
}

function removeKeyUp(el) {
    el.removeEventListener('keyup', onKeyUp);
}

function add(el) {
    addKeyDown(el);
    addKeyUp(el);
}

function remove(el) {
    removeKeyDown(el);
    removeKeyUp(el);
}

module.exports = {
    addKeyDown,
    addKeyUp,
    removeKeyDown,
    removeKeyUp,
    add,
    remove
};
