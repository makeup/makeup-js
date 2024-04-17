"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trap = trap;
exports.untrap = untrap;
var util = _interopRequireWildcard(require("./util.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// the main landmark
let mainEl;

// the element that will be trapped
let trappedEl;

// collection of elements that get 'dirtied' with aria-hidden attr or hidden prop
let dirtyObjects;

// filter function for svg elements
const filterSvg = item => item.tagName.toLowerCase() !== "svg";
function showElementPrep(el, useHiddenProperty) {
  let preparedElement;
  if (useHiddenProperty === false) {
    preparedElement = prepareElement(el, "aria-hidden", "false");
  } else {
    preparedElement = prepareElement(el, "hidden", false);
  }
  return preparedElement;
}
function hideElementPrep(el, useHiddenProperty) {
  let preparedElement;
  if (useHiddenProperty === false) {
    preparedElement = prepareElement(el, "aria-hidden", "true");
  } else {
    preparedElement = prepareElement(el, "hidden", true);
  }
  return preparedElement;
}
function prepareElement(el, attributeName, dirtyValue) {
  const isProperty = typeof dirtyValue === "boolean";
  return {
    el,
    attributeName,
    cleanValue: isProperty ? el[attributeName] : el.getAttribute(attributeName),
    dirtyValue,
    isProperty
  };
}
function dirtyElement(preparedObj) {
  if (preparedObj.isProperty === true) {
    preparedObj.el[preparedObj.attributeName] = preparedObj.dirtyValue;
  } else {
    preparedObj.el.setAttribute(preparedObj.attributeName, preparedObj.dirtyValue);
  }
}
function cleanElement(preparedObj) {
  if (preparedObj.cleanValue) {
    if (preparedObj.isProperty === true) {
      preparedObj.el[preparedObj.attributeName] = preparedObj.cleanValue;
    } else {
      preparedObj.el.setAttribute(preparedObj.attributeName, preparedObj.cleanValue);
    }
  } else {
    preparedObj.el.removeAttribute(preparedObj.attributeName);
  }
}
function untrap() {
  if (trappedEl) {
    // restore 'dirtied' elements to their original state
    dirtyObjects.forEach(item => cleanElement(item));
    dirtyObjects = [];

    // 're-enable' the main landmark
    if (mainEl) {
      mainEl.setAttribute("role", "main");
    }

    // let observers know the screenreader is now untrapped
    trappedEl.dispatchEvent(new CustomEvent("screenreaderUntrap", {
      bubbles: true
    }));
    trappedEl = null;
  }
}
const defaultOptions = {
  useHiddenProperty: false
};
function trap(el, selectedOptions) {
  // ensure current trap is deactivated
  untrap();
  const options = Object.assign({}, defaultOptions, selectedOptions);

  // update the trapped el reference
  trappedEl = el;

  // update the main landmark reference
  mainEl = document.querySelector('main, [role="main"]');

  // we must remove the main landmark to avoid issues on voiceover iOS
  if (mainEl) {
    mainEl.setAttribute("role", "presentation");
  }

  // cache all ancestors, siblings & siblings of ancestors for trappedEl
  const ancestors = util.getAncestors(trappedEl);
  let siblings = util.getSiblings(trappedEl);
  let siblingsOfAncestors = util.getSiblingsOfAncestors(trappedEl);

  // if using hidden property, filter out SVG elements as they do not support this property
  if (options.useHiddenProperty === true) {
    siblings = siblings.filter(filterSvg);
    siblingsOfAncestors = siblingsOfAncestors.filter(filterSvg);
  }

  // prepare elements
  dirtyObjects = [showElementPrep(trappedEl, options.useHiddenProperty)].concat(ancestors.map(item => showElementPrep(item, options.useHiddenProperty))).concat(siblings.map(item => hideElementPrep(item, options.useHiddenProperty))).concat(siblingsOfAncestors.map(item => hideElementPrep(item, options.useHiddenProperty)));

  // update DOM
  dirtyObjects.forEach(item => dirtyElement(item));

  // let observers know the screenreader is now trapped
  trappedEl.dispatchEvent(new CustomEvent("screenreaderTrap", {
    bubbles: true
  }));
}
