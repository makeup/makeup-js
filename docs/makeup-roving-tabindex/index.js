// REQUIRE
//const RovingTabindex = require('../../packages/makeup-roving-tabindex');

// IMPORT
import * as RovingTabindex from '../../packages/makeup-roving-tabindex';

const rovers = [];
const appender = document.getElementById('appender');
const prepender = document.getElementById('prepender');
const removeFirst = document.getElementById('removeFirst');
const removeLast = document.getElementById('removeLast');
const widgetEls = document.querySelectorAll('.widget');
const wrap = document.getElementById('wrap');
const log = e => console.log(e.type, e.detail);

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const listItem = document.createElement('li');
        listItem.innerText = `Item ${parseInt(el.querySelectorAll('li').length + 1, 10)}`;
        el.children[0].appendChild(listItem);
    });
});

prepender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const ul = el.children[0];
        const listItem = document.createElement('li');
        listItem.innerText = `Item ${parseInt(el.querySelectorAll('li').length + 1, 10)}`;
        ul.insertBefore(listItem, ul.children[0]);
    });
});

removeFirst.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const ul = el.children[0];
        const node = ul.firstElementChild;
        if (node) ul.removeChild(node);
    });
});

removeLast.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const ul = el.children[0];
        const node = ul.lastElementChild;
        if (node) ul.removeChild(node);
    });
});

removeCurrent.addEventListener('click', () => rovers.forEach(widget => widget.currentItem.remove()));
disableCurrent.addEventListener('click', () => rovers.forEach(widget => widget.currentItem.setAttribute('aria-disabled', 'true')));
hideCurrent.addEventListener('click', () => rovers.forEach(widget => widget.currentItem.hidden = true));

wrap.addEventListener('change', (e) => rovers.forEach((rover) => rover.wrap = e.target.checked));

widgetEls.forEach(function(el) {
    el.addEventListener('rovingTabindexInit', log);
    el.addEventListener('rovingTabindexChange', log);
    el.addEventListener('rovingTabindexMutation', log);
    el.addEventListener('rovingTabindexReset', log);

    rovers.push(RovingTabindex.createLinear(el, 'li'));
});
