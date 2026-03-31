---
description: Write missing unit tests for a makeup-js module based on coverage gaps
args: `<module-name>`
---

You are writing missing unit tests for a makeup-js module. Your goal is to fill coverage gaps with well-structured tests that follow the existing conventions — not to rewrite existing tests or pad coverage with low-value assertions.

**Input**

The user will provide a module name (e.g., "makeup-next-id" or full path like "packages/core/makeup-next-id"). Optionally, the user may paste a gap report from `/test-coverage` — if so, use it to skip re-running coverage and go straight to writing.

**Process**

**1. Locate the module**

- Find the module in `packages/core/` or `packages/ui/`
- Read `src/index.js` (or all files in `src/`)
- Read `test/index.js` (or all files in `test/`)

**2. Identify gaps**

If the user did not provide a gap report, run coverage to find them:

```
npm run test:coverage -- --coverage.include="packages/core/<module-name>/src/**" packages/core/<module-name>
```

Read the source and tests side by side to identify:

- Uncovered branches (`if`/`else`, ternaries, `?.`, `??`)
- Uncovered functions
- Missing edge cases (empty input, boundary values, error conditions)
- Missing negative cases (invalid input that is guarded in code)

Skip gaps that are not worth testing (non-deterministic internals, unreachable defensive guards, browser-only paths that jsdom cannot exercise).

**3. Write the tests**

Append the new tests to `test/index.js`. Do not modify existing tests.

Follow the existing conventions exactly:

- BDD structure: `describe("given X") > describe("when Y") > it("should Z")`
- One assertion per `it` block where practical
- Use `beforeEach`/`beforeAll` for setup, matching the pattern already in the file
- Use `vi.spyOn()` for mocking, `vi.useFakeTimers()` for timers — restore in `afterEach`
- Import only what is needed; do not add imports already present at the top of the file
- Match the indentation and formatting of the existing file

**4. Run and verify**

Run the tests to confirm they pass:

```
npm run test:unit -- packages/core/<module-name>
```

If any test fails, fix it before proceeding. Do not leave failing tests.

Then re-run coverage to confirm the gaps are closed:

```
npm run test:coverage -- --coverage.include="packages/core/<module-name>/src/**" packages/core/<module-name>
```

**5. Summary**

Report:

- Which gaps were addressed and which were intentionally skipped (and why)
- Updated coverage numbers
- Number of tests added
