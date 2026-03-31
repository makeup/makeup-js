import { describe, expect, beforeEach, afterEach, beforeAll, it, vi } from "vitest";
import { createLinear } from "../src/index.js";

let widgetEl, focusEl, containerEl, testActiveDescendant, onActiveDescendantChange;

const triggerArrowKeyPress = (el, dir, num) => {
  for (let i = 0; i < num; i++) {
    el.dispatchEvent(new CustomEvent(`arrow${dir}KeyDown`, { detail: { target: { tagName: "" } } }));
  }
};

/* BEGIN STATIC MODEL SIZE TESTS */

describe("given a list of 3 visible items in programmatic relationship", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("input");
      containerEl = widgetEl.querySelector("ul");
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testActiveDescendant.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 visible items in hierarchial relationship", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="widget">
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("ul");
      containerEl = focusEl;
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testActiveDescendant.items.length).toBe(3);
    });
  });
});

describe("given a list of 2 visible items, 1 hidden in programmatic relationship", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li hidden>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("input");
      containerEl = widgetEl.querySelector("ul");
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testActiveDescendant.items.length).toBe(3);
    });
  });
});

describe("given a list of 2 visible items, 1 hidden in hierarchial relationship", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="widget">
                <ul>
                    <li>Button 1</li>
                    <li hidden>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;
  });

  describe("when instantiated with hierarchial relationship", () => {
    beforeEach(() => {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("ul");
      containerEl = focusEl;
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testActiveDescendant.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 hidden items in programmatic relationship", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li hidden>Button 1</li>
                    <li hidden>Button 2</li>
                    <li hidden>Button 3</li>
                </ul>
            </div>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("input");
      containerEl = widgetEl.querySelector("ul");
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testActiveDescendant.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 hidden items in hierarchial relationship", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <div class="widget">
                <ul>
                    <li hidden>Button 1</li>
                    <li hidden>Button 2</li>
                    <li hidden>Button 3</li>
                </ul>
            </div>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("ul");
      containerEl = focusEl;
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testActiveDescendant.items.length).toBe(3);
    });
  });
});
/* END STATIC MODEL SIZE TESTS */

/* BEGIN ARROW KEY TESTS */

describe("given 3 items with default options in programmatic relationship", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", () => {
    beforeEach(() => {
      focusEl.focus();
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow up is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
      expect(focusEl.getAttribute("aria-activedescendant")).toBe(containerEl.firstElementChild.getAttribute("id"));
    });
  });

  describe("when arrow right is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 2);
    });

    it("should trigger 2 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed four times", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 4);
    });

    it("should trigger 3 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("when arrow right is pressed once after activedescendant is destroyed", () => {
    beforeEach(() => {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow down is pressed once after emitter is destroyed", () => {
    beforeEach(() => {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });
});

describe("given 3 items with default options in hierarchial relationship", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("ul");
    containerEl = focusEl;
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", () => {
    beforeEach(() => {
      focusEl.focus();
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow up is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
      expect(focusEl.getAttribute("aria-activedescendant")).toBe(containerEl.firstElementChild.getAttribute("id"));
    });
  });

  describe("when arrow right is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 2);
    });

    it("should trigger 2 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed four times", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 4);
    });

    it("should trigger 3 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("when arrow right is pressed once after activedescendant is destroyed", () => {
    beforeEach(() => {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow down is pressed once after emitter is destroyed", () => {
    beforeEach(() => {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });
});

/* END ARROW KEY TESTS */

/* BEGIN AUTOWRAP ARROW KEY TESTS */

describe("given 3 items with autoWrap on", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { wrap: true });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow up is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow right is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 2);
    });

    it("should trigger 2 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed three times", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 3);
    });

    it("should trigger 3 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(3);
    });
  });

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });
});

describe("given 3 items with autoWrap off", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { wrap: false });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once after wrap set to true", () => {
    beforeEach(() => {
      testActiveDescendant.wrap = true;
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });

    it("should have currentItem set to Button 3", () => {
      expect(testActiveDescendant.currentItem.textContent).toBe("Button 3");
    });
  });

  describe("when arrow up is pressed once after wrap set to true", () => {
    beforeEach(() => {
      testActiveDescendant.wrap = true;
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });

    it("should have currentItem set to Button 3", () => {
      expect(testActiveDescendant.currentItem.textContent).toBe("Button 3");
    });
  });
});

/* END AUTOWRAP ARROW KEYS TESTS */

/* BEGIN INDEX SETTER TESTS */

describe("given 3 items with default options", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { wrap: true });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when index set to current index", () => {
    beforeEach(() => {
      testActiveDescendant.index = 0;
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when index set within bounds", () => {
    beforeEach(() => {
      testActiveDescendant.index = 1;
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when index set out of bounds", () => {
    beforeEach(() => {
      testActiveDescendant.index = 100;
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });
});

/* END INDEX SETTER TESTS */

/* BEGIN AXIS TESTS */

describe("given 3 items with axis set to both", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { axis: "both" });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow up is pressed once after arrow down", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
      triggerArrowKeyPress(widgetEl, "Up", 1);
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow left is pressed once after arrow right", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
      triggerArrowKeyPress(widgetEl, "Left", 1);
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });
});

