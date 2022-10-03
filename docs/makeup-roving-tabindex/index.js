// REQUIRE
//const RovingTabindex = require('../../packages/makeup-roving-tabindex');

// IMPORT
import * as RovingTabindex from '../../packages/makeup-roving-tabindex';

const rovers = [];
const appender = document.getElementById('appender');
const remover = document.getElementById('remover');
const incrementer = document.getElementById('incrementer');
const decrementer = document.getElementById('decrementer');
const widgetEls = document.querySelectorAll('.widget');
const wrapCheckbox = document.getElementById('wrap');

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const listItem = document.createElement('li');
        listItem.innerText = `Item ${parseInt(el.querySelectorAll('li').length, 10)}`;
        el.children[0].appendChild(listItem);
    });
});

remover.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const ul = el.children[0];
        const node = ul.lastElementChild;
        ul.removeChild(node);
    });
});

incrementer.addEventListener('click', function() {
    widgetEls.forEach(function(el, i) {
        rovers[i].index++;
    });
});

decrementer.addEventListener('click', function() {
    widgetEls.forEach(function(el, i) {
        rovers[i].index--;
    });
});

widgetEls.forEach(function(el) {
    rovers.push(RovingTabindex.createLinear(el, 'li', { index: 0 }));

    el.addEventListener('rovingTabindexChange', function(e) {
        console.log(e.type, e.detail);
    });
});

wrapCheckbox.addEventListener('change', function(e) {
    rovers.forEach(function(rover) {
        rover.wrap = e.target.checked;
    });
});
