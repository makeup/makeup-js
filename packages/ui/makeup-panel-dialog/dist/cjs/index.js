"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupLightboxDialog = _interopRequireDefault(require("makeup-lightbox-dialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultPanelOptions = {
  baseClass: "panel-dialog",
  quickDismiss: true,
  closeButtonSelector: ".panel-dialog__close",
  doneButtonSelector: ".panel-dialog__done",
  windowSelector: ".panel-dialog__window",
  transitionsModifier: "mask-fade-slow"
};
class _default extends _makeupLightboxDialog.default {
  constructor(el) {
    let selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultPanelOptions, selectedOptions));
  }
}
exports.default = _default;
