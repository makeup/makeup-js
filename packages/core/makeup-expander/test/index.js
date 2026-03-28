import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import Expander from "../src/index.js";

const containerEl = document.createElement("div");
containerEl.innerHTML = `<span class="expander">
    <button class="expander__host"><button>
    <div class="expander__content"></div>
  </span>
`;

const widgetEl = containerEl.querySelector(".expander");
const hostEl = widgetEl.querySelector(".expander__host");
const onCollapse = vi.fn();
const onExpand = vi.fn();
let widget;

widgetEl.addEventListener("expander-expand", onExpand);
widgetEl.addEventListener("expander-collapse", onCollapse);

describe("given a widget with default options", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl);
  });

  afterEach(() => {
    widget.destroy();
  });

  it("it should not add an expanded class", () => {
    expect(widgetEl.classList.length).toBe(1);
  });

  describe("when widget is collapsed", () => {
    beforeEach(() => {
      widget.expanded = false;
      onCollapse.mockClear();
    });

    afterEach(() => {
      hostEl.blur();
    });

    describe("and the host is clicked", () => {
      beforeEach(() => {
        hostEl.click();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have correct aria-expanded attribute", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the host receives focus", () => {
      beforeEach(() => {
        hostEl.focus();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should observe 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the document is clicked", () => {
      beforeEach(() => {
        document.body.click();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should observe 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });
});

describe("given a widget with expandOnClick=true", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnClick: true });
    widget.expanded = false;
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  afterEach(() => {
    widget.destroy();
    hostEl.blur();
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  it("it should not have an expanded class", () => {
    expect(widgetEl.classList.length).toBe(1);
  });

  describe("when widget is collapsed", () => {
    describe("and the host is clicked", () => {
      beforeEach(() => {
        hostEl.click();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 1 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(1);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=true", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("true");
      });
    });

    describe("and the host is focussed", () => {
      beforeEach(() => {
        widget.expanded = false;
        onExpand.mockClear();
        onCollapse.mockClear();
        hostEl.focus();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the host is hovered", () => {
      beforeEach(() => {
        widget.expanded = false;
        onExpand.mockClear();
        onCollapse.mockClear();
        hostEl.dispatchEvent(new Event("mouseenter"));
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the document is clicked", () => {
      beforeEach(() => {
        widget.expanded = false;
        onExpand.mockClear();
        onCollapse.mockClear();
        document.body.click();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should observe 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });
});

describe("given a widget with expandOnFocus=true", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnFocus: true });
    widget.expanded = false;
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  afterEach(() => {
    widget.destroy();
    hostEl.blur();
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  it("it should not have an expanded class", () => {
    expect(widgetEl.classList.length).toBe(1);
  });

  describe("when widget is collapsed", () => {
    describe("and the host is focussed", () => {
      beforeEach(() => {
        hostEl.focus();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 1 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(1);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=true", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("true");
      });
    });

    describe("and the host is clicked", () => {
      beforeEach(() => {
        hostEl.click();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the host is hovered", () => {
      beforeEach(() => {
        hostEl.dispatchEvent(new Event("mouseenter"));
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the document is clicked", () => {
      beforeEach(() => {
        document.body.click();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should observe 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });
});

describe("given a widget with expandOnHover=true", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnHover: true });
    widget.expanded = false;
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  afterEach(() => {
    widget.destroy();
    hostEl.dispatchEvent(new Event("mouseenter"));
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  it("it should not have an expanded class", () => {
    expect(widgetEl.classList.length).toBe(1);
  });

  describe("when widget is collapsed", () => {
    describe("and the host is focussed", () => {
      beforeEach(() => {
        hostEl.focus();
      });

      afterEach(() => {
        widget.expanded = false;
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the host is clicked", () => {
      beforeEach(() => {
        hostEl.click();
      });

      afterEach(() => {
        widget.expanded = false;
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });

    describe("and the host is hovered", () => {
      beforeEach(() => {
        hostEl.dispatchEvent(new Event("mouseenter"));
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.dispatchEvent(new Event("mouseout"));
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 1 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(1);
      });

      it("it should trigger 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=true", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("true");
      });
    });

    describe("and the document is clicked", () => {
      beforeEach(() => {
        document.body.click();
      });

      afterEach(() => {
        widget.expanded = false;
        hostEl.blur();
        onExpand.mockClear();
        onCollapse.mockClear();
      });

      it("it should trigger 0 expand events", () => {
        expect(onExpand.mock.calls.length).toBe(0);
      });

      it("it should observe 0 collapse events", () => {
        expect(onCollapse.mock.calls.length).toBe(0);
      });

      it("the host el should have aria-expanded=false", () => {
        expect(hostEl.getAttribute("aria-expanded")).toBe("false");
      });
    });
  });
});

describe("given a widget with expandedClass=foo", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandedClass: "foo--expanded" });
  });

  afterEach(() => {
    widget.expanded = false;
    widget.destroy();
    onExpand.mockClear();
    onCollapse.mockClear();
  });

  describe("when widget is expanded", () => {
    beforeEach(() => {
      widget.expanded = true;
    });

    it("it should contain class=foo-expanded", () => {
      expect(widgetEl.classList.contains("foo--expanded")).toBe(true);
    });
  });

  describe("when widget is collapsed", () => {
    beforeEach(() => {
      widget.expanded = false;
    });

    it("it should not contain class=foo-expanded", () => {
      expect(widgetEl.classList.contains("foo--expanded")).toBe(false);
    });
  });
});

describe("given a widget with simulateSpacebarClick=true", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnClick: true, expandOnFocus: true, simulateSpacebarClick: true });
  });

  afterEach(() => {
    widget.destroy();
  });

  describe("when host is selected with kb space", () => {
    beforeEach(() => {
      hostEl.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: " ",
          code: "Space",
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    it("the host el should have aria-expanded=true", () => {
      expect(hostEl.getAttribute("aria-expanded")).toBe("true");
    });
  });

  describe("when host is selected with mousedown", () => {
    beforeEach(() => {
      hostEl.dispatchEvent(new Event("mousedown"));
    });

    it("the host el should have aria-expanded=true", () => {
      expect(hostEl.getAttribute("aria-expanded")).toBe("true");
    });
  });
});

// describe("given a widget with expandOnHover=true & autoCollapse=true", () => {
//   beforeEach(() => {
//     onCollapse.mockClear();
//     document.body.innerHTML = "";
//     document.body.appendChild(containerEl);
//     widget = new Expander(widgetEl, {
//       expandOnHover: true,
//       autoCollapse: true,
//     });
//     hostEl.dispatchEvent(new Event("mouseenter"));
//   });

//   afterEach(() => {
//     onCollapse.mockClear();
//     widget.destroy();
//   });

//   describe("when host hover is cleared", () => {
//     beforeEach(() => {
//       vi.useFakeTimers();
//     });

//     afterEach(() => {
//       vi.useRealTimers();
//     });

//     it("the host el should have aria-expanded=false", () => {
//       hostEl.dispatchEvent(new Event("mouseleave"));
//       vi.runAllTimers();
//       expect(hostEl.getAttribute("aria-expanded")).toBe("false");
//     });
//   });
// });

// describe("given a widget with collapseOnMouseOut=true", () => {
//   beforeEach(() => {
//     onCollapse.mockClear();
//     document.body.innerHTML = "";
//     document.body.appendChild(containerEl);
//     widget = new Expander(widgetEl, { expandOnHover: true, collapseOnMouseOut: true });
//     widget.expanded = true;
//     hostEl.dispatchEvent(new Event("mouseenter"));
//   });

//   afterEach(() => {
//     onCollapse.mockClear();
//     widget.destroy();
//   });

//   describe("when host hover is cleared", () => {
//     beforeEach(() => {
//       hostEl.dispatchEvent(new Event("mouseleave"));
//     });

//     it("it should trigger 0 collapse events", () => {
//       expect(onCollapse.mock.calls.length).toBe(0);
//     });

//     it("the host el should have aria-expanded=false", () => {
//       expect(hostEl.getAttribute("aria-expanded")).toBe("false");
//     });
//   });
// });
