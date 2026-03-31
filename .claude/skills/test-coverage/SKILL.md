---
description: Evaluate unit test coverage for a makeup-js module and identify gaps
args: `<module-name>`
---

You are auditing unit test coverage for a makeup-js module. Your goal is to identify untested or undertested code paths and produce a prioritized list of gaps — not to write tests.

**Input**

The user will provide a module name (e.g., "makeup-next-id" or full path like "packages/core/makeup-next-id").

**Process**

**1. Locate the module**

- Find the module in `packages/core/` or `packages/ui/`
- Read the README.md **first** — it describes intended behavior from the consumer's perspective and is the authoritative source for what the module should do. Use it to inform gap analysis, especially around edge cases and event behavior that may not be obvious from the source alone.
- Read `src/index.js` (or all files in `src/`)
- Read `test/index.js` (or all files in `test/`)

**2. Run coverage**

Run coverage scoped to the module:

```
npm run test:coverage -- --coverage.include="packages/core/<module-name>/src/**" packages/core/<module-name>
```

(Adjust path for `packages/ui/` if needed.)

Parse the coverage output to extract per-file statement, branch, function, and line percentages.

**3. Analyze gaps manually**

Read the source and tests side by side. For each uncovered or partially covered area, identify:

- **Uncovered branches**: `if`/`else`, ternaries, `switch` cases, `?.` and `??` short-circuits that have no test exercising the falsy/nullish path
- **Uncovered functions**: exported or internal functions with zero test invocations
- **Untested edge cases**: boundary values, empty inputs, error conditions that are handled in code but not exercised in tests
- **Missing negative cases**: code that guards against invalid input but has no test verifying the guard

**4. Produce the gap report**

Output a prioritized gap report in this format:

---

**Coverage: `<module-name>`**

| Metric     | %   |
| ---------- | --- |
| Statements | X%  |
| Branches   | X%  |
| Functions  | X%  |
| Lines      | X%  |

**Gaps (priority order)**

1. `functionOrArea` — what is untested and why it matters
2. ...

**Not worth testing**

- List any uncovered lines that are intentionally untestable (e.g., defensive `else` that can't be reached given the API, browser-only guards in jsdom)

---

Priority order: exported API paths > internal branches with observable side effects > pure defensive guards.

**Constraints**

- Do not write or suggest test code — report gaps only
- Do not suggest changes to source code
- Do not flag lines excluded by the vitest config (`dist/`, `node_modules/`, etc.)
- Keep the report concise; one line per gap is enough unless the gap needs explanation
