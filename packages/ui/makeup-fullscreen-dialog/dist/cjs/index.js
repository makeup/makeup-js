"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _makeupDialog = _interopRequireDefault(require("makeup-dialog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultFullscreenOptions = {
  baseClass: "fullscreen-dialog",
  quickDismiss: false,
  closeButtonSelector: ".fullscreen-dialog__close",
  transitionsModifier: "transition",
  windowSelector: ".fullscreen-dialog__window"
};
class _default extends _makeupDialog.default {
  constructor(el) {
    let selectedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(el, Object.assign({}, defaultFullscreenOptions, selectedOptions, {
      modal: true
    }));
  }
}
exports.default = _default;
