import { describe, expect, beforeEach, test } from "vitest";
import sinon from "sinon";
import * as screenreaderTrap from "../src/index.js";
import * as util from "../src/util.js";
import testData from "./data.js";

var trapEl;
var onTrap;
var onUntrap;

function doBeforeAll(html) {
  document.querySelector("body").innerHTML = html;

  trapEl = document.querySelector(".trap");

  onTrap = sinon.spy();
  onUntrap = sinon.spy();

  trapEl.addEventListener("screenreaderTrap", onTrap);
  trapEl.addEventListener("screenreaderUntrap", onUntrap);
}

function getAriaHiddenElements() {
  return document.querySelectorAll("[aria-hidden]");
}

function getAriaHiddenTrueElements() {
  return document.querySelectorAll('[aria-hidden="true"]');
}

function getAriaHiddenFalseElements() {
  return document.querySelectorAll('[aria-hidden="false"]');
}

testData.forEach(function (data) {
  describe("Util", function () {
    describe("given test data", function () {
      describe("when DOM is rendered", function () {
        beforeEach(function () {
          doBeforeAll(data.html);
        });

        test("should find correct number of siblings", function () {
          expect(util.getSiblings(trapEl).length).to.equal(data.numSiblings);
        });

        test("should find correct number of ancestors", function () {
          expect(util.getAncestors(trapEl).length).to.equal(data.numAncestors);
        });

        test("should find correct number of siblings of ancestors", function () {
          expect(util.getSiblingsOfAncestors(trapEl).length).to.equal(data.numSiblingsOfAncestors);
        });
      });
    });
  });

  describe("Module", function () {
    describe("given test data", function () {
      describe("when DOM is rendered and trap is activated", function () {
        beforeEach(function () {
          doBeforeAll(data.html);
          screenreaderTrap.trap(trapEl);
        });

        test("should add aria-hidden=false to trapped element", function () {
          expect(trapEl.getAttribute("aria-hidden")).to.equal("false");
        });

        test("should find correct number of elements with aria-hidden attribute", function () {
          expect(getAriaHiddenElements().length).to.equal(data.numAriaHiddenAfterTrap);
        });

        test("should find correct number of elements with aria-hidden=true attribute", function () {
          expect(getAriaHiddenTrueElements().length).to.equal(data.numAriaHiddenTrueAfterTrap);
        });

        test("should find correct number of elements with aria-hidden=false attribute", function () {
          expect(getAriaHiddenFalseElements().length).to.equal(data.numAriaHiddenFalseAfterTrap);
        });

        test("should observe one trap event", function () {
          expect(onTrap.callCount).to.equal(1);
        });

        test("should not observe any untrap event", function () {
          expect(onUntrap.callCount).to.equal(0);
        });
      });

      describe("when DOM is rendered and trap is activated then deactivated", function () {
        beforeEach(function () {
          doBeforeAll(data.html);
          screenreaderTrap.trap(trapEl);
          screenreaderTrap.untrap();
        });

        test("should find correct number of elements with aria-hidden attribute", function () {
          expect(getAriaHiddenElements().length).to.equal(data.numAriaHiddenAfterUntrap);
        });

        test("should find correct number of elements with aria-hidden=true attribute", function () {
          expect(getAriaHiddenTrueElements().length).to.equal(data.numAriaHiddenTrueAfterUntrap);
        });

        test("should find correct number of elements with aria-hidden=false attribute", function () {
          expect(getAriaHiddenFalseElements().length).to.equal(data.numAriaHiddenFalseAfterUntrap);
        });

        test("should observe a single untrap event", function () {
          expect(onUntrap.callCount).to.equal(1);
        });
      });
    });
  });
});
