'use strict';

const findIndex = require('core-js-pure/features/array/find-index');


let timeout;
let typeStr = "";

function typeahead(nodeList, char, timeoutLength) {
    typeStr = typeStr.concat(char);
    let index;
    index = findIndex(nodeList, (el) => el.innerText.startsWith(typeStr));
    if (index === -1) {
        index = findIndex(nodeList, (el) => el.innerText.includes(typeStr));
    }

    if (timeout) {
        clearTimeout(timeout);
    }

    setTimeout(() => {
        clearTimeout(timeout);
        typeStr = "";
    }, timeoutLength);

}

module.exports = {
    typeahead
};

// const findIndex = require('core-js-pure/features/array/find-index');
// // returns index of first node in NodeList with matching first character (case-insenstive)
// function findNodeWithFirstChar(nodeList, char) {
//     return findIndex(nodeList, (el) => el.innerText.charAt(0).toLowerCase() === char.toLowerCase());
// }

// module.exports = {
//     findNodeWithFirstChar
// };
