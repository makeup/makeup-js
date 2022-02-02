import * as util from "./util.js";
let mainEl;
let trappedEl;
let dirtyObjects;
const filterSvg = (item) => item.tagName.toLowerCase() !== "svg";
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
    dirtyObjects.forEach((item) => cleanElement(item));
    dirtyObjects = [];
    if (mainEl) {
      mainEl.setAttribute("role", "main");
    }
    trappedEl.dispatchEvent(new CustomEvent("screenreaderUntrap", { bubbles: true }));
    trappedEl = null;
  }
}
const defaultOptions = {
  useHiddenProperty: false
};
function trap(el, selectedOptions) {
  untrap();
  const options = Object.assign({}, defaultOptions, selectedOptions);
  trappedEl = el;
  mainEl = document.querySelector('main, [role="main"]');
  if (mainEl) {
    mainEl.setAttribute("role", "presentation");
  }
  const ancestors = util.getAncestors(trappedEl);
  let siblings = util.getSiblings(trappedEl);
  let siblingsOfAncestors = util.getSiblingsOfAncestors(trappedEl);
  if (options.useHiddenProperty === true) {
    siblings = siblings.filter(filterSvg);
    siblingsOfAncestors = siblingsOfAncestors.filter(filterSvg);
  }
  dirtyObjects = [showElementPrep(trappedEl, options.useHiddenProperty)].concat(ancestors.map((item) => showElementPrep(item, options.useHiddenProperty))).concat(siblings.map((item) => hideElementPrep(item, options.useHiddenProperty))).concat(siblingsOfAncestors.map((item) => hideElementPrep(item, options.useHiddenProperty)));
  dirtyObjects.forEach((item) => dirtyElement(item));
  trappedEl.dispatchEvent(new CustomEvent("screenreaderTrap", { bubbles: true }));
}
export {
  trap,
  untrap
};
