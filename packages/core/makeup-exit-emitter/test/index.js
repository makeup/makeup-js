import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import * as ExitEmitter from "../src/index.js";

describe("given an element with focus", () => {
  let testEl;
  let testElSibling;
  let onFocusExit;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-element" tabindex="0">
        <button></button>
      </div>
      <div id="test-element-sibling" tabindex="0">
        <button></button>
      </div>
    `;
    testEl = document.querySelector("#test-element");
    testElSibling = document.querySelector("#test-element-sibling");
    ExitEmitter.addFocusExit(testEl);
    onFocusExit = vi.fn();
    testEl.addEventListener("focusExit", onFocusExit);
    testEl.focus();
  });

  afterEach(() => {
    testEl.focus();
    onFocusExit.mockClear();
  });

  describe("when focus moves to sibling", () => {
    beforeEach(() => {
      testElSibling.focus();
    });

    it("should trigger focusExit", () => {
      expect(onFocusExit).toHaveBeenCalled();
    });
  });

  describe("when focus moves to descendant", () => {
    beforeEach(() => {
      testEl.querySelector("button").focus();
    });

    it("should not trigger focusExit", () => {
      expect(onFocusExit).not.toHaveBeenCalled();
    });
  });

  describe("when removeFocusExit is called and focus moves to sibling", () => {
    beforeEach(() => {
      ExitEmitter.removeFocusExit(testEl);
      testElSibling.focus();
    });

    it("should not trigger focusExit", () => {
      expect(onFocusExit).not.toHaveBeenCalled();
    });
  });
});

describe("given an element with no focusExit registered", () => {
  let testEl;

  beforeEach(() => {
    document.body.innerHTML = `<div id="test-element-unregistered" tabindex="0"></div>`;
    testEl = document.querySelector("#test-element-unregistered");
  });

  describe("when removeFocusExit is called", () => {
    it("should not throw", () => {
      expect(() => ExitEmitter.removeFocusExit(testEl)).not.toThrow();
    });
  });
});

describe("given an element with focus on a descendant", () => {
  let testEl;
  let testElSibling;
  let onFocusExit;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-element" tabindex="0">
        <button></button>
      </div>
      <div id="test-element-sibling" tabindex="0">
        <button></button>
      </div>
    `;
    testEl = document.querySelector("#test-element");
    testElSibling = document.querySelector("#test-element-sibling");
    ExitEmitter.addFocusExit(testEl);
    onFocusExit = vi.fn();
    testEl.addEventListener("focusExit", onFocusExit);
    testEl.querySelector("button").focus();
  });

  afterEach(() => {
    testEl.querySelector("button").focus();
    onFocusExit.mockClear();
  });

  describe("when focus moves to sibling of element root", () => {
    beforeEach(() => {
      testElSibling.focus();
    });

    it("should trigger focusExit", () => {
      expect(onFocusExit).toHaveBeenCalled();
    });
  });

  describe("when focus is reset on descendant", () => {
    beforeEach(() => {
      testEl.querySelector("button").focus();
    });

    it("should not trigger focusExit", () => {
      expect(onFocusExit).not.toHaveBeenCalled();
    });
  });

  describe("when focus moves to element root", () => {
    beforeEach(() => {
      testEl.focus();
    });

    it("should not trigger focusExit", () => {
      expect(onFocusExit).not.toHaveBeenCalled();
    });
  });
});
