'use strict';

var focusableElList = ['a[href]', 'area[href]', 'button:not([disabled])', 'embed', 'iframe', 'input:not([disabled])', 'object', 'select:not([disabled])', 'textarea:not([disabled])', '*[tabindex]', '*[contenteditable]'];
var focusableElSelector = focusableElList.join();

module.exports = function (el) {
  var keyboardOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var focusableEls = Array.prototype.slice.call(el.querySelectorAll(focusableElSelector)); // filter out elements with display: none

  focusableEls = focusableEls.filter(function (focusableEl) {
    return window.getComputedStyle(focusableEl).display !== 'none';
  });

  if (keyboardOnly === true) {
    focusableEls = focusableEls.filter(function (focusableEl) {
      return focusableEl.getAttribute('tabindex') !== '-1';
    });
  }

  return focusableEls;
};
