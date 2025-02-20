import { describe, expect, beforeEach, afterEach, beforeAll, it } from "vitest";
import sinon from "sinon";
import * as Modal from "../src/index.js";
import testData from "./data.js";

let modalEl;
let onModal;
let onUnmodal;

let modal;
let unmodal;

let hoistTestData =
  '<div><script id="script-1"></script><div>one</div><script id="script-2"></script><div class="hoist-me">two</div><script id="script-3"></script></div>';
let hoistExpectedResult =
  '<div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><div aria-hidden="false"><script id="script-1"></script><div aria-hidden="true">one</div><script id="script-2"></script><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><div class="hoist-me keyboard-trap--active" aria-hidden="false" data-makeup-modal="widget"><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div>two<div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div></div><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div><script id="script-3"></script></div><div aria-hidden="true" tabindex="0" class="keyboard-trap-boundary"></div>';
let hoistEl;

function doBeforeAll(html) {
  modal = Modal.modal;
  unmodal = Modal.unmodal;
  document.querySelector("body").innerHTML = html;

  modalEl = document.querySelector(".modal");
  onModal = sinon.spy();
  onUnmodal = sinon.spy();

  modalEl.addEventListener("makeup-modal", onModal);
  modalEl.addEventListener("makeup-unmodal", onUnmodal);
}

function hoistDoBeforeAll() {
  document.querySelector("body").innerHTML = hoistTestData;

  hoistEl = document.querySelector(".hoist-me");
}

testData.forEach(function (data) {
  describe("makeup-modal", function () {
    describe("when modal is activated", function () {
      beforeEach(function () {
        doBeforeAll(data.html);
      });

      afterEach(function () {
        onModal.resetHistory();
        onUnmodal.resetHistory();
      });

      it("should observe one modal event", function () {
        modal(modalEl);
        expect(onModal.callCount).to.equal(1);
      });

      it("should observe zero unmodal events", function () {
        modal(modalEl);
        expect(onUnmodal.callCount).to.equal(0);
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

    describe("when modal is activated then deactivated", function () {
      beforeEach(function () {
        doBeforeAll(data.html);
        modal(modalEl);
        unmodal();
      });

      afterEach(function () {
        onModal.resetHistory();
        onUnmodal.resetHistory();
      });

      it("should observe one modal events", function () {
        expect(onModal.callCount).to.equal(1);
      });

      it("should observe one unmodal event", function () {
        expect(onUnmodal.callCount).to.equal(1);
      });
    });

    describe("hoist funcionality", function () {
      describe("when hoist is called", function () {
        beforeAll(function () {
          hoistDoBeforeAll(hoistTestData);
        });

        it("should have hoisted the data", function () {
          modal(hoistEl);
          expect(document.body.innerHTML).toBe(hoistExpectedResult);
        });

        it("should hoist modal element", () => {
          modal(hoistEl, { hoist: true, wrap: false });
          expect(hoistEl.parentNode).toBe(document.body);
        });
      });
      describe("when hoist then unHoist are called", function () {
        beforeAll(function () {
          hoistDoBeforeAll(hoistTestData);
          modal(hoistEl);
          unmodal();
        });

        it("should keep the scripts in the same place", function () {
          expect(document.querySelector("#script-1").nextElementSibling.textContent).toEqual("one");
          expect(document.querySelector("#script-2").previousElementSibling.textContent).toEqual("one");
          expect(document.querySelector("#script-2").nextElementSibling.textContent).toEqual("two");
          expect(document.querySelector("#script-3").previousElementSibling.textContent).toEqual("two");
        });
      });
    });
  });
});
