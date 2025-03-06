import { test, expect } from "@playwright/test";

test.describe("Floating Label Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with the floating label component
    await page.goto("/ui/makeup-floating-label/index.html");
  });

  test("should show inline label for empty input and floating label for filled input", async ({ page }) => {
    // Check first name input with empty value
    const firstNameLabel = page.locator('label[for="firstname"]');
    await expect(firstNameLabel).toHaveClass(/floating-label__label--inline/);

    // Fill the first name input and check label position
    await page.fill("#firstname", "John");
    await expect(firstNameLabel).not.toHaveClass(/floating-label__label--inline/);

    // Clear the input and check label returns to inline
    await page.fill("#firstname", "");
    // shift focus to another element to trigger blur event
    await page.click("h1");
    await expect(firstNameLabel).toHaveClass(/floating-label__label--inline/);
  });

  test("should show focus state when input is focused", async ({ page }) => {
    const firstNameLabel = page.locator('label[for="firstname"]');

    // Focus the input and check focus class is added
    await page.focus("#firstname");
    await expect(firstNameLabel).toHaveClass(/floating-label__label--focus/);
    await expect(firstNameLabel).not.toHaveClass(/floating-label__label--inline/);

    // Click elsewhere to blur the input and check focus class is removed
    await page.click("h1");
    await expect(firstNameLabel).not.toHaveClass(/floating-label__label--focus/);
    await expect(firstNameLabel).toHaveClass(/floating-label__label--inline/);
  });

  test("should show placeholder only when input is focused", async ({ page }) => {
    // Check last name input which has a placeholder
    await page.focus("#lastname");

    // Check that placeholder is visible when focused
    const placeholderValue = await page.getAttribute("#lastname", "placeholder");
    expect(placeholderValue).toBe("placeholder text");

    // Blur the input and check that placeholder is not visible
    await page.click("h1");
    const placeholderAfterBlur = await page.getAttribute("#lastname", "placeholder");
    expect(placeholderAfterBlur).toBeNull();
  });

  test("should work correctly with select elements", async ({ page }) => {
    const countryLabel = page.locator('label[for="country"]');

    // Initially, label should be inline if no option is selected
    await expect(countryLabel).toHaveClass(/floating-label__label--inline/);

    // Focus the select and check label position
    await page.focus("#country");
    await expect(countryLabel).toHaveClass(/floating-label__label--focus/);
    await expect(countryLabel).not.toHaveClass(/floating-label__label--inline/);

    // Select an option
    await page.selectOption("#country", "USA");

    // Blur the select and check label remains floated because an option is selected
    await page.click("h1");
    await expect(countryLabel).not.toHaveClass(/floating-label__label--inline/);
    await expect(countryLabel).not.toHaveClass(/floating-label__label--focus/);
  });

  test("should handle form refresh", async ({ page }) => {
    // Fill an input
    await page.fill("#firstname", "John");

    // Click the refresh button
    await page.click("#refresh");

    // Check that label is adjusted correctly
    await expect(page.locator('label[for="firstname"]')).not.toHaveClass(/floating-label__label--inline/);
  });

  test("should show invalid state when input is invalidated", async ({ page }) => {
    const firstNameLabel = page.locator('label[for="firstname"]');

    // Click the invalidate button
    await page.click("#invalidate");

    // Check that invalid class is added
    await expect(firstNameLabel).toHaveClass(/floating-label__label--invalid/);

    // Click the validate button
    await page.click("#validate");

    // Check that invalid class is removed
    await expect(firstNameLabel).not.toHaveClass(/floating-label__label--invalid/);
  });

  test("should show disabled state when input is disabled", async ({ page }) => {
    const firstNameLabel = page.locator('label[for="firstname"]');

    // Click the disable button
    await page.click("#disable");

    // Check that disabled class is added
    await expect(firstNameLabel).toHaveClass(/floating-label__label--disabled/);

    // Check that input is actually disabled
    await expect(page.locator("#firstname")).toBeDisabled();

    // Click the enable button
    await page.click("#enable");

    // Check that disabled class is removed
    await expect(firstNameLabel).not.toHaveClass(/floating-label__label--disabled/);

    // Check that input is enabled
    await expect(page.locator("#firstname")).toBeEnabled();
  });
});
