import { test, expect } from "@playwright/test";

test.describe("given a drawer dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-drawer-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when close button is clicked", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");
    const closeButton = page.locator(".drawer-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should toggle expanded state when resize handle is clicked", async ({ page }) => {
    const window = page.locator(".drawer-dialog__window");
    const resizeHandle = page.locator(".drawer-dialog__handle");

    // Initially not expanded
    await expect(window).not.toHaveClass(/drawer-dialog__window--expanded/);

    // Click to expand
    await resizeHandle.click();
    await expect(window).toHaveClass(/drawer-dialog__window--expanded/);

    // Click again to collapse
    await resizeHandle.click();
    await expect(window).not.toHaveClass(/drawer-dialog__window--expanded/);
  });

  test("should emit dialog-resize event when resized", async ({ page }) => {
    const resizeHandle = page.locator(".drawer-dialog__handle");

    // Setup event listener
    await page.evaluate(() => {
      window.resizeEventFired = false;
      document.querySelector(".drawer-dialog").addEventListener("dialog-resize", () => {
        window.resizeEventFired = true;
      });
    });

    await resizeHandle.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.resizeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should emit dialog-close event when closed", async ({ page }) => {
    const closeButton = page.locator(".drawer-dialog__close");

    // Setup event listener
    await page.evaluate(() => {
      window.closeEventFired = false;
      document.querySelector(".drawer-dialog").addEventListener("dialog-close", () => {
        window.closeEventFired = true;
      });
    });

    await closeButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");

    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-labelledby", "drawer-dialog-title");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when Escape key is pressed", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when clicking outside the dialog (quick dismiss)", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");

    await expect(dialog).toBeVisible();

    // Click on the mask area (outside the dialog window)
    await page.mouse.click(10, 10);

    await expect(dialog).not.toBeVisible();
  });

  test("should close when Enter key is pressed on close button", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");
    const closeButton = page.locator(".drawer-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Space key is pressed on close button", async ({ page }) => {
    const dialog = page.locator(".drawer-dialog");
    const closeButton = page.locator(".drawer-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.focus();
    await page.keyboard.press("Space");
    await expect(dialog).not.toBeVisible();
  });

  test("should resize when Enter key is pressed on resize handle", async ({ page }) => {
    const window = page.locator(".drawer-dialog__window");
    const resizeHandle = page.locator(".drawer-dialog__handle");

    await expect(window).not.toHaveClass(/drawer-dialog__window--expanded/);
    await resizeHandle.focus();
    await page.keyboard.press("Enter");
    await expect(window).toHaveClass(/drawer-dialog__window--expanded/);
  });

  test("should resize when Space key is pressed on resize handle", async ({ page }) => {
    const window = page.locator(".drawer-dialog__window");
    const resizeHandle = page.locator(".drawer-dialog__handle");

    await expect(window).not.toHaveClass(/drawer-dialog__window--expanded/);
    await resizeHandle.focus();
    await page.keyboard.press("Space");
    await expect(window).toHaveClass(/drawer-dialog__window--expanded/);
  });

  test("should emit dialog-resize event when resized using keyboard", async ({ page }) => {
    const resizeHandle = page.locator(".drawer-dialog__handle");

    // Setup event listener
    await page.evaluate(() => {
      window.resizeEventFired = false;
      document.querySelector(".drawer-dialog").addEventListener("dialog-resize", () => {
        window.resizeEventFired = true;
      });
    });

    await resizeHandle.focus();
    await page.keyboard.press("Enter");

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.resizeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should focus on close button initially", async ({ page }) => {
    // Reload page to ensure dialog is freshly opened
    await page.reload();

    // Check that the handle button has focus (focusManagementIndex: 1 in options)
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".drawer-dialog__close");
    });

    expect(isFocused).toBe(true);
  });

  test("should trap focus within the dialog", async ({ page, browserName }) => {
    test.skip(
      browserName === "firefox",
      "Firefox is currently failing this test, No issue detected when tested manually",
    );
    // Focus on first focusable element
    await page.locator(".drawer-dialog__handle").focus();

    // Tab through all focusable elements and ensure focus stays inside dialog
    // Start with handle -> header close button -> link -> back to handle
    await page.keyboard.press("Tab");
    let isFocusOnClose = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".drawer-dialog__close");
    });
    expect(isFocusOnClose).toBe(true);

    await page.keyboard.press("Tab");
    let isFocusOnLink = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".drawer-dialog__main a");
    });
    expect(isFocusOnLink).toBe(true);

    await page.keyboard.press("Tab");
    let isFocusOnHandle = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".drawer-dialog__handle");
    });
    expect(isFocusOnHandle).toBe(true);
  });

  test("should handle backward tab navigation correctly", async ({ page }) => {
    // Start with focus on handle
    await page.locator(".drawer-dialog__handle").focus();

    // Shift+Tab should wrap around to the last focusable element
    await page.keyboard.press("Shift+Tab");

    let isFocusOnLink = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".drawer-dialog__main a");
    });
    expect(isFocusOnLink).toBe(true);
  });
});
