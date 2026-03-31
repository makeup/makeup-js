import { describe, expect, beforeEach, afterEach, it, vi } from "vitest";
import typeahead from "../src/index.js";

const TIMEOUT_LENGTH = 1000;

describe("given a typeahead instance", () => {
  let mockNodeList;
  let th;

  beforeEach(() => {
    th = typeahead();
    mockNodeList = [{ textContent: "Albania" }, { textContent: "India" }, { textContent: "USA" }];
  });

  afterEach(() => {
    th.destroy();
    vi.restoreAllMocks();
  });

  describe("when getIndex is called with a null nodelist", () => {
    it("should return -1", () => {
      expect(th.getIndex(null, "a", TIMEOUT_LENGTH)).toBe(-1);
    });
  });

  describe("when getIndex is called with no matching character", () => {
    it("should return -1", () => {
      expect(th.getIndex(mockNodeList, "z", TIMEOUT_LENGTH)).toBe(-1);
    });
  });

  describe("when getIndex is called with a matching starting character", () => {
    it("should return the matching index", () => {
      expect(th.getIndex(mockNodeList, "i", TIMEOUT_LENGTH)).toBe(1);
    });

    it("should be case insensitive", () => {
      expect(th.getIndex(mockNodeList, "I", TIMEOUT_LENGTH)).toBe(1);
    });
  });

  describe("when getIndex is called with multiple characters in sequence", () => {
    it("should match the accumulated string", () => {
      th.getIndex(mockNodeList, "u", TIMEOUT_LENGTH);
      expect(th.getIndex(mockNodeList, "s", TIMEOUT_LENGTH)).toBe(2); // USA
    });
  });

  describe("when the character only matches mid-string", () => {
    it("should fallback to includes match", () => {
      const nodes = [{ textContent: "California" }, { textContent: "York" }, { textContent: "New York" }];
      expect(th.getIndex(nodes, "y", TIMEOUT_LENGTH)).toBe(1); // York
    });
  });

  describe("when getIndex is called with an empty nodelist", () => {
    it("should return -1", () => {
      document.body.innerHTML = "<ol></ol>";
      const children = document.querySelectorAll("ol > *");
      expect(th.getIndex(children, "a", TIMEOUT_LENGTH)).toBe(-1);
    });
  });

  describe("when the timeout expires", () => {
    it("should reset the accumulated string", () => {
      vi.useFakeTimers();
      th.getIndex(mockNodeList, "a", 100); // Albania
      vi.advanceTimersByTime(150);
      expect(th.getIndex(mockNodeList, "u", 100)).toBe(2); // USA (not 'au')
      vi.useRealTimers();
    });

    it("should reset after the first timeout even when a second character was typed before it expired", () => {
      vi.useFakeTimers();
      th.getIndex(mockNodeList, "a", 100); // timer fires at t=100ms
      vi.advanceTimersByTime(50);
      th.getIndex(mockNodeList, "l", 100); // timer fires at t=150ms
      vi.advanceTimersByTime(60); // t=110ms: first timer has fired, typeStr is now ""
      expect(th.getIndex(mockNodeList, "u", 100)).toBe(2); // USA — not searching for "alu"
      vi.useRealTimers();
    });
  });

  describe("when destroy is called", () => {
    it("should clear the pending timeout without error", () => {
      const index = th.getIndex(mockNodeList, "a", 5000);
      th.destroy();
      expect(index).toBe(0); // Albania
    });
  });
});
