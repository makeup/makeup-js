"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _default() {
  var timeout;
  var typeStr = '';
  return {
    getIndex: function getIndex(nodeList, char, timeoutLength) {
      typeStr = typeStr.concat(char);
      var index; // eslint-disable-next-line eqeqeq

      if (nodeList == null) return -1;
      var lowerTypeStr = typeStr.toLocaleLowerCase();
      index = _toConsumableArray(nodeList).findIndex(function (el) {
        return el.textContent.toLocaleLowerCase().startsWith(lowerTypeStr);
      });

      if (index === -1) {
        index = _toConsumableArray(nodeList).findIndex(function (el) {
          return el.textContent.toLocaleLowerCase().includes(lowerTypeStr);
        });
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      setTimeout(function () {
        clearTimeout(timeout);
        typeStr = '';
      }, timeoutLength);
      return index;
    },
    destroy: function destroy() {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  };
}
