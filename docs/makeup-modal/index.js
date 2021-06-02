const modal = require('../../packages/makeup-modal');
const modalButton = document.querySelector('.modal-button');
const modalEl = document.querySelector('.modal');
// modal.modal(modalEl, { useHiddenProperty: false });
let modalPressed = false;

modalButton.addEventListener('click', () => {
    if (modalPressed) {
        modalPressed = false;
        modalButton.textContent = 'Modal';
        modal.unmodal(modalEl, { useHiddenProperty: false });
    } else {
        modalPressed = true;
        modalButton.textContent = 'Unmodal';
        modal.modal(modalEl, { useHiddenProperty: false });
    }
});

document.addEventListener('hoist', (e) => {
    console.log(e);
});

document.addEventListener('unhoist', (e) => {
    console.log(e);
});
