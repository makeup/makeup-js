import { describe, expect, beforeEach, afterEach, beforeAll, it } from "vitest";
import sinon from "sinon";
import * as ActiveDescendant from "../src/index.js";

// const timeoutInterval = 500;

var widgetEl, focusEl, containerEl, testActiveDescendant, onActiveDescendantChange;

function triggerArrowKeyPress(el, dir, num) {
  for (let i = 0; i < num; i++) {
    el.dispatchEvent(new CustomEvent(`arrow${dir}KeyDown`, { detail: { target: { tagName: "" } } }));
  }
}

/* BEGIN STATIC MODEL SIZE TESTS */

describe("given a list of 3 visible items in programmatic relationship", function () {
  beforeEach(function () {
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

  describe("when instantiated", function () {
    beforeEach(function () {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("input");
      containerEl = widgetEl.querySelector("ul");
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testActiveDescendant.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 visible items in hierarchial relationship", function () {
  beforeEach(function () {
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

  describe("when instantiated", function () {
    beforeEach(function () {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("ul");
      containerEl = focusEl;
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testActiveDescendant.items.length).to.equal(3);
    });
  });
});

describe("given a list of 2 visible items, 1 hidden in programmatic relationship", function () {
  beforeEach(function () {
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

  describe("when instantiated", function () {
    beforeEach(function () {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("input");
      containerEl = widgetEl.querySelector("ul");
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testActiveDescendant.items.length).to.equal(3);
    });
  });
});

describe("given a list of 2 visible items, 1 hidden in hierarchial relationship", function () {
  beforeEach(function () {
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

  describe("when instantiated with hierarchial relationship", function () {
    beforeEach(function () {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("ul");
      containerEl = focusEl;
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testActiveDescendant.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 hidden items in programmatic relationship", function () {
  beforeEach(function () {
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

  describe("when instantiated", function () {
    beforeEach(function () {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("input");
      containerEl = widgetEl.querySelector("ul");
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testActiveDescendant.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 hidden items in hierarchial relationship", function () {
  beforeEach(function () {
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

  describe("when instantiated", function () {
    beforeEach(function () {
      widgetEl = document.querySelector(".widget");
      focusEl = widgetEl.querySelector("ul");
      containerEl = focusEl;
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testActiveDescendant.items.length).to.equal(3);
    });
  });
});
/* END STATIC MODEL SIZE TESTS */

/* BEGIN ARROW KEY TESTS */

describe("given 3 items with default options in programmatic relationship", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", function () {
    beforeEach(function () {
      focusEl.focus();
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow up is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
      // eslint-disable-next-line max-len
      expect(focusEl.getAttribute("aria-activedescendant")).to.equal(containerEl.firstElementChild.getAttribute("id"));
    });
  });

  describe("when arrow right is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 2);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed four times", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 4);
    });

    it("should trigger 3 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(3);
    });
  });

  describe("when arrow right is pressed once after activedescendant is destroyed", function () {
    beforeEach(function () {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow down is pressed once after emitter is destroyed", function () {
    beforeEach(function () {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });
});

describe("given 3 items with default options in hierarchial relationship", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li"); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", function () {
    beforeEach(function () {
      focusEl.focus();
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow up is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
      // eslint-disable-next-line max-len
      expect(focusEl.getAttribute("aria-activedescendant")).to.equal(containerEl.firstElementChild.getAttribute("id"));
    });
  });

  describe("when arrow right is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 2);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed four times", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 4);
    });

    it("should trigger 3 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(3);
    });
  });

  describe("when arrow right is pressed once after activedescendant is destroyed", function () {
    beforeEach(function () {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow down is pressed once after emitter is destroyed", function () {
    beforeEach(function () {
      testActiveDescendant.destroy();
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });
});

/* END ARROW KEY TESTS */

/* BEGIN AUTOWRAP ARROW KEY TESTS */

describe("given 3 items with autoWrap on", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { wrap: true }); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow up is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow right is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 2);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed three times", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 3);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(3);
    });
  });

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });
});

describe("given 3 items with autoWrap off", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { wrap: false }); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once after wrap set to true", function () {
    beforeEach(function () {
      testActiveDescendant.wrap = true;
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });

    it("should have currentItem set to Button 3", function () {
      let currentItem = testActiveDescendant.currentItem;
      expect(currentItem.textContent).to.equal("Button 3");
    });
  });

  describe("when arrow up is pressed once", function () {
    beforeEach(function () {
      testActiveDescendant.wrap = true;
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });

    it("should have currentItem set to Button 3", function () {
      let currentItem = testActiveDescendant.currentItem;
      expect(currentItem.textContent).to.equal("Button 3");
    });
  });
});

/* END AUTOWRAP ARROW KEYS TESTS */

/* BEGIN INDEX SETTER TESTS */

describe("given 3 items with default options", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { wrap: true }); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when index set to current index", function () {
    beforeEach(function () {
      testActiveDescendant.index = 0;
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when index set within bounds", function () {
    beforeEach(function () {
      testActiveDescendant.index = 1;
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when index set out of bounds", function () {
    beforeEach(function () {
      testActiveDescendant.index = 100;
    });

    it("should trigger 0 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });
});

/* END INDEX SETTER TESTS */

/* BEGIN AXIS TESTS */

describe("given 3 items with axis set to both", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { axis: "both" }); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow up is pressed once after arrow down", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
      triggerArrowKeyPress(widgetEl, "Up", 1);
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow left is pressed once after arrow right", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
      triggerArrowKeyPress(widgetEl, "Left", 1);
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });
});

