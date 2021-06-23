const modal = require('../../packages/makeup-modal');
const modalEl = document.querySelectorAll('.modal')[0];
const button = document.querySelectorAll('button')[0];
const modalElTwo = document.querySelectorAll('.modal')[1];
const buttonTwo = document.querySelectorAll('button')[1];
const unhoistButton = document.querySelectorAll('button')[2];
const hoistCheckbox = document.querySelector('input');

let doHoist = false;

hoistCheckbox.addEventListener('change', () => {
    doHoist = hoistCheckbox.checked;
});

button.addEventListener('click', () => {
    modal.modal(modalEl, { useHiddenProperty: false, hoist: doHoist });
});

buttonTwo.addEventListener('click', () => {
    modal.modal(modalElTwo, { useHiddenProperty: false, hoist: doHoist });
});

unhoistButton.addEventListener('click', () => {
    modal.unmodal();
});
