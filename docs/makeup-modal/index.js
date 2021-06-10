const modal = require('../../packages/makeup-modal');
const modalButton = document.querySelector('.modal-button');
const modalEl = document.querySelector('.modal');
const hoistButton = document.querySelector('#hoist-button');
const hoistInput = document.querySelector('#hoist-input');
// modal.modal(modalEl, { useHiddenProperty: false });
let modalPressed = false;

modalButton.addEventListener('click', () => {
    if (modalPressed) {
        modalPressed = false;
        modalButton.textContent = 'Modal';
        modal.unmodal(modalEl, { useHiddenProperty: false, hoist: hoistInput.checked });
    } else {
        modalPressed = true;
        modalButton.textContent = 'Unmodal';
        modal.modal(modalEl, { useHiddenProperty: false, hoist: hoistInput.checked });
    }
});

hoistButton.addEventListener('click', () => {
    hoistInput.toggleAttribute('checked');
});

document.addEventListener('hoist', (e) => {
    console.log(e);
});

document.addEventListener('unhoist', (e) => {
    console.log(e);
});
