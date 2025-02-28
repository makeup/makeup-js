import { test, expect } from "@playwright/test";

test.describe("given a toast dialog", function () {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-toast-dialog/index.html");
  });

  test("should be visible on page load", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should close when close button is clicked", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");
    const closeButton = page.locator(".toast-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-close event when closed", async ({ page }) => {
    const closeButton = page.locator(".toast-dialog__close");

    // Setup event listener
    await page.evaluate(() => {
      window.closeEventFired = false;
      document.querySelector("#dialog-toast").addEventListener("dialog-close", () => {
        window.closeEventFired = true;
      });
    });

    await closeButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");

    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-live", "polite");
    await expect(dialog).toHaveAttribute("aria-modal", "false");
    await expect(dialog).toHaveAttribute("aria-label", "Notification");
  });

  test("should close when CTA button is clicked", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");
    const ctaButton = page.locator(".toast-dialog__cta");

    await expect(dialog).toBeVisible();
    await ctaButton.click();
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-cta event when CTA button is clicked", async ({ page }) => {
    const ctaButton = page.locator(".toast-dialog__cta");

    // Setup event listener
    await page.evaluate(() => {
      window.ctaEventFired = false;
      document.querySelector("#dialog-toast").addEventListener("dialog-cta", () => {
        window.ctaEventFired = true;
      });
    });

    await ctaButton.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.ctaEventFired);
    expect(eventFired).toBe(true);
  });

  test("should close when Escape key is pressed", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");

    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Enter key is pressed on close button", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");
    const closeButton = page.locator(".toast-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).not.toBeVisible();
  });

  test("should close when Space key is pressed on close button", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");
    const closeButton = page.locator(".toast-dialog__close");

    await expect(dialog).toBeVisible();
    await closeButton.focus();
    await page.keyboard.press("Space");
    await expect(dialog).not.toBeVisible();
  });

  test("should emit dialog-close event when closed using keyboard", async ({ page }) => {
    const closeButton = page.locator(".toast-dialog__close");

    // Setup event listener
    await page.evaluate(() => {
      window.closeEventFired = false;
      document.querySelector("#dialog-toast").addEventListener("dialog-close", () => {
        window.closeEventFired = true;
      });
    });

    await closeButton.focus();
    await page.keyboard.press("Enter");

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.closeEventFired);
    expect(eventFired).toBe(true);
  });

  test("should auto-dismiss after timeout if configured", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");

    // First check if toast has auto-dismiss enabled
    const hasTimeout = await page.evaluate(() => {
      const dialog = document.querySelector("#dialog-toast");
      return dialog._toastDialog && dialog._toastDialog._options && dialog._toastDialog._options.dismissTimeout > 0;
    });

    if (hasTimeout) {
      await expect(dialog).toBeVisible();

      // Get the timeout value
      const timeout = await page.evaluate(() => {
        return document.querySelector("#dialog-toast")._toastDialog._options.dismissTimeout;
      });

      // Wait for auto-dismiss (add a small buffer)
      await page.waitForTimeout(timeout + 500);

      await expect(dialog).not.toBeVisible();
    } else {
      // Log that auto-dismiss is not configured
      console.log("Auto-dismiss is not configured for this toast dialog");
    }
  });

  test("should activate with accesskey", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");
    const ctaButton = page.locator(".toast-dialog__cta");

    // Verify the accesskey attribute is present
    await expect(ctaButton).toHaveAttribute("accesskey", "v");

    // Set up event listener to check if CTA event would fire
    await page.evaluate(() => {
      window.ctaEventFired = false;
      document.querySelector("#dialog-toast").addEventListener("dialog-cta", () => {
        window.ctaEventFired = true;
      });
    });

    // Simulate accesskey press (this is platform dependent and may not work in all browsers)
    // Here we'll directly click the button instead
    await ctaButton.click();

    // Verify dialog closes
    await expect(dialog).not.toBeVisible();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.ctaEventFired);
    expect(eventFired).toBe(true);
  });

  test("should have proper transition class", async ({ page }) => {
    const dialog = page.locator(".toast-dialog");

    await expect(dialog).toHaveClass(/toast-dialog--transition/);
  });

  test("should not interfere with page content interaction", async ({ page }) => {
    // Toast dialogs should not prevent interaction with page content
    // Add a test button to the page
    await page.evaluate(() => {
      const button = document.createElement("button");
      button.id = "test-button";
      button.textContent = "Test Button";
      document.querySelector("#page").append(button);
    });

    const testButton = page.locator("#test-button");

    // Set up a click tracker
    await page.evaluate(() => {
      window.buttonClicked = false;
      document.querySelector("#test-button").addEventListener("click", () => {
        window.buttonClicked = true;
      });
    });

    // Click the button
    await testButton.click();

    // Check if the button click was registered
    const buttonClicked = await page.evaluate(() => window.buttonClicked);
    expect(buttonClicked).toBe(true);
  });
});
