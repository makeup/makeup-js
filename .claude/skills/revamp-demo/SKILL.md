---
description: Revamp a makeup-js module demo page with consistent style and structure
args: <module-name>
---

You are revamping a demo page for a makeup-js module. The goal is a minimal, utilitarian page that serves as quick manual testing and demonstrates available features — not a showcase.

# Input

The user will provide a module name (e.g., "makeup-next-id" or full path like "packages/core/makeup-next-id").

# Process

## 1. Locate the module

- Find the module in `packages/core/` or `packages/ui/`
- Determine whether it is a **core** or **ui** module — the pattern differs (see sections 3 and 4)
- Determine the demo path: `docs/core/<module-name>/` or `docs/ui/<module-name>/`
- Read the README.md **first** — it is the authoritative source for what the module does and what options/events/methods it exposes. Use it to decide what to demonstrate.
- Read the existing `docs/<core-or-ui>/<module-name>/index.html` and `index.js`
- For ui modules, also read the existing `index.css` to understand what Skin packages are imported

## 2. Design the demo

Based on the README, decide:

- What is the minimal interaction that demonstrates the module working?
- Are there multiple distinct features or options worth showing as separate sections?
- What state changes are visible to the user without opening DevTools?

**Principles:**

- Each feature or option worth testing should have its own `<h2>` section
- Prefer visible on-page output over console logging
- Keep the HTML minimal — don't add decorative content
- For modules that trap keyboard focus, include focusable elements (e.g. links) both before and after the primary interactive element so focus wrapping can be verified in both tab directions
- The demo is for developers, not end users

## 3. Rewrite `index.html`

### Core modules

```html
<!doctype html>
<html lang="en">
  <head>
    <title><module-name> demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../../docs.css" />
    <!-- module-specific styles only if needed -->
  </head>
  <body>
    <main>
      <h1><a href="../">core</a> / <module-name></h1>
      <p>One-line description of what the module does.</p>

      <hr />

      <h2>Section title</h2>
      <p>Brief instruction or context for this demo section.</p>
      <!-- demo markup -->

      <!-- repeat <hr> + <h2> for each additional feature -->
    </main>
    <script src="index.min.js"></script>
  </body>
</html>
```

### UI modules

UI modules use [eBay Skin](https://ebay.github.io/skin/) for styling. The HTML links both `docs.css` and the webpack-extracted `index.css`:

```html
<!doctype html>
<html lang="en">
  <head>
    <title><module-name> demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="data:," />
    <link rel="stylesheet" href="../../docs.css" />
    <link href="index.css" rel="stylesheet" />
    <!-- module-specific styles only if needed -->
  </head>
  <body>
    <main>
      <h1><a href="../">ui</a> / <module-name></h1>
      <p>One-line description of what the module does.</p>

      <hr />

      <h2>Section title</h2>
      <p>Brief instruction or context for this demo section.</p>
      <!-- demo markup -->

      <!-- repeat <hr> + <h2> for each additional feature -->
    </main>
    <script src="index.min.js"></script>
  </body>
</html>
```

`index.css` is the webpack-extracted output of the Skin CSS imports in `index.js` — do not edit it directly.

Skin styling applies only to the widget/component markup (e.g. `.switch`, `.listbox`). Page-level styles (body, headings, layout, `.demo-output`) come from `docs.css` as normal.

### Rules (both core and ui)

- Always include `<link rel="icon" href="data:," />` to suppress favicon requests
- Breadcrumb in `<h1>`: `<a href="../">core</a> / <module-name>` or `<a href="../">ui</a> / <module-name>`
- Use `<hr />` between sections
- Module-specific `<style>` is allowed when required for the demo to function, but keep it minimal
- Do NOT use inline styles on elements
- Do NOT add decorative classes or wrapper divs beyond what the module requires

## 4. Rewrite `index.js`

### UI modules — Skin CSS imports

UI module JS files must import the required Skin packages so webpack can extract them into `index.css`. Do **not** import `../../docs.css` here — it is linked directly in `index.html` and must not be injected into `index.css`.

```js
import "@ebay/skin/tokens";
import "@ebay/skin/global";
import "@ebay/skin/<component>"; // e.g. "switch", "listbox", "menu"

import MakeupWidget from "makeup-widget";
```

Check the existing `index.js` (or the current `index.css` contents) to confirm which Skin packages are needed.

### Rules (both core and ui)

- Use named imports where possible: `import { foo } from "makeup-module"`
- Default imports where the module only exports one thing: `import foo from "makeup-module"`
- No `// REQUIRE` comments or other legacy comments
- No `window.onload` wrapper — the script is at the bottom of `<body>` so the DOM is ready
- Use `const`, arrow functions, template literals
- Prefer `textContent` over `innerText`
- Visible output on the page is preferred over `console.log`
- Keep it short — the JS should only wire up the demo, not explain it

### Event log pattern

When a module emits custom events, render them on the page instead of logging to the console. Use `.demo-output` from `docs.css` and a Clear button:

```html
<ul id="log" class="demo-output"></ul>
<button type="button" id="clear">Clear</button>
```

```js
function logEvent(logEl, eventName) {
  const item = document.createElement("li");
  item.textContent = eventName;
  logEl.prepend(item); // newest first
}

const logEl = document.getElementById("log");
el.addEventListener("someEvent", () => logEvent(logEl, "someEvent"));
document.getElementById("clear").addEventListener("click", () => {
  logEl.innerHTML = "";
});
```

**Shared vs. per-section logs:** Use a single shared log at the bottom when there is only one section or when all sections are short enough that the log remains close to the action. When there are multiple long sections, place a log and Clear button immediately after each section so the user does not have to scroll to see events. In this case, omit the widget/source identifier from each log entry — the log's position already makes it clear which section fired. When using a shared log across sections, include the source identifier (e.g. the element id) in each entry so events can be attributed.

Each demo section with its own events should have its own log and Clear button.

## 5. Rebuild the bundle

Run in order:

```
npm run compile:docs
npx webpack --config webpack.config.core.js
```

(Use `webpack.config.ui.js` for ui modules.)

Confirm the build succeeded with no errors.

## 6. Summary

- Module and demo path
- Sections added and what each demonstrates
- Any notable decisions (e.g. why certain features are omitted from the demo)

# Shared stylesheet

`docs/docs.css` is the shared stylesheet for all demo pages. Do not modify it as part of a demo revamp — it should already provide the base styles needed. If something genuinely needs to be added to the shared stylesheet, flag it to the user rather than adding it silently.

# Output Format

Be concise. Describe what each section of the demo tests. Confirm the build passes.
