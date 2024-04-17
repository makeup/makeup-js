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
      let index;
      if (nodeList == null) return -1;
      const lowerTypeStr = typeStr.toLocaleLowerCase();
      index = [...nodeList].findIndex(el => el.textContent.toLocaleLowerCase().startsWith(lowerTypeStr));
      if (index === -1) {
        index = [...nodeList].findIndex(el => el.textContent.toLocaleLowerCase().includes(lowerTypeStr));
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      setTimeout(() => {
        clearTimeout(timeout);
        typeStr = "";
      }, timeoutLength);
      return index;
    },
    destroy: function () {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  };
}
