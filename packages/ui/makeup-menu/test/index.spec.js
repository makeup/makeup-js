import { test, expect } from "@playwright/test";

test.describe("given a menu", function () {
  let containerEl;
  let menuItemsEl;
  let firstMenuItemEl;
  let secondMenuItemEl;

  test.describe("for single-select variant", async function () {
    test.beforeEach(async ({ page }) => {
      await page.goto("/ui/makeup-menu/index.html");

      containerEl = page.locator(".menu").nth(1);
      menuItemsEl = containerEl.locator(".menu__items");
      firstMenuItemEl = menuItemsEl.locator(".menu__item").first();
      secondMenuItemEl = menuItemsEl.locator(".menu__item").nth(1);
    });

    test("should have the initial state with 2nd item checked", async function () {
      expect(containerEl).toBeTruthy();
      await expect(menuItemsEl).toHaveAttribute("role", "menu");
      await expect(firstMenuItemEl).toHaveAttribute("role", "menuitemradio");
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "false");
    });

    test("should select first item on click", async function () {
      await firstMenuItemEl.click();
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "true");
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "false");
    });

    test("should select second item on click", async function () {
      await secondMenuItemEl.click();
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "true");
    });

    test("should not focus on disabled item", async function () {
      const disabledMenuItemEl = menuItemsEl.locator(".menu__item[aria-disabled='true']").first();
      await expect(disabledMenuItemEl).not.toBeFocused();
    });

    test("should navigate menu items using arrow keys", async function () {
      await firstMenuItemEl.focus();
      await firstMenuItemEl.press("ArrowDown");
      await expect(secondMenuItemEl).toBeFocused();
      await secondMenuItemEl.press("ArrowUp");
      await expect(firstMenuItemEl).toBeFocused();
    });
  });

  test.describe("for multi-select variant", async function () {
    test.beforeEach(async ({ page }) => {
      await page.goto("/ui/makeup-menu/index.html");

      containerEl = page.locator(".menu").nth(4);
      menuItemsEl = containerEl.locator(".menu__items");
      firstMenuItemEl = menuItemsEl.locator(".menu__item").first();
      secondMenuItemEl = menuItemsEl.locator(".menu__item").nth(1);
    });

    test("should have the correct initial state with 1 item checked", async function () {
      expect(containerEl).toBeTruthy();
      await expect(menuItemsEl).toHaveAttribute("role", "menu");
      await expect(firstMenuItemEl).toHaveAttribute("role", "menuitemcheckbox");
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "false");
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "true");
    });

    test("selecting first item should have multi item selected", async function () {
      await firstMenuItemEl.click();
      await expect(firstMenuItemEl).toHaveAttribute("aria-checked", "true");
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "true");
    });

    test("should deselect second item on click", async function () {
      await secondMenuItemEl.click();
      await expect(secondMenuItemEl).toHaveAttribute("aria-checked", "false");
    });

    test("should not focus on disabled item", async function () {
      const disabledMenuItemEl = menuItemsEl.locator(".menu__item[aria-disabled='true']").first();
      await expect(disabledMenuItemEl).not.toBeFocused();
    });

    test("should navigate menu items using arrow keys", async function () {
      await firstMenuItemEl.focus();
      await firstMenuItemEl.press("ArrowDown");
      await expect(secondMenuItemEl).toBeFocused();
      await secondMenuItemEl.press("ArrowUp");
      await expect(firstMenuItemEl).toBeFocused();
    });
  });
});
