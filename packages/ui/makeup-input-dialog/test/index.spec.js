import { test, expect } from "@playwright/test";

/*
test.describe("given an input dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-input-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog--input");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when cancel button is clicked", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog--input");
    const cancelButton = page.locator(".lightbox-dialog__cancel");

    await expect(dialog).toBeVisible();
    await cancelButton.click();
    await page.clock.runFor(1000);
    await expect(dialog).toHaveAttribute("hidden");
  });

  test("should emit dialog-cancel event when cancelled", async ({ page }) => {
    const cancelButton = page.locator(".lightbox-dialog__cancel");

    // Setup event listener
    await page.evaluate(() => {
      window.cancelEventFired = false;
      document.querySelector("#dialog-input").addEventListener("dialog-cancel", () => {
        window.cancelEventFired = true;
      });
    });

    await cancelButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.cancelEventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog--input");

    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-labelledby", "input-dialog-title");
    await expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  test("should close when Escape key is pressed", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog--input");

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when clicking outside the dialog (quick dismiss)", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog--input");

    await expect(dialog).toBeVisible();

    // Click on the mask area (outside the dialog window)
    await page.mouse.click(10, 10);

    await expect(dialog).not.toBeVisible();
  });

  test("should close when Enter key is pressed on cancel button", async ({ page }) => {
    const dialog = page.locator(".lightbox-dialog--input");
    const cancelButton = page.locator(".lightbox-dialog__cancel");

    await expect(dialog).toBeVisible();
    await cancelButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should focus the input field by default when dialog is opened", async ({ page }) => {
    // Reload page to ensure dialog is freshly opened
    await page.reload();

    // Check that the input field has focus
    const isFocused = await page.evaluate(() => {
      return document.activeElement === document.querySelector("#input-dialog-input");
    });

    expect(isFocused).toBe(true);
  });

  test("should trap focus within the dialog", async ({ page }) => {
    // Start with focus on input field
    await page.locator("#input-dialog-input").focus();

    // Tab to submit button
    await page.keyboard.press("Tab");
    let isFocusOnCancel = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__cancel");
    });
    expect(isFocusOnCancel).toBe(true);

    // Tab to submit button
    await page.keyboard.press("Tab");
    let isFocusOnSubmit = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__submit");
    });
    expect(isFocusOnSubmit).toBe(true);

    // Tab should cycle back to input field
    await page.keyboard.press("Tab");
    let isFocusOnInput = await page.evaluate(() => {
      return document.activeElement === document.querySelector("#input-dialog-input");
    });
    expect(isFocusOnInput).toBe(true);
  });

  test("should handle backward tab navigation correctly", async ({ page }) => {
    // Start with focus on input field
    await page.locator("#input-dialog-input").focus();

    // Shift+Tab should wrap around to the last focusable element
    await page.keyboard.press("Shift+Tab");

    let isFocusOnSubmit = await page.evaluate(() => {
      return document.activeElement === document.querySelector(".lightbox-dialog__submit");
    });
    expect(isFocusOnSubmit).toBe(true);
  });

  test("should maintain input value when submitting with invalid input", async ({ page }) => {
    // First make the input required for this test
    await page.evaluate(() => {
      document.querySelector("#input-dialog-input").setAttribute("required", "required");
    });

    const inputField = page.locator("#input-dialog-input");
    const submitButton = page.locator(".lightbox-dialog__submit");

    // Try submitting empty required field
    await inputField.focus();
    await inputField.fill("");

    // Store the form's current validity
    const isInvalid = await page.evaluate(() => {
      return !document.querySelector("form").checkValidity();
    });

    if (isInvalid) {
      // Click submit to trigger validation
      await submitButton.click();

      // Dialog should still be visible
      const dialog = page.locator(".lightbox-dialog--input");
      await expect(dialog).toBeVisible();
    }
  });
});
*/
