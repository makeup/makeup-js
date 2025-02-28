import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { add, remove } from "../src/index.js";

describe("given an element", () => {
  let element;
  beforeEach(() => {
    element = document.createElement("div");
    add(element);
  });

  afterEach(() => {
    remove(element);
  });

  it("when module imported should not be undefined", function () {
    expect(add).not.toBe(undefined);
    expect(remove).not.toBe(undefined);
  });

  it("should prevent default for key codes 32 to 40", () => {
    const preventDefaultMock = vi.fn();

    // Simulate keydown events for each key code from 32 to 40
    for (let keyCode = 32; keyCode <= 40; keyCode++) {
      const event = new KeyboardEvent("keydown", { keyCode });
      event.preventDefault = preventDefaultMock;
      element.dispatchEvent(event);
      expect(preventDefaultMock).toHaveBeenCalled();
    }
  });

  it("should not prevent default for key codes outside 32 to 40", () => {
    const preventDefaultMock = vi.fn();

    // Simulate keydown events for a key code outside the range
    const event = new KeyboardEvent("keydown", { keyCode: 41 });
    event.preventDefault = preventDefaultMock;
    element.dispatchEvent(event);
    expect(preventDefaultMock).not.toHaveBeenCalled();
  });

  it("should remove the event listener correctly", () => {
    const preventDefaultMock = vi.fn();
    const event = new KeyboardEvent("keydown", { keyCode: 32 });
    event.preventDefault = preventDefaultMock;

    // Remove the event listener
    remove(element);

    // Dispatch the event after removing the listener
    element.dispatchEvent(event);

    expect(preventDefaultMock).not.toHaveBeenCalled();
  });
});
