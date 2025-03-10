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

test.describe("given a listbox with headers", function () {
  let containerEl;
  let OptionsEl;
  let firstOptionEl;
  let secondOptionEl;
  let firstHeaderEl;
  let secondHeaderEl;
  let listbox;
  let fourthElement;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-listbox/index.html");
  });

  test.describe("for unselected variant", async function () {
    test.beforeEach(async ({ page }) => {
      containerEl = page.locator(".listbox").nth(6);
      listbox = await containerEl.getByRole("listbox");
      OptionsEl = containerEl.locator(".listbox__options");
      firstOptionEl = OptionsEl.getByRole("option").first();
      secondOptionEl = OptionsEl.getByRole("option").nth(1);
      firstHeaderEl = containerEl.getByRole("presentation").first();
      secondHeaderEl = containerEl.getByRole("presentation").nth(1);
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
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "false");
    });

    test("should not focus on disabled option", async function () {
      const fourthOptionEl = OptionsEl.getByRole("option").nth(3);
      await OptionsEl.focus();
      await firstOptionEl.press("ArrowDown");
      await secondHeaderEl.press("ArrowDown");
      const disabledOptionEl = await OptionsEl.locator(".listbox__option[aria-disabled='true']").first();
      await expect(disabledOptionEl).not.toBeFocused();
      await expect(fourthOptionEl).toHaveClass("listbox__option listbox__option--active");
    });

    test("should have aria-describedby value that references the header element", async function () {
      const firstHeaderId = await firstHeaderEl.getAttribute("id");
      const secondHeaderId = await secondHeaderEl.getAttribute("id");
      await expect(firstOptionEl).toHaveAttribute("aria-describedby", firstHeaderId);
      await expect(secondOptionEl).toHaveAttribute("aria-describedby", firstHeaderId);
      const thirdOptionEl = OptionsEl.getByRole("option").nth(2);
      await expect(thirdOptionEl).toHaveAttribute("aria-describedby", firstHeaderId);
      const fourthOptionEl = OptionsEl.getByRole("option").nth(3);
      await expect(fourthOptionEl).toHaveAttribute("aria-describedby", secondHeaderId);
      const fifthOptionEl = OptionsEl.getByRole("option").nth(4);
      await expect(fifthOptionEl).toHaveAttribute("aria-describedby", secondHeaderId);
      const sixthOptionEl = OptionsEl.getByRole("option").nth(5);
      await expect(sixthOptionEl).toHaveAttribute("aria-describedby", secondHeaderId);
    });
  });

  test.describe("for selected variant with automatic selection for grouped headers", async function () {
    test.beforeEach(async ({ page }) => {
      containerEl = page.locator(".listbox").nth(7);
      listbox = await containerEl.getByRole("listbox");
      OptionsEl = containerEl.locator(".listbox__options");
      firstOptionEl = OptionsEl.getByRole("option").first();
      secondOptionEl = OptionsEl.getByRole("option").nth(1);
      firstHeaderEl = containerEl.getByRole("presentation").first();
      secondHeaderEl = containerEl.getByRole("presentation").nth(1);
      fourthElement = OptionsEl.getByRole("option").nth(3);
    });
    test("should use valid aria on selection", async function () {
      await expect(firstOptionEl).toHaveAttribute("aria-selected", "true");
      await secondOptionEl.click();
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should auto select using kb arrow down", async function () {
      await OptionsEl.focus();
      await firstOptionEl.press("ArrowDown");
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });
  });

  test.describe("for listbox options presented as columns", async function () {
    test.beforeEach(async ({ page }) => {
      containerEl = page.locator(".listbox").nth(8);
      listbox = await containerEl.getByRole("listbox");
      OptionsEl = containerEl.locator(".listbox__options");
      firstOptionEl = OptionsEl.getByRole("option").first();
      secondOptionEl = OptionsEl.getByRole("option").nth(1);
      firstHeaderEl = containerEl.getByRole("presentation").first();
      secondHeaderEl = containerEl.getByRole("presentation").nth(1);
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
