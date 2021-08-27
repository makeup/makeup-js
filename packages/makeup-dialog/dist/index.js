"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal = require('makeup-modal');

var focusables = require('makeup-focusables');

var transition = require('./transition.js');

var defaultDialogOptions = {
  baseClass: 'dialog',
  closeButtonSelector: '.dialog__close',
  focusManagementIndex: 0,
  modal: false,
  quickDismiss: true,
  transitionsModifier: 'mask-fade'
};

module.exports = /*#__PURE__*/function () {
  function _class(widgetEl, selectedOptions) {
    _classCallCheck(this, _class);

    this._options = Object.assign({}, defaultDialogOptions, selectedOptions);
    this._el = widgetEl;

    if (this._options.modal === true) {
      this._el.setAttribute('aria-modal', 'true');
    }

    this._windowEl = this._el.querySelector(this._options.windowSelector);
    this._closeButtonEl = this._el.querySelector(this._options.closeButtonSelector);
    this._hasTransitions = this._el.classList.contains("".concat(this._options.baseClass, "--").concat(this._options.transitionsModifier));
    this._onCloseButtonClickListener = _onCloseButtonClick.bind(this);
    this._onKeyDownListener = _onKeyDown.bind(this);
    this._onOpenTransitionEndCallback = _onOpenTransitionEnd.bind(this);
    this._onCloseTransitionEndCallback = _onCloseTransitionEnd.bind(this);

    this._el.classList.add("".concat(this._options.baseClass, "--js"));

    if (!this.hidden) {
      _doModalFocusManagement(this);

      this._observeEvents();
    }
  }

  _createClass(_class, [{
    key: "focusables",
    get: function get() {
      return focusables(this._windowEl);
    }
  }, {
    key: "modal",
    get: function get() {
      return this._el.getAttribute('aria-modal') === 'true';
    }
  }, {
    key: "hidden",
    get: function get() {
      return this._el.hidden;
    }
  }, {
    key: "open",
    value: function open() {
      this._show();

      this._el.dispatchEvent(new CustomEvent('dialog-open'));
    }
  }, {
    key: "close",
    value: function close() {
      this._hide();

      this._el.dispatchEvent(new CustomEvent('dialog-close'));
    }
  }, {
    key: "_show",
    value: function _show() {
      if (this._hasTransitions) {
        if (this._cancelTransition) {
          this._cancelTransition();
        }

        this._cancelTransition = transition(this._el, "".concat(this._options.baseClass, "--show"), this._onOpenTransitionEndCallback);
      } else {
        if (this.modal) {
          _doModalFocusManagement(this);
        }

        this._el.hidden = false;
      }

      this._observeEvents();
    }
  }, {
    key: "_hide",
    value: function _hide() {
      if (this._hasTransitions) {
        if (this._cancelTransition) {
          this._cancelTransition();
        }

        this._cancelTransition = transition(this._el, "".concat(this._options.baseClass, "--hide"), this._onCloseTransitionEndCallback);
      } else {
        if (this.modal) {
          Modal.unmodal();
        }

        this._el.hidden = true;
      }

      this._autoDismissTimeout = null;

      this._unobserveEvents();
    }
  }, {
    key: "_observeEvents",
    value: function _observeEvents() {
      document.addEventListener('keydown', this._onKeyDownListener);

      if (this._closeButtonEl) {
        this._closeButtonEl.addEventListener('click', this._onCloseButtonClickListener);
      }
    }
  }, {
    key: "_unobserveEvents",
    value: function _unobserveEvents() {
      this._el.removeEventListener('click', this._onCloseButtonClickListener);

      document.removeEventListener('keydown', this._onKeyDownListener);

      if (this._closeButtonEl) {
        this._closeButtonEl.addEventListener('click', this._onCloseButtonClickListener);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyed = true;

      this._unobserveEvents();

      this._onCloseButtonClickListener = null;
      this._onKeyDownListener = null;
      this._onOpenTransitionEndCallback = null;
      this._onCloseTransitionEndCallback = null;
      this._autoDismissTimeout = null;
    }
  }]);

  return _class;
}();

function _doModalFocusManagement(dialogWidget) {
  var autoFocusEl = dialogWidget._el.querySelector('[autofocus]');

  if (autoFocusEl) {
    autoFocusEl.focus();
  } else {
    dialogWidget.focusables[dialogWidget._options.focusManagementIndex].focus();
  }

  Modal.modal(dialogWidget._el);
}

function _onOpenTransitionEnd() {
  this._el.hidden = false;
  this._cancelTransition = undefined;

  if (this.modal) {
    _doModalFocusManagement(this);
  }
}

function _onCloseTransitionEnd() {
  if (this.modal) {
    Modal.unmodal();
  }

  this._el.hidden = true;
  this._cancelTransition = undefined;
}

function _onKeyDown(e) {
  if (this._options.quickDismiss === true && e.keyCode === 27) {
    this.close();
  }
}

function _onCloseButtonClick() {
  this.close();
}