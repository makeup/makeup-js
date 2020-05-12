'use strict'; // requires CustomEvent polyfill for IE
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomEvent = require('custom-event');

var nextID = require('makeup-next-id');

var ExitEmitter = require('makeup-exit-emitter');

var focusables = require('makeup-focusables');

var defaultOptions = {
  alwaysDoFocusManagement: false,
  ariaControls: true,
  autoCollapse: false,
  collapseOnFocusOut: false,
  collapseOnMouseOut: false,
  collapseOnClickOut: false,
  contentSelector: '.expander__content',
  expandedClass: null,
  expandOnClick: false,
  expandOnFocus: false,
  expandOnHover: false,
  focusManagement: null,
  hostSelector: '.expander__host',
  simulateSpacebarClick: false
};

function onHostKeyDown(e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    this._keyboardClickFlag = true;
  } // if host element does not naturally trigger a click event on spacebar, we can force one to trigger here.
  // careful! if host already triggers click events naturally, we end up with a "double-click".


  if (e.keyCode === 32 && this.options.simulateSpacebarClick === true) {
    this.hostEl.click();
  }
}

function onHostMouseDown() {
  this._mouseClickFlag = true;
}

function onHostClick() {
  this._expandWasKeyboardClickActivated = this._keyboardClickFlag;
  this._expandWasMouseClickActivated = this._mouseClickFlag;
  this.expanded = !this.expanded;
}

function onHostFocus() {
  this._expandWasFocusActivated = true;
  this.expanded = true;
}

function onHostHover() {
  clearTimeout(this._mouseLeft);
  this._expandWasHoverActivated = true;
  this.expanded = true;
}

function onFocusExit() {
  this.expanded = false;
}

function onMouseLeave() {
  var _this = this;

  clearTimeout(this._mouseLeft);
  this._mouseLeft = setTimeout(function () {
    _this.expanded = false;
  }, 300);
}

function _onDocumentClick() {
  if (this.el.contains(event.target) === false) {
    this.expanded = false;
  }
}

function _onDocumentTouchStart() {
  this.documentClick = true;
}

function _onDocumentTouchMove() {
  this.documentClick = false;
}

function _onDocumentTouchEnd() {
  if (this.documentClick === true) {
    this.documentClick = false;

    if (this.el.contains(event.target) === false) {
      this.expanded = false;
    }
  }
}

function manageFocus(focusManagement, contentEl) {
  if (focusManagement === 'content') {
    contentEl.setAttribute('tabindex', '-1');
    contentEl.focus();
  } else if (focusManagement === 'focusable') {
    focusables(contentEl)[0].focus();
  } else if (focusManagement === 'interactive') {
    focusables(contentEl, true)[0].focus();
  } else if (focusManagement !== null) {
    var el = contentEl.querySelector("#".concat(focusManagement));

    if (el) {
      el.focus();
    }
  }
}

