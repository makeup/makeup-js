import { test, expect } from "@playwright/test";

test.describe("given a snackbar dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-snackbar-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".snackbar-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have proper ARIA role and live region attributes", async ({ page }) => {
    const dialog = page.locator(".snackbar-dialog");

    // Snackbars typically use role="alert" or role="status"
    await expect(dialog).toHaveAttribute("role", "dialog");

    // Should have aria-live attribute for accessibility
    await expect(dialog).toHaveAttribute("aria-live", "polite");
  });

  test("should have the correct position on screen", async ({ page }) => {
    // Snackbars are typically positioned at the bottom of the viewport
    const position = await page.evaluate(() => {
      const dialog = document.querySelector(".snackbar-dialog");
      const rect = dialog.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate distance from bottom of viewport
      const distanceFromBottom = viewportHeight - rect.bottom;

      return {
        isNearBottom: distanceFromBottom < 50, // Within 50px of bottom
        distanceFromBottom,
        isNearCenter: Math.abs(window.innerWidth / 2 - (rect.left + rect.width / 2)) < 50,
      };
    });

    // Check if the snackbar is positioned near the bottom of the screen
    expect(position.isNearBottom).toBe(true);

    // Many snackbars are also centered horizontally
    // This may need to be adjusted based on your specific implementation
    expect(position.isNearCenter).toBe(true);
  });

  test("should have proper transition classes", async ({ page }) => {
    const dialog = page.locator(".snackbar-dialog");

    // Check for transition classes (names may vary based on implementation)
    const hasTransitionClass = await page.evaluate(() => {
      const dialog = document.querySelector(".snackbar-dialog");
      const classes = dialog.className;
      return (
        classes.includes("fade") ||
        classes.includes("slide") ||
        classes.includes("transition") ||
        getComputedStyle(dialog).transition !== "all 0s ease 0s"
      );
    });

    expect(hasTransitionClass).toBe(true);
  });

  test("should be accessible via keyboard", async ({ page }) => {
    // Check that at least one focusable element exists in the snackbar
    const hasFocusableElements = await page.evaluate(() => {
      const dialog = document.querySelector(".snackbar-dialog");
      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      return focusableElements.length > 0;
    });

    expect(hasFocusableElements).toBe(true);
  });
});
