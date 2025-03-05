import { test, expect } from "@playwright/test";

test.describe("given an full screen dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-fullscreen-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".fullscreen-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
