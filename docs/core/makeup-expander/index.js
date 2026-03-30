import Expander from "makeup-expander";

const clickExpanderEls = document.querySelectorAll(".expander--click-only");
const focusExpanderEls = document.querySelectorAll(".expander--focus-only");
const hoverExpanderEls = document.querySelectorAll(".expander--hover-only");
const focusAndHoverExpanderEls = document.querySelectorAll(".expander--focus-and-hover");
const stealthExpanderEls = document.querySelectorAll(".expander--stealth-only");
const clickAndSpacebarExpanderEls = document.querySelectorAll(".expander--click-and-spacebar");
const tooltipEls = document.querySelectorAll(".expander--tooltip");

const logEl = document.getElementById("log");

function logEvent(name) {
  const item = document.createElement("li");
  item.textContent = name;
  logEl.prepend(item);
}

const expanderWidgets = [];

expanderWidgets.push(new Expander(clickExpanderEls[0], { expandOnClick: true }));
expanderWidgets.push(new Expander(clickExpanderEls[1], { autoCollapse: true, expandOnClick: true }));

focusExpanderEls.forEach((el) => {
  expanderWidgets.push(new Expander(el, { autoCollapse: true, expandOnFocus: true }));
});

hoverExpanderEls.forEach((el) => {
  expanderWidgets.push(new Expander(el, { autoCollapse: true, expandOnHover: true }));
});

focusAndHoverExpanderEls.forEach((el) => {
  expanderWidgets.push(new Expander(el, { autoCollapse: true, expandOnFocus: true, expandOnHover: true }));
});

stealthExpanderEls.forEach((el) => {
  expanderWidgets.push(
    new Expander(el, {
      collapseOnClickOut: true,
      collapseOnFocusOut: true,
      expandOnClick: true,
      focusManagement: "focusable",
    }),
  );
});

clickAndSpacebarExpanderEls.forEach((el) => {
  expanderWidgets.push(
    new Expander(el, {
      autoCollapse: true,
      expandOnClick: true,
      simulateSpacebarClick: true,
      expandedClass: "expander__host-container--expanded",
    }),
  );
});

tooltipEls.forEach((el) => {
  expanderWidgets.push(
    new Expander(el, {
      ariaControls: false,
      autoCollapse: true,
      expandOnFocus: true,
      expandOnHover: true,
      useAriaExpanded: false,
      expandedClass: "expander__host-container--expanded",
    }),
  );
});

expanderWidgets.forEach((widget) => {
  widget.el.addEventListener("expander-expand", () => logEvent("expander-expand"));
  widget.el.addEventListener("expander-collapse", () => logEvent("expander-collapse"));
});

document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
