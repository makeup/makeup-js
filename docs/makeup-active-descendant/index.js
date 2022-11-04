// REQUIRE
//const ActiveDescendant = require('../../packages/makeup-active-descendant');

// IMPORT
import * as ActiveDescendant from '../../packages/makeup-active-descendant';

const navs = [];
const appender = document.getElementById('appender');
const remover = document.getElementById('remover');
const widgetEls = document.querySelectorAll('.widget');
const wrapCheckbox = document.getElementById('wrap');
const log = e => console.log(e.type, e.detail);

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const list = el.querySelector('ul');
        const newListItem = document.createElement('li');
        newListItem.setAttribute('role', 'option');
        const numListItems = parseInt(list.querySelectorAll('li').length, 10);
        newListItem.innerText = `Item ${numListItems + 1}`;
        list.appendChild(newListItem);
    });
});

remover.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const list = el.querySelector('ul');
        const node = list.lastElementChild;
        list.removeChild(node);
    });
});

widgetEls.forEach(function(el) {
    el.addEventListener('activeDescendantInit', log);
    el.addEventListener('activeDescendantChange', log);
    el.addEventListener('activeDescendantReset', log);
    el.addEventListener('activeDescendantMutation', log);

    const widget = ActiveDescendant.createLinear(
        el,
        el.querySelector('input') || el.querySelector('ul'),
        el.querySelector('ul'),
        'li',
        {
            nonEmittingElementSelector: 'input[type="button"]'
        }
    );

    navs.push(widget);
});

wrapCheckbox.addEventListener('change', function(e) {
    navs.forEach(function(nav) {
        nav.wrap = e.target.checked;
    });
});
