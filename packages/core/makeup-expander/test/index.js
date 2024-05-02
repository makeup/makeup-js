import { expect } from "chai";
import sinon from "sinon";
import Expander from "../src/index.js";

var containerEl = document.createElement("div");
containerEl.innerHTML =
  '<span class="expander">' +
  '<button class="expander__host"><button>' +
  '<div class="expander__content"></div>' +
  "</span>";

var widgetEl = containerEl.querySelector(".expander");
var hostEl = widgetEl.querySelector(".expander__host");
var onCollapse = sinon.spy();
var onExpand = sinon.spy();
var widget;

widgetEl.addEventListener("expander-expand", onExpand);
widgetEl.addEventListener("expander-collapse", onCollapse);

describe("given a widget with default options", function () {
  before(function () {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl);
  });

  after(function () {
    widget.destroy();
  });

  it("it should not add an expanded class", function () {
    expect(widgetEl.classList.length).to.equal(1);
  });

  describe("when widget is collapsed", function () {
    before(function () {
      widget.expanded = false;
      onCollapse.resetHistory();
    });

    after(function () {
      hostEl.blur();
    });

    describe("and the host is clicked", function () {
      before(function () {
        hostEl.click();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have correct aria-expanded attribute", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the host receives focus", function () {
      before(function () {
        hostEl.focus();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should observe 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the document is clicked", function () {
      before(function () {
        document.body.click();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should observe 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });
  });
});

describe("given a widget with expandOnClick=true", function () {
  before(function () {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnClick: true });
    widget.expanded = false;
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  after(function () {
    widget.destroy();
    hostEl.blur();
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  it("it should not have an expanded class", function () {
    expect(widgetEl.classList.length).to.equal(1);
  });

  describe("when widget is collapsed", function () {
    describe("and the host is clicked", function () {
      before(function () {
        hostEl.click();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 1 expand events", function () {
        expect(onExpand.callCount).to.equal(1);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=true", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("true");
      });
    });

    describe("and the host is focussed", function () {
      before(function () {
        widget.expanded = false;
        onExpand.resetHistory();
        onCollapse.resetHistory();
        hostEl.focus();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the host is hovered", function () {
      before(function () {
        widget.expanded = false;
        onExpand.resetHistory();
        onCollapse.resetHistory();
        hostEl.dispatchEvent(new Event("mouseenter"));
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the document is clicked", function () {
      before(function () {
        widget.expanded = false;
        onExpand.resetHistory();
        onCollapse.resetHistory();
        document.body.click();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should observe 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });
  });
});

describe("given a widget with expandOnFocus=true", function () {
  before(function () {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnFocus: true });
    widget.expanded = false;
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  after(function () {
    widget.destroy();
    hostEl.blur();
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  it("it should not have an expanded class", function () {
    expect(widgetEl.classList.length).to.equal(1);
  });

  describe("when widget is collapsed", function () {
    describe("and the host is focussed", function () {
      before(function () {
        hostEl.focus();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 1 expand events", function () {
        expect(onExpand.callCount).to.equal(1);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=true", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("true");
      });
    });

    describe("and the host is clicked", function () {
      before(function () {
        hostEl.click();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the host is hovered", function () {
      before(function () {
        hostEl.dispatchEvent(new Event("mouseenter"));
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the document is clicked", function () {
      before(function () {
        document.body.click();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should observe 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });
  });
});

describe("given a widget with expandOnHover=true", function () {
  before(function () {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandOnHover: true });
    widget.expanded = false;
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  after(function () {
    widget.destroy();
    hostEl.dispatchEvent(new Event("mouseenter"));
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  it("it should not have an expanded class", function () {
    expect(widgetEl.classList.length).to.equal(1);
  });

  describe("when widget is collapsed", function () {
    describe("and the host is focussed", function () {
      before(function () {
        hostEl.focus();
      });

      after(function () {
        widget.expanded = false;
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the host is clicked", function () {
      before(function () {
        hostEl.click();
      });

      after(function () {
        widget.expanded = false;
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });

    describe("and the host is hovered", function () {
      before(function () {
        hostEl.dispatchEvent(new Event("mouseenter"));
      });

      after(function () {
        widget.expanded = false;
        hostEl.dispatchEvent(new Event("mouseout"));
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 1 expand events", function () {
        expect(onExpand.callCount).to.equal(1);
      });

      it("it should trigger 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=true", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("true");
      });
    });

    describe("and the document is clicked", function () {
      before(function () {
        document.body.click();
      });

      after(function () {
        widget.expanded = false;
        hostEl.blur();
        onExpand.resetHistory();
        onCollapse.resetHistory();
      });

      it("it should trigger 0 expand events", function () {
        expect(onExpand.callCount).to.equal(0);
      });

      it("it should observe 0 collapse events", function () {
        expect(onCollapse.callCount).to.equal(0);
      });

      it("the host el should have aria-expanded=false", function () {
        expect(hostEl.getAttribute("aria-expanded")).to.equal("false");
      });
    });
  });
});

describe("given a widget with expandedClass=foo", function () {
  before(function () {
    document.body.innerHTML = "";
    document.body.appendChild(containerEl);
    widget = new Expander(widgetEl, { expandedClass: "foo--expanded" });
  });

  after(function () {
    widget.expanded = false;
    widget.destroy();
    onExpand.resetHistory();
    onCollapse.resetHistory();
  });

  describe("when widget is expanded", function () {
    before(function () {
      widget.expanded = true;
    });

    it("it should contain class=foo-expanded", function () {
      expect(widgetEl.classList.contains("foo--expanded")).to.equal(true);
    });
  });

  describe("when widget is collapsed", function () {
    before(function () {
      widget.expanded = false;
    });

    it("it should not contain class=foo-expanded", function () {
      expect(widgetEl.classList.contains("foo--expanded")).to.equal(false);
    });
  });
});
