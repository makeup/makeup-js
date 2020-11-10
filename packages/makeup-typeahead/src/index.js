'use strict';

function typeahead(el, strArray) {
    el.addEventListener('onKeyPress', handleKeyPress);
}

function handleKeyPress(e) {
    console.log(e);
    console.log(e.keyCode);
}

module.exports = {
    typeahead
};
