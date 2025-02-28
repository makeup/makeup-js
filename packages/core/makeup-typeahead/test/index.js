import { describe, expect, beforeEach, afterEach, it } from "vitest";
import typeahead from "../src/index.js";

const TIMEOUT_LENGTH = 1000;

describe("typeahead", () => {
  let mockNodeList;
  let getIndex;
  let th;
  let destroy;

  beforeEach(() => {
    th = typeahead();
    getIndex = th.getIndex;
    destroy = th.destroy;
    mockNodeList = [{ textContent: "Albania" }, { textContent: "India" }, { textContent: "USA" }];
  });

  afterEach(() => {
    destroy();
    th = null;
  });

  it("should return -1 for null nodelist", async () => {
    const index = getIndex(null, "a", TIMEOUT_LENGTH);
    expect(index).toBe(-1);
  });

  it("should return -1 if no match is found", () => {
    expect(getIndex(mockNodeList, "z", 1000)).toBe(-1);
  });

  it("should find index with starting character", async () => {
    const index = getIndex(mockNodeList, "i", TIMEOUT_LENGTH);
    expect(index).toBe(1);
  });

  it("should be case insensitive", async () => {
    const index = getIndex(mockNodeList, "I", TIMEOUT_LENGTH);
    expect(index).toBe(1);
  });

  it("should match multiple characters", async () => {
    const index1 = getIndex(mockNodeList, "u", TIMEOUT_LENGTH);
    const index2 = getIndex(mockNodeList, "s", TIMEOUT_LENGTH);
    expect(index2).toBe(2); // USA (matching 'us')
  });

  it("should fallback to includes match if no start match", async () => {
    mockNodeList = [{ textContent: "California" }, { textContent: "York" }, { textContent: "New York" }];
    const index = getIndex(mockNodeList, "y", TIMEOUT_LENGTH);
    expect(index).toBe(1); // York
  });

  it("should clear typeStr after timeout", async () => {
    const index1 = getIndex(mockNodeList, "a", 100);
    expect(index1).toBe(0); // Albania

    setTimeout(() => {
      const index2 = getIndex(mockNodeList, "u", 100);
      expect(index2).toBe(2); // USA (not matching 'au')
    }, 150);
  });

  it("should not error when empty list given", function () {
    document.body.innerHTML = "<ol></ol>";
    const children = document.querySelectorAll("ol > *");
    const index = getIndex(children, "a", TIMEOUT_LENGTH);
    expect(index).toBe(-1);
  });

  it("should cleanup timeout on destroy", async () => {
    const index = getIndex(mockNodeList, "a", 5000);
    destroy();
    // Verify no errors after destroy
    expect(index).toBe(0); // Albania
  });
});
