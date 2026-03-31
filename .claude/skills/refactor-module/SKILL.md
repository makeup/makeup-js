---
description: Systematically refactor a makeup-js module with modern JavaScript patterns
args: <module-name>
---

You are refactoring a module in the makeup-js monorepo to use modern JavaScript features while maintaining readability and test compatibility.

# Input

The user will provide a module name (e.g., "makeup-next-id" or full path like "packages/core/makeup-next-id").

# Process

## 1. Locate and analyze the module

- Find the module in `packages/core/` or `packages/ui/`
- Read the README.md **first** — it describes intended behavior from the consumer's perspective and is the authoritative source for what the module should do. Use it to inform all refactoring decisions, especially around edge cases and event behavior.
- Read the source file(s) in `src/`
- Read the test file(s) in `test/`
- Check the package.json for any specific configuration

## 2. Analyze refactoring opportunities

Identify modernization opportunities based on browserslist (modern browsers):

**Prioritize readability over cleverness**

Common patterns to modernize:

- Replace deprecated `keyCode` with `key` property
- Replace magic numbers with named constants
- Use `const`/`let` consistently (no `var`)
- Replace `Object.assign({}, obj1, obj2)` with spread: `{...obj1, ...obj2}` — rename the result only if the existing name is genuinely unclear; do not rename variables solely to remove a `_` prefix
- Use arrow functions for callbacks and simple functions
- Use `Set` or `Map` where appropriate for better performance/readability
- Remove unnecessary `"use strict"` (not needed in ES modules)
- Use template literals for string concatenation
- Use optional chaining `?.` where it improves readability
- Use nullish coalescing `??` for default values (prefer over `||` when appropriate)
- Use `Array.from()`, `.forEach()`, `.map()`, `.filter()` etc. where readable
- Do NOT simplify `=== true` / `=== false` comparisons — they carry type information that TypeScript would otherwise provide. Leave them as-is.

**Avoid over-engineering:**

- Don't use private fields (`#`) unless there's a clear encapsulation benefit
- Don't restructure class architecture unnecessarily
- Keep logic simple and straightforward

**Preserve existing comments:**

- Do NOT remove comments from code you are refactoring
- Comments often explain non-obvious behavior, browser quirks, or intentional decisions that aren't evident from the code alone
- Only remove a comment if it is purely restating what the code already clearly says (e.g. `i++ // increment i`)

**Optimize for tree shaking:**

- Prefer named exports over default exports where possible
- Prefer named imports (`import { foo } from "pkg"`) over namespace imports (`import * as Pkg from "pkg"`) — named imports allow bundlers to tree-shake unused exports

**CRITICAL - No API changes:**

- Maintain existing API surface exactly
- Do NOT change exported functions, classes, or methods
- Do NOT change function signatures (parameters, return types)
- Do NOT change event names or event detail structures
- Do NOT introduce breaking changes
- This is internal refactoring only - the public API must remain unchanged

## 3. Explain your understanding and ask questions

Before making any suggestions or changes, write a plain-text explanation of the module:

- What the module does from a consumer's perspective (what problem it solves, how it is used)
- What its key internal mechanisms are (how it works)
- Any non-obvious design decisions you noticed (e.g. why certain patterns are used, what tradeoffs are made)
- Any questions you have — about intent, edge cases, or anything in the source or tests that is unclear or surprising

Then **wait for the user to respond** before proceeding. Do not begin refactoring until the user has confirmed your understanding is correct and answered any questions.

## 5. Refactor tests FIRST

**CRITICAL:** Maintain the given/when/then BDD test format.

Test improvements:

- Remove redundant import existence checks
- Replace `keyCode` with `key` in KeyboardEvent tests
- Use `vi.spyOn()` instead of manually mocking functions
- Add specific test cases for edge cases
- Use descriptive test names following given/when/then
- Ensure proper cleanup in beforeEach/afterEach
- Structure: `describe("given X") > describe("when Y") > it("should Z")`

## 6. Refactor module code

Before writing any code changes, explain each planned source change as a learning opportunity:

- State what is changing and show the before/after
- Explain _why_ the new form is preferred — the underlying principle, not just the rule (e.g. what problem does `Object.assign` have that spread solves? why does eliminating the intermediate variable improve readability?)
- Connect the change to a broader pattern where relevant (e.g. "this is the same idea as destructuring — pulling out only what you need")

Then apply all changes.

## 7. Update README

- Verify README is in sync with the refactored code
- Check that:
  - Usage examples are accurate (no API changes, so should still work)
  - Code examples use correct variable names and syntax
  - Examples are clear and follow current code
- **Verify every listed property actually exists** — check each entry in the Properties section against the source. Look for getters, public instance fields, and properties set in the constructor. Remove or correct any that don't exist.
- **Verify every listed method actually exists** — check each entry in the Methods section against the source. Look for class methods and exported functions.
- **Verify every listed event name matches a `dispatchEvent` call** — search the source for `new CustomEvent(...)` and confirm the names match what the Events section documents.
- **Verify every listed option is present in `defaultOptions`** — confirm each option key in the Options section exists in the module's default options object.
- Fix any typos or inconsistencies in examples
- Do NOT change the API in the README - this is verification only
- Remove the "Dependencies" section if present — it duplicates package.json and drifts out of sync
- Keep documentation concise and accurate

## 8. Compile and test

- Run `npm run compile --workspace=<module-name>`
- Run `npm run test:unit -- packages/core/<module-name>` or `packages/ui/<module-name>`
- Verify all tests pass
- If tests fail, analyze and fix

## 9. Summary

Provide a concise summary:

- Module name and location
- Test improvements made
- Code improvements made
- Test results
- Lines of code before/after (if significantly different)

# Browser Support

Target modern browsers per @ebay/browserslist-config. All modern ES features are supported.

# Testing

Tests use Vitest. Maintain compatibility with existing test infrastructure.

# Output Format

Be concise. Show what was changed and why. Confirm tests pass.
