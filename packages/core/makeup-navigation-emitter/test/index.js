import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import { createLinear } from "../src/index.js";

let testEl;
let testEmitter;
let onNavigationModelChange;
let onNavigationModelInit;
let onNavigationModelReset;
let onNavigationModelMutation;

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
      testEmitter = createLinear(testEl, "li");
    });

    it("model should have 3 matching items", () => {
      expect(testEmitter.model.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 items with 1 hidden", () => {
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
      testEmitter = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testEmitter.model.items.length).toBe(3);
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
      testEmitter = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testEmitter.model.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 items with 1 aria-disabled", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      testEl = document.querySelector(".widget");
      testEmitter = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testEmitter.model.items.length).toBe(3);
    });
  });
});

describe("given a list of 3 aria-disabled items", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <ul class="widget">
                <li aria-disabled="true">Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li aria-disabled="true">Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", () => {
    beforeEach(() => {
      testEl = document.querySelector(".widget");
      testEmitter = createLinear(testEl, "li");
    });

    it("model should have 3 items", () => {
      expect(testEmitter.model.items.length).toBe(3);
    });
  });
});

/* END STATIC MODEL SIZE TESTS */

/* BEGIN MUTATION TESTS */

describe("given a list of 3 visible items", () => {
  beforeEach(() => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    onNavigationModelMutation = vi.fn();
    testEl.addEventListener("navigationModelMutation", onNavigationModelMutation);
    testEmitter = createLinear(testEl, "li");
  });

  describe("when second item is hidden", () => {
    beforeEach(async () => {
      testEmitter.model.items[1].hidden = true;
      // a delay is added to wait for a sec for mutation to trigger
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    it("should trigger 1 navigationModelMutation event", () => {
      expect(onNavigationModelMutation).toHaveBeenCalledOnce();
    });
  });
});

/* END MUTATION TESTS */

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
    testEmitter = createLinear(testEl, "li");

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

  describe("when arrow right is pressed once after emitter is destroyed", () => {
    beforeEach(() => {
      testEmitter.destroy();
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

  describe("when arrow down is pressed once after emitter is destroyed", () => {
    beforeEach(() => {
      testEmitter.destroy();
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 0 navigationModelChange events", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });
});

describe("given 3 items with default options", () => {
  let secondListEl;

  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li class="second">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    secondListEl = document.querySelector(".second");
    testEmitter = createLinear(testEl, "li");

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when second item is clicked", () => {
    beforeEach(() => {
      secondListEl.click();
    });

    it("should trigger 1 navigationModelChange events", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });

    it("should have index value of 1", () => {
      expect(testEmitter.model.index).toBe(1);
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
    testEmitter = createLinear(testEl, "li");

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
    testEmitter = createLinear(testEl, "li", { wrap: true });

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

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledTimes(2);
    });
  });

  describe("when arrow right is pressed three times", () => {
    beforeEach(() => {
      triggerArrowKeyPress(testEl, "Right", 3);
    });

    it("should trigger 1 navigationModelChange event", () => {
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
    testEmitter = createLinear(testEl, "li");

    onNavigationModelChange = vi.fn();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when index set to current index", () => {
    beforeEach(() => {
      testEmitter.model.index = 0;
    });

    it("should trigger 0 navigationModelChange event", () => {
      expect(onNavigationModelChange).not.toHaveBeenCalled();
    });
  });

  describe("when index set within bounds", () => {
    beforeEach(() => {
      testEmitter.model.index = 1;
    });

    it("should trigger 1 navigationModelChange event", () => {
      expect(onNavigationModelChange).toHaveBeenCalledOnce();
    });
  });

  describe("when index set out of bounds", () => {
    beforeEach(() => {
      testEmitter.model.index = 100;
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
    testEmitter = createLinear(testEl, "li", { axis: "both" });

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
    testEmitter = createLinear(testEl, "li", { axis: "x" });

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
    testEmitter = createLinear(testEl, "li", { axis: "y" });

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

/* BEGIN AUTO INIT TESTS */

describe("given 3 items", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-selected="true">Item 2</li>
                <li aria-checked ="true">Item 3</li>
            </ul>
        `;

    onNavigationModelInit = vi.fn();
    testEl = document.querySelector(".widget");
    testEl.addEventListener("navigationModelInit", onNavigationModelInit);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is none", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoInit: "none" });
    });

    it("should trigger navigationModelInit event", () => {
      expect(onNavigationModelInit).toHaveBeenCalledOnce();
    });

    it("should have index value of null", () => {
      expect(testEmitter.model.index).toBeNull();
    });
  });

  describe("when autoInit is interactive", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoInit: "interactive" });
    });

    it("should trigger navigationModelInit event once", () => {
      expect(onNavigationModelInit).toHaveBeenCalledOnce();
    });

    it("should have index value of 0", () => {
      expect(testEmitter.model.index).toBe(0);
    });
  });

  describe("when autoInit is ariaChecked", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoInit: "ariaChecked" });
    });

    it("should trigger navigationModelInit event once", () => {
      expect(onNavigationModelInit).toHaveBeenCalledOnce();
    });

    it("should have index value of 2", () => {
      expect(testEmitter.model.index).toBe(2);
    });
  });

  describe("when autoInit is ariaSelected", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoInit: "ariaSelected" });
    });

    it("should trigger navigationModelInit event once", () => {
      expect(onNavigationModelInit).toHaveBeenCalledOnce();
    });

    it("should have index value of 1", () => {
      expect(testEmitter.model.index).toBe(1);
    });
  });
});

describe("given 3 items", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-selected="true">Item 2</li>
                <li aria-checked ="true">Item 3</li>
            </ul>
        `;

    onNavigationModelInit = vi.fn();
    testEl = document.querySelector(".widget");
    testEl.addEventListener("navigationModelInit", onNavigationModelInit);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is ariaSelectedOrInteractive", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoInit: "ariaSelectedOrInteractive" });
    });

    it("should trigger navigationModelInit event once", () => {
      expect(onNavigationModelInit).toHaveBeenCalledOnce();
    });

    it("should pick first aria selected element", () => {
      expect(testEmitter.model.index).toBe(1);
    });
  });
});

describe("given 3 items", () => {
  const setup = () => {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li aria-checked ="true">Item 3</li>
            </ul>
        `;

    onNavigationModelInit = vi.fn();
    testEl = document.querySelector(".widget");
    testEl.addEventListener("navigationModelInit", onNavigationModelInit);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is ariaSelectedOrInteractive", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoInit: "ariaSelectedOrInteractive" });
    });

    it("should trigger navigationModelInit event once", () => {
      expect(onNavigationModelInit).toHaveBeenCalledOnce();
    });

    it("should pick first interactive element", () => {
      expect(testEmitter.model.index).toBe(0);
    });
  });
});

/* END AUTO INIT TESTS */

/* BEGIN AUTO RESET TEST */

describe("given 3 items", () => {
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
    onNavigationModelReset = vi.fn();
    testEl.addEventListener("navigationModelReset", onNavigationModelReset);
  };

  beforeEach(setup);
  afterEach(setup);

  describe("and autoReset is current", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoReset: "current" });
    });

    describe("when testEmitter gets reset", () => {
      beforeEach(() => {
        triggerArrowKeyPress(testEl, "Down", 1);
        testEmitter.model.reset();
      });

      it("should trigger no onNavigationModelReset event", () => {
        expect(onNavigationModelReset).not.toHaveBeenCalled();
      });
    });

    describe("when focus exits the widget", () => {
      beforeEach(() => {
        triggerArrowKeyPress(testEl, "Down", 1);
        buttonEl = document.querySelector("button");
        buttonEl.click();
      });

      it("should set focus to item with index 1", () => {
        expect(testEmitter.model.index).toBe(1);
      });

      // it('should trigger 1 onNavigationModelReset event', function() {
      //     expect(onNavigationModelReset.calledOnce).to.be.true;
      // });
    });
  });

  describe("and autoReset is interactive", () => {
    beforeEach(() => {
      testEmitter = createLinear(testEl, "li", { autoReset: "interactive" });
    });

    describe("when testEmitter gets reset after arrow key down", () => {
      beforeEach(() => {
        triggerArrowKeyPress(testEl, "Down", 1);
        testEmitter.model.reset();
      });

      it("should trigger one onNavigationModelReset event", () => {
        expect(onNavigationModelReset).toHaveBeenCalledOnce();
      });

      it("should set model to first interactive Item", () => {
        expect(testEmitter.model.index).toBe(0);
      });
    });
  });
});

/* END AUTO RESET TESTS */
