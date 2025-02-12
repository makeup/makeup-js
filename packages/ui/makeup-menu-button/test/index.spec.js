import { test, expect } from "@playwright/test";

test.describe("given a menu button", function () {
  let containerEl;
  let hostBtn;
  let contentEl;
  let menuItemsEl;
  let firstMenuItemEl;
  let secondMenuItemEl;

  test.describe("for single-select default variant", async function () {
    test.beforeEach(async ({ page }) => {
      await page.goto("/ui/makeup-menu-button/index.html");

      containerEl = page.locator(".menu-button").first();
      hostBtn = containerEl.locator("button");
      contentEl = containerEl.locator(".menu-button__menu");
      menuItemsEl = contentEl.locator(".menu-button__items");
      firstMenuItemEl = contentEl.locator(".menu-button__item").first();
      secondMenuItemEl = contentEl.locator(".menu-button__item").nth(1);
    });

    test("should have the correct initial state", async function () {
      expect(containerEl).toBeTruthy();
      await expect(hostBtn).toHaveAttribute("aria-haspopup", "true");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(hostBtn).toHaveAttribute("aria-controls");
      await expect(contentEl).not.toBeVisible();
      await expect(menuItemsEl).toHaveAttribute("role", "menu");
      await expect(firstMenuItemEl).toHaveAttribute("role", "menuitem");
    });

    test("should expand on host click", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should use valid aria on selection", async function () {
      await hostBtn.click();
      await firstMenuItemEl.click();
      await expect(firstMenuItemEl).toHaveAttribute("tabindex", "0");
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
      await firstMenuItemEl.press("Space"); // to select
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should not focus on disabled item", async function () {
      const disabledMenuItemEl = await contentEl.locator(".menu-button__item[aria-disabled='true']").first();
      await expect(disabledMenuItemEl).not.toBeFocused();
    });
  });

  test.describe("for single-select radio variant", async function () {
    test.beforeEach(async ({ page }) => {
      await page.goto("/ui/makeup-menu-button/index.html");

      containerEl = page.locator(".menu-button").nth(1);
      hostBtn = containerEl.locator("button");
      contentEl = containerEl.locator(".menu-button__menu");
      menuItemsEl = contentEl.locator(".menu-button__items");
      firstMenuItemEl = contentEl.locator(".menu-button__item").first();
      secondMenuItemEl = contentEl.locator(".menu-button__item").nth(1);
    });

    test("should have the correct initial state", async function () {
      expect(containerEl).toBeTruthy();
      await expect(hostBtn).toHaveAttribute("aria-haspopup", "true");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(hostBtn).toHaveAttribute("aria-controls");
      await expect(contentEl).not.toBeVisible();
      await expect(menuItemsEl).toHaveAttribute("role", "menu");
      await expect(firstMenuItemEl).toHaveAttribute("role", "menuitemradio");
    });

    test("should expand on host click", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should use valid aria on selection", async function () {
      await hostBtn.click();
      await firstMenuItemEl.click();
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "true");
      await expect(firstMenuItemEl).toHaveAttribute("tabindex", "0");
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
      await firstMenuItemEl.press("Space"); // to select
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "true");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should select second item using arrow down", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await contentEl.press("ArrowDown");
      await secondMenuItemEl.press("Space"); // to select
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "true");
    });

    test("should change selection", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await firstMenuItemEl.press("Space");
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "true");

      await hostBtn.press("Space");
      await contentEl.press("ArrowDown");
      await secondMenuItemEl.press("Space");
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "false");
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "true");
    });

    test("should not focus on disabled item", async function () {
      const disabledMenuItemEl = await contentEl.locator(".menu-button__item[aria-disabled='true']").first();
      await expect(disabledMenuItemEl).not.toBeFocused();
    });
  });

  test.describe("for multi-select variant", async function () {
    test.beforeEach(async ({ page }) => {
      await page.goto("/ui/makeup-menu-button/index.html");

      containerEl = page.locator(".menu-button").nth(7);
      hostBtn = containerEl.locator("button");
      contentEl = containerEl.locator(".menu-button__menu");
      menuItemsEl = contentEl.locator(".menu-button__items");
      firstMenuItemEl = contentEl.locator(".menu-button__item").first();
      secondMenuItemEl = contentEl.locator(".menu-button__item").nth(1);
    });

    test("should have the correct initial state with 2 items checked", async function () {
      expect(containerEl).toBeTruthy();
      await expect(hostBtn).toHaveAttribute("aria-haspopup", "true");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
      await expect(hostBtn).toHaveAttribute("aria-controls");
      await expect(contentEl).not.toBeVisible();
      await expect(menuItemsEl).toHaveAttribute("role", "menu");
      await expect(firstMenuItemEl).toHaveAttribute("role", "menuitemcheckbox");
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "true");
    });

    test("should expand on host click", async function () {
      await hostBtn.click();
      await expect(hostBtn).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should use valid aria on selection", async function () {
      await hostBtn.click();
      await firstMenuItemEl.click();
      // unchek already selected item
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "false");
      await expect(firstMenuItemEl).toHaveAttribute("tabindex", "0");
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
      await firstMenuItemEl.press("Space"); // to select
      // uncheck already selected
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "false");
      await expect(hostBtn).toHaveAttribute("aria-expanded", "false");
    });

    test("should select second item using arrow down", async function () {
      await hostBtn.focus();
      await hostBtn.press("Space");
      await contentEl.press("ArrowDown");
      await secondMenuItemEl.press("Space"); // to select
      // uncheck already selected
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "false");
    });

    test("should not focus on disabled item", async function () {
      const disabledMenuItemEl = await contentEl.locator(".menu-button__item[aria-disabled='true']").first();
      await expect(disabledMenuItemEl).not.toBeFocused();
    });
  });
});
