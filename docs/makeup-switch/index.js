import "../docs.css";
import "@ebay/skin/switch";

const MakeupSwitch = require('../../packages/makeup-switch');

window.onload = function() {
    document.querySelectorAll('.switch').forEach(function(el, i) {
        const widget = new MakeupSwitch(el);

        el.addEventListener('makeup-switch-toggle', function(e) {
            console.log(e.type, e.detail);
        });

        el.addEventListener('makeup-switch-mutation', function(e) {
            console.log(e.type, e.detail);
        });
    });
};
