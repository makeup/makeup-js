'use strict'; // requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomEvent = require('custom-event');

var nextID = require('makeup-next-id');

var focusExitEmitters = {};

function doFocusExit(el, fromElement, toElement) {
  el.dispatchEvent(new CustomEvent('focusExit', {
    detail: {
      fromElement: fromElement,
      toElement: toElement
    },
    bubbles: false // mirror the native mouseleave event

  }));
}

function onDocumentFocusIn(e) {
  var newFocusElement = e.target;
  var targetIsDescendant = this.el.contains(newFocusElement); // if focus has moved to a focusable descendant

  if (targetIsDescendant === true) {
    // set the target as the currently focussed element
    this.currentFocusElement = newFocusElement;
  } else {
    // else focus has not gone to a focusable descendant
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
  document.addEventListener('focusin', this.onDocumentFocusInListener); // listen for focus leaving the window

  window.addEventListener('blur', this.onWindowBlurListener);
}

var FocusExitEmitter =
/*#__PURE__*/
function () {
  function FocusExitEmitter(el) {
    _classCallCheck(this, FocusExitEmitter);

    this.el = el;
    this.currentFocusElement = null;
    this.onWidgetFocusInListener = onWidgetFocusIn.bind(this);
    this.onDocumentFocusInListener = onDocumentFocusIn.bind(this);
    this.onWindowBlurListener = onWindowBlur.bind(this);
    this.el.addEventListener('focusin', this.onWidgetFocusInListener);
  }

  _createClass(FocusExitEmitter, [{
    key: "removeEventListeners",
    value: function removeEventListeners() {
      window.removeEventListener('blur', this.onWindowBlurListener);
      document.removeEventListener('focusin', this.onDocumentFocusInListener);
      this.el.removeEventListener('focusin', this.onWidgetFocusInListener);
    }
  }]);

  return FocusExitEmitter;
}();

function addFocusExit(el) {
  var exitEmitter = null;
  nextID(el);

  if (!focusExitEmitters[el.id]) {
    exitEmitter = new FocusExitEmitter(el);
    focusExitEmitters[el.id] = exitEmitter;
  }

  return exitEmitter;
}

function removeFocusExit(el) {
  var exitEmitter = focusExitEmitters[el.id];

  if (exitEmitter) {
    exitEmitter.removeEventListeners();
    delete focusExitEmitters[el.id];
  }
}

module.exports = {
  addFocusExit: addFocusExit,
  removeFocusExit: removeFocusExit
};
