import { describe, expect, beforeEach, afterEach, it } from "vitest";
import sinon from "sinon";
import * as NavigationEmitter from "../src/index.js";

var testEl,
  testEmitter,
  onNavigationModelChange,
  onNavigationModelInit,
  onNavigationModelReset,
  onNavigationModelMutation;

function triggerArrowKeyPress(el, dir, num) {
  for (let i = 0; i < num; i++) {
    el.dispatchEvent(new CustomEvent(`arrow${dir}KeyDown`, { detail: { target: { tagName: "" } } }));
  }
}

function triggerKeyPress(el, keyType) {
  el.dispatchEvent(new CustomEvent(`${keyType}KeyDown`, { detail: { target: { tagName: "" } } }));
}

/* BEGIN STATIC MODEL SIZE TESTS */

describe("given a list of 3 visible items", function () {
  beforeEach(function () {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", function () {
    beforeEach(function () {
      testEl = document.querySelector(".widget");
      testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line
    });

    it("model should have 3 matching items", function () {
      expect(testEmitter.model.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 items with 1 hidden", function () {
  beforeEach(function () {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li hidden>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", function () {
    beforeEach(function () {
      testEl = document.querySelector(".widget");
      testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testEmitter.model.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 hidden items", function () {
  beforeEach(function () {
    document.body.innerHTML = `
            <ul class="widget">
                <li hidden>Item 1</li>
                <li hidden>Item 2</li>
                <li hidden>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", function () {
    beforeEach(function () {
      testEl = document.querySelector(".widget");
      testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testEmitter.model.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 items with 1 aria-disabled", function () {
  beforeEach(function () {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", function () {
    beforeEach(function () {
      testEl = document.querySelector(".widget");
      testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testEmitter.model.items.length).to.equal(3);
    });
  });
});

describe("given a list of 3 aria-disabled items", function () {
  beforeEach(function () {
    document.body.innerHTML = `
            <ul class="widget">
                <li aria-disabled="true">Item 1</li>
                <li aria-disabled="true">Item 2</li>
                <li aria-disabled="true">Item 3</li>
            </ul>
        `;
  });

  describe("when instantiated", function () {
    beforeEach(function () {
      testEl = document.querySelector(".widget");
      testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line
    });

    it("model should have 3 items", function () {
      expect(testEmitter.model.items.length).to.equal(3);
    });
  });
});

/* END STATIC MODEL SIZE TESTS */

/* BEGIN MUTATION TESTS */

describe("given a list of 3 visible items", function () {
  beforeEach(function () {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    onNavigationModelMutation = sinon.spy();
    testEl.addEventListener("navigationModelMutation", onNavigationModelMutation.bind(this));
    testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line
  });

  describe("when second item is hidden", function () {
    beforeEach(function (done) {
      testEmitter.model.items[1].hidden = true;
      // a delay is added to wait for a sec for mutation to trigger
      setTimeout(function () {
        done();
      }, 1000);
    });

    it("should trigger 1 navigationModelMutation event", function () {
      // eslint-disable-next-line no-unused-expressions
      expect(onNavigationModelMutation.calledOnce).to.be.true;
    });
  });
});

/* END MUTATION TESTS */

/* BEGIN ARROW KEY TESTS */

describe("given 3 items with default options", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 0 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow up is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 0 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow right is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 2);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed three times", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 3);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed once after emitter is destroyed", function () {
    beforeEach(function () {
      testEmitter.destroy();
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 0 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 1 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow down is pressed once after emitter is destroyed", function () {
    beforeEach(function () {
      testEmitter.destroy();
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 0 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });
});

describe("given 3 items with default options", function () {
  var secondListEl;
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li class="second">Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    secondListEl = document.querySelector(".second");
    testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when second item is clicked", function () {
    beforeEach(function () {
      secondListEl.click();
    });
    it("should trigger 1 navigationModelChange events", function () {
      // eslint-disable-next-line no-unused-expressions
      expect(onNavigationModelChange.calledOnce).to.be.true;
    });

    it("should have index value of 1", function () {
      expect(testEmitter.model.index).to.equal(1);
    });
  });
});

/* END ARROW KEYS TESTS */

/* BEGIN HOME & END KEY TESTS */

describe("given 3 items with default options", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when home key is pressed once", function () {
    beforeEach(function () {
      triggerKeyPress(testEl, "home");
    });

    it("should trigger 0 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when end key is pressed once", function () {
    beforeEach(function () {
      triggerKeyPress(testEl, "end");
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });
});

/* END HOME & END KEYS TESTS */

/* BEGIN AUTOWRAP ARROW KEY TESTS */

describe("given 3 items with autoWrap on", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li", { wrap: true }); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow left is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow up is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow right is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 2);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed three times", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 3);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(3);
    });
  });

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });
});

/* END AUTOWRAP ARROW KEYS TESTS */

/* BEGIN INDEX SETTER TESTS */

describe("given 3 items with default options", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li"); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when index set to current index", function () {
    beforeEach(function () {
      testEmitter.model.index = 0;
    });

    it("should trigger 0 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when index set within bounds", function () {
    beforeEach(function () {
      testEmitter.model.index = 1;
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when index set out of bounds", function () {
    beforeEach(function () {
      testEmitter.model.index = 100;
    });

    it("should trigger 0 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });
});

/* END INDEX SETTER TESTS */

/* BEGIN AXIS TESTS */

describe("given 3 items with axis set to both", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li", { axis: "both" }); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow up is pressed once after arrow down", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow left is pressed once after arrow right", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });
});

describe("given 3 items with axis set to x", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li", { axis: "x" }); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow down is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
    });

    it("should trigger 0 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow up is pressed once after arrow down", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 0 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 1 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(1);
    });
  });

  describe("when arrow left is pressed once after arrow right", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });
});

describe("given 3 items with axis set to y", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        `;

    testEl = document.querySelector(".widget");
    testEmitter = NavigationEmitter.createLinear(testEl, "li", { axis: "y" }); // eslint-disable-line

    onNavigationModelChange = sinon.spy();
    testEl.addEventListener("navigationModelChange", onNavigationModelChange);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when arrow right is pressed once", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
    });

    it("should trigger 0 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow left is pressed once after arrow right", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Right", 1);
      triggerArrowKeyPress(testEl, "Left", 1);
    });

    it("should trigger 0 navigationModelChange event", function () {
      expect(onNavigationModelChange.callCount).to.equal(0);
    });
  });

  describe("when arrow Down is pressed twice", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 2);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });

  describe("when arrow Up is pressed once after arrow down", function () {
    beforeEach(function () {
      triggerArrowKeyPress(testEl, "Down", 1);
      triggerArrowKeyPress(testEl, "Up", 1);
    });

    it("should trigger 2 navigationModelChange events", function () {
      expect(onNavigationModelChange.callCount).to.equal(2);
    });
  });
});

/* END AXIS TESTS */

/* BEGIN AUTO INIT TESTS */

describe("given 3 items", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-selected="true">Item 2</li>
                <li aria-checked ="true">Item 3</li>
            </ul>
        `;

    onNavigationModelInit = sinon.spy();
    testEl = document.querySelector(".widget");
    testEl.addEventListener("navigationModelInit", onNavigationModelInit);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is none", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoInit: "none" }); // eslint-disable-line
    });

    it("should trigger navigationModelInit event", function () {
      expect(onNavigationModelInit.callCount).to.equal(1);
    });

    it("should have index value of null", function () {
      expect(testEmitter.model.index).to.be.null;
    });
  });

  describe("when autoInit is interactive", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoInit: "interactive" }); // eslint-disable-line
    });

    it("should trigger navigationModelInit event once", function () {
      expect(onNavigationModelInit.callCount).to.equal(1);
    });

    it("should have index value of 0", function () {
      expect(testEmitter.model.index).to.equal(0);
    });
  });

  describe("when autoInit is ariaChecked", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoInit: "ariaChecked" }); // eslint-disable-line
    });

    it("should trigger navigationModelInit event once", function () {
      expect(onNavigationModelInit.callCount).to.equal(1);
    });

    it("should have index value of 2", function () {
      expect(testEmitter.model.index).to.equal(2);
    });
  });

  describe("when autoInit is ariaSelected", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoInit: "ariaSelected" }); // eslint-disable-line
    });

    it("should trigger navigationModelInit event once", function () {
      expect(onNavigationModelInit.callCount).to.equal(1);
    });

    it("should have index value of 1", function () {
      expect(testEmitter.model.index).to.equal(1);
    });
  });
});

describe("given 3 items", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li aria-selected="true">Item 2</li>
                <li aria-checked ="true">Item 3</li>
            </ul>
        `;

    onNavigationModelInit = sinon.spy();
    testEl = document.querySelector(".widget");
    testEl.addEventListener("navigationModelInit", onNavigationModelInit);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is ariaSelectedOrInteractive", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoInit: "ariaSelectedOrInteractive" }); // eslint-disable-line
    });

    it("should trigger navigationModelInit event once", function () {
      expect(onNavigationModelInit.callCount).to.equal(1);
    });

    it("should pick first aria selected element", function () {
      expect(testEmitter.model.index).to.equal(1);
    });
  });
});

