'use strict'; // requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

var CustomEvent = require('custom-event');

var focusables = require('makeup-focusables'); // when bundled up with isomorphic components on the server, this code is run,
// so we must check if 'document' is defined.


var body = typeof document === 'undefined' ? null : document.body; // for the element that will be trapped

var trappedEl; // for the trap boundary/bumper elements

var topTrap;
var outerTrapBefore;
var innerTrapBefore;
var innerTrapAfter;
var outerTrapAfter;
var botTrap; // for the first and last focusable element inside the trap

var firstFocusableElement;
var lastFocusableElement;

function createTrapBoundary() {
  var trapBoundary = document.createElement('div');
  trapBoundary.setAttribute('tabindex', '0');
  trapBoundary.className = 'keyboard-trap-boundary';
  return trapBoundary;
}

function setFocusToFirstFocusableElement() {
  firstFocusableElement.focus();
}

function setFocusToLastFocusableElement() {
  lastFocusableElement.focus();
}

function createTraps() {
  topTrap = createTrapBoundary();
  outerTrapBefore = topTrap.cloneNode();
  innerTrapBefore = topTrap.cloneNode();
  innerTrapAfter = topTrap.cloneNode();
  outerTrapAfter = topTrap.cloneNode();
  botTrap = topTrap.cloneNode();
  topTrap.addEventListener('focus', setFocusToFirstFocusableElement);
  outerTrapBefore.addEventListener('focus', setFocusToFirstFocusableElement);
  innerTrapBefore.addEventListener('focus', setFocusToLastFocusableElement);
  innerTrapAfter.addEventListener('focus', setFocusToFirstFocusableElement);
  outerTrapAfter.addEventListener('focus', setFocusToLastFocusableElement);
  botTrap.addEventListener('focus', setFocusToLastFocusableElement);
}

function untrap() {
  if (trappedEl) {
    topTrap = safeDetach(topTrap);
    outerTrapBefore = safeDetach(outerTrapBefore);
    innerTrapBefore = safeDetach(innerTrapBefore);
    innerTrapAfter = safeDetach(innerTrapAfter);
    outerTrapAfter = safeDetach(outerTrapAfter);
    botTrap = safeDetach(botTrap);
    trappedEl.classList.remove('keyboard-trap--active'); // let observers know the keyboard is no longer trapped

    trappedEl.dispatchEvent(new CustomEvent('keyboardUntrap', {
      bubbles: true
    }));
    trappedEl = null;
  }

  return trappedEl;
}

function safeDetach(el) {
  var parent = el.parentNode;
  return parent ? parent.removeChild(el) : el;
}

function trap(el) {
  if (!topTrap) {
    createTraps();
  } else {
    untrap();
  }

  trappedEl = el;
  var focusableElements = focusables(trappedEl, true);
  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];
  body.insertBefore(topTrap, body.childNodes[0]);
  trappedEl.parentNode.insertBefore(outerTrapBefore, trappedEl);
  trappedEl.insertBefore(innerTrapBefore, trappedEl.childNodes[0]);
  trappedEl.appendChild(innerTrapAfter);
  trappedEl.parentNode.insertBefore(outerTrapAfter, trappedEl.nextElementSibling);
  body.appendChild(botTrap); // let observers know the keyboard is now trapped

  trappedEl.dispatchEvent(new CustomEvent('keyboardTrap', {
    bubbles: true
  }));
  trappedEl.classList.add('keyboard-trap--active');
  return trappedEl;
}

function refresh() {
  if (topTrap && trappedEl) {
    var focusableElements = focusables(trappedEl, true);
    focusableElements = focusableElements.filter(function (el) {
      return !el.classList.contains('keyboard-trap-boundary');
    });
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
  }
}

module.exports = {
  refresh: refresh,
  trap: trap,
  untrap: untrap
};
