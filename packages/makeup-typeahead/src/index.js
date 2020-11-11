'use strict';

const findIndex = require('core-js-pure/features/array/find-index');

let timeout;
let typeStr = '';

function typeahead(nodeList, char, timeoutLength) {
    typeStr = typeStr.concat(char);
    let index;
    index = findIndex(nodeList, (el) => el.innerText.toLowerCase().startsWith(typeStr.toLowerCase()));
    if (index === -1) {
        index = findIndex(nodeList, (el) => el.innerText.includes(typeStr));
    }

    if (timeout) {
        clearTimeout(timeout);
    }

    setTimeout(() => {
        clearTimeout(timeout);
        typeStr = '';
    }, timeoutLength);

    return index;
}

module.exports = typeahead;
