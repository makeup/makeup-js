const scrollKeysPreventer = require('makeup-prevent-scroll-keys');
const widgetEl = document.querySelector('.widget');

scrollKeysPreventer.add(widgetEl);

window.addEventListener('scroll', (e) => console.log(e));

// scrollKeysPreventer.remove(widgetEl);
