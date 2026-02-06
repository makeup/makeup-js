import { test, expect } from "@playwright/test";

test.describe("given an expander with auto collapse off", () => {
  let containerEl;
  let hostEl;
  let contentEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/core/makeup-expander/index.html");

    containerEl = page.locator(".expander--click-only").first();
    hostEl = containerEl.locator(".expander__host");
    contentEl = containerEl.locator(".expander__content");
  });

  test("should have the correct initial state", async () => {
    expect(containerEl).toBeTruthy();
    await expect(hostEl).toHaveAttribute("aria-expanded", "false");
    await expect(contentEl).not.toBeVisible();
  });

  test("should expand on host click", async () => {
    await hostEl.click();
    await expect(hostEl).toHaveAttribute("aria-expanded", "true");
    await expect(contentEl).toBeVisible();
  });

  test("should collapse on host clicking twice", async () => {
    await hostEl.click();
    await expect(hostEl).toHaveAttribute("aria-expanded", "true");
    await expect(contentEl).toBeVisible();

    await hostEl.click();
    await expect(hostEl).toHaveAttribute("aria-expanded", "false");
    await expect(contentEl).not.toBeVisible();
  });

  test("should expand on host using keyboard [Space] key", async () => {
    await hostEl.focus();
    await hostEl.press("Space");
    await expect(hostEl).toHaveAttribute("aria-expanded", "true");
    await expect(contentEl).toBeVisible();
  });

  test("should expand on host using keyboard [Enter] key", async () => {
    await hostEl.focus();
    await hostEl.press("Enter");
    await expect(hostEl).toHaveAttribute("aria-expanded", "true");
    await expect(contentEl).toBeVisible();
  });
});

test.describe("given an expander with auto collapse on", () => {
  test.describe("click-only expander", () => {
    let containerEl;
    let hostEl;
    let contentEl;

    test.beforeEach(async ({ page }) => {
      await page.goto("/core/makeup-expander/index.html");
      containerEl = page.locator(".expander--click-only.flyout").first();
      hostEl = containerEl.locator(".expander__host");
      contentEl = containerEl.locator(".expander__content");
    });

    test("should have the correct initial state", async () => {
      expect(containerEl).toBeTruthy();
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should expand on host click", async () => {
      await hostEl.click();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should collapse on clickout", async ({ page }) => {
      await hostEl.click();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");

      // Click outside the expander to trigger collapse
      await page.click("body", { position: { x: 10, y: 10 } });
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });
  });

  test.describe("focus-only expander", () => {
    let containerEl;
    let hostEl;
    let contentEl;
    let anotherEl;

    test.beforeEach(async ({ page }) => {
      await page.goto("/core/makeup-expander/index.html");
      containerEl = page.locator(".expander--focus-only").first();
      hostEl = containerEl.locator(".expander__host");
      contentEl = containerEl.locator(".expander__content");
      anotherEl = page.locator(".expander--click-only").first();
    });

    test("should have the correct initial state", async () => {
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should expand on host focus", async () => {
      await hostEl.focus();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should collapse on focus out", async ({ page }) => {
      await hostEl.focus();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");

      // Focus something else to trigger focusout
      await page.keyboard.press("Shift+Tab");
      // await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });
  });

  test.describe("focus-and-hover expander", () => {
    let containerEl;
    let hostEl;
    let contentEl;

    test.beforeEach(async ({ page }) => {
      await page.goto("/core/makeup-expander/index.html");
      containerEl = page.locator(".expander--focus-and-hover").first();
      hostEl = containerEl.locator(".expander__host");
      contentEl = containerEl.locator(".expander__content");
    });

    test("should have the correct initial state", async () => {
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should expand on host focus", async () => {
      await hostEl.focus();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should expand on host hover", async () => {
      await hostEl.hover();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should collapse on mouse out", async ({ page }) => {
      await hostEl.hover();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");

      // Move mouse away to trigger mouseout
      await page.mouse.move(10, 10);

      // Wait for the timeout (300ms in the code)
      await page.waitForTimeout(350);

      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });
  });

  test.describe("hover-only expander", () => {
    let containerEl;
    let hostEl;
    let contentEl;

    test.beforeEach(async ({ page }) => {
      await page.goto("/core/makeup-expander/index.html");
      containerEl = page.locator(".expander--hover-only").first();
      hostEl = containerEl.locator(".expander__host").first();
      contentEl = containerEl.locator(".expander__content");
    });

    test("should have the correct initial state", async () => {
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should expand on host hover", async () => {
      await hostEl.hover();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
    });

    test("should collapse on mouse out", async ({ page }) => {
      await hostEl.hover();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");

      // Move mouse away to trigger mouseout
      await page.mouse.move(10, 10);

      // Wait for the timeout (300ms in the code)
      await page.waitForTimeout(350);

      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
    });
  });

  test.describe("click-and-spacebar expander", () => {
    let containerEl;
    let hostEl;
    let contentEl;

    test.beforeEach(async ({ page }) => {
      await page.goto("/core/makeup-expander/index.html");
      containerEl = page.locator(".expander--click-and-spacebar").first();
      hostEl = containerEl.locator(".expander__host");
      contentEl = containerEl.locator(".expander__content");
    });

    test("should have the correct initial state", async () => {
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should expand on host click", async () => {
      await hostEl.click();
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });

    test("should expand on spacebar when focused", async () => {
      await hostEl.focus();
      await hostEl.press("Space");
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });
  });

  test.describe("stealth-only expander", () => {
    let containerEl;
    let hostEl;
    let contentEl;

    test.beforeEach(async ({ page }) => {
      await page.goto("/core/makeup-expander/index.html");
      containerEl = page.locator(".expander--stealth-only").first();
      hostEl = containerEl.locator(".expander__host");
      contentEl = containerEl.locator(".expander__content");
    });

    test("should have the correct initial state", async () => {
      await expect(hostEl).toHaveAttribute("aria-expanded", "false");
      await expect(contentEl).not.toBeVisible();
    });

    test("should expand on host click", async () => {
      await hostEl.press("Space");
      await expect(hostEl).toHaveAttribute("aria-expanded", "true");
      await expect(contentEl).toBeVisible();
    });
  });
});

test.describe("given an expander event handling", () => {
  let containerEl;
  let hostEl;
  let contentEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/core/makeup-expander/index.html");
    containerEl = page.locator(".expander--click-only").first();
    hostEl = containerEl.locator(".expander__host");
    contentEl = containerEl.locator(".expander__content");
  });

  test("should emit expander-expand event on expansion", async ({ page }) => {
    // Set up event listener
    await page.evaluate(() => {
      window.eventFired = false;
      document.querySelector(".expander--click-only").addEventListener("expander-expand", () => {
        window.eventFired = true;
      });
    });

    await hostEl.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.eventFired);
    expect(eventFired).toBe(true);
  });

  test("should emit expander-collapse event on collapse", async ({ page }) => {
    // First expand
    await hostEl.click();

    // Set up event listener
    await page.evaluate(() => {
      window.eventFired = false;
      document.querySelector(".expander--click-only").addEventListener("expander-collapse", () => {
        window.eventFired = true;
      });
    });

    // Collapse
    await hostEl.click();

    // Check if event was fired
    const eventFired = await page.evaluate(() => window.eventFired);
    expect(eventFired).toBe(true);
  });
});

