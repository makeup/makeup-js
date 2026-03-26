import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { add, remove } from "../src/index.js";

// Keys that should have scroll prevented
const SCROLL_KEYS = [" ", "PageUp", "PageDown", "End", "Home", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

describe("given an element with prevent-scroll-keys added", () => {
  let element;

  beforeEach(() => {
    element = document.createElement("div");
    add(element);
  });

  afterEach(() => {
    remove(element);
  });

  describe("when a scroll key is pressed", () => {
    it("should prevent default for Space", () => {
      const event = new KeyboardEvent("keydown", { key: " " });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it("should prevent default for PageUp", () => {
      const event = new KeyboardEvent("keydown", { key: "PageUp" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it("should prevent default for PageDown", () => {
      const event = new KeyboardEvent("keydown", { key: "PageDown" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it("should prevent default for End", () => {
      const event = new KeyboardEvent("keydown", { key: "End" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it("should prevent default for Home", () => {
      const event = new KeyboardEvent("keydown", { key: "Home" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it("should prevent default for arrow keys", () => {
      const arrowKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];

      arrowKeys.forEach((key) => {
        const event = new KeyboardEvent("keydown", { key });
        const preventDefaultSpy = vi.spyOn(event, "preventDefault");

        element.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalledOnce();
      });
    });
  });

  describe("when a non-scroll key is pressed", () => {
    it("should not prevent default for letter keys", () => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it("should not prevent default for Enter", () => {
      const event = new KeyboardEvent("keydown", { key: "Enter" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it("should not prevent default for Tab", () => {
      const event = new KeyboardEvent("keydown", { key: "Tab" });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe("when remove is called", () => {
    it("should stop preventing scroll keys", () => {
      remove(element);

      const event = new KeyboardEvent("keydown", { key: " " });
      const preventDefaultSpy = vi.spyOn(event, "preventDefault");

      element.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });
});
