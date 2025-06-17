"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupNextId = _interopRequireDefault(require("makeup-next-id"));
var RovingTabindex = _interopRequireWildcard(require("makeup-roving-tabindex"));
var ScrollKeyPreventer = _interopRequireWildcard(require("makeup-prevent-scroll-keys"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function linkTabToPanel(widgetID, el, i) {
  el.setAttribute("id", `${widgetID}-tab-${i}`);
  el.setAttribute("aria-controls", `${widgetID}-panel-${i}`);
}
function linkPanelToTab(widgetID, el, i) {
  el.setAttribute("id", `${widgetID}-panel-${i}`);
  el.setAttribute("aria-labelledby", `${widgetID}-tab-${i}`);
}
function disableLink(el) {
  el.setAttribute("role", "presentation");
  el.removeAttribute("href");
}
function dispatchEvent(el, fromIndex, toIndex) {
  el.dispatchEvent(new CustomEvent("makeup-tabs-change", {
    detail: {
      fromIndex: fromIndex,
      toIndex: toIndex
    }
  }));
}
function onRovingTabindexChange(e) {
  this.tabs[e.detail.fromIndex].setAttribute("aria-selected", "false");
  this.panels[e.detail.fromIndex].hidden = true;
  this.tabs[e.detail.toIndex].setAttribute("aria-selected", "true");
  this.panels[e.detail.toIndex].hidden = false;
  dispatchEvent(this._el, e.detail.fromIndex, e.detail.toIndex);
}
function onTabListKeyDown(e) {
  if (e.keyCode === 13 || e.keyCode === 32) {
    const fromIndex = this.index;
    const toIndex = [...this.tabs].indexOf(e.target);
    if (fromIndex !== toIndex) {
      this.tabs[fromIndex].setAttribute("aria-selected", "false");
      this.panels[fromIndex].hidden = true;
      this.tabs[toIndex].setAttribute("aria-selected", "true");
      this.panels[toIndex].hidden = false;
      dispatchEvent(this._el, fromIndex, toIndex);
    }
  }
}
function onTabListClick(e) {
  const tabEl = e.target.closest("[role=tab]");
  if (tabEl) {
    const fromIndex = this.index;
    const toIndex = [...this.tabs].indexOf(tabEl);
    if (fromIndex !== toIndex) {
      this.tabs[fromIndex].setAttribute("aria-selected", "false");
      this.panels[fromIndex].hidden = true;
      tabEl.setAttribute("aria-selected", "true");
      this.panels[toIndex].hidden = false;
      dispatchEvent(this._el, fromIndex, toIndex);
    }
  }
}
const defaultOptions = {
  autoSelect: true,
  initialIndex: 0
};
class _default {
  constructor(widgetEl, selectedOptions) {
    this._options = Object.assign({}, defaultOptions, selectedOptions);
    this._onRovingTabindexChangeListener = onRovingTabindexChange.bind(this);
    this._onTabListKeyDownListener = onTabListKeyDown.bind(this);
    this._onTabListClickListener = onTabListClick.bind(this);

    // cache the root element
    this._el = widgetEl;
    const tabList = this._el.querySelector(".tabs__items");
    const tabs = this._el.querySelectorAll(".tabs__item");
    const panels = this._el.querySelectorAll(".tabs__panel");
    const links = tabList.querySelectorAll("a");
    this.tabList = tabList;
    this.tabs = tabs;
    this.panels = panels;

    // cache the initialIndex
    let initialIndex = this._options.initialIndex;

    // sanitize the initialIndex
    if (initialIndex < 0 || initialIndex >= tabs.length) {
      initialIndex = 0;
    }

    // ensure the widget has an ID
    (0, _makeupNextId.default)(widgetEl, "tabs");

    // add static roles
    tabList.setAttribute("role", "tablist");
    tabs.forEach(el => el.setAttribute("role", "tab"));
    panels.forEach(el => el.setAttribute("role", "tabpanel"));

    // set the selected tab to true
    tabs[initialIndex].setAttribute("aria-selected", "true");

    // set all unselected tabs to false
    [...tabs].filter((el, i) => i !== initialIndex).forEach(el => el.setAttribute("aria-selected", "false"));

    // hide all unselected panels
    [...panels].filter((el, i) => i !== initialIndex).forEach(el => el.hidden = true);

    // all tabs control their respective panel
    tabs.forEach((el, i) => linkTabToPanel(this._el.id, el, i));

    // all panels are labelled  by their respective tab
    panels.forEach((el, i) => linkPanelToTab(this._el.id, el, i));

    // remove link behaviour and semantics
    links.forEach(el => disableLink(el));

    // create a roving tab index
    this._rovingTabindex = RovingTabindex.createLinear(this._el, "[role=tab]", {
      wrap: true
    });
    this.wake();

    // prevent page scroll when scroll keys are pressed
    ScrollKeyPreventer.add(tabList);

    // mark the widget as progressively enhanced
    this._el.classList.add("tabs--js");
  }
  get index() {
    return [...this.tabs].findIndex(function (el) {
      return el.getAttribute("aria-selected") === "true";
    });
  }
  sleep() {
    this._el.removeEventListener("rovingTabindexChange", this._onRovingTabindexChangeListener);
    this.tabList.removeEventListener("keydown", this._onTabListKeyDownListener);
    this.tabList.removeEventListener("click", this._onTabListClickListener);
  }
  wake() {
    if (this._destroyed !== true) {
      // listen for changes to roving tab index
      if (this._options.autoSelect === true) {
        this._el.addEventListener("rovingTabindexChange", this._onRovingTabindexChangeListener);
      } else {
        this.tabList.addEventListener("keydown", this._onTabListKeyDownListener);
        this.tabList.addEventListener("click", this._onTabListClickListener);
      }
    }
  }
  destroy() {
    this._destroyed = true;
    this.sleep();
    this._onRovingTabindexChangeListener = null;
    this._onTabListKeyDownListener = null;
    this._onTabListClickListener = null;
  }
}
exports.default = _default;
