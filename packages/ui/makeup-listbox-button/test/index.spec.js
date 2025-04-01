import { test, expect } from "@playwright/test";

test.describe("given a listbox-button for manual selection", function () {
  let containerEl;
  let hostBtn;
  let contentEl;
  let OptionsEl;
  let firstOptionEl;
  let secondOptionEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-listbox-button/index.html");

    containerEl = page.locator(".listbox-button[data-makeup-auto-select='false']").first();
    hostBtn = containerEl.locator("button");
    contentEl = containerEl.locator(".listbox-button__listbox");
    OptionsEl = contentEl.locator(".listbox-button__options");
    firstOptionEl = contentEl.locator(".listbox-button__option").first();
    secondOptionEl = contentEl.locator(".listbox-button__option").nth(1);
  });

  test.describe("for unselected variant", async function () {
    test("should have the correct initial state", async function () {
      expect(containerEl).toBeTruthy();
      await expect(hostBtn).toHaveAttribute("aria-haspopup", "listbox");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
      await expect(OptionsEl).toHaveAttribute("role", "listbox");
      await expect(firstOptionEl).toHaveAttribute("role", "option");
    });

    test("should expand on host click", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should close on host clicking twice", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should use valid aria on selection", async function () {
      await hostBtn.click();
      await firstOptionEl.click();
      await expect(firstOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should not expand on host focus", async function () {
      await hostBtn.focus();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should expand on host using kb [space] key", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
    });

    test("should expand on host using kb [enter] key", async function () {
      await hostBtn.focus();
      await hostBtn.press("Enter");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
    });

    test("should dismiss content on [escape] key", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await hostBtn.press("Escape");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should select using kb", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
      await firstOptionEl.press("Space"); // to select
      await expect(firstOptionEl).toHaveAttribute("aria-selected", "true");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should select second item using arrow down", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await contentEl.press("ArrowDown");
      await secondOptionEl.press("Space"); // to select
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should not focus on disabled option", async function () {
      const disabledOptionEl = await contentEl.locator(".listbox-button__option[aria-disabled='true']").first();
      await expect(disabledOptionEl).not.toBeFocused();
    });
  });
});

test.describe("given a listbox-button for automatic selection", function () {
  let containerEl;
  let hostBtn;
  let contentEl;
  let OptionsEl;
  let firstOptionEl;
  let secondOptionEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-listbox-button/index.html");

    containerEl = page.locator(".listbox-button[data-makeup-auto-select='true']").nth(3);
    hostBtn = containerEl.locator("button");
    contentEl = containerEl.locator(".listbox-button__listbox");
    OptionsEl = contentEl.locator(".listbox-button__options");
    firstOptionEl = contentEl.locator(".listbox-button__option").first();
    secondOptionEl = contentEl.locator(".listbox-button__option").nth(1);
  });

  test.describe("for un selected variant", async function () {
    test("should have the correct initial state", async function () {
      expect(containerEl).toBeTruthy();
      await expect(hostBtn).toHaveAttribute("aria-haspopup", "listbox");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
      await expect(OptionsEl).toHaveAttribute("role", "listbox");
      await expect(firstOptionEl).toHaveAttribute("role", "option");
    });

    test("should expand on host click", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should close on host clicking twice", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    // TODO: shouldn't first item be selected by default in automatic?
    test("should use valid aria on selection", async function () {
      await hostBtn.click();
      await expect(secondOptionEl).toBeVisible();
      await secondOptionEl.click();
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should not expand on host focus", async function () {
      await hostBtn.focus();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should expand on host using kb [space] key", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
    });

    test("should expand on host using kb [enter] key", async function () {
      await hostBtn.focus();
      await hostBtn.press("Enter");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
    });

    test("should dismiss content on [escape] key", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await hostBtn.press("Escape");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should auto select using kb arrow down", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await expect(contentEl).toBeVisible();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await contentEl.press("ArrowDown");
      await expect(secondOptionEl).toHaveAttribute("aria-selected", "true");
    });

    test("should not focus on disabled option", async function () {
      const disabledOptionEl = await contentEl.locator(".listbox-button__option[aria-disabled='true']").first();
      await expect(disabledOptionEl).not.toBeFocused();
    });
  });
});
