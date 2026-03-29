import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { createLinear } from "../src/index.js";

let testEl, testRovingIndex, onNavigationModelChange;

function triggerArrowKeyPress(el, dir, num) {
  for (let i = 0; i < num; i++) {
    el.dispatchEvent(new CustomEvent(`arrow${dir}KeyDown`, { detail: { target: { tagName: "" } } }));
  }
}

function triggerKeyPress(el, keyType) {
  el.dispatchEvent(new CustomEvent(`${keyType}KeyDown`, { detail: { target: { tagName: "" } } }));
}

/* BEGIN STATIC MODEL SIZE TESTS */

describe("given a list of 3 visible items", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      testEl = document.querySelector(".widget");
      testRovingIndex = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testRovingIndex.items.length).toBe(3);
    });
  });
});

describe("given a list of 2 visible items, 1 hidden", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li hidden>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      testEl = document.querySelector(".widget");
      testRovingIndex = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testRovingIndex.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 hidden items", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <ul class="widget">
                <li hidden>Item 1</li>
                <li hidden>Item 2</li>
                <li hidden>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      testEl = document.querySelector(".widget");
      testRovingIndex = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testRovingIndex.items.length).toBe(3);
    });
  });
});

/* END STATIC MODEL SIZE TESTS */

/* BEGIN ARROW KEY TESTS */

describe("given 3 items with default options", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li");

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow up is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
      expect(testEl.children[0].getAttribute("tabindex")).toBe("-1");
      expect(testEl.children[1].getAttribute("tabindex")).toBe("0");
      expect(testEl.children[2].getAttribute("tabindex")).toBe("-1");
    });
  });

  describe("when arrow right is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 2);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed three times", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 3);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed once after rovingTabIndex is destroyed", () => {
    beforeEach(() => {
      testRovingIndex.destroy();
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 1 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when arrow down is pressed once after rovingTabIndex is destroyed", () => {
    beforeEach(() => {
      testRovingIndex.destroy();
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
      expect(testEl.children[0].getAttribute("tabindex")).toBe("0");
      expect(testEl.children[1].getAttribute("tabindex")).toBe("-1");
      expect(testEl.children[2].getAttribute("tabindex")).toBe("-1");
    });
  });
});

/* END ARROW KEYS TESTS */

/* BEGIN HOME & END KEY TESTS */

describe("given 3 items with default options", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li");

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when home key is pressed once", () => {
    beforeEach(() => {
      triggerKeyPress(testEl, "home");
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when end key is pressed once", () => {
    beforeEach(() => {
      triggerKeyPress(testEl, "end");
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });
});

/* END HOME & END KEYS TESTS */

/* BEGIN AUTOWRAP ARROW KEY TESTS */

describe("given 3 items with autoWrap on", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li", { wrap: true });

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
      expect(testEl.children[0].getAttribute("tabindex")).toBe("-1");
      expect(testEl.children[1].getAttribute("tabindex")).toBe("-1");
      expect(testEl.children[2].getAttribute("tabindex")).toBe("0");
    });
  });

  describe("when arrow up is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when arrow right is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 2);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed three times", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 3);
    });

    it("should trigger 3 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });
});

/* END AUTOWRAP ARROW KEYS TESTS */

/* BEGIN INDEX SETTER TESTS */

describe("given 3 items with default options", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li");

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when index set to current index", () => {
    beforeEach(() => {
      testRovingIndex.index = 0;
    });

    it("should trigger 0 navigationModelChange event", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when index set within bounds", () => {
    beforeEach(() => {
      testRovingIndex.index = 1;
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when index set out of bounds", () => {
    beforeEach(() => {
      testRovingIndex.index = 100;
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });
});

/* END INDEX SETTER TESTS */

/* BEGIN AXIS TESTS */

describe("given 3 items with axis set to both", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li", { axis: "both" });

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when arrow up is pressed once after arrow down", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when arrow left is pressed once after arrow right", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });
});

describe("given 3 items with axis set to x", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li", { axis: "x" });

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 0 navigationModelChange event", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow up is pressed once after arrow down", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 0 navigationModelChange event", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when arrow left is pressed once after arrow right", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });
});

describe("given 3 items with axis set to y", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testRovingIndex = createLinear(testEl, "li", { axis: "y" });

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 0 navigationModelChange event", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow left is pressed once after arrow right", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 1);
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 0 navigationModelChange event", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow Down is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 2);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow Up is pressed once after arrow down", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Down", 1);
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 2 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });
});

/* END AXIS TESTS */

/* BEGIN AUTO RESET TESTS */

describe("given 3 items with focus on second", () => {
  let buttonEl;

  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
            <button>Button 1</button>
        `;

    testEl = document.querySelector(".widget");
    buttonEl = document.querySelector("button");
    testRovingIndex = createLinear(testEl, "li", { autoReset: "current" });

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
    triggerArrowKeyPress(testEl, "Down", 1);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoReset is set to current", () => {
    beforeEach(() => {
      testRovingIndex.reset();
    });

    it("should have index value of 1", () => {
      expect(testRovingIndex.index).toBe(1);
    });
  });

  describe("when focus exits the widget", () => {
    beforeEach(() => {
      buttonEl.focus();
    });

    it("should set focus to item with index 1", () => {
      expect(testRovingIndex.index).toBe(1);
    });
  });
});

describe("given 3 items with focus on second", () => {
  let buttonEl;

  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
            <button>Button 1</button>
        `;

    testEl = document.querySelector(".widget");
    buttonEl = document.querySelector("button");
    testRovingIndex = createLinear(testEl, "li", { autoReset: "interactive" });

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
    triggerArrowKeyPress(testEl, "Down", 1);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoReset is set to interactive", () => {
    beforeEach(() => {
      testRovingIndex.reset();
    });

    it("should have index value of 0", () => {
      expect(testRovingIndex.index).toBe(0);
    });
  });

  describe("when focus exits the widget", () => {
    beforeEach(() => {
      buttonEl.focus();
    });

    it("should set focus to item with index 0", () => {
      expect(testRovingIndex.index).toBe(0);
    });
  });
});

/* END AUTO RESET TESTS */
