// REQUIRE
// const Expander = require('makeup-expander').default;

// IMPORT
import Expander from "makeup-expander";

const clickExpanderEls = document.querySelectorAll(".expander--click-only");
const focusExpanderEls = document.querySelectorAll(".expander--focus-only");
const hoverExpanderEls = document.querySelectorAll(".expander--hover-only");
const hoverAndFocusExpanderEls = document.querySelectorAll(".expander--focus-and-hover");
const stealthExpanderEls = document.querySelectorAll(".expander--stealth-only");
const clickAndSpacebarExpanderEls = document.querySelectorAll(".expander--click-and-spacebar");
const expanderWidgets = [];

expanderWidgets.push(new Expander(clickExpanderEls[0], { expandOnClick: true }));
expanderWidgets.push(new Expander(clickExpanderEls[1], { autoCollapse: true, expandOnClick: true }));

focusExpanderEls.forEach(function (el) {
  expanderWidgets.push(new Expander(el, { autoCollapse: true, expandOnFocus: true }));
});

hoverExpanderEls.forEach(function (el) {
  expanderWidgets.push(new Expander(el, { autoCollapse: true, expandOnHover: true }));
});

hoverAndFocusExpanderEls.forEach(function (el) {
  expanderWidgets.push(new Expander(el, { autoCollapse: true, expandOnFocus: true, expandOnHover: true }));
});

stealthExpanderEls.forEach(function (el) {
  expanderWidgets.push(
    new Expander(el, {
      collapseOnClickOut: true,
      collapseOnFocusOut: true,
      expandOnClick: true,
      focusManagement: "focusable",
    }),
  );
});

clickAndSpacebarExpanderEls.forEach(function (el) {
  expanderWidgets.push(
    new Expander(el, {
      autoCollapse: true,
      expandOnClick: true,
      simulateSpacebarClick: true,
      expandedClass: "expander__host-container--expanded",
    }),
  );
});

expanderWidgets.forEach(function (item) {
  item.el.addEventListener("expander-expand", function (e) {
    console.log(e);
  });
  item.el.addEventListener("expander-collapse", function (e) {
    console.log(e);
  });
});