describe("given 3 items", function () {
  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li aria-checked ="true">Item 3</li>
            </ul>
        `;

    onNavigationModelInit = sinon.spy();
    testEl = document.querySelector(".widget");
    testEl.addEventListener("navigationModelInit", onNavigationModelInit);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("when autoInit is ariaSelectedOrInteractive", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoInit: "ariaSelectedOrInteractive" }); // eslint-disable-line
    });

    it("should trigger navigationModelInit event once", function () {
      expect(onNavigationModelInit.callCount).to.equal(1);
    });

    it("should pick first interactive element", function () {
      expect(testEmitter.model.index).to.equal(0);
    });
  });
});

/* END AUTO INIT TESTS */

/* BEGIN AUTO RESET TEST */

describe("given 3 items", function () {
  var buttonEl;

  function setup() {
    document.body.innerHTML = `
            <ul class="widget">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
            <button>Button 1</button>
        `;

    testEl = document.querySelector(".widget");
    onNavigationModelReset = sinon.spy();
    testEl.addEventListener("navigationModelReset", onNavigationModelReset);
  }

  beforeEach(setup);
  afterEach(setup);

  describe("and autoReset is current", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoReset: "current" }); // eslint-disable-line
    });

    describe("when testEmitter gets reset", function () {
      beforeEach(function () {
        triggerArrowKeyPress(testEl, "Down", 1);
        testEmitter.model.reset();
      });

      it("should trigger no onNavigationModelReset event", function () {
        expect(onNavigationModelReset.callCount).to.equal(0);
      });
    });

    describe("when focus exits the widget", function () {
      beforeEach(function () {
        triggerArrowKeyPress(testEl, "Down", 1);
        buttonEl = document.querySelector("button");
        buttonEl.click();
      });

      it("should set focus to item with index 1", function () {
        expect(testEmitter.model.index).to.equal(1);
      });

      // it('should trigger 1 onNavigationModelReset event', function() {
      //     expect(onNavigationModelReset.calledOnce).to.be.true;
      // });
    });
  });

  describe("and autoReset is interactive", function () {
    beforeEach(function () {
      testEmitter = NavigationEmitter.createLinear(testEl, "li", { autoReset: "interactive" }); // eslint-disable-line
    });

    describe("when testEmitter gets reset after arrow key down", function () {
      beforeEach(function () {
        triggerArrowKeyPress(testEl, "Down", 1);
        testEmitter.model.reset();
      });

      it("should trigger one onNavigationModelReset event", function () {
        expect(onNavigationModelReset.calledOnce).to.be.true;
      });

      it("should set model to first interactive Item", function () {
        expect(testEmitter.model.index).to.equal(0);
      });
    });
  });
});

/* END AUTO RESET TESTS */
