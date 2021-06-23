const modal = require('../../packages/makeup-modal');
const modalEl = document.querySelectorAll('.modal')[0];
const button = document.querySelectorAll('button')[0];
const modalElTwo = document.querySelectorAll('.modal')[1];
const buttonTwo = document.querySelectorAll('button')[1];
const buttonThree = document.querySelectorAll('button')[2];
const modalElThree = document.querySelector('#modal-3');
const unmodalButton = document.querySelectorAll('button')[3];
const hoistCheckbox = document.querySelector('#hoist-checkbox');

let doHoist = false;

hoistCheckbox.addEventListener('change', () => {
    doHoist = hoistCheckbox.checked;
    console.log(doHoist);
});

button.addEventListener('click', () => {
    modal.modal(modalEl, { useHiddenProperty: false, hoist: doHoist });
});

buttonTwo.addEventListener('click', () => {
    modal.modal(modalElTwo, { useHiddenProperty: false, hoist: doHoist });
});

buttonThree.addEventListener('click', () => {
    modal.modal(modalElThree, { useHiddenProperty: false, hoist: doHoist });
});

unmodalButton.addEventListener('click', () => {
    modal.unmodal();
});

