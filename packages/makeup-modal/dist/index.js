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
  hoist: false,
  useHiddenProperty: false,
  wrap: false
};
var tags = {
  SCRIPT: 'script',
  LINK: 'link'
};
var modalEl;
var hoistedPlaceholderEl;
var inertContentEl;
var originalPositionIndexes = [];

function isRootLevel(el) {
  return el.parentNode.tagName.toLowerCase() === 'body';
}

function unhoist() {
  if (hoistedPlaceholderEl) {
    hoistedPlaceholderEl.replaceWith(modalEl);
    hoistedPlaceholderEl = null;
  }
}

function hoist() {
  if (!hoistedPlaceholderEl && !isRootLevel(modalEl)) {
    hoistedPlaceholderEl = document.createElement('div');
    hoistedPlaceholderEl.setAttribute('data-makeup-modal', 'placeholder');
    modalEl.parentElement.insertBefore(hoistedPlaceholderEl, modalEl);
    document.body.appendChild(modalEl);
  }
}

function wrap() {
  if (!inertContentEl && isRootLevel(modalEl)) {
    inertContentEl = document.createElement('div');
    inertContentEl.setAttribute('data-makeup-modal', 'inert');

    _toConsumableArray(document.body.children).forEach(function (child, index) {
      // checking for the script and link tags is necessary because moving them could cause issues.
      // for example, moving a script to the top of the body could freeze the page while the script loads.
      if (!(child === modalEl || child.tagName.toLowerCase() === tags.SCRIPT || child.tagName === tags.LINK)) {
        inertContentEl.appendChild(child);
        originalPositionIndexes.push(index);
      }
    });

    document.body.prepend(inertContentEl);
  }
}

function unwrap() {
  if (inertContentEl) {
    _toConsumableArray(inertContentEl.children).forEach(function (child) {
      if (!(child.tagName.toLowerCase() === tags.SCRIPT || child.tagName === tags.LINK)) {
        var index = originalPositionIndexes.shift();

        if (index > document.body.children.length) {
          document.body.appendChild(child);
        } else {
          document.body.insertBefore(child, document.body.children[index + 1]);
        }
      }
    });

    inertContentEl.remove();
    inertContentEl = null;
    originalPositionIndexes = [];
  }
}

function unmodal() {
  if (modalEl) {
    keyboardTrap.untrap(modalEl);
    screenreaderTrap.untrap(modalEl);
    unwrap();
    unhoist();
    document.body.removeAttribute('data-makeup-modal');
    modalEl.removeAttribute('data-makeup-modal');
    modalEl.dispatchEvent(new CustomEvent('makeup-unmodal', {
      bubbles: false
    }));
    modalEl = null;
  }

  return modalEl;
}

function modal(el, options) {
  var _options = Object.assign({}, defaultOptions, options);

  unmodal();
  modalEl = el;

  if (_options.hoist) {
    hoist();
  }

  if (_options.wrap) {
    wrap();
  }

  screenreaderTrap.trap(modalEl, options); // no need to create keyboard traps when inert content is using hidden property

  if (!_options.useHiddenProperty) {
    keyboardTrap.trap(modalEl);
  }

  document.body.setAttribute('data-makeup-modal', 'true');
  modalEl.setAttribute('data-makeup-modal', 'widget');
  modalEl.dispatchEvent(new CustomEvent('makeup-modal', {
    bubbles: false
  }));
  return modalEl;
}

module.exports = {
  modal,
  unmodal
};