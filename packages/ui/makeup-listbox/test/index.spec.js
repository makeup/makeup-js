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

    containerEl = page.locator(".listbox").nth(3);
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

test.describe("given a listbox with groups", function () {
  let containerEl;
  let OptionsEl;
  let firstOptionEl;
  let secondOptionEl;
  let firstGroupTitleEl;
  let secondGroupTitleEl;
  let listbox;
  let fourthElement;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-listbox/index.html");
  });

  test.describe("for unselected variant", async function () {
    test.beforeEach(async ({ page }) => {
      containerEl = page.locator("#groups");
      listbox = await containerEl.getByRole("listbox");
      OptionsEl = containerEl.locator(".listbox__options");
      firstOptionEl = OptionsEl.getByRole("option").first();
      secondOptionEl = OptionsEl.getByRole("option").nth(1);
      firstGroupTitleEl = containerEl.locator(".listbox__group-title").first();
      secondGroupTitleEl = containerEl.locator(".listbox__group-title").nth(1);
      fourthElement = OptionsEl.getByRole("option").nth(3);
    });

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
      const fourthOptionEl = OptionsEl.getByRole("option").nth(3);
      await OptionsEl.focus();
      await firstOptionEl.press("ArrowDown");
      await secondGroupTitleEl.press("ArrowDown");
      const disabledOptionEl = await OptionsEl.locator(".listbox__option[aria-disabled='true']").first();
      await expect(disabledOptionEl).not.toBeFocused();
      await expect(fourthOptionEl).toHaveClass("listbox__option listbox__option--active");
    });
  });

  test.describe("for listbox options presented as fixed columns", async function () {
    test.beforeEach(async ({ page }) => {
      containerEl = page.locator("#fixed-columns");
      listbox = await containerEl.getByRole("listbox");
      OptionsEl = containerEl.locator(".listbox__options");
      firstOptionEl = OptionsEl.getByRole("option").first();
      secondOptionEl = OptionsEl.getByRole("option").nth(1);
      firstGroupTitleEl = containerEl.locator(".listbox__group-title").first();
      secondGroupTitleEl = containerEl.locator(".listbox__group-title").nth(1);
      fourthElement = OptionsEl.getByRole("option").nth(3);
    });
    test("should auto select using kb arrow down", async function () {
      await OptionsEl.focus();
      await OptionsEl.press("ArrowDown");
      await OptionsEl.press("ArrowDown");
      fourthElement = OptionsEl.getByRole("option").nth(3);
      await expect(fourthElement).toHaveAttribute("aria-selected", "true");
      const fourthElementId = await fourthElement.getAttribute("id");
      await expect(listbox).toHaveAttribute("aria-activedescendant", fourthElementId);
    });
  });
});
