import * as keyboardTrap from 'makeup-keyboard-trap';
import * as screenreaderTrap from 'makeup-screenreader-trap';

const defaultOptions = {
    hoist: false,
    useHiddenProperty: false,
    wrap: false
};

const tags = {
    SCRIPT: 'script',
    LINK: 'link'
};

let modalEl;
let hoistedPlaceholderEl;
let inertContentEl;
let originalPositionIndexes = [];

function isRootLevel(el) {
    return el.parentNode.tagName.toLowerCase() === 'body';
}

function unhoist() {
    if (hoistedPlaceholderEl) {
        hoistedPlaceholderEl.replaceWith(modalEl);
        hoistedPlaceholderEl = null;
    }
}

function hoist() {
    if (!hoistedPlaceholderEl && !isRootLevel(modalEl)) {
        hoistedPlaceholderEl = document.createElement('div');
        hoistedPlaceholderEl.setAttribute('data-makeup-modal', 'placeholder');
        modalEl.parentElement.insertBefore(hoistedPlaceholderEl, modalEl);

        document.body.appendChild(modalEl);
    }
}

function wrap() {
    if (!inertContentEl && isRootLevel(modalEl)) {
        inertContentEl = document.createElement('div');
        inertContentEl.setAttribute('data-makeup-modal', 'inert');

        [...document.body.children].forEach((child, index) => {
            // checking for the script and link tags is necessary because moving them could cause issues.
            // for example, moving a script to the top of the body could freeze the page while the script loads.
            if (!(child === modalEl || child.tagName.toLowerCase() === tags.SCRIPT || child.tagName === tags.LINK)) {
                inertContentEl.appendChild(child);
                originalPositionIndexes.push(index);
            }
        });

        document.body.prepend(inertContentEl);
    }
}

function unwrap() {
    if (inertContentEl) {
        [...inertContentEl.children].forEach((child) => {
            if (!(child.tagName.toLowerCase() === tags.SCRIPT || child.tagName === tags.LINK)) {
                const index = originalPositionIndexes.shift();
                if (index > document.body.children.length) {
                    document.body.appendChild(child);
                } else {
                    document.body.insertBefore(child, document.body.children[index + 1]);
                }
            }
        });

        inertContentEl.remove();
        inertContentEl = null;
        originalPositionIndexes = [];
    }
}

function unmodal() {
    if (modalEl) {
        keyboardTrap.untrap(modalEl);
        screenreaderTrap.untrap(modalEl);
        unwrap();
        unhoist();

        document.body.removeAttribute('data-makeup-modal');
        modalEl.removeAttribute('data-makeup-modal');
        modalEl.dispatchEvent(new CustomEvent('makeup-unmodal', { bubbles: false }));

        modalEl = null;
    }

    return modalEl;
}

function modal(el, options) {
    const _options = Object.assign({}, defaultOptions, options);
    unmodal();
    modalEl = el;

    if (_options.hoist) {
        hoist();
    }

    if (_options.wrap) {
        wrap();
    }

    screenreaderTrap.trap(modalEl, options);

    // no need to create keyboard traps when inert content is using hidden property
    if (!_options.useHiddenProperty) {
        keyboardTrap.trap(modalEl);
    }

    document.body.setAttribute('data-makeup-modal', 'true');
    modalEl.setAttribute('data-makeup-modal', 'widget');
    modalEl.dispatchEvent(new CustomEvent('makeup-modal', { bubbles: false }));

    return modalEl;
}

export { modal, unmodal };