describe("given 3 items with axis set to x", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { axis: "x" });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow up is pressed once after arrow down", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("when arrow left is pressed once after arrow right", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
      triggerArrowKeyPress(widgetEl, "Left", 1);
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });
});

describe("given 3 items with axis set to y", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { axis: "y" });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow right is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow left is pressed once after arrow right", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Right", 1);
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 0 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).not.toHaveBeenCalled();
    });
  });

  describe("when arrow Down is pressed twice", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 2);
    });

    it("should trigger 2 activeDescendantChange events", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow Up is pressed once after arrow Down", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
      triggerArrowKeyPress(widgetEl, "Up", 1);
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });
  });
});

/* END AXIS TESTS */

/* BEGIN AUTO INIT TESTS */

describe("given 3 items", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is 0", () => {
    beforeEach(() => {
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { autoInit: 0 });
    });

    it("should have index value of 0", () => {
      expect(testActiveDescendant.index).toBe(0);
    });
  });

  describe("when autoInit is 2", () => {
    beforeAll(() => {
      testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { autoInit: 2 });
    });

    it("should have index value of 2", () => {
      expect(testActiveDescendant.index).toBe(2);
    });

    it("should set aria-activedescendant to last element child", () => {
      expect(focusEl.getAttribute("aria-activedescendant")).toBe(containerEl.lastElementChild.getAttribute("id"));
    });
  });
});

/* END AUTO INIT TESTS */

/* BEGIN AUTO RESET TESTS */

describe("given 3 items with focus on second", () => {
  let buttonEl;

  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
            <button>Button 1</button>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    buttonEl = document.querySelector("button");

    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { autoReset: "interactive" });
    testActiveDescendant.index = 1;
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoReset is interactive", () => {
    beforeEach(() => {
      testActiveDescendant.reset();
    });

    it("should have index value of 0", () => {
      expect(testActiveDescendant.index).toBe(0);
    });
  });

  // describe('when focus exits the widget', function() {
  //     beforeEach(function() {
  //         buttonEl.focus();
  //     });

  //     it('should set focus to item with index 0', function() {
  //         expect(testActiveDescendant.index).to.equal(0);
  //     });
  // });
});

/* END AUTO RESET TESTS */

/* BEGIN AUTO RESET NONE TESTS */

describe("given 3 items with autoReset none and active descendant on second item", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { autoReset: "none" });
    testActiveDescendant.index = 1;
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when reset is called", () => {
    beforeEach(() => {
      testActiveDescendant.reset();
    });

    it("should remove aria-activedescendant from focusEl", () => {
      expect(focusEl.getAttribute("aria-activedescendant")).toBeNull();
    });
  });
});

/* END AUTO RESET NONE TESTS */

/* BEGIN AUTO SCROLL TESTS */

describe("given 3 items with autoScroll enabled", () => {
  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li", { autoScroll: true });

    onActiveDescendantChange = vi.fn();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", () => {
    beforeEach(() => {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", () => {
      expect(onActiveDescendantChange).toHaveBeenCalledTimes(1);
    });

    it("should set aria-activedescendant on focusEl", () => {
      expect(focusEl.getAttribute("aria-activedescendant")).toBe(containerEl.firstElementChild.getAttribute("id"));
    });
  });
});

/* END AUTO SCROLL TESTS */

/* BEGIN MUTATION TESTS */

describe("given 3 items with default options in programmatic relationship", () => {
  let onActiveDescendantMutation;

  const setup = () => {
    document.body.innerHTML = `
            <div class="widget">
                <input type="text"/>
                <ul>
                    <li>Button 1</li>
                    <li>Button 2</li>
                    <li>Button 3</li>
                </ul>
            </div>
        `;

    widgetEl = document.querySelector(".widget");
    focusEl = widgetEl.querySelector("input");
    containerEl = widgetEl.querySelector("ul");
    testActiveDescendant = createLinear(widgetEl, focusEl, containerEl, "li");

    onActiveDescendantMutation = vi.fn();
    widgetEl.addEventListener("activeDescendantMutation", onActiveDescendantMutation);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when a new item is appended to the container", () => {
    beforeEach(async () => {
      const newItem = document.createElement("li");
      newItem.textContent = "Button 4";
      containerEl.appendChild(newItem);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }, 5000);

    it("should have 4 items", () => {
      expect(testActiveDescendant.items.length).toBe(4);
    });

    it("should dispatch activeDescendantMutation event", () => {
      expect(onActiveDescendantMutation).toHaveBeenCalledTimes(1);
    });

    it("should assign an id to the new item", () => {
      expect(containerEl.lastElementChild.id).not.toBe("");
    });
  });
});

/* END MUTATION TESTS */
