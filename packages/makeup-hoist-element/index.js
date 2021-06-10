"use strict";

var modalEl;
var modalPlaceholder;
var containerDiv;
var prevAriaHiddenSetting;
var bodyIndexes = [];

function unhoist() {
  if (modalEl) {
    if (containerDiv) {
      var childList = Array.from(containerDiv.childNodes);
      childList.forEach(function (child) {
        if (child.src === undefined) {
          var index = bodyIndexes.shift();

          if (index > document.body.childNodes.length) {
            document.body.appendChild(child);
          } else {
            document.body.insertBefore(child, document.body.childNodes[index + 1]);
          }
        }
      });
      containerDiv.remove();
      containerDiv = null;
      bodyIndexes = [];
    }

    if (modalPlaceholder) {
      modalEl.removeAttribute('aria-hidden'); // eslint-disable-next-line eqeqeq

      if (prevAriaHiddenSetting != null) {
        modalEl.setAttribute('aria-hidden', prevAriaHiddenSetting);
      }

      prevAriaHiddenSetting = null;
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
  childList.forEach(function (child, index) {
    if (child.src === undefined) {
      containerDiv.appendChild(child);
      bodyIndexes.push(index);
    }
  });
  containerDiv.setAttribute('aria-hidden', 'true');
  document.body.prepend(containerDiv);
  prevAriaHiddenSetting = modalEl.getAttribute('aria-hidden');
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
