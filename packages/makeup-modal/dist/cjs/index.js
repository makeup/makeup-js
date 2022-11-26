"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modal = modal;
exports.unmodal = unmodal;
var keyboardTrap = _interopRequireWildcard(require("makeup-keyboard-trap"));
var screenreaderTrap = _interopRequireWildcard(require("makeup-screenreader-trap"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
    [...document.body.children].forEach((child, index) => {
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
    [...inertContentEl.children].forEach(child => {
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
  screenreaderTrap.trap(modalEl, options);

  // no need to create keyboard traps when inert content is using hidden property
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
