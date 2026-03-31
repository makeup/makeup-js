import nextId from "../src/index.js";
import { describe, expect, beforeAll, it } from "vitest";

const containerEl = document.createElement("div");
document.body.appendChild(containerEl);

describe("given three elements without an existing id", () => {
  describe("when nextId is called on each element in sequence", () => {
    let testEls;
    const nids = [];

    beforeAll(() => {
      containerEl.innerHTML = "<div></div><div></div><div></div>";
      testEls = Array.from(containerEl.querySelectorAll("div"));
      nids.push(nextId(testEls[0]), nextId(testEls[1]), nextId(testEls[2]));
    });

    it("should assign id to first element", () => {
      expect(testEls[0].id).toBe(nids[0]);
    });

    it("should assign id to second element", () => {
      expect(testEls[1].id).toBe(nids[1]);
    });

    it("should assign id to third element", () => {
      expect(testEls[2].id).toBe(nids[2]);
    });

    it("should assign sequential ids sharing the same prefix", () => {
      const prefix = nids[0].slice(0, -1);
      expect(nids[1].startsWith(prefix)).toBe(true);
      expect(nids[2].startsWith(prefix)).toBe(true);
    });
  });

  describe("when nextId is called on each element in sequence using custom prefix", () => {
    let testEls;
    const nids = [];

    beforeAll(() => {
      containerEl.innerHTML = "<div></div><div></div><div></div>";
      testEls = Array.from(containerEl.querySelectorAll("div"));
      nids.push(nextId(testEls[0], "foo"), nextId(testEls[1], "foo"), nextId(testEls[2], "foo"));
    });

    it("should assign id to first element", () => {
      expect(testEls[0].id).toBe(nids[0]);
    });

    it("should assign id to second element", () => {
      expect(testEls[1].id).toBe(nids[1]);
    });

    it("should assign id to third element", () => {
      expect(testEls[2].id).toBe(nids[2]);
    });

    it("should use the custom prefix", () => {
      expect(nids[0].startsWith("foo-")).toBe(true);
    });
  });
});

describe("given an element without an existing id", () => {
  describe("when nextId is called with an empty string prefix", () => {
    let el;
    let nid;

    beforeAll(() => {
      el = document.createElement("div");
      document.body.appendChild(el);
      nid = nextId(el, "");
    });

    it("should assign an id to the element", () => {
      expect(el.id).toBeTruthy();
    });

    it("should not start with a hyphen", () => {
      expect(el.id.startsWith("-")).toBe(false);
    });

    it("should return the assigned id", () => {
      expect(nid).toBe(el.id);
    });
  });
});

describe("given three elements with an existing id", () => {
  describe("when nextId is called on each element in sequence", () => {
    let testEls;

    beforeAll(() => {
      containerEl.innerHTML = '<div id="foo-0"></div><div id="foo-1"></div><div id="foo-2"></div>';
      testEls = Array.from(containerEl.querySelectorAll("div"));

      nextId(testEls[0]);
      nextId(testEls[1]);
      nextId(testEls[2]);
    });

    it("should maintain id=foo-0 on first element", () => {
      expect(testEls[0].id).toBe("foo-0");
    });

    it("should maintain id=foo-1 on second element", () => {
      expect(testEls[1].id).toBe("foo-1");
    });

    it("should maintain id=foo-2 on third element", () => {
      expect(testEls[2].id).toBe("foo-2");
    });
  });

  describe("when nextId is called on each element in sequence using custom prefix", () => {
    let testEls;

    beforeAll(() => {
      containerEl.innerHTML = '<div id="bar-0"></div><div id="bar-1"></div><div id="bar-2"></div>';
      testEls = Array.from(containerEl.querySelectorAll("div"));

      nextId(testEls[0], "custom");
      nextId(testEls[1], "custom");
      nextId(testEls[2], "custom");
    });

    it("should maintain id=bar-0 on first element", () => {
      expect(testEls[0].id).toBe("bar-0");
    });

    it("should maintain id=bar-1 on second element", () => {
      expect(testEls[1].id).toBe("bar-1");
    });

    it("should maintain id=bar-2 on third element", () => {
      expect(testEls[2].id).toBe("bar-2");
    });
  });
});
