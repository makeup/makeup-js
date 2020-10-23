'use strict'; // requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CustomEvent = require('custom-event');

var util = require('./util.js'); // the main landmark


var mainEl; // the element that will be trapped

var trappedEl; // collection of elements that get 'dirtied' with aria-hidden attr or hidden prop

var dirtyObjects; // filter function for svg elements

var filterSvg = function filterSvg(item) {
  return item.tagName.toLowerCase() !== 'svg';
};

function showElementPrep(el, useHiddenProperty) {
  var preparedElement;

  if (useHiddenProperty === false) {
    preparedElement = prepareElement(el, 'aria-hidden', 'false');
  } else {
    preparedElement = prepareElement(el, 'hidden', false);
  }

  return preparedElement;
}

function hideElementPrep(el, useHiddenProperty) {
  var preparedElement;

  if (useHiddenProperty === false) {
    preparedElement = prepareElement(el, 'aria-hidden', 'true');
  } else {
    preparedElement = prepareElement(el, 'hidden', true);
  }

  return preparedElement;
}

function prepareElement(el, attributeName, dirtyValue) {
  var isProperty = typeof dirtyValue === 'boolean';
  return {
    el: el,
    attributeName: attributeName,
    cleanValue: isProperty ? el[attributeName] : el.getAttribute(attributeName),
    dirtyValue: dirtyValue,
    isProperty: isProperty
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
    dirtyObjects.forEach(function (item) {
      return cleanElement(item);
    });
    dirtyObjects = []; // 're-enable' the main landmark

    if (mainEl) {
      mainEl.setAttribute('role', 'main');
    } // let observers know the screenreader is now untrapped


    trappedEl.dispatchEvent(new CustomEvent('screenreaderUntrap', {
      bubbles: true
    }));
    trappedEl = null;
  }
}

var defaultOptions = {
  useHiddenProperty: false
};

function trap(el, selectedOptions) {
  // ensure current trap is deactivated
  untrap();

  var options = _extends({}, defaultOptions, selectedOptions); // update the trapped el reference


  trappedEl = el; // update the main landmark reference

  mainEl = document.querySelector('main, [role="main"]'); // we must remove the main landmark to avoid issues on voiceover iOS

  if (mainEl) {
    mainEl.setAttribute('role', 'presentation');
  } // cache all ancestors, siblings & siblings of ancestors for trappedEl


  var ancestors = util.getAncestors(trappedEl);
  var siblings = util.getSiblings(trappedEl);
  var siblingsOfAncestors = util.getSiblingsOfAncestors(trappedEl);
  var trappedElPrep = []; // if using hidden property, filter out SVG elements as they do not support this property

  if (options.useHiddenProperty === true) {
    siblings = siblings.filter(filterSvg);
    siblingsOfAncestors = siblingsOfAncestors.filter(filterSvg);
  } else {
    trappedElPrep.push(showElementPrep(trappedEl, options.useHiddenProperty));
  } // prepare elements


  dirtyObjects = trappedElPrep.concat(ancestors.map(function (item) {
    return showElementPrep(item, options.useHiddenProperty);
  })).concat(siblings.map(function (item) {
    return hideElementPrep(item, options.useHiddenProperty);
  })).concat(siblingsOfAncestors.map(function (item) {
    return hideElementPrep(item, options.useHiddenProperty);
  })); // update DOM

  dirtyObjects.forEach(function (item) {
    return dirtyElement(item);
  }); // let observers know the screenreader is now trapped

  trappedEl.dispatchEvent(new CustomEvent('screenreaderTrap', {
    bubbles: true
  }));
}

module.exports = {
  trap: trap,
  untrap: untrap
};
