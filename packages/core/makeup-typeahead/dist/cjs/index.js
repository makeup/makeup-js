"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  let timeout;
  let typeStr = "";
  return {
    getIndex: function (nodeList, char, timeoutLength) {
      typeStr = typeStr.concat(char);
      if (nodeList == null) return -1;
      const lowerTypeStr = typeStr.toLocaleLowerCase();
      let index = [...nodeList].findIndex(el => el.textContent.toLocaleLowerCase().startsWith(lowerTypeStr));
      if (index === -1) {
        index = [...nodeList].findIndex(el => el.textContent.toLocaleLowerCase().includes(lowerTypeStr));
      }
      // intentionally stacked (not debounced) - see README for usage example
      timeout = setTimeout(() => {
        typeStr = "";
      }, timeoutLength);
      return index;
    },
    destroy: function () {
      clearTimeout(timeout);
    }
  };
}
