// CJS
//const scrollKeyPreventer = require('../../packages/makeup-prevent-scroll-keys');

// MJS
import * as scrollKeyPreventer from '../../packages/makeup-prevent-scroll-keys';

const widgetEl = document.querySelector('.widget');

scrollKeyPreventer.add(widgetEl);

window.addEventListener('scroll', (e) => console.log(e));

// scrollKeyPreventer.remove(widgetEl);
