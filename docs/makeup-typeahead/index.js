const typeahead = require('../../packages/makeup-typeahead');

const list = document.querySelector('ul');
const selected = document.querySelector('.selected');
const TIMEOUT_LENGTH = 2000;

function handleKeyDown(e) {
    if (e.key.length === 1) {
        const listIndex = typeahead(list.children, e.key, TIMEOUT_LENGTH);
        if (listIndex !== - 1) {
            selected.innerHTML = list.children[listIndex].innerHTML;
        }
    }
}

document.addEventListener('keydown', e => handleKeyDown(e));
