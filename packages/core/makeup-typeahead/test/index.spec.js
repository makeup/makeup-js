import { test, expect } from "@playwright/test";
import typeahead from "../src/index.js";

const TIMEOUT_LENGTH = 1000;

test.describe("typeahead", () => {
  let mockNodeList;
  let getIndex;

  test.beforeEach(() => {
    getIndex = typeahead().getIndex;
    mockNodeList = [{ textContent: "Albania" }, { textContent: "India" }, { textContent: "USA" }];
  });

  test("should return -1 for null nodelist", async () => {
    const index = getIndex(null, "a", TIMEOUT_LENGTH);
    expect(index).toBe(-1);
  });

  test("should find index with starting character", async () => {
    const index = getIndex(mockNodeList, "i", TIMEOUT_LENGTH);
    expect(index).toBe(1); // India
  });

  test("should be case insensitive", async () => {
    const index = getIndex(mockNodeList, "I", TIMEOUT_LENGTH);
    expect(index).toBe(1); // India
  });

  test("should match multiple characters", async () => {
    const index1 = getIndex(mockNodeList, "u", TIMEOUT_LENGTH);
    const index2 = getIndex(mockNodeList, "s", TIMEOUT_LENGTH);
    expect(index2).toBe(2); // USA (matching 'us')
  });

  test("should fallback to includes match if no start match", async () => {
    mockNodeList = [{ textContent: "California" }, { textContent: "York" }, { textContent: "New York" }];
    const index = getIndex(mockNodeList, "y", TIMEOUT_LENGTH);
    expect(index).toBe(1); // York
  });

  test("should clear typeStr after timeout", async ({ page }) => {
    const index1 = getIndex(mockNodeList, "a", 100);
    expect(index1).toBe(0); // Albania

    await page.waitForTimeout(150);

    const index2 = getIndex(mockNodeList, "u", 100);
    expect(index2).toBe(2); // USA (not matching 'au')
  });

  test("should cleanup timeout on destroy", async () => {
    const index = getIndex(mockNodeList, "a", TIMEOUT_LENGTH);
    const destroy = typeahead().destroy;
    destroy();
    // Verify no errors after destroy
    expect(index).toBe(0); // Albania
  });

  test("should not error when empty list given", async function ({ page }) {
    await page.setContent("<ol></ol>");
    const children = await page.locator("ol > *").all();
    const index = getIndex(children, "a", TIMEOUT_LENGTH);
    expect(index).toBe(-1);
  });
});
