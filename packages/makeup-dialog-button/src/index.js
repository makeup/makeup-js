const AlertDialog = require('makeup-alert-dialog');
const ConfirmDialog = require('makeup-confirm-dialog');
const Dialog = require('makeup-dialog');

const defaultOptions = {
    customElementMode: false,
    selectors: {
        alert: 'alert-dialog',
        confirm: 'confirm-dialog',
        drawer: 'drawer-dialog',
        filter: 'panel-dialog--filter',
        fullscreen: 'fullscreen-dialog',
        input: 'lightbox-dialog--input',
        lightbox: 'lightbox-dialog',
        panel: 'panel-dialog',
        snackbar: 'snackbar-dialog',
        sort: 'panel-dialog--sort',
        toast: 'toast-dialog'
    }
};

module.exports = class {
    constructor(widgetEl, selectedOptions) {
        this._options = Object.assign({}, defaultOptions, selectedOptions);

        this._el = widgetEl;

        const dialogId = this._el.dataset.makeupFor;
        const dialogEl = document.getElementById(dialogId);
        const dialogClassList = dialogEl.classList;

        this._el.setAttribute('aria-haspopup', 'dialog');

        // todo: refactor this block
        if (dialogClassList.contains(this._options.selectors.confirm)) {
            this._dialog = new ConfirmDialog(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.alert)) {
            this._dialog = new AlertDialog(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.input)) {
            this._dialog = new Dialog.Input(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.sort)) {
            this._dialog = new Dialog.Sort(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.filter)) {
            this._dialog = new Dialog.Filter(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.fullscreen)) {
            this._dialog = new Dialog.Fullscreen(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.snackbar)) {
            this._dialog = new Dialog.Snackbar(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.toast)) {
            this._dialog = new Dialog.Toast(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.drawer)) {
            this._dialog = new Dialog.Drawer(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.panel)) {
            this._dialog = new Dialog.Panel(dialogEl);
        } else if (dialogClassList.contains(this._options.selectors.lightbox)) {
            this._dialog = new Dialog.Lightbox(dialogEl);
        }

        this._onClickListener = _onClick.bind(this);
        this._onDialogCloseListener = _onDialogClose.bind(this);
        this._onMutationListener = _onMutation.bind(this);

        this._el.classList.add('dialog-button--js');

        if (!this._options.customElementMode) {
            this._mutationObserver = new MutationObserver(this._onMutationListener);
            this._observeMutations();
            this._observeEvents();
        }
    }

    get dialog() {
        return this._dialog;
    }

    _observeMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.observe(this._el, {
                attributes: true,
                childList: false,
                subtree: false
            });
        }
    }

    _unobserveMutations() {
        if (!this._options.customElementMode) {
            this._mutationObserver.disconnect();
        }
    }

    _observeEvents() {
        if (this._destroyed !== true) {
            this._el.addEventListener('click', this._onClickListener);
            this.dialog._el.addEventListener('dialog-close', this._onDialogCloseListener);
            this.dialog._el.addEventListener('dialog-done', this._onDialogCloseListener);
            this.dialog._el.addEventListener('dialog-submit', this._onDialogCloseListener);
            this.dialog._el.addEventListener('dialog-cancel', this._onDialogCloseListener);
            this.dialog._el.addEventListener('dialog-confirm', this._onDialogCloseListener);
            this.dialog._el.addEventListener('dialog-reject', this._onDialogCloseListener);
            this.dialog._el.addEventListener('dialog-acknowledge', this._onDialogCloseListener);
        }
    }

    _unobserveEvents() {
        this._el.removeEventListener('click');
        this.dialog._el.removeEventListener('dialog-close', this._onDialogCloseListener);
        this.dialog._el.removeEventListener('dialog-done', this._onDialogCloseListener);
        this.dialog._el.removeEventListener('dialog-submit', this._onDialogCloseListener);
        this.dialog._el.removeEventListener('dialog-cancel', this._onDialogCloseListener);
        this.dialog._el.removeEventListener('dialog-confirm', this._onDialogCloseListener);
        this.dialog._el.removeEventListener('dialog-reject', this._onDialogCloseListener);
        this.dialog._el.removeEventListener('dialog-acknowledge', this._onDialogCloseListener);
    }

    destroy() {
        this._destroyed = true;

        this._unobserveMutations();
        this._unobserveEvents();

        this._onClickListener = null;
        this._onDialogCloseListener = null;
        this._onMutationListener = null;
    }
};

function _onMutation(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
            this._el.dispatchEvent(new CustomEvent('makeup-dialog-button-mutation', {
                detail: {
                    attributeName: mutation.attributeName
                }
            }));
        }
    }
}

function _onClick() {
    this.dialog.open();
}

function _onDialogClose() {
    if (this.dialog.modal) {
        this._el.focus();
    }
}
