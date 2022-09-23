// REQUIRE
// const NavigationEmitter = require('../../packages/makeup-navigation-emitter');

// IMPORT
import * as NavigationEmitter from '../../packages/makeup-navigation-emitter';

const emitters = [];
const appender = document.getElementById('appender');
const widgetEls = document.querySelectorAll('.widget');
const consoleEls = document.querySelectorAll('.console');
const wrapCheckbox = document.getElementById('wrap');

const options = [{}, { autoInit: -1, autoReset: -1 }, { autoInit: -1, autoReset: -1 }];

appender.addEventListener('click', function() {
    widgetEls.forEach(function(el) {
        const listEl = el.querySelector('ul');
        const listItem = document.createElement('li');
        listItem.innerText = `Item ${parseInt(listEl.querySelectorAll('li').length, 10)}`;
        listEl.appendChild(listItem);
    });
});

widgetEls.forEach(function(el, index) {
    el.addEventListener('navigationModelInit', function(e) {
        consoleEls[index].value = e.detail.toIndex;
    });
    el.addEventListener('navigationModelChange', function(e) {
        consoleEls[index].value = e.detail.toIndex;
    });
    el.addEventListener('navigationModelReset', function(e) {
        consoleEls[index].value = e.detail.toIndex;
    });
    emitters.push(NavigationEmitter.createLinear(el, 'li', options[index]));
});

wrapCheckbox.addEventListener('change', function(e) {
    emitters.forEach(function(emitter) {
        emitter.model.options.wrap = e.target.checked;
    });
});

// emitters[0].model.index = 1;
// emitters[1].model.index = 1;
