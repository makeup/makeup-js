'use strict';

var sequenceMap = {};
var defaultPrefix = 'nid';
var randomPortion = createRandomPortion(3);

function randomNumber(max) {
  return Math.floor(Math.random() * max);
}

function createRandomPortion(size) {
  var letters = 'abcdefghijklmnopqrstuvwxyz';
  var digits = '0123456789';
  var allChars = letters + digits; // to ensure a valid HTML ID (when prefix is empty), first character must be a letter

  var portion = letters[randomNumber(25)]; // start iterating from 1, as we already have our first char

  for (var i = 1; i < size; i++) {
    portion += allChars[randomNumber(35)];
  }

  return portion;
}

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