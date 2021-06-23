const MenuButton = require('../../packages/makeup-menu-button');

window.onload = function() {
    document.querySelectorAll('.menu-button').forEach(function(el, i) {
        const widget = new MenuButton(el);

        widget.menu.el.addEventListener('makeup-menu-select', (e) => console.log(e.type, e.detail));
        widget.menu.el.addEventListener('makeup-menu-change', (e) => console.log(e.type, e.detail));
        widget.menu.el.addEventListener('makeup-menu-button-mutation', (e) => console.log(e.type, e.detail));
    });
};
