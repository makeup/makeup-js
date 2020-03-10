require('nodelist-foreach-polyfill');

document.addEventListener('DOMContentLoaded', function() {
    const FloatingLabel = require('makeup-floating-label');

    const widgetEls = document.querySelectorAll('.floating-label');
    const autofillBtn = document.getElementById('autofill');
    const refreshBtn = document.getElementById('refresh');
    const widgets = [];

    widgetEls.forEach(function(el) {
        widgets.push(new FloatingLabel(el));
    });

    autofillBtn.addEventListener('click', function() {
        widgetEls.forEach(function(el) {
            el.querySelector('input').value = 'Autofill Text';
        });
    });

    refreshBtn.addEventListener('click', function() {
        widgets.forEach(function(el, index) {
            widgets[index].refresh();
        });
    });
});
