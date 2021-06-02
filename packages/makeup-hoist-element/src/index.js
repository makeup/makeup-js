let modalEl;
let modalPlaceholder;
let containerDiv;

function unhoist() {
    if (modalEl) {
        if (containerDiv) {
            const childList = Array.from(containerDiv.childNodes);
            childList.forEach((child) =>
                child.src === undefined ? document.body.appendChild(child) : null
            );
            containerDiv.remove();
            containerDiv = null;
        }

        if (modalPlaceholder) {
            modalPlaceholder.replaceWith(modalEl);
            // let observers know the element is unhoisted
            const event = document.createEvent('Event');
            event.initEvent('unhoist', true, true);
            modalEl.dispatchEvent(event);
            modalPlaceholder = null;
        }
        modalEl = null;
    }
    return modalEl;
}

function hoist(el) {
    unhoist();
    modalEl = el;

    modalPlaceholder = document.createElement('div');
    modalEl.insertAdjacentElement('beforebegin', modalPlaceholder);

    containerDiv = document.createElement('div');
    const childList = Array.from(document.body.childNodes);
    childList.forEach((child) =>
        child.src === undefined ? containerDiv.appendChild(child) : null
    );
    containerDiv.setAttribute('aria-hidden', 'true');

    document.body.prepend(containerDiv);

    modalEl.setAttribute('aria-hidden', 'false');
    document.body.appendChild(modalEl);

    // let observers know the element is hoisted
    const event = document.createEvent('Event');
    event.initEvent('hoist', true, true);
    modalEl.dispatchEvent(event);

    return modalEl;
}

module.exports = {
    hoist,
    unhoist
};
