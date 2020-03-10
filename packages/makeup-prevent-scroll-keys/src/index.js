'use strict';

function onKeyDown(e) {
    if ((e.keyCode >= 32 && e.keyCode <= 36) || e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
    }
}

function add(el) {
    el.addEventListener('keydown', onKeyDown);
}

function remove(el) {
    el.removeEventListener('keydown', onKeyDown);
}

module.exports = {
    add,
    remove
};
