const KeyEmitter = require('makeup-key-emitter');

const widgetEl1 = document.getElementById('widget-1');
const widget2ButtonEls = document.querySelectorAll('#widget-2 button');

const events = [
    'arrowUpKey',
    'arrowDownKey',
    'arrowLeftKey',
    'arrowRightKey',
    'escapeKey',
    'spacebarKey',
    'enterKey',
    'homeKey',
    'endKey',
    'pageDownKey',
    'pageUpKey'
];

// on widget1 container

KeyEmitter.add(widgetEl1);

events.forEach(function(eventName) {
    widgetEl1.addEventListener(`${eventName}Down`, function(e) {
        console.log(this, e);
    });
    widgetEl1.addEventListener(`${eventName}Up`, function(e) {
        console.log(this, e);
    });
});

// on widget2 buttons

Array.prototype.slice.call(widget2ButtonEls).forEach(function(el) {
    KeyEmitter.add(el);

    events.forEach(function(eventName) {
        el.addEventListener(`${eventName}Down`, function(e) {
            console.log(this, e);
        });
        el.addEventListener(`${eventName}Up`, function(e) {
            console.log(this, e);
        });
    });
});
