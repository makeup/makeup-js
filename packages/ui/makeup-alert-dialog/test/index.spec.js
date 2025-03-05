import { test, expect } from "@playwright/test";

test.describe("given an alert dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-alert-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".alert-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when OK button is clicked", async ({ page }) => {
    const dialog = page.locator(".alert-dialog");
    const acknowledgeButton = page.locator(".alert-dialog__acknowledge");

    await expect(dialog).toBeVisible();
    await acknowledgeButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-acknowledge event when acknowledged", async ({ page }) => {
    const acknowledgeButton = page.locator(".alert-dialog__acknowledge");

    // Setup event listener
    await page.evaluate(() => {
      window.eventFired = false;
      document.querySelector(".alert-dialog").addEventListener("dialog-acknowledge", () => {
        window.eventFired = true;
      });
    });

    await acknowledgeButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.eventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    const dialog = page.locator(".alert-dialog");

    await expect(dialog).toHaveAttribute("role", "alertdialog");
    await expect(dialog).toHaveAttribute("aria-labelledby", "alert-dialog-title");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when Enter key is pressed on OK button", async ({ page }) => {
    const dialog = page.locator(".alert-dialog");
    const acknowledgeButton = page.locator(".alert-dialog__acknowledge");

    await expect(dialog).toBeVisible();
    await acknowledgeButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Space key is pressed on OK button", async ({ page }) => {
    const dialog = page.locator(".alert-dialog");
    const acknowledgeButton = page.locator(".alert-dialog__acknowledge");

    await expect(dialog).toBeVisible();
    await acknowledgeButton.focus();
    await page.keyboard.press("Space");
    await expect(dialog).not.toBeVisible();
  });

  test("should not close when Escape key is pressed", async ({ page }) => {
    const dialog = page.locator(".alert-dialog");

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();
  });

  test("should emit dialog-acknowledge event when acknowledged using keyboard", async ({ page }) => {
    const acknowledgeButton = page.locator(".alert-dialog__acknowledge");

    // Setup event listener
    await page.evaluate(() => {
      window.eventFired = false;
      document.querySelector(".alert-dialog").addEventListener("dialog-acknowledge", () => {
        window.eventFired = true;
      });
    });

    await acknowledgeButton.focus();
    await page.keyboard.press("Enter");

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.eventFired);
    expect(eventFired).toBe(true);
  });

  test("should focus OK button by default when dialog is opened", async ({ page }) => {
    // Reload page to ensure dialog is freshly opened
    await page.reload();

    // Check that the OK button has focus
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".alert-dialog__acknowledge");
    });

    expect(isFocused).toBe(true);
  });
});
