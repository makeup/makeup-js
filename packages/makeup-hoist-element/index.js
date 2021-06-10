"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var hoistEl;
var hoistedElementPlaceholder;
var containerDiv;
var bodyChildIndexes = [];
var BODY_TAG_NAME = 'BODY';

function isHoisted(element) {
  if (element.parentElement.tagName === BODY_TAG_NAME) {
    return true;
  }

  return false;
}

function unhoist() {
  if (hoistEl) {
    if (containerDiv) {
      var childList = Array.from(containerDiv.childNodes);
      childList.forEach(function (child) {
        if (child.src === undefined) {
          var index = bodyChildIndexes.shift();

          if (index > document.body.childNodes.length) {
            document.body.appendChild(child);
          } else {
            document.body.insertBefore(child, document.body.childNodes[index + 1]);
          }
        }
      });
      containerDiv.remove();
      containerDiv = null;
      bodyChildIndexes = [];
    }

    if (hoistedElementPlaceholder) {
      hoistedElementPlaceholder.replaceWith(hoistEl); // let observers know the element is unhoisted

      hoistedElementPlaceholder = null;
    }

    hoistEl = null;
  }

  return hoistEl;
}

function hoist(el) {
  if (isHoisted(el)) {
    unhoist();
  }

  hoistEl = el;
  hoistedElementPlaceholder = document.createElement('div');
  hoistEl.parentElement.insertBefore(hoistedElementPlaceholder, hoistEl);
  containerDiv = document.createElement('div');

  _toConsumableArray(document.body.childNodes).forEach(function (child, index) {
    if (!child.src) {
      containerDiv.appendChild(child);
      bodyChildIndexes.push(index);
    }
  });

  document.body.prepend(containerDiv);
  document.body.appendChild(hoistEl);
  return hoistEl;
}

module.exports = {
  hoist: hoist,
  unhoist: unhoist,
  isHoisted: isHoisted
};