module.exports = /*#__PURE__*/function () {
  function _class(el, selectedOptions) {
    _classCallCheck(this, _class);

    this.options = _extends({}, defaultOptions, selectedOptions);
    this.el = el;
    this.hostEl = el.querySelector(this.options.hostSelector); // the keyboard focusable host el

    this.contentEl = el.querySelector(this.options.contentSelector);
    ExitEmitter.addFocusExit(this.el);
    this._hostKeyDownListener = onHostKeyDown.bind(this);
    this._hostMouseDownListener = onHostMouseDown.bind(this);
    this._documentClickListener = _onDocumentClick.bind(this);
    this._documentTouchStartListener = _onDocumentTouchStart.bind(this);
    this._documentTouchMoveListener = _onDocumentTouchMove.bind(this);
    this._documentTouchEndListener = _onDocumentTouchEnd.bind(this);
    this._hostClickListener = onHostClick.bind(this);
    this._hostFocusListener = onHostFocus.bind(this);
    this._hostHoverListener = onHostHover.bind(this);
    this._focusExitListener = onFocusExit.bind(this);
    this._mouseLeaveListener = onMouseLeave.bind(this);

    if (this.hostEl.getAttribute('aria-expanded') === null) {
      this.hostEl.setAttribute('aria-expanded', 'false');
    }

    if (this.options.ariaControls === true) {
      // ensure the widget has an id
      nextID(this.el, 'expander');
      this.contentEl.id = this.contentEl.id || "".concat(this.el.id, "-content");
      this.hostEl.setAttribute('aria-controls', this.contentEl.id);
    }

    this.expandOnClick = this.options.expandOnClick;
    this.expandOnFocus = this.options.expandOnFocus;
    this.expandOnHover = this.options.expandOnHover;

    if (this.options.autoCollapse === false) {
      this.collapseOnClickOut = this.options.collapseOnClickOut;
      this.collapseOnFocusOut = this.options.collapseOnFocusOut;
      this.collapseOnMouseOut = this.options.collapseOnMouseOut;
    }
  }

  _createClass(_class, [{
    key: "sleep",
    value: function sleep() {
      if (this._destroyed !== true) {
        this.expandOnClick = false;
        this.expandOnFocus = false;
        this.expandOnHover = false;
        this.collapseOnClickOut = false;
        this.collapseOnFocusOut = false;
        this.collapseOnMouseOut = false;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.sleep();
      this._destroyed = true;
      this._hostKeyDownListener = null;
      this._hostMouseDownListener = null;
      this._documentClickListener = null;
      this._documentTouchStartListener = null;
      this._documentTouchMoveListener = null;
      this._documentTouchEndListener = null;
      this._hostClickListener = null;
      this._hostFocusListener = null;
      this._hostHoverListener = null;
      this._focusExitListener = null;
      this._mouseLeaveListener = null;
    } // DEPRECATED (remove in v1.0.0)

  }, {
    key: "isExpanded",
    value: function isExpanded() {
      return this.expanded;
    } // DEPRECATED (remove in v1.0.0)

  }, {
    key: "expand",
    value: function expand() {
      this.expanded = true;
    } // DEPRECATED (remove in v1.0.0)

  }, {
    key: "collapse",
    value: function collapse() {
      this.expanded = false;
    } // DEPRECATED (remove in v1.0.0)

  }, {
    key: "toggle",
    value: function toggle() {
      this.expanded = !this.expanded;
    } // DEPRECATED (remove in v1.0.0)

  }, {
    key: "cancelAsync",
    value: function cancelAsync() {
      this.sleep();
    }
  }, {
    key: "expandOnClick",
    set: function set(bool) {
      if (bool === true) {
        this.hostEl.addEventListener('keydown', this._hostKeyDownListener);
        this.hostEl.addEventListener('mousedown', this._hostMouseDownListener);
        this.hostEl.addEventListener('click', this._hostClickListener);

        if (this.options.autoCollapse === true) {
          this.collapseOnClickOut = true;
          this.collapseOnFocusOut = true;
        }
      } else {
        this.hostEl.removeEventListener('click', this._hostClickListener);
        this.hostEl.removeEventListener('mousedown', this._hostMouseDownListener);
        this.hostEl.removeEventListener('keydown', this._hostKeyDownListener);
      }
    }
  }, {
    key: "expandOnFocus",
    set: function set(bool) {
      if (bool === true) {
        this.hostEl.addEventListener('focus', this._hostFocusListener);

        if (this.options.autoCollapse === true) {
          this.collapseOnClickOut = true;
          this.collapseOnFocusOut = true;
        }
      } else {
        this.hostEl.removeEventListener('focus', this._hostFocusListener);
      }
    }
  }, {
    key: "expandOnHover",
    set: function set(bool) {
      if (bool === true) {
        this.hostEl.addEventListener('mouseenter', this._hostHoverListener);
        this.contentEl.addEventListener('mouseenter', this._hostHoverListener);

        if (this.options.autoCollapse === true) {
          this.collapseOnMouseOut = true;
        }
      } else {
        this.hostEl.removeEventListener('mouseenter', this._hostHoverListener);
        this.contentEl.removeEventListener('mouseenter', this._hostHoverListener);
      }
    }
  }, {
    key: "collapseOnClickOut",
    set: function set(bool) {
      if (bool === true) {
        document.addEventListener('click', this._documentClickListener);
        document.addEventListener('touchstart', this._documentTouchStartListener);
        document.addEventListener('touchmove', this._documentTouchMoveListener);
        document.addEventListener('touchend', this._documentTouchEndListener);
      } else {
        document.removeEventListener('click', this._documentClickListener);
        document.removeEventListener('touchstart', this._documentTouchStartListener);
        document.removeEventListener('touchmove', this._documentTouchMoveListener);
        document.removeEventListener('touchend', this._documentTouchEndListener);
      }
    }
  }, {
    key: "collapseOnFocusOut",
    set: function set(bool) {
      if (bool === true) {
        this.el.addEventListener('focusExit', this._focusExitListener);
      } else {
        this.el.removeEventListener('focusExit', this._focusExitListener);
      }
    }
  }, {
    key: "collapseOnMouseOut",
    set: function set(bool) {
      if (bool === true) {
        this.el.addEventListener('mouseleave', this._mouseLeaveListener);
        this.contentEl.addEventListener('mouseleave', this._mouseLeaveListener);
      } else {
        this.el.removeEventListener('mouseleave', this._mouseLeaveListener);
        this.contentEl.removeEventListener('mouseleave', this._mouseLeaveListener);
      }
    }
  }, {
    key: "expanded",
    get: function get() {
      return this.hostEl.getAttribute('aria-expanded') === 'true';
    },
    set: function set(bool) {
      if (bool === true && this.expanded === false) {
        this.hostEl.setAttribute('aria-expanded', 'true');

        if (this.options.expandedClass) {
          this.el.classList.add(this.options.expandedClass);
        }

        if (this._expandWasKeyboardClickActivated || this._expandWasMouseClickActivated && this.options.alwaysDoFocusManagement) {
          manageFocus(this.options.focusManagement, this.contentEl);
        }

        this.el.dispatchEvent(new CustomEvent('expander-expand', {
          bubbles: true,
          detail: this.contentEl
        }));
      }

      if (bool === false && this.expanded === true) {
        this.hostEl.setAttribute('aria-expanded', 'false');

        if (this.options.expandedClass) {
          this.el.classList.remove(this.options.expandedClass);
        }

        this.el.dispatchEvent(new CustomEvent('expander-collapse', {
          bubbles: true,
          detail: this.contentEl
        }));
      }

      this._expandWasKeyboardClickActivated = false;
      this._expandWasMouseClickActivated = false;
      this._expandWasFocusActivated = false;
      this._expandWasHoverActivated = false;
      this._keyboardClickFlag = false;
      this._mouseClickFlag = false;
    }
  }]);

  return _class;
}();
