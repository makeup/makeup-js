import { describe, expect, beforeEach, it, vi } from "vitest";
import * as screenreaderTrap from "../src/index.js";
import * as util from "../src/util.js";
import testData from "./data.js";

function getAriaHiddenElements() {
  return document.querySelectorAll("[aria-hidden]");
}

function getAriaHiddenTrueElements() {
  return document.querySelectorAll('[aria-hidden="true"]');
}

function getAriaHiddenFalseElements() {
  return document.querySelectorAll('[aria-hidden="false"]');
}

testData.forEach((data) => {
  describe("Util", () => {
    describe("given test data", () => {
      describe("when DOM is rendered", () => {
        let trapEl;

        beforeEach(() => {
          document.body.innerHTML = data.html;
          trapEl = document.querySelector(".trap");
        });

        it("should find correct number of siblings", () => {
          expect(util.getSiblings(trapEl).length).toBe(data.numSiblings);
        });

        it("should find correct number of ancestors", () => {
          expect(util.getAncestors(trapEl).length).toBe(data.numAncestors);
        });

        it("should find correct number of siblings of ancestors", () => {
          expect(util.getSiblingsOfAncestors(trapEl).length).toBe(data.numSiblingsOfAncestors);
        });
      });
    });
  });

  describe("Module", () => {
    describe("given test data", () => {
      describe("when DOM is rendered and trap is activated", () => {
        let trapEl;
        let onTrap;
        let onUntrap;

        beforeEach(() => {
          document.body.innerHTML = data.html;
          trapEl = document.querySelector(".trap");
          onTrap = vi.fn();
          onUntrap = vi.fn();
          trapEl.addEventListener("screenreaderTrap", onTrap);
          trapEl.addEventListener("screenreaderUntrap", onUntrap);
          screenreaderTrap.trap(trapEl);
        });

        it("should add aria-hidden=false to trapped element", () => {
          expect(trapEl.getAttribute("aria-hidden")).toBe("false");
        });

        it("should find correct number of elements with aria-hidden attribute", () => {
          expect(getAriaHiddenElements().length).toBe(data.numAriaHiddenAfterTrap);
        });

        it("should find correct number of elements with aria-hidden=true attribute", () => {
          expect(getAriaHiddenTrueElements().length).toBe(data.numAriaHiddenTrueAfterTrap);
        });

        it("should find correct number of elements with aria-hidden=false attribute", () => {
          expect(getAriaHiddenFalseElements().length).toBe(data.numAriaHiddenFalseAfterTrap);
        });

        it("should observe one trap event", () => {
          expect(onTrap).toHaveBeenCalledOnce();
        });

        it("should not observe any untrap event", () => {
          expect(onUntrap).not.toHaveBeenCalled();
        });
      });

      describe("when DOM is rendered and trap is activated then deactivated", () => {
        let trapEl;
        let onUntrap;

        beforeEach(() => {
          document.body.innerHTML = data.html;
          trapEl = document.querySelector(".trap");
          onUntrap = vi.fn();
          trapEl.addEventListener("screenreaderUntrap", onUntrap);
          screenreaderTrap.trap(trapEl);
          screenreaderTrap.untrap();
        });

        it("should find correct number of elements with aria-hidden attribute", () => {
          expect(getAriaHiddenElements().length).toBe(data.numAriaHiddenAfterUntrap);
        });

        it("should find correct number of elements with aria-hidden=true attribute", () => {
          expect(getAriaHiddenTrueElements().length).toBe(data.numAriaHiddenTrueAfterUntrap);
        });

        it("should find correct number of elements with aria-hidden=false attribute", () => {
          expect(getAriaHiddenFalseElements().length).toBe(data.numAriaHiddenFalseAfterUntrap);
        });

        it("should observe a single untrap event", () => {
          expect(onUntrap).toHaveBeenCalledOnce();
        });
      });
    });
  });
});
