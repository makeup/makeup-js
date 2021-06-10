const Hoist = require('../../packages/makeup-hoist-element');

const elementToHoist = document.querySelector('#hoist-this');

elementToHoist.addEventListener('click', function() {
    if (Hoist.isHoisted(elementToHoist)) {
        Hoist.unhoist(elementToHoist);
    } else {
        Hoist.hoist(elementToHoist);
    }
});
