'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var keyboardTrap = require('makeup-keyboard-trap');

var screenreaderTrap = require('makeup-screenreader-trap');

var hoistEl;
var hoistedElementPlaceholder;
var containerDiv;
var bodyChildIndexes = [];

function unhoist() {
  if (hoistEl) {
    if (containerDiv) {
      _toConsumableArray(containerDiv.childNodes).forEach(function (child) {
        if (!child.src) {
          var index = bodyChildIndexes.shift();

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

  _toConsumableArray(document.body.childNodes).forEach(function (child, index) {
    if (!child.src) {
      containerDiv.appendChild(child);
      bodyChildIndexes.push(index);
    }
  });

  document.body.prepend(containerDiv);
  document.body.appendChild(hoistEl);
  return hoistEl;
}

var modalEl;

function unmodal() {
  if (modalEl) {
    unhoist(modalEl);
    keyboardTrap.untrap(modalEl);
    screenreaderTrap.untrap(modalEl); // let observers know the keyboard is now trapped

    var event = document.createEvent('Event');
    event.initEvent('unmodal', false, true);
    modalEl.dispatchEvent(event);
    modalEl = null;
  }

  return modalEl;
}

function modal(el) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  unmodal();
  modalEl = el;
  debugger;

  if (options.hoist) {
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