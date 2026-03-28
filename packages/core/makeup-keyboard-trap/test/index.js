import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import * as keyboardTrap from "../src/index.js";
import testData from "./data.js";

testData.forEach((data) => {
  let trapEl;
  let onTrap;
  let onUntrap;

  describe("given trap is not active,", () => {
    describe("when trap method is called", () => {
      beforeEach(() => {
        document.body.innerHTML = data.html;
        trapEl = document.querySelector(".dialog");
        onTrap = vi.fn();
        onUntrap = vi.fn();

        trapEl.addEventListener("keyboardTrap", onTrap);
        trapEl.addEventListener("keyboardUntrap", onUntrap);
        keyboardTrap.trap(trapEl);
        keyboardTrap.refresh();
      });

      afterEach(() => {
        keyboardTrap.untrap();
        onTrap.mockClear();
        onUntrap.mockClear();
      });

      it("should have class keyboard-trap--active on trap", () => {
        expect(trapEl.classList.contains("keyboard-trap--active")).toBe(true);
      });
      it("should have six trap boundaries in body", () => {
        expect(document.querySelectorAll(".keyboard-trap-boundary").length).toBe(6);
      });
      it("should observe one trap event", () => {
        expect(onTrap.mock.calls.length).toBe(1);
      });
      it("should observe zero untrap events", () => {
        expect(onUntrap.mock.calls.length).toBe(0);
      });
    });
  });

  describe("given trap is active,", () => {
    beforeEach(() => {
      document.body.innerHTML = data.html;
      trapEl = document.querySelector(".dialog");
      onTrap = vi.fn();
      onUntrap = vi.fn();

      trapEl.addEventListener("keyboardTrap", onTrap);
      trapEl.addEventListener("keyboardUntrap", onUntrap);

      keyboardTrap.trap(trapEl);
      keyboardTrap.refresh();
      onTrap.mockClear();
    });

    describe("when untrap method is called", () => {
      beforeEach(() => {
        keyboardTrap.untrap();
      });

      it("should have zero trap boundaries in body", () => {
        expect(document.querySelectorAll(".keyboard-trap-boundary").length).toBe(0);
      });
      it("should not have class keyboard-trap--active on trap", () => {
        expect(trapEl.classList.contains("keyboard-trap--active")).toBe(false);
      });
      it("should observe 0 trap events", () => {
        expect(onTrap.mock.calls.length).toBe(0);
      });
      it("should observe 1 untrap event", () => {
        expect(onUntrap.mock.calls.length).toBe(1);
      });
    });
  });

  describe("given trap is active", () => {
    beforeEach(() => {
      document.body.innerHTML = data.html;
      trapEl = document.querySelector(".dialog");
      onTrap = vi.fn();
      onUntrap = vi.fn();

      trapEl.addEventListener("keyboardTrap", onTrap);
      trapEl.addEventListener("keyboardUntrap", onUntrap);

      keyboardTrap.trap(trapEl);
      onTrap.mockClear();
      onUntrap.mockClear();
    });

    describe("when DOM is changed", () => {
      beforeEach(() => {
        document.querySelector(".keyboard-trap-boundary").remove();
      });

      it("should not throw an error when untrap is called", () => {
        expect(() => keyboardTrap.untrap()).not.toThrow();
      });
    });
  });
});

describe("given trap is not active", () => {
  beforeEach(() => {
    keyboardTrap.untrap();
  });

  describe("when refresh is called", () => {
    it("should not throw", () => {
      expect(() => keyboardTrap.refresh()).not.toThrow();
    });
  });
});
