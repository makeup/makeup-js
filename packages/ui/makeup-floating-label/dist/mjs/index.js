const defaultOptions = {
  labelElementAnimateModifier: "floating-label__label--animate",
  labelElementInlineModifier: "floating-label__label--inline",
  labelElementFocusModifier: "floating-label__label--focus",
  labelElementInvalidModifier: "floating-label__label--invalid",
  labelElementDisabledModifier: "floating-label__label--disabled",
  textboxElementBackgroundRGB: [
    "rgb(255, 255, 255)",
    "rgb(247, 247, 247)",
    "rgb(245, 245, 245)",
    "rgb(230, 32, 72)",
    "rgb(254, 245, 246)",
    "rgba(0, 0, 0, 0)"
  ]
};
function getPlaceHolder(formControlEl) {
  if (isSelect(formControlEl)) {
    const firstOption = formControlEl.querySelector("option");
    return !firstOption.value ? firstOption.text : null;
  } else if (formControlEl.hasAttribute("placeholder")) {
    return formControlEl.getAttribute("placeholder");
  }
}
function setPlaceholder(formControlEl, value) {
  if (isSelect(formControlEl)) {
    formControlEl.style["min-width"] = "";
    const beforeWidth = formControlEl.offsetWidth;
    const firstOption = formControlEl.querySelector("option");
    if (!firstOption.value) {
      firstOption.text = value;
    }
    if (!value && beforeWidth > formControlEl.offsetWidth) {
      formControlEl.style["min-width"] = `${beforeWidth}px`;
    }
  } else if (value) {
    formControlEl.setAttribute("placeholder", value);
  } else {
    formControlEl.removeAttribute("placeholder");
  }
}
function checkForPlaceholder(formControlEl) {
  if (isSelect(formControlEl)) {
    const firstOption = formControlEl.querySelector("option");
    if (!!firstOption.value) {
      return;
    }
    return !!firstOption.text;
  }
  return formControlEl.hasAttribute("placeholder");
}
function onMutation() {
  const textboxFocus = isFocused(this.formControlEl);
  this.placeholder = getPlaceHolder(this.formControlEl) || this.placeholder;
  const placeholderCheck = checkForPlaceholder(this.formControlEl, this.placeholder);
  if (!!this.placeholder && textboxFocus && !placeholderCheck) {
    setPlaceholder(this.formControlEl, this.placeholder);
  } else if (!textboxFocus && placeholderCheck) {
    setPlaceholder(this.formControlEl, "");
  }
  if (isInvalid(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementInvalidModifier);
  } else {
    this.labelEl.classList.remove(this.options.labelElementInvalidModifier);
  }
  if (isDisabled(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementDisabledModifier);
  } else {
    this.labelEl.classList.remove(this.options.labelElementDisabledModifier);
  }
}
function isFocused(formControlEl) {
  return document.activeElement === formControlEl;
}
function isSelect(formControlEl) {
  return formControlEl.tagName === "SELECT";
}
function hasValue(input) {
  return input.value.length > 0;
}
function isDisabled(input) {
  return input.hasAttribute("disabled");
}
function isInvalid(input) {
  return input.hasAttribute("aria-invalid") && input.getAttribute("aria-invalid") === "true";
}
function isAutofilled(input, color) {
  if (!isSelect(input)) {
    const bgColor = getComputedStyle(input).backgroundColor;
    return Array.isArray(color) ? !color.includes(bgColor) : bgColor !== color;
  }
  return false;
}
function _onBlur() {
  if (!hasValue(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementInlineModifier);
  }
  this.labelEl.classList.remove(this.options.labelElementFocusModifier);
  if (isInvalid(this.formControlEl)) {
    this.labelEl.classList.add(this.options.labelElementInvalidModifier);
  }
  setPlaceholder(this.formControlEl, "");
}
function _onFocus() {
  this.labelEl.classList.add(this.options.labelElementAnimateModifier);
  this.labelEl.classList.add(this.options.labelElementFocusModifier);
  this.labelEl.classList.remove(this.options.labelElementInlineModifier);
  this.labelEl.classList.remove(this.options.labelElementInvalidModifier);
  if (this.placeholder) {
    setPlaceholder(this.formControlEl, this.placeholder);
  }
}
class index_default {
  constructor(el, userOptions) {
    this.options = Object.assign({}, defaultOptions, userOptions);
    this._observer = new MutationObserver(onMutation.bind(this));
    this.rootEl = el;
    this.labelEl = this.rootEl.querySelector("label");
    this.formControlEl = this.rootEl.querySelector("input,textarea,select");
    this._onBlurListener = _onBlur.bind(this);
    this._onFocusListener = _onFocus.bind(this);
    this.formControlEl.addEventListener("blur", this._onBlurListener);
    this.formControlEl.addEventListener("focus", this._onFocusListener);
    if (!hasValue(this.formControlEl) && !isAutofilled(this.formControlEl, this.options.textboxElementBackgroundRGB)) {
      this.labelEl.classList.add(this.options.labelElementInlineModifier);
    } else if (!isSelect(this.formControlEl)) {
      this.labelEl.classList.remove(this.options.labelElementInlineModifier);
    }
    if (isFocused(this.formControlEl)) {
      this.labelEl.classList.add(this.options.labelElementFocusModifier);
      this.labelEl.classList.remove(this.options.labelElementInlineModifier);
    }
    onMutation.call(this);
    this._observer.observe(this.formControlEl, {
      childList: isSelect(this.formControlEl),
      subtree: isSelect(this.formControlEl),
      attributeFilter: ["disabled", "aria-invalid", "placeholder", "value"],
      attributes: true
    });
  }
  destroy() {
    this._observer.disconnect();
  }
  refresh() {
    if (hasValue(this.formControlEl) || isSelect(this.formControlEl) || isAutofilled(this.formControlEl, this.options.textboxElementBackgroundRGB)) {
      this.labelEl.classList.remove(this.options.labelElementInlineModifier);
    } else {
      this.labelEl.classList.add(this.options.labelElementInlineModifier);
    }
    if (isFocused(this.formControlEl)) {
      this.labelEl.classList.add(this.options.labelElementFocusModifier);
      this.labelEl.classList.remove(this.options.labelElementInlineModifier);
    }
  }
}
export {
  index_default as default
};
