import { trap as keyboardTrap, untrap as keyboardUntrap } from "makeup-keyboard-trap";
import { trap as screenreaderTrap, untrap as screenreaderUntrap } from "makeup-screenreader-trap";

const defaultOptions = {
  hoist: false,
  useHiddenProperty: false,
  wrap: false,
};

const tags = {
  SCRIPT: "script",
  LINK: "link",
};

let modalEl;
let hoistedPlaceholderEl;
let inertContentEl;
let originalPositionIndexes = [];

function isRootLevel(el) {
  return el.parentNode.tagName.toLowerCase() === "body";
}

function unhoist() {
  if (hoistedPlaceholderEl) {
    hoistedPlaceholderEl.replaceWith(modalEl);
    hoistedPlaceholderEl = null;
  }
}

// moves the modal element to document.body when it is nested deeper in the DOM.
// a placeholder is inserted at the original location so unhoist() can restore it.
// motivation: the screenreader and keyboard traps hide all siblings and siblings-of-ancestors;
// a deeply nested element has many such ancestors. hoisting to body reduces that to one level of siblings.
function hoist() {
  if (!hoistedPlaceholderEl && !isRootLevel(modalEl)) {
    hoistedPlaceholderEl = document.createElement("div");
    hoistedPlaceholderEl.setAttribute("data-makeup-modal", "placeholder");
    modalEl.parentElement.insertBefore(hoistedPlaceholderEl, modalEl);

    document.body.appendChild(modalEl);
  }
}

// collects all other body children (except the modal, scripts, and link tags) into a single
// [data-makeup-modal="inert"] container. unwrap() restores them to their original positions.
// motivation: once all inert content is in one container, a single attribute (aria-hidden, hidden, inert)
// can be applied to it rather than to each sibling individually. designed to be used after hoist(),
// which ensures the modal is already a direct body child before wrap() runs.
function wrap() {
  if (!inertContentEl && isRootLevel(modalEl)) {
    inertContentEl = document.createElement("div");
    inertContentEl.setAttribute("data-makeup-modal", "inert");

    [...document.body.children].forEach((child, index) => {
      // checking for the script and link tags is necessary because moving them could cause issues.
      // for example, moving a script to the top of the body could freeze the page while the script loads.
      if (
        !(child === modalEl || child.tagName.toLowerCase() === tags.SCRIPT || child.tagName.toLowerCase() === tags.LINK)
      ) {
        inertContentEl.appendChild(child);
        originalPositionIndexes.push(index);
      }
    });

    document.body.prepend(inertContentEl);
  }
}

function unwrap() {
  if (inertContentEl) {
    [...inertContentEl.children].forEach((child) => {
      if (!(child.tagName.toLowerCase() === tags.SCRIPT || child.tagName.toLowerCase() === tags.LINK)) {
        const index = originalPositionIndexes.shift();
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
    keyboardUntrap(modalEl);
    screenreaderUntrap(modalEl);
    unwrap();
    unhoist();

    document.body.removeAttribute("data-makeup-modal");
    modalEl.removeAttribute("data-makeup-modal");
    modalEl.dispatchEvent(new CustomEvent("makeup-unmodal", { bubbles: false }));

    modalEl = null;
  }

  return modalEl;
}

function modal(el, options) {
  const _options = { ...defaultOptions, ...options };
  unmodal();
  modalEl = el;

  if (_options.hoist) {
    hoist();
  }

  if (_options.wrap) {
    wrap();
  }

  screenreaderTrap(modalEl, options);

  // no need to create keyboard traps when inert content is using hidden property
  if (!_options.useHiddenProperty) {
    keyboardTrap(modalEl);
  }

  document.body.setAttribute("data-makeup-modal", "true");
  modalEl.setAttribute("data-makeup-modal", "widget");
  modalEl.dispatchEvent(new CustomEvent("makeup-modal", { bubbles: false }));

  return modalEl;
}

export { modal, unmodal };
