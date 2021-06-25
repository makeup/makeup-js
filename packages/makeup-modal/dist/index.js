'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var keyboardTrap = require('makeup-keyboard-trap');

var screenreaderTrap = require('makeup-screenreader-trap');

var defaultOptions = {
  hoist: false
};
var SCRIPT = 'script';
var LINK = 'link';
var hoistEl;
var hoistedElementPlaceholder;
var inertContentEl;
var originalPositionIndexes = [];

function wrapBodyChildrenExceptModal() {
  hoistedElementPlaceholder = document.createElement('div');
  hoistEl.parentElement.insertBefore(hoistedElementPlaceholder, hoistEl);
  inertContentEl = document.createElement('div');

  _toConsumableArray(document.body.children).forEach(function (child, index) {
    // checking for the script and link tags is necessary because moving them could cause issues.
    // for example, moving a script to the top of the body could freeze the page while the script loads.
    if (!(child.tagName.toLowerCase() === SCRIPT || child.tagName === LINK)) {
      inertContentEl.appendChild(child);
      originalPositionIndexes.push(index);
    }
  });
}

function unwrapBodyChildrenExceptModal() {
  _toConsumableArray(inertContentEl.children).forEach(function (child) {
    if (!(child.tagName.toLowerCase() === SCRIPT || child.tagName === LINK)) {
      var index = originalPositionIndexes.shift();

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

var modalEl;

function unmodal() {
  if (modalEl) {
    keyboardTrap.untrap(modalEl);
    screenreaderTrap.untrap(modalEl);
    unhoist(modalEl); // let observers know the keyboard is now trapped

    var event = document.createEvent('Event');
    event.initEvent('unmodal', false, true);
    modalEl.dispatchEvent(event);
    modalEl = null;
  }

  return modalEl;
}

function modal(el, options) {
  var _options = Object.assign({}, defaultOptions, options);

  unmodal();
  modalEl = el;

  if (_options.hoist) {
    hoist(modalEl);
  }

  screenreaderTrap.trap(modalEl, options);
  keyboardTrap.trap(modalEl); // let observers know the element is now modal

  var event = document.createEvent('Event');
  event.initEvent('modal', false, true);
  modalEl.dispatchEvent(event);
  return modalEl;
}

module.exports = {
  modal,
  unmodal
};