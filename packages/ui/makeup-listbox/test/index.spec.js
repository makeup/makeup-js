import { test, expect } from "@playwright/test";

test.describe("given a listbox for manual selection", function () {
  let containerEl;
  let OptionsEl;
  let firstOptionEl;
  let secondOptionEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-listbox/index.html");

    containerEl = page.locator(".listbox[data-makeup-auto-select='false']").first();
    OptionsEl = containerEl.locator(".listbox__options");
    firstOptionEl = OptionsEl.getByRole("option").first();
    secondOptionEl = OptionsEl.getByRole("option").nth(1);
  });

  test.describe("for unselected variant", async function () {
    test("should have the correct initial state", async function () {
      expect(containerEl).toBeTruthy();
      await expect(OptionsEl).toHaveAttribute("role", "listbox");
      await expect(OptionsEl).toHaveAttribute("aria-activedescendant");
      await expect(firstOptionEl).toHaveAttribute("role", "option");
    });

    test("should use valid aria on option click", async function () {
      await firstOptionEl.click();
      await expect(firstOptionEl).toHaveAttribute("aria-selected", "true");
      await expect(firstOptionEl).toHaveAttribute("aria-checked", "true");
    });

    test("should select using kb", async function () {
      await OptionsEl.focus();
      await firstOptionEl.press("Space"); // to select
      await expect(firstOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should select second item using arrow down", async function () {
      await OptionsEl.focus();
      await firstOptionEl.press("ArrowDown");
      await secondOptionEl.press("Space"); // to select
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should not focus on disabled option", async function () {
      // todo: fix this test
      const disabledOptionEl = await OptionsEl.locator(".listbox__option[aria-disabled='true']").first();
      await expect(disabledOptionEl).not.toBeFocused();
    });
  });
});

test.describe("given a listbox for automatic selection", function () {
  let containerEl;
  let OptionsEl;
  let firstOptionEl;
  let secondOptionEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-listbox/index.html");

    containerEl = page.locator(".listbox").nth(2);
    OptionsEl = containerEl.locator(".listbox__options");
    firstOptionEl = OptionsEl.getByRole("option").first();
    secondOptionEl = OptionsEl.getByRole("option").nth(1);
  });

  test.describe("for unselected variant", async function () {
    test("should have the correct initial state", async function () {
      expect(containerEl).toBeTruthy();
      await expect(OptionsEl).toHaveAttribute("role", "listbox");
      await expect(firstOptionEl).toHaveAttribute("role", "option");
    });

    test("should use valid aria on selection", async function () {
      await secondOptionEl.click();
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should auto select using kb arrow down", async function () {
      await OptionsEl.focus();
      await firstOptionEl.press("ArrowDown");
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should not focus on disabled option", async function () {
      const disabledOptionEl = await OptionsEl.locator(".listbox__option[aria-disabled='true']").first();
      await expect(disabledOptionEl).not.toBeFocused();
    });
  });
});
