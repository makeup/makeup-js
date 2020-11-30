'use strict';

const findIndex = require('core-js-pure/features/array/find-index');
const startsWith = require('core-js-pure/features/string/starts-with');
const includes = require('core-js-pure/features/string/includes');

function typeahead() {
    let timeout;
    let typeStr = '';
    return {
        getIndex: function(nodeList, char, timeoutLength) {
            typeStr = typeStr.concat(char);
            let index;
            // eslint-disable-next-line eqeqeq
            if (nodeList == null) return -1;
            const lowerTypeStr = typeStr.toLocaleLowerCase();
            index = findIndex(nodeList, (el) => startsWith(el.textContent.toLocaleLowerCase(), lowerTypeStr));
            if (index === -1) {
                index = findIndex(nodeList, (el) => includes(el.textContent.toLocaleLowerCase(), lowerTypeStr));
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
        destroy: function() {
            if (timeout) {
                clearTimeout(timeout);
            }
        }
    };
}

module.exports = typeahead;
