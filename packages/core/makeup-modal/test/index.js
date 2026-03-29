import { describe, expect, beforeEach, beforeAll, it, vi } from "vitest";
import { modal, unmodal } from "../src/index.js";
import testData from "./data.js";

const hoistTestData =
  '<div><script id="script-1"></script><div>one</div><script id="script-2"></script><div class="hoist-me">two</div><script id="script-3"></script></div>';
const hoistExpectedResult =
  '<div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><div aria-hidden="false"><script id="script-1"></script><div aria-hidden="true">one</div><script id="script-2"></script><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><div class="hoist-me keyboard-trap--active" aria-hidden="false" data-makeup-modal="widget"><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div>two<div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div></div><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><script id="script-3"></script></div><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div>';

testData.forEach((data) => {
  describe("makeup-modal", () => {
    describe("given test data", () => {
      describe("when modal is activated", () => {
        let modalEl;
        let onModal;
        let onUnmodal;

        beforeEach(() => {
          document.body.innerHTML = data.html;
          modalEl = document.querySelector(".modal");
          onModal = vi.fn();
          onUnmodal = vi.fn();
          modalEl.addEventListener("makeup-modal", onModal);
          modalEl.addEventListener("makeup-unmodal", onUnmodal);
        });

        it("should observe one modal event", () => {
          modal(modalEl);
          expect(onModal).toHaveBeenCalledOnce();
        });

        it("should observe zero unmodal events", () => {
          modal(modalEl);
          expect(onUnmodal).not.toHaveBeenCalled();
        });

        it("should apply modal attributes and events", () => {
          modal(modalEl, { hoist: false, wrap: false });

          expect(modalEl.getAttribute("data-makeup-modal")).toBe("widget");
          expect(document.body.getAttribute("data-makeup-modal")).toBe("true");

          // Verify if the custom event is dispatched
          let eventDispatched = false;
          modalEl.addEventListener("makeup-modal", () => {
            eventDispatched = true;
          });
          modal(modalEl, { hoist: false, wrap: false });
          expect(eventDispatched).toBe(true);
        });

        it("should unmodal and remove attributes", () => {
          modal(modalEl, { hoist: false, wrap: false });
          unmodal();

          expect(modalEl.getAttribute("data-makeup-modal")).toBeNull();
          expect(document.body.getAttribute("data-makeup-modal")).toBeNull();
        });

        it("should wrap content", () => {
          const anotherElement = document.createElement("div");
          document.body.appendChild(anotherElement);

          modal(modalEl, { hoist: false, wrap: true });

          const inertContent = document.querySelector('[data-makeup-modal="inert"]');
          expect(inertContent).not.toBeNull();
          expect(inertContent.contains(anotherElement)).toBe(true);
        });
      });

      describe("when modal is activated then deactivated", () => {
        let modalEl;
        let onModal;
        let onUnmodal;

        beforeEach(() => {
          document.body.innerHTML = data.html;
          modalEl = document.querySelector(".modal");
          onModal = vi.fn();
          onUnmodal = vi.fn();
          modalEl.addEventListener("makeup-modal", onModal);
          modalEl.addEventListener("makeup-unmodal", onUnmodal);
          modal(modalEl);
          unmodal();
        });

        it("should observe one modal event", () => {
          expect(onModal).toHaveBeenCalledOnce();
        });

        it("should observe one unmodal event", () => {
          expect(onUnmodal).toHaveBeenCalledOnce();
        });
      });
    });

    describe("hoist functionality", () => {
      let hoistEl;

      describe("when hoist is called", () => {
        beforeAll(() => {
          document.body.innerHTML = hoistTestData;
          hoistEl = document.querySelector(".hoist-me");
        });

        it("should have hoisted the data", () => {
          modal(hoistEl);
          expect(document.body.innerHTML).toBe(hoistExpectedResult);
        });

        it("should hoist modal element", () => {
          modal(hoistEl, { hoist: true, wrap: false });
          expect(hoistEl.parentNode).toBe(document.body);
        });
      });

      describe("when hoist then unHoist are called", () => {
        beforeAll(() => {
          document.body.innerHTML = hoistTestData;
          hoistEl = document.querySelector(".hoist-me");
          modal(hoistEl);
          unmodal();
        });

        it("should keep the scripts in the same place", () => {
          expect(document.querySelector("#script-1").nextElementSibling.textContent).toEqual("one");
          expect(document.querySelector("#script-2").previousElementSibling.textContent).toEqual("one");
          expect(document.querySelector("#script-2").nextElementSibling.textContent).toEqual("two");
          expect(document.querySelector("#script-3").previousElementSibling.textContent).toEqual("two");
        });
      });
    });
  });
});

describe("makeup-modal", () => {
  describe("given a DOM with a modal element", () => {
    describe("when modal is activated with useHiddenProperty: true", () => {
      let modalEl;

      beforeEach(() => {
        document.body.innerHTML = '<div class="modal"></div>';
        modalEl = document.querySelector(".modal");
        modal(modalEl, { useHiddenProperty: true });
      });

      it("should not add keyboard trap boundaries", () => {
        expect(document.querySelectorAll(".keyboard-trap-boundary").length).toBe(0);
      });
    });
  });

  describe("given a DOM with a link element sibling", () => {
    describe("when modal is activated with wrap: true", () => {
      let modalEl;
      let linkEl;

      beforeEach(() => {
        document.body.innerHTML = '<div class="modal"></div>';
        linkEl = document.createElement("link");
        document.body.appendChild(linkEl);
        modalEl = document.querySelector(".modal");
        modal(modalEl, { wrap: true });
      });

      it("should not move the link element into the inert container", () => {
        const inertContent = document.querySelector('[data-makeup-modal="inert"]');
        expect(inertContent.contains(linkEl)).toBe(false);
      });

      it("should leave the link element as a direct body child", () => {
        expect(linkEl.parentNode).toBe(document.body);
      });
    });
  });
});