// test.describe("given an expander with focus management", () => {
//   test("should focus first focusable element when expanded with focusManagement='focusable'", async ({ page }) => {
//     // Setup a custom expander with focusManagement option
//     await page.goto("/core/makeup-expander/index.html");

//     const container = page.locator(".expander--hover-only").first();
//     const hostEl = container.locator(".expander__host").first();
//     await hostEl.focus();
//     await page.keyboard.press("Tab");
//     await page.keyboard.press("Enter");
//     const stealthHost = container.locator(".expander--stealth-only .expander__host").first();
//     const firstLink = stealthHost.locator(".expander__content a").first();
//     console.log(document.activeElement);
//     // Check if the first focusable element received focus
//     await expect(firstLink).toBeFocused();
//   });
// });

test.describe("given an expander with useAriaExpanded=false (tooltip)", () => {
  let containerEl;
  let hostEl;
  let contentEl;

  test.beforeEach(async ({ page }) => {
    await page.goto("/core/makeup-expander/index.html");
    containerEl = page.locator(".expander--tooltip").first();
    hostEl = containerEl.locator(".expander__host");
    contentEl = containerEl.locator(".expander__content");
  });

  test("should not have aria-expanded attribute on host", async () => {
    await expect(hostEl).not.toHaveAttribute("aria-expanded");
  });

  test("should not have aria-controls attribute on host", async () => {
    await expect(hostEl).not.toHaveAttribute("aria-controls");
  });

  test("should have the correct initial state", async () => {
    expect(containerEl).toBeTruthy();
    await expect(containerEl).not.toHaveClass(/expander__host-container--expanded/);
    await expect(contentEl).not.toBeVisible();
  });

  test("should expand on host focus using expandedClass", async () => {
    await hostEl.focus();
    await expect(containerEl).toHaveClass(/expander__host-container--expanded/);
    await expect(contentEl).toBeVisible();
    // Verify aria-expanded is still not set
    await expect(hostEl).not.toHaveAttribute("aria-expanded");
  });

  test("should expand on host hover using expandedClass", async () => {
    await hostEl.hover();
    await expect(containerEl).toHaveClass(/expander__host-container--expanded/);
    await expect(contentEl).toBeVisible();
    // Verify aria-expanded is still not set
    await expect(hostEl).not.toHaveAttribute("aria-expanded");
  });

  test("should collapse on mouse out", async ({ page }) => {
    await hostEl.hover();
    await expect(containerEl).toHaveClass(/expander__host-container--expanded/);

    // Move mouse away to trigger mouseout
    await page.mouse.move(10, 10);

    // Wait for the timeout (300ms in the code)
    await page.waitForTimeout(350);

    await expect(containerEl).not.toHaveClass(/expander__host-container--expanded/);
    await expect(contentEl).not.toBeVisible();
    // Verify aria-expanded is still not set
    await expect(hostEl).not.toHaveAttribute("aria-expanded");
  });

  test("should emit expander-expand event on expansion", async ({ page }) => {
    await page.evaluate(() => {
      window.tooltipExpandFired = false;
      document.querySelector(".expander--tooltip").addEventListener("expander-expand", () => {
        window.tooltipExpandFired = true;
      });
    });

    await hostEl.focus();

    const eventFired = await page.evaluate(() => window.tooltipExpandFired);
    expect(eventFired).toBe(true);
  });

  test("should emit expander-collapse event on collapse", async ({ page }) => {
    // First expand
    await hostEl.hover();
    await expect(containerEl).toHaveClass(/expander__host-container--expanded/);

    await page.evaluate(() => {
      window.tooltipCollapseFired = false;
      document.querySelector(".expander--tooltip").addEventListener("expander-collapse", () => {
        window.tooltipCollapseFired = true;
      });
    });

    // Move mouse away to trigger collapse
    await page.mouse.move(10, 10);
    await page.waitForTimeout(350);

    const eventFired = await page.evaluate(() => window.tooltipCollapseFired);
    expect(eventFired).toBe(true);
  });
});
