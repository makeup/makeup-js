import { test, expect } from "@playwright/test";

test.describe("given a switch", () => {
  let defaultSwitch;
  let disabledSwitch;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-switch/index.html");
    defaultSwitch = page.getByRole("switch").first();
    disabledSwitch = page.getByRole("switch").nth(1);
  });

  test.describe("with default state", async () => {
    test("should be initilized correctly", async () => {
      await expect(defaultSwitch).toBeVisible();
    });

    test("should not be checked initially", async () => {
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "false");
    });

    test("should toggle on click", async () => {
      await defaultSwitch.click();
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "true");
    });

    test("should toggle back on clicking twice", async () => {
      await defaultSwitch.click();
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "true");

      await defaultSwitch.click();
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "false");
    });

    test("should toggle on [space] key", async () => {
      await defaultSwitch.press("Space");
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "true");
    });

    test("should toggle back on [space] key twice", async () => {
      await defaultSwitch.click();
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "true");

      await defaultSwitch.click();
      await expect(defaultSwitch).toHaveAttribute("aria-checked", "false");
    });
  });

  test.describe("with disabled state", () => {
    test("should be initilized correctly", async () => {
      await expect(disabledSwitch).toBeDisabled();
      await expect(disabledSwitch).toHaveAttribute("aria-disabled", "true");
    });

    test("should not be focusable using kb", async ({ page }) => {
      await defaultSwitch.focus();
      await page.keyboard.press("Tab");
      await expect(disabledSwitch).not.toBeFocused();
    });
  });
});
