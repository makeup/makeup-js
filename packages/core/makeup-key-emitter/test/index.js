import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { add, addKeyDown, addKeyUp, remove, removeKeyDown, removeKeyUp } from "../src/index.js";

describe("given an element with key emitter added", () => {
  let el;

  beforeEach(() => {
    document.body.innerHTML = '<ul class="widget"><li><button>Button 1</button></li></ul>';
    el = document.querySelector(".widget");
    add(el);
  });

  afterEach(() => {
    remove(el);
    vi.restoreAllMocks();
  });

  describe("when Home key is pressed", () => {
    it("should trigger homeKeyUp event", () => {
      const onEvent = vi.fn();
      el.addEventListener("homeKeyUp", onEvent);
      el.dispatchEvent(new KeyboardEvent("keyup", { key: "Home" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when remove is called and Home key is pressed", () => {
    it("should not trigger homeKeyUp event", () => {
      const onEvent = vi.fn();
      el.addEventListener("homeKeyUp", onEvent);
      remove(el);
      el.dispatchEvent(new KeyboardEvent("keyup", { key: "Home" }));
      expect(onEvent).not.toHaveBeenCalled();
    });
  });
});

describe("given an element with addKeyDown added", () => {
  let el;

  beforeEach(() => {
    document.body.innerHTML = '<ul class="widget"><li><button>Button 1</button></li></ul>';
    el = document.querySelector(".widget");
    addKeyDown(el);
  });

  describe("when ArrowLeft key is pressed", () => {
    it("should trigger arrowLeftKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("arrowLeftKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when ArrowUp key is pressed", () => {
    it("should trigger arrowUpKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("arrowUpKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when ArrowRight key is pressed", () => {
    it("should trigger arrowRightKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("arrowRightKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when ArrowDown key is pressed", () => {
    it("should trigger arrowDownKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("arrowDownKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });
});

describe("given an element with addKeyUp added", () => {
  let el;

  beforeEach(() => {
    document.body.innerHTML = '<ul class="widget"><li><button>Button 1</button></li></ul>';
    el = document.querySelector(".widget");
    addKeyUp(el);
  });

  describe("when Space key is pressed", () => {
    it("should trigger spacebarKeyUp event", () => {
      const onEvent = vi.fn();
      el.addEventListener("spacebarKeyUp", onEvent);
      el.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when Space key is pressed with Shift", () => {
    it("should not trigger spacebarKeyUp event", () => {
      const onEvent = vi.fn();
      el.addEventListener("spacebarKeyUp", onEvent);
      el.dispatchEvent(new KeyboardEvent("keyup", { key: " ", shiftKey: true }));
      expect(onEvent).not.toHaveBeenCalled();
    });
  });

  describe("when a non-accessibility key is pressed", () => {
    it("should not trigger any custom event", () => {
      const onEvent = vi.fn();
      el.addEventListener("aKeyUp", onEvent);
      el.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }));
      expect(onEvent).not.toHaveBeenCalled();
    });
  });

  describe("when removeKeyUp is called and Space key is pressed", () => {
    it("should not trigger spacebarKeyUp event", () => {
      const onEvent = vi.fn();
      el.addEventListener("spacebarKeyUp", onEvent);
      removeKeyUp(el);
      el.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
      expect(onEvent).not.toHaveBeenCalled();
    });
  });
});

describe("given an element with addKeyDown added", () => {
  let el;

  beforeEach(() => {
    document.body.innerHTML = '<ul class="widget"><li><button>Button 1</button></li></ul>';
    el = document.querySelector(".widget");
    addKeyDown(el);
  });

  describe("when Enter key is pressed", () => {
    it("should trigger enterKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("enterKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when Escape key is pressed", () => {
    it("should trigger escapeKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("escapeKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when PageUp key is pressed", () => {
    it("should trigger pageUpKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("pageUpKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "PageUp" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when PageDown key is pressed", () => {
    it("should trigger pageDownKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("pageDownKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "PageDown" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when End key is pressed", () => {
    it("should trigger endKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("endKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when Home key is pressed", () => {
    it("should trigger homeKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("homeKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
      expect(onEvent).toHaveBeenCalledOnce();
    });
  });

  describe("when ArrowLeft key is pressed with Shift", () => {
    it("should not trigger arrowLeftKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("arrowLeftKeyDown", onEvent);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft", shiftKey: true }));
      expect(onEvent).not.toHaveBeenCalled();
    });
  });

  describe("when removeKeyDown is called and ArrowLeft key is pressed", () => {
    it("should not trigger arrowLeftKeyDown event", () => {
      const onEvent = vi.fn();
      el.addEventListener("arrowLeftKeyDown", onEvent);
      removeKeyDown(el);
      el.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
      expect(onEvent).not.toHaveBeenCalled();
    });
  });
});
