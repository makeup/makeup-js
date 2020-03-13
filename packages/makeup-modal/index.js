'use strict';

var keyboardTrap = require('makeup-keyboard-trap');

var screenreaderTrap = require('makeup-screenreader-trap');

var modalEl;

function unmodal() {
  if (modalEl) {
    screenreaderTrap.untrap(modalEl);
    keyboardTrap.untrap(modalEl); // let observers know the keyboard is now trapped

    var event = document.createEvent('Event');
    event.initEvent('unmodal', false, true);
    modalEl.dispatchEvent(event);
    modalEl = null;
  }

  return modalEl;
}

function modal(el) {
  unmodal();
  modalEl = el;
  screenreaderTrap.trap(modalEl);
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
