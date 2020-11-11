'use strict';

var findIndex = require('core-js-pure/features/array/find-index');

var timeout;
var typeStr = '';

function typeahead(nodeList, _char, timeoutLength) {
  typeStr = typeStr.concat(_char);
  var index;
  index = findIndex(nodeList, function (el) {
    return el.innerText.toLowerCase().startsWith(typeStr.toLowerCase());
  });

  if (index === -1) {
    index = findIndex(nodeList, function (el) {
      return el.innerText.includes(typeStr);
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
}

module.exports = typeahead;
