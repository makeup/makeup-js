import { test, expect } from "@playwright/test";
/*
test.describe("given a dialog button", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-dialog-button/index.html");
  });

  test("should open lightbox dialog when clicked", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-lightbox']");
    const dialog = page.locator("#dialog-lightbox");

    await expect(dialog).not.toBeVisible();
    await button.click();
    await expect(dialog).toBeVisible();
  });

  test("should return focus to lightbox button after closing dialog", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-lightbox']");
    const dialog = page.locator("#dialog-lightbox");
    const closeButton = page.locator("#dialog-lightbox .lightbox-dialog__close");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog
    await closeButton.click();
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-lightbox']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to body after acknowledging alert", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-alert']");
    const dialog = page.locator("#dialog-alert");
    const acknowledgeButton = page.locator(".alert-dialog__acknowledge");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog by acknowledging
    await acknowledgeButton.click();
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("body");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to confirm dialog button after confirming", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-confirm']");
    const dialog = page.locator("#dialog-confirm");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-confirm']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to confirm dialog button after rejecting", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-confirm']");
    const dialog = page.locator("#dialog-confirm");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-confirm']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to input dialog button after submitting", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-input']");
    const dialog = page.locator("#dialog-input");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-input']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to input dialog button after canceling", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-input']");
    const dialog = page.locator("#dialog-input");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-input']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to panel dialog button after closing", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-panel']");
    const dialog = page.locator("#dialog-panel");
    const closeButton = page.locator(".panel-dialog__close");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog
    await closeButton.click();
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-panel']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to drawer dialog button after closing", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='drawer-dialog']");
    const dialog = page.locator("#drawer-dialog");
    const closeButton = page.locator(".drawer-dialog__close");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog
    await closeButton.click();
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='drawer-dialog']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to toast dialog button after closing", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-toast']");
    const dialog = page.locator("#dialog-toast");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-toast']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to snackbar dialog button after closing", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-snackbar']");
    const dialog = page.locator("#dialog-snackbar");
    const ctaButton = page.locator(".snackbar-dialog__cta");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-snackbar']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to fullscreen dialog button after closing", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-fullscreen']");
    const dialog = page.locator("#dialog-fullscreen");
    const closeButton = page.locator(".fullscreen-dialog__close");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog
    await closeButton.click();
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-fullscreen']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to button after closing dialog with Escape key", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-lightbox']");
    const dialog = page.locator("#dialog-lightbox");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog with Escape key
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-lightbox']");
    });
    expect(isFocused).toBe(true);
  });

  test("should return focus to button after closing dialog by clicking outside (quick dismiss)", async ({ page }) => {
    const button = page.locator("button[data-makeup-for='dialog-lightbox']");
    const dialog = page.locator("#dialog-lightbox");

    // Open dialog
    await button.click();
    await expect(dialog).toBeVisible();

    // Close dialog by clicking outside (using the mask area)
    await page.evaluate(() => {
      const dialog = document.querySelector("#dialog-lightbox");
      // Simulate a click on the dialog element itself (outside the window)
      dialog.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    await expect(dialog).not.toBeVisible();

    // Check focus returns to button
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("button[data-makeup-for='dialog-lightbox']");
    });
    expect(isFocused).toBe(true);
  });
});
*/
