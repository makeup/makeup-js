---
description: Perform major dependency updates one logical group at a time, assessing breakage risk, then build, test, and create a signed commit per group
args: `[scope: all | <package-name>]`
---

You are performing **major** version updates of devDependencies in this monorepo, one logical group at a time. For each group you assess breakage risk, apply the bump, build, test, and — only when green — create a single signed commit. You **never push**; the user pushes themselves.

**Input**

- No args, or `all` → process every available major update.
- `<package-name>` → process only the group containing that package (e.g. `@babel/core` processes the whole `@babel/*` group).

**Core principles**

- **One logical group per commit.** Isolating each change makes regressions trivial to bisect and revert.
- **Tests gate every commit.** Never commit a group whose build or tests fail.
- **Commit-only.** Never `git push`. Never use `--no-verify` or otherwise bypass hooks.
- **Risk-gated.** Auto-proceed for `none`/`low` risk; **pause and ask the user** before committing a `medium`/`high` risk group.

---

**Process**

**1. Preflight**

- Confirm the working tree is clean (`git status --short`). If not, stop and report — do not mix unrelated changes into dependency commits.
- Confirm Node/npm are available (`node -v`, `npm -v`). This repo uses Node 22.12 via nvm; if `npm` is missing, the terminal likely hasn't loaded nvm (`source ~/.zshrc`).
- Note the current branch.

**2. Detect and group major updates**

Run a dry check:

```
npx --yes npm-check-updates --dep dev
```

Identify entries whose **major** version increases. Then group **coupled packages** that must move together:

- All `@babel/*` (`@babel/cli`, `@babel/core`, `@babel/preset-env`, presets/plugins) → one group.
- All `@commitlint/*` (`@commitlint/cli`, `@commitlint/config-conventional`) → one group.
- Any other related family sharing a major line → one group.
- Everything else → its own single-package group.

Order the groups **lowest risk first** (see step 3) so cheap wins land before risky changes.

**3. Assess breakage risk (per group)**

Produce a risk level of `none` / `low` / `medium` / `high` with a short rationale, using these signals:

- **Role in the pipeline** (biggest factor):
  - _Editor-only_ (e.g. `@types/*` in a JS-only repo with no `tsconfig`/`.ts` source) → **none**.
  - _Test-only_, using only stable core APIs → **none/low**.
  - _Tooling / git-hook gating_ (`lint-staged`, `husky`) → **low/medium** (can block commits, but not ship broken code).
  - _Commit/CI gating_ (`@commitlint/*`) → **medium** (a stricter ruleset can reject commit messages).
  - _Affects compile output_ (`@babel/*`, `webpack`, loaders) → **high** (regenerates `docs/**` and `dist` artifacts; broad blast radius).
- **Usage breadth**: count real usage sites (`grep -rl` across `packages/*/*/src`, `packages/*/*/test`, and root config). Few sites + only core APIs → lower risk.
- **Direct vs transitive**: deduped/transitive-only presence → lower risk than a directly exercised dependency.
- **Changelog red flags**: dropped Node/engine support, removed or renamed APIs, stricter-by-default behavior, config-format changes.
- **Engine vs active runtime** (check explicitly): compare the target version's `engines.node` against the running `node -v`. Mismatch raises risk — and is especially dangerous for tools invoked by git hooks (`lint-staged`, `commitlint`), since a hook failure blocks _every_ commit, including the bump's own commit. Resolve by upgrading Node first (e.g. `nvm install 22 --reinstall-packages-from=<current>`), then re-evaluate (risk usually drops once the engine is satisfied).

  ```
  npm view <pkg>@<target> engines
  node -v
  ```

State the level and rationale before touching anything.

**4. Gate on risk**

- `none` / `low` → proceed automatically.
- `medium` / `high` → **stop and ask the user to confirm** before applying. Summarize the risk and what could break.

**5. Apply the bump (lock-preserving)**

Install the whole group to its new major in one command, e.g.:

```
npm install --save-dev @babel/core@^8 @babel/cli@^8 @babel/preset-env@^8
```

Confirm `package.json` reflects the new ranges.

**Preserve the lockfile — never clean-nuke.** Do **not** "fix" install problems with `rm -rf node_modules package-lock.json && npm install`. A lockfile-free resolve re-floats _unrelated_ deps to the latest in-range version, which can land on a release your registry/security proxy blocks (e.g. a `403 Forbidden` on `prettier@3.8.5` while the committed lock safely pinned `3.8.4`). Keeping the lockfile as the baseline means only the group you target changes.

**Handling ERESOLVE on coupled toolchains.** Upgrading a coupled family (e.g. `@babel/*` core+cli+preset-env) against an existing lock can ERESOLVE because npm anchors on the _locked_ old version (`Found: @babel/cli@7.29.7`) while installing the new one — an incremental-resolver deadlock, not a real incompatibility. Both targeted (`npm install pkg@^8`) and full (`npm install`) forms can hit it. The lock-preserving fix:

```
npm install --legacy-peer-deps
```

With the lockfile present, this keeps every other dep pinned (so `prettier` stays at its safe version) while letting the babel subtree move to v8. After it completes, **verify the resulting tree is self-consistent** before trusting it:

```
npm ls @babel/core @babel/cli @babel/preset-env
npm ls babel-plugin-polyfill-corejs3   # must be a major that supports core 8 (1.x)
npm ls prettier                        # must be unchanged / safe version
```

**6. Build and test**

```
npm run build
npm test
```

- **Green** → continue to commit.
- **Red** → stop. Report the failure, leave the changes in the working tree for inspection, and do **not** commit. Suggest next steps (read changelog/migration guide, adjust config). Do not attempt unrelated fixes.

**7. Commit (signed, commit-only)**

Stage exactly the files this group changed (`package.json`, `package-lock.json`, and any legitimately regenerated build artifacts). For compile-affecting groups like `@babel/*` this includes the regenerated `docs/**/*.min.js(.map)` bundles **and** `packages/**/dist/cjs/index.js` outputs — stage them explicitly (`git add package.json package-lock.json docs packages`). Review with `git status --short` first. **Never** `git add -A` and never sweep in unrelated working-tree changes (e.g. skill files under `.claude/` or `CLAUDE.md`).

Use a Conventional Commits message (the repo enforces commitlint + a husky `commit-msg` hook). Examples:

```
build(deps-dev): bump @types/node from 25 to 26
build(deps-dev): bump @babel/core, @babel/cli and @babel/preset-env from 7 to 8
```

Commits are GPG-signed automatically (`commit.gpgsign=true`). Verify with:

```
git log -1 --format='%h %G? %an <%ae>'
```

`%G?` should print `G` (good signature). **Do not push.**

**8. Repeat and report**

Move to the next group. When done (or stopped), output a summary table — one row per group, ordered as processed:

| Group                   | Risk                 | Build/Test | Commit        |
| ----------------------- | -------------------- | ---------- | ------------- |
| `<pkg>` `<old>`→`<new>` | none/low/medium/high | pass/fail  | `<short-sha>` |

List any groups that were skipped (risk not confirmed) or failed (left uncommitted for follow-up).

---

**Safety reminders**

- Never `git push`.
- Never bypass hooks (`--no-verify`) or force anything.
- Never bundle multiple groups into one commit.
- Never clean-nuke the lockfile to resolve an install error — it can float unrelated deps to forbidden/newer versions. Prefer lock-preserving installs (`--legacy-peer-deps` with the lock present for coupled-toolchain ERESOLVE).
- If the working tree starts dirty or a build/test fails, stop rather than working around it.
