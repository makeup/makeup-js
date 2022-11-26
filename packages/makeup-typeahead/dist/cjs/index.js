"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default() {
  var timeout;
  var typeStr = '';
  return {
    getIndex: function getIndex(nodeList, char, timeoutLength) {
      typeStr = typeStr.concat(char);
      var index;
      // eslint-disable-next-line eqeqeq
      if (nodeList == null) return -1;
      var lowerTypeStr = typeStr.toLocaleLowerCase();
      index = [...nodeList].findIndex(el => el.textContent.toLocaleLowerCase().startsWith(lowerTypeStr));
      if (index === -1) {
        index = [...nodeList].findIndex(el => el.textContent.toLocaleLowerCase().includes(lowerTypeStr));
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      setTimeout(() => {
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
