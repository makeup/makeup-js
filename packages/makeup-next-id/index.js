'use strict';

var nanoid = require('nanoid/non-secure');

var sequenceMap = {};
var defaultPrefix = 'nid';
var randomPortion = nanoid(3);

module.exports = function (el) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPrefix;
  var separator = prefix === '' ? '' : '-'; // join first prefix with random portion to create key

  var key = "".concat(prefix).concat(separator).concat(randomPortion); // initialise key in sequence map if necessary

  sequenceMap[key] = sequenceMap[key] || 0;

  if (!el.id) {
    el.setAttribute('id', "".concat(key, "-").concat(sequenceMap[key]++));
  }

  return el.id;
};
