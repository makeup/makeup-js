import { test, expect } from "@playwright/test";

test.describe("makeup-tabs", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ui/makeup-tabs/index.html");
  });

  test("should initialize with correct structure and first tab selected", async ({ page }) => {
    // Check auto-select tabs first set
    const autoSelectTablist = await page
      .locator('.tabs[data-makeup-auto-select="true"] .tabs__items[role="tablist"]')
      .first();
    await expect(autoSelectTablist).toBeVisible();

    // First tab should be selected
    const firstAutoTab = await page.locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]').first();
    await expect(firstAutoTab).toHaveAttribute("aria-selected", "true");

    // First panel should be visible
    const firstAutoPanel = await page.locator('.tabs[data-makeup-auto-select="true"] .tabs__panel').first();
    await expect(firstAutoPanel).toBeVisible();
    await expect(firstAutoPanel).not.toHaveAttribute("hidden");

    // Other panels should be hidden
    const otherAutoPanels = await page.locator('.tabs[data-makeup-auto-select="true"] .tabs__panel:not(:first-child)');
    for (const panel of await otherAutoPanels.all()) {
      await expect(panel).toHaveAttribute("hidden", "");
    }
  });

  test("should change selected tab on click (auto-select mode)", async ({ page }) => {
    // Click second tab in auto-select tab group
    const secondTab = await page
      .locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]:nth-child(2)')
      .first();
    await secondTab.click();

    // Second tab should be selected
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    // First tab should be deselected
    const firstTab = await page
      .locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]:nth-child(1)')
      .first();
    await expect(firstTab).toHaveAttribute("aria-selected", "false");

    const panels = await page.locator('.tabs[data-makeup-auto-select="true"] .tabs__panel').all();
    // Second panel should be visible
    const secondPanel = panels[1];
    await expect(secondPanel).toBeVisible();
    await expect(secondPanel).not.toHaveAttribute("hidden");

    // First panel should be hidden
    const firstPanel = panels[0];
    await expect(firstPanel).toHaveAttribute("hidden", "");
  });

  test("should change selected tab on click (manual-select mode)", async ({ page }) => {
    // Click second tab in manual-select tab group
    const secondTab = await page
      .locator('.tabs[data-makeup-auto-select="false"] .tabs__item[role="tab"]:nth-child(2)')
      .first();
    await secondTab.click();

    // Second tab should be selected
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    const panels = await page.locator('.tabs[data-makeup-auto-select="false"] .tabs__panel').all();

    // Second panel should be visible
    const secondPanel = panels[1];
    await expect(secondPanel).toBeVisible();
    await expect(secondPanel).not.toHaveAttribute("hidden");
  });

  test("should navigate tabs with keyboard in auto-select mode", async ({ page }) => {
    // Focus on the first tab
    const firstTab = await page.locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]').first();
    await firstTab.focus();

    // Press right arrow key to move to next tab
    await page.keyboard.press("ArrowRight");

    // Second tab should be selected automatically
    const secondTab = await page
      .locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]:nth-child(2)')
      .first();
    await expect(secondTab).toHaveAttribute("aria-selected", "true");

    const panels = await page.locator('.tabs[data-makeup-auto-select="true"] .tabs__panel').all();

    // Second panel should be visible
    const secondPanel = panels[1];
    await expect(secondPanel).toBeVisible();
    await expect(secondPanel).not.toHaveAttribute("hidden");

    // Continue to the third tab
    await page.keyboard.press("ArrowRight");

    // Third tab should be selected
    const thirdTab = await page
      .locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]:nth-child(3)')
      .first();
    await expect(thirdTab).toHaveAttribute("aria-selected", "true");

    // Wrap around to the first tab
    await page.keyboard.press("ArrowRight");
    await expect(firstTab).toHaveAttribute("aria-selected", "true");

    // Test left arrow key
    await page.keyboard.press("ArrowLeft");
    await expect(thirdTab).toHaveAttribute("aria-selected", "true");
  });

  test("should navigate tabs with keyboard Space in manual-select mode", async ({ page }) => {
    // Focus on the first tab in manual mode
    const firstManualTab = await page.locator('.tabs[data-makeup-auto-select="false"] .tabs__item[role="tab"]').first();
    await firstManualTab.focus();

    // Press right arrow to move focus (but not selection)
    await page.keyboard.press("ArrowRight");

    // Second tab should have focus but not be selected yet
    const secondManualTab = await page
      .locator('.tabs[data-makeup-auto-select="false"] .tabs__item[role="tab"]:nth-child(2)')
      .first();

    // First tab should still be selected
    await expect(firstManualTab).toHaveAttribute("aria-selected", "true");

    // Press space to select the second tab
    await page.keyboard.press("Space");

    // Now second tab should be selected
    await expect(secondManualTab).toHaveAttribute("aria-selected", "true");

    // Second panel should be visible
    const panels = await page.locator('.tabs[data-makeup-auto-select="false"] .tabs__panel').all();
    const secondManualPanel = panels[1];
    await expect(secondManualPanel).toBeVisible();
    await expect(secondManualPanel).not.toHaveAttribute("hidden");
  });

  test("should have proper accessibility attributes", async ({ page }) => {
    // Check tab and panel relationships through ARIA attributes
    const tabs = await page.locator('.tabs__item[role="tab"]').all();

    for (const tab of tabs) {
      const tabId = await tab.getAttribute("id");
      const controlsId = await tab.getAttribute("aria-controls");

      // Each tab should control a panel
      await expect(tab).toHaveAttribute("aria-controls");

      // Each panel should reference back to its tab
      const panel = page.locator(`#${controlsId}`);
      await expect(panel).toHaveAttribute("aria-labelledby", tabId);
      await expect(panel).toHaveAttribute("role", "tabpanel");
    }

    // Check that tablist has proper role
    const firstTabList = page.locator(".tabs__items").first();
    await expect(firstTabList).toHaveAttribute("role", "tablist");
  });

  test("should dispatch custom events when tab changes", async ({ page }) => {
    // Listen for custom event
    await page.evaluate(() => {
      window.lastEvent = null;
      document
        .querySelector('.tabs[data-makeup-auto-select="true"]')
        .addEventListener("makeup-tabs-change", (event) => {
          window.lastEvent = {
            fromIndex: event.detail.fromIndex,
            toIndex: event.detail.toIndex,
          };
        });
    });

    // Click second tab
    const secondTab = await page
      .locator('.tabs[data-makeup-auto-select="true"] .tabs__item[role="tab"]:nth-child(2)')
      .first();
    await secondTab.click();

    // Check that event was fired with correct details
    const eventData = await page.evaluate(() => window.lastEvent);
    expect(eventData.fromIndex).toBe(0);
    expect(eventData.toIndex).toBe(1);
  });
});
