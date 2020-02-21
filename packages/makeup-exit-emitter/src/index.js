'use strict';

// requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
const CustomEvent = require('custom-event');

const nextID = require('makeup-next-id');
const focusExitEmitters = {};

function doFocusExit(el, fromElement, toElement) {
    el.dispatchEvent(new CustomEvent('focusExit', {
        detail: { fromElement, toElement },
        bubbles: false // mirror the native mouseleave event
    }));
}

function onDocumentFocusIn(e) {
    const newFocusElement = e.target;
    const targetIsDescendant = this.el.contains(newFocusElement);

    // if focus has moved to a focusable descendant
    if (targetIsDescendant === true) {
        // set the target as the currently focussed element
        this.currentFocusElement = newFocusElement;
    } else { // else focus has not gone to a focusable descendant
        window.removeEventListener('blur', this.onWindowBlurListener);
        document.removeEventListener('focusin', this.onDocumentFocusInListener);
        doFocusExit(this.el, this.currentFocusElement, newFocusElement);
        this.currentFocusElement = null;
    }
}

function onWindowBlur() {
    doFocusExit(this.el, this.currentFocusElement, undefined);
}

function onWidgetFocusIn() {
    // listen for focus moving to anywhere in document
    // note that mouse click on buttons, checkboxes and radios does not trigger focus events in all browsers!
    document.addEventListener('focusin', this.onDocumentFocusInListener);
    // listen for focus leaving the window
    window.addEventListener('blur', this.onWindowBlurListener);
}

class FocusExitEmitter {
    constructor(el) {
        this.el = el;

        this.currentFocusElement = null;

        this.onWidgetFocusInListener = onWidgetFocusIn.bind(this);
        this.onDocumentFocusInListener = onDocumentFocusIn.bind(this);
        this.onWindowBlurListener = onWindowBlur.bind(this);

        this.el.addEventListener('focusin', this.onWidgetFocusInListener);
    }

    removeEventListeners() {
        window.removeEventListener('blur', this.onWindowBlurListener);
        document.removeEventListener('focusin', this.onDocumentFocusInListener);
        this.el.removeEventListener('focusin', this.onWidgetFocusInListener);
    }
}

function addFocusExit(el) {
    let exitEmitter = null;

    nextID(el);

    if (!focusExitEmitters[el.id]) {
        exitEmitter = new FocusExitEmitter(el);
        focusExitEmitters[el.id] = exitEmitter;
    }

    return exitEmitter;
}

function removeFocusExit(el) {
    const exitEmitter = focusExitEmitters[el.id];

    if (exitEmitter) {
        exitEmitter.removeEventListeners();
        delete focusExitEmitters[el.id];
    }
}

module.exports = {
    addFocusExit,
    removeFocusExit
};
