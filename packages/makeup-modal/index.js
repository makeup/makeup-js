'use strict';

var keyboardTrap = require('makeup-keyboard-trap');

var screenreaderTrap = require('makeup-screenreader-trap');

var makeupHoist = require('makeup-hoist-element');

var modalEl;
var options;

function unmodal() {
  if (modalEl) {
    screenreaderTrap.untrap(modalEl);
    keyboardTrap.untrap(modalEl);

    if (options.hoist) {
      makeupHoist.unhoist(modalEl);
    } // let observers know the keyboard is now trapped


    var event = document.createEvent('Event');
    event.initEvent('unmodal', false, true);
    modalEl.dispatchEvent(event);
    options = null;
    modalEl = null;
  }

  return modalEl;
}

function modal(el) {
  var optionsParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  unmodal();
  modalEl = el;
  options = optionsParam;

  if (options.hoist) {
    makeupHoist.hoist(modalEl);
  }

  screenreaderTrap.trap(modalEl, options);
  keyboardTrap.trap(modalEl); // let observers know the element is now modal

  var event = document.createEvent('Event');
  event.initEvent('modal', false, true);
  modalEl.dispatchEvent(event);
  return modalEl;
}

module.exports = {
  modal: modal,
  unmodal: unmodal
};
