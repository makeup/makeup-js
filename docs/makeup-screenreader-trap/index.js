// REQUIRE
//const screenreaderTrap = require('../../packages/makeup-screenreader-trap');

// IMPORT
import * as screenreaderTrap from '../../packages/makeup-screenreader-trap';

document.querySelectorAll('.trap').forEach(function(item) {
    item.addEventListener('click', function() {
        if (this.getAttribute('aria-pressed') === 'true') {
            screenreaderTrap.untrap(this);
        } else {
            screenreaderTrap.trap(this, { useHiddenProperty: false });
        }
    });

    item.addEventListener('screenreaderTrap', function(e) {
        console.log(this, e);
        this.innerText = 'Untrap';
        this.setAttribute('aria-pressed', 'true');
    });

    item.addEventListener('screenreaderUntrap', function(e) {
        console.log(this, e);
        this.innerText = 'Trap';
        this.setAttribute('aria-pressed', 'false');
    });
});

document.addEventListener('screenreaderTrap', function(e) {
    console.log(this, e);
});

document.addEventListener('screenreaderUntrap', function(e) {
    console.log(this, e);
});
