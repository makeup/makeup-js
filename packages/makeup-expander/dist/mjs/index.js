import nextID from "makeup-next-id";
import * as ExitEmitter from "makeup-exit-emitter";
import focusables from "makeup-focusables";
const defaultOptions = {
  alwaysDoFocusManagement: false,
  ariaControls: true,
  autoCollapse: false,
  collapseOnFocusOut: false,
  collapseOnMouseOut: false,
  collapseOnClickOut: false,
  contentSelector: ".expander__content",
  expandedClass: null,
  expandOnClick: false,
  expandOnFocus: false,
  expandOnHover: false,
  focusManagement: null,
  hostSelector: ".expander__host",
  simulateSpacebarClick: false
};
function onHostKeyDown(e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    this._keyboardClickFlag = true;
  }
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
  clearTimeout(this._mouseLeft);
  this._mouseLeft = setTimeout(() => {
    this.expanded = false;
  }, 300);
}
function _onDocumentClick(e) {
  if (this.el.contains(e.target) === false) {
    this.expanded = false;
  }
}
function _onDocumentTouchStart() {
  this.documentClick = true;
}
function _onDocumentTouchMove() {
  this.documentClick = false;
}
function _onDocumentTouchEnd(e) {
  if (this.documentClick === true) {
    this.documentClick = false;
    if (this.el.contains(e.target) === false) {
      this.expanded = false;
    }
  }
}
function manageFocus(focusManagement, contentEl) {
  if (focusManagement === "content") {
    contentEl.setAttribute("tabindex", "-1");
    contentEl.focus();
  } else if (focusManagement === "focusable") {
    focusables(contentEl)[0].focus();
  } else if (focusManagement === "interactive") {
    focusables(contentEl, true)[0].focus();
  } else if (focusManagement !== null) {
    const el = contentEl.querySelector(`#${focusManagement}`);
    if (el) {
      el.focus();
    }
  }
}
class src_default {
  constructor(el, selectedOptions) {
    this.options = Object.assign({}, defaultOptions, selectedOptions);
    this.el = el;
    this.hostEl = el.querySelector(this.options.hostSelector);
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
    if (this.hostEl.getAttribute("aria-expanded") === null) {
      this.hostEl.setAttribute("aria-expanded", "false");
    }
    if (this.options.ariaControls === true) {
      nextID(this.el, "expander");
      this.contentEl.id = this.contentEl.id || `${this.el.id}-content`;
      this.hostEl.setAttribute("aria-controls", this.contentEl.id);
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
  set expandOnClick(bool) {
    if (bool === true) {
      this.hostEl.addEventListener("keydown", this._hostKeyDownListener);
      this.hostEl.addEventListener("mousedown", this._hostMouseDownListener);
      this.hostEl.addEventListener("click", this._hostClickListener);
      if (this.options.autoCollapse === true) {
        this.collapseOnClickOut = true;
        this.collapseOnFocusOut = true;
      }
    } else {
      this.hostEl.removeEventListener("click", this._hostClickListener);
      this.hostEl.removeEventListener("mousedown", this._hostMouseDownListener);
      this.hostEl.removeEventListener("keydown", this._hostKeyDownListener);
    }
  }
  set expandOnFocus(bool) {
    if (bool === true) {
      this.hostEl.addEventListener("focus", this._hostFocusListener);
      if (this.options.autoCollapse === true) {
        this.collapseOnClickOut = true;
        this.collapseOnFocusOut = true;
      }
    } else {
      this.hostEl.removeEventListener("focus", this._hostFocusListener);
    }
  }
  set expandOnHover(bool) {
    if (bool === true) {
      this.hostEl.addEventListener("mouseenter", this._hostHoverListener);
      this.contentEl.addEventListener("mouseenter", this._hostHoverListener);
      if (this.options.autoCollapse === true) {
        this.collapseOnMouseOut = true;
      }
    } else {
      this.hostEl.removeEventListener("mouseenter", this._hostHoverListener);
      this.contentEl.removeEventListener("mouseenter", this._hostHoverListener);
    }
  }
  set collapseOnClickOut(bool) {
    if (bool === true) {
      document.addEventListener("click", this._documentClickListener);
      document.addEventListener("touchstart", this._documentTouchStartListener);
      document.addEventListener("touchmove", this._documentTouchMoveListener);
      document.addEventListener("touchend", this._documentTouchEndListener);
    } else {
      document.removeEventListener("click", this._documentClickListener);
      document.removeEventListener("touchstart", this._documentTouchStartListener);
      document.removeEventListener("touchmove", this._documentTouchMoveListener);
      document.removeEventListener("touchend", this._documentTouchEndListener);
    }
  }
  set collapseOnFocusOut(bool) {
    if (bool === true) {
      this.el.addEventListener("focusExit", this._focusExitListener);
    } else {
      this.el.removeEventListener("focusExit", this._focusExitListener);
    }
  }
  set collapseOnMouseOut(bool) {
    if (bool === true) {
      this.el.addEventListener("mouseleave", this._mouseLeaveListener);
      this.contentEl.addEventListener("mouseleave", this._mouseLeaveListener);
    } else {
      this.el.removeEventListener("mouseleave", this._mouseLeaveListener);
      this.contentEl.removeEventListener("mouseleave", this._mouseLeaveListener);
    }
  }
  get expanded() {
    return this.hostEl.getAttribute("aria-expanded") === "true";
  }
  set expanded(bool) {
    if (bool === true && this.expanded === false) {
      this.hostEl.setAttribute("aria-expanded", "true");
      if (this.options.expandedClass) {
        this.el.classList.add(this.options.expandedClass);
      }
      if (this._expandWasKeyboardClickActivated || this._expandWasMouseClickActivated && this.options.alwaysDoFocusManagement) {
        manageFocus(this.options.focusManagement, this.contentEl);
      }
      this.el.dispatchEvent(new CustomEvent("expander-expand", { bubbles: true, detail: this.contentEl }));
    }
    if (bool === false && this.expanded === true) {
      this.hostEl.setAttribute("aria-expanded", "false");
      if (this.options.expandedClass) {
        this.el.classList.remove(this.options.expandedClass);
      }
      this.el.dispatchEvent(new CustomEvent("expander-collapse", { bubbles: true, detail: this.contentEl }));
    }
    this._expandWasKeyboardClickActivated = false;
    this._expandWasMouseClickActivated = false;
    this._expandWasFocusActivated = false;
    this._expandWasHoverActivated = false;
    this._keyboardClickFlag = false;
    this._mouseClickFlag = false;
  }
  sleep() {
    if (this._destroyed !== true) {
      this.expandOnClick = false;
      this.expandOnFocus = false;
      this.expandOnHover = false;
      this.collapseOnClickOut = false;
      this.collapseOnFocusOut = false;
      this.collapseOnMouseOut = false;
    }
  }
  destroy() {
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
  }
}
export {
  src_default as default
};
