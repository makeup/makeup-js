"use strict";

var modalEl;
var modalPlaceholder;
var containerDiv;

function unhoist() {
  if (modalEl) {
    if (containerDiv) {
      var childList = Array.from(containerDiv.childNodes);
      childList.forEach(function (child) {
        return child.src === undefined ? document.body.appendChild(child) : null;
      });
      containerDiv.remove();
      containerDiv = null;
    }

    if (modalPlaceholder) {
      modalPlaceholder.replaceWith(modalEl); // let observers know the element is unhoisted

      var event = document.createEvent('Event');
      event.initEvent('unhoist', true, true);
      modalEl.dispatchEvent(event);
      modalPlaceholder = null;
    }

    modalEl = null;
  }

  return modalEl;
}

function hoist(el) {
  unhoist();
  modalEl = el;
  modalPlaceholder = document.createElement('div');
  modalEl.insertAdjacentElement('beforebegin', modalPlaceholder);
  containerDiv = document.createElement('div');
  var childList = Array.from(document.body.childNodes);
  childList.forEach(function (child) {
    return child.src === undefined ? containerDiv.appendChild(child) : null;
  });
  containerDiv.setAttribute('aria-hidden', 'true');
  document.body.prepend(containerDiv);
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.appendChild(modalEl); // let observers know the element is hoisted

  var event = document.createEvent('Event');
  event.initEvent('hoist', true, true);
  modalEl.dispatchEvent(event);
  return modalEl;
}

module.exports = {
  hoist: hoist,
  unhoist: unhoist
};
