const Hoist = require('../../packages/makeup-hoist-element');
// const { hoist } = require('../../packages/makeup-modal/node_modules/makeup-hoist-element/src');

let hoisted = false;
const elementToHoist = document.querySelector('#hoist-this');

elementToHoist.addEventListener('click', function() {
    if (hoisted) {
        Hoist.unhoist(elementToHoist);
        hoisted = false;
        return;
    }
    Hoist.hoist(elementToHoist);
    hoisted = true;
});