describe("given 3 items with axis set to x", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { axis: "x" }); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 0 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow up is pressed once after arrow down", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
      triggerArrowKeyPress(widgetEl, "Up", 1);
    });

    it("should trigger 0 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 1 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });

  describe("when arrow left is pressed once after arrow right", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
      triggerArrowKeyPress(widgetEl, "Left", 1);
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });
});

describe("given 3 items with axis set to y", function () {
  function setup() {
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
    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { axis: "y" }); // eslint-disable-line

    onActiveDescendantChange = sinon.spy();
    widgetEl.addEventListener("activeDescendantChange", onActiveDescendantChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
    });

    it("should trigger 0 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow left is pressed once after arrow right", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Right", 1);
      triggerArrowKeyPress(widgetEl, "Left", 1);
    });

    it("should trigger 0 activeDescendantChange event", function () {
      expect(onActiveDescendantChange.callCount).to.equal(0);
    });
  });

  describe("when arrow Down is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 2);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(2);
    });
  });

  describe("when arrow Up is pressed once after arrow down", function () {
    beforeEach(function () {
      triggerArrowKeyPress(widgetEl, "Down", 1);
    });

    it("should trigger 2 activeDescendantChange events", function () {
      expect(onActiveDescendantChange.callCount).to.equal(1);
      triggerArrowKeyPress(widgetEl, "Up", 1);
      expect(onActiveDescendantChange.callCount).to.equal(1);
    });
  });
});

/* END AXIS TESTS */

/* BEGIN AUTO INIT TESTS */

describe("given 3 items", function () {
  function setup() {
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
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is 0", function () {
    beforeEach(function () {
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { autoInit: 0 }); // eslint-disable-line
    });

    it("should have index value of 0", function () {
      expect(testActiveDescendant.index).to.equal(0);
    });
  });

  describe("when autoInit is 2", function () {
    beforeAll(function () {
      testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", { autoInit: 2 }); // eslint-disable-line
    });

    it("should have index value of 2", function () {
      expect(testActiveDescendant.index).to.equal(2);
    });

    it("should set aria-activedescendant to last element child", function () {
      // eslint-disable-next-line max-len
      expect(focusEl.getAttribute("aria-activedescendant")).to.equal(containerEl.lastElementChild.getAttribute("id"));
    });
  });
});

/* END AUTO INIT TESTS */

/* BEGIN AUTO RESET TESTS */

describe("given 3 items with focus on second", function () {
  var buttonEl;

  function setup() {
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

    testActiveDescendant = ActiveDescendant.createLinear(widgetEl, focusEl, containerEl, "li", {
      autoReset: "interactive",
    }); // eslint-disable-line
    testActiveDescendant.index = 1;
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when autoReset is interactive", function () {
    beforeEach(function () {
      testActiveDescendant.reset();
    });

    it("should have index value of 0", function () {
      expect(testActiveDescendant.index).to.equal(0);
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
