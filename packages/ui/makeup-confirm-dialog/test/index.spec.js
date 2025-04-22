import { test, expect } from "@playwright/test";

/*
test.describe("given a confirm dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-confirm-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when confirm button is clicked", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    const confirmButton = page.locator(".confirm-dialog__confirm");

    await expect(dialog).toBeVisible();
    await confirmButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should close when reject button is clicked", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    const rejectButton = page.locator(".confirm-dialog__reject");

    await expect(dialog).toBeVisible();
    await rejectButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-confirm event when confirmed", async ({ page }) => {
    const confirmButton = page.locator(".confirm-dialog__confirm");

    // Setup event listener
    await page.evaluate(() => {
      window.confirmEventFired = false;
      document.querySelector(".confirm-dialog").addEventListener("dialog-confirm", () => {
        window.confirmEventFired = true;
      });
    });

    await confirmButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.confirmEventFired);
    expect(eventFired).toBe(true);
  });

  test("should emit dialog-reject event when rejected", async ({ page }) => {
    const rejectButton = page.locator(".confirm-dialog__reject");

    // Setup event listener
    await page.evaluate(() => {
      window.rejectEventFired = false;
      document.querySelector(".confirm-dialog").addEventListener("dialog-reject", () => {
        window.rejectEventFired = true;
      });
    });

    await rejectButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.rejectEventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");

    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-labelledby", "confirm-dialog-title");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when Enter key is pressed on confirm button", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    const confirmButton = page.locator(".confirm-dialog__confirm");

    await expect(dialog).toBeVisible();
    await confirmButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Space key is pressed on confirm button", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    const confirmButton = page.locator(".confirm-dialog__confirm");

    await expect(dialog).toBeVisible();
    await confirmButton.focus();
    await page.keyboard.press("Space");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Enter key is pressed on reject button", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    const rejectButton = page.locator(".confirm-dialog__reject");

    await expect(dialog).toBeVisible();
    await rejectButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Space key is pressed on reject button", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");
    const rejectButton = page.locator(".confirm-dialog__reject");

    await expect(dialog).toBeVisible();
    await rejectButton.focus();
    await page.keyboard.press("Space");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Escape key is pressed", async ({ page }) => {
    const dialog = page.locator(".confirm-dialog");

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-confirm event when confirmed using keyboard", async ({ page }) => {
    const confirmButton = page.locator(".confirm-dialog__confirm");

    // Setup event listener
    await page.evaluate(() => {
      window.confirmEventFired = false;
      document.querySelector(".confirm-dialog").addEventListener("dialog-confirm", () => {
        window.confirmEventFired = true;
      });
    });

    await confirmButton.focus();
    await page.keyboard.press("Enter");

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.confirmEventFired);
    expect(eventFired).toBe(true);
  });

  test("should emit dialog-reject event when rejected using keyboard", async ({ page }) => {
    const rejectButton = page.locator(".confirm-dialog__reject");

    // Setup event listener
    await page.evaluate(() => {
      window.rejectEventFired = false;
      document.querySelector(".confirm-dialog").addEventListener("dialog-reject", () => {
        window.rejectEventFired = true;
      });
    });

    await rejectButton.focus();
    await page.keyboard.press("Enter");

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.rejectEventFired);
    expect(eventFired).toBe(true);
  });

  test("should focus confirm button by default when dialog is opened", async ({ page }) => {
    // Reload page to ensure dialog is freshly opened
    await page.reload();

    // Check that the confirm button has focus
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".confirm-dialog__confirm");
    });

    expect(isFocused).toBe(true);
  });

  test("should handle Tab key navigation correctly", async ({ page }) => {
    const confirmButton = page.locator(".confirm-dialog__confirm");
    const rejectButton = page.locator(".confirm-dialog__reject");

    // First tab should move from confirm to reject button
    await confirmButton.focus();
    await page.keyboard.press("Tab");

    let isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".confirm-dialog__reject");
    });
    expect(isFocused).toBe(true);

    // Next tab should cycle back to confirm button
    await page.keyboard.press("Tab");
    isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".confirm-dialog__confirm");
    });
    expect(isFocused).toBe(true);
  });
});
*/
