import { test, expect } from "@playwright/test";

test.describe("given a combobox", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page containing the comboboxes
    await page.goto("/docs/ui/makeup-combobox/index.html");
  });

  test("should render with correct structure", async ({ page }) => {
    // Check the first combobox structure
    const combobox = page.locator(".combobox").first();
    await expect(combobox).toBeVisible();
    await expect(combobox.locator('input[role="combobox"]')).toBeVisible();
    await expect(combobox.locator(".combobox__listbox")).toBeHidden();
    await expect(combobox.locator(".combobox__option").first()).toHaveRole("option");
  });

  test("should have correct ARIA attributes", async ({ page }) => {
    const combobox = page.locator(".combobox").first();
    const input = combobox.locator('input[role="combobox"]').first();

    // Check initial ARIA attributes
    await expect(input).toHaveAttribute("role", "combobox");
    await expect(input).toHaveAttribute("aria-haspopup", "listbox");
    await expect(input).toHaveAttribute("aria-owns");
    await expect(input).toHaveAttribute("aria-expanded", "false");

    // Check ARIA attributes after interaction
    await input.click();
    await input.press("ArrowDown");

    await expect(input).toHaveAttribute("aria-expanded", "true");

    // Should have aria-activedescendant attribute pointing to the active option
    await expect(input).toHaveAttribute("aria-activedescendant");
  });

  test.describe("manual selection mode", () => {
    test("should expand options on input focus", async ({ page }) => {
      const combobox = page.locator('[data-makeup-auto-select="false"]').first();
      const input = combobox.locator('input[role="combobox"]');
      const listbox = combobox.locator(".combobox__listbox");

      await input.click();
      await expect(listbox).toBeVisible();
      await expect(combobox).toHaveClass(/combobox--expanded/);
    });

    test("should navigate options with arrow keys", async ({ page }) => {
      const combobox = page.locator('[data-makeup-auto-select="false"]').first();
      const input = combobox.locator('input[role="combobox"]');

      await input.click();
      await input.press("ArrowDown");

      // First option should be active
      const firstOption = combobox.locator(".combobox__option").first();
      await expect(firstOption).toHaveClass(/combobox__option--active/);

      // Input should not be updated yet (manual selection mode)
      await expect(input).not.toHaveValue("Nintendo (NES)");
    });

    test("should select option with Enter key", async ({ page }) => {
      const combobox = page.locator('[data-makeup-auto-select="false"]').first();
      const input = combobox.locator('input[role="combobox"]');

      await input.click();
      await input.press("ArrowDown");
      await input.press("ArrowDown");
      await input.press("Enter");

      // Input should be updated with selected option text
      await expect(input).toHaveValue("Nintendo 64");

      // Listbox should be collapsed after selection
      await expect(combobox.locator(".combobox__listbox")).toBeHidden();
    });

    test("should close dropdown with Escape key", async ({ page }) => {
      const combobox = page.locator('[data-makeup-auto-select="false"]').first();
      const input = combobox.locator('input[role="combobox"]');
      const listbox = combobox.locator(".combobox__listbox");

      await input.click();
      await expect(listbox).toBeVisible();

      await input.press("Escape");
      await expect(listbox).toBeHidden();
    });

    test("should select option with mouse click", async ({ page }) => {
      const combobox = page.locator('[data-makeup-auto-select="false"]').first();
      const input = combobox.locator('input[role="combobox"]');

      await input.click();

      // Click the third option
      await combobox.locator(".combobox__option >> nth=2").click();

      // Input should be updated with selected option text
      await expect(input).toHaveValue("Sega Dreamcast");

      // Listbox should be collapsed after selection
      await expect(combobox.locator(".combobox__listbox")).toBeHidden();
    });
  });

  test.describe("automatic selection mode", () => {
    test("should automatically update input on navigation", async ({ page }) => {
      // Second combobox doesn't have data-makeup-auto-select attribute (defaults to true)
      const combobox = page.locator('h2:has-text("Automatic Selection") + p + form .combobox');
      const input = combobox.locator('input[role="combobox"]').first();

      await input.click();
      await input.press("ArrowDown");

      // Input should be automatically updated with first option's text
      await expect(input).toHaveValue("Nintendo (NES)");

      await input.press("ArrowDown");

      // Input should update when navigating to second option
      await expect(input).toHaveValue("Nintendo 64");
    });
  });

  test.describe("list autocomplete functionality", () => {
    test("should filter options based on input", async ({ page }) => {
      // Third combobox has aria-autocomplete="list"
      const combobox = page.locator('h2:has-text("Manual Selection with List Autocomplete") + p + form .combobox');
      const input = combobox.locator('input[role="combobox"]');

      await input.click();
      await input.fill("Sega");

      // Should show only Sega options
      const visibleOptions = combobox.locator(".combobox__option:not([hidden])");
      await expect(visibleOptions).toHaveCount(3);

      // Verify specific options are visible
      await expect(combobox.locator('.combobox__option:has-text("Sega Dreamcast")').first()).toBeVisible();
      await expect(combobox.locator('.combobox__option:has-text("Sega Master System")').first()).toBeVisible();
      await expect(combobox.locator('.combobox__option:has-text("Sega Megadrive")').first()).toBeVisible();

      // Verify other options are hidden
      await expect(combobox.locator('.combobox__option:has-text("Nintendo")').first()).toBeHidden();
    });

    test("should reset filtering when input is cleared", async ({ page }) => {
      // Fourth combobox has aria-autocomplete="list" with autoSelect=true
      const combobox = page.locator('h2:has-text("Automatic Selection with List Autocomplete") + p + form .combobox');
      const input = combobox.locator('input[role="combobox"]');

      await input.click();
      await input.fill("Sony");

      // Should filter to Sony options
      await expect(combobox.locator(".combobox__option:not([hidden])").first()).toHaveText("Sony Playstation");

      // Clear the input
      await input.fill("");

      // All options should be visible again
      const allOptions = combobox.locator(".combobox__option");
      for (let i = 0; i < (await allOptions.count()); i++) {
        await expect(allOptions.nth(i)).toBeVisible();
      }
    });
  });
});
