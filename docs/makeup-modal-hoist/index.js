const modal = require('../../packages/makeup-modal');
const modalEl = document.querySelectorAll('.modal')[0];
const button = document.querySelectorAll('button')[0];
const modalElTwo = document.querySelectorAll('.modal')[1];
const buttonTwo = document.querySelectorAll('button')[1];
const unhoistButton = document.querySelectorAll('button')[2];

button.addEventListener('click', () => {
    modal.modal(modalEl, { useHiddenProperty: false, hoist: true });
});

buttonTwo.addEventListener('click', () => {
    modal.modal(modalElTwo, { useHiddenProperty: false, hoist: true });
});

unhoistButton.addEventListener('click', () => {
    modal.unmodal();
});
