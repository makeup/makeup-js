import { test, expect } from "@playwright/test";

test.describe("given a lightbox dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-lightbox-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when close button is clicked", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");
    const closeButton = page.locator(".lightbox-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-close event when closed", async ({ page }) => {
    const closeButton = page.locator(".lightbox-dialog__close");

    // Setup event listener
    await page.evaluate(() => {
      window.closeEventFired = false;
      document.querySelector("#dialog-lightbox").addEventListener("dialog-close", () => {
        window.closeEventFired = true;
      });
    });

    await closeButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");

    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-labelledby", "lightbox-dialog-title");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when Escape key is pressed", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when clicking outside the dialog (quick dismiss)", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");

    await expect(dialog).toBeVisible();

    // Click on the mask area (outside the dialog window)
    await page.mouse.click(10, 10);

    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-close event when closed with quick dismiss", async ({ page }) => {
    // Setup event listener
    await page.evaluate(() => {
      window.closeEventFired = false;
      document.querySelector("#dialog-lightbox").addEventListener("dialog-close", () => {
        window.closeEventFired = true;
      });
    });

    // Click on the mask area (outside the dialog window)
    await page.mouse.click(10, 10);

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should close when Enter key is pressed on close button", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");
    const closeButton = page.locator(".lightbox-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Space key is pressed on close button", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");
    const closeButton = page.locator(".lightbox-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.focus();
    await page.keyboard.press("Space");
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-close event when closed using keyboard", async ({ page }) => {
    const closeButton = page.locator(".lightbox-dialog__close");

    // Setup event listener
    await page.evaluate(() => {
      window.closeEventFired = false;
      document.querySelector("#dialog-lightbox").addEventListener("dialog-close", () => {
        window.closeEventFired = true;
      });
    });

    await closeButton.focus();
    await page.keyboard.press("Enter");

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should focus close button by default when dialog is opened", async ({ page }) => {
    // Reload page to ensure dialog is freshly opened
    await page.reload();

    // Check that the close button has focus
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__close");
    });

    expect(isFocused).toBe(true);
  });

  test("should trap focus within the dialog", async ({ page }) => {
    // Start with focus on close button
    await page.locator(".lightbox-dialog__close").focus();

    // Tab to the link
    await page.keyboard.press("Tab");
    let isFocusOnLink = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__main a");
    });
    expect(isFocusOnLink).toBe(true);

    // Tab should cycle back to close button
    await page.keyboard.press("Tab");
    let isFocusOnClose = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__close");
    });
    expect(isFocusOnClose).toBe(true);
  });

  test("should handle backward tab navigation correctly", async ({ page }) => {
    // Start with focus on close button
    await page.locator(".lightbox-dialog__close").focus();

    // Shift+Tab should wrap around to the last focusable element
    await page.keyboard.press("Shift+Tab");

    let isFocusOnLink = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__main a");
    });
    expect(isFocusOnLink).toBe(true);
  });

  test("should not close when clicking inside the dialog window", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog");
    const dialogWindow = page.locator(".lightbox-dialog__window");

    await expect(dialog).toBeVisible();

    // Click inside the dialog window
    await dialogWindow.click();

    // Dialog should still be visible
    await expect(dialog).toBeVisible();
  });

  test("should maintain z-index stacking order", async ({ page }) => {
    // Check that the dialog has a higher z-index than page content
    const zIndexValue = await page.evaluate(() => {
      return window.getComputedStyle(document.querySelector(".lightbox-dialog")).zIndex;
    });

    // Convert to number and verify it's a positive value (should be high)
    const zIndex = parseInt(zIndexValue, 10);
    expect(zIndex).toBeGreaterThan(0);
  });
});
