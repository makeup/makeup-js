---
description: Release changed packages with automatic Lerna detection and npm publish
args: [version-type] or [module-name] [version-type]
---

You are releasing packages in the makeup-js monorepo using Lerna's automatic change detection.

# Input

The user can provide:

**Automatic mode (recommended):**

- Just the version type: `patch` (default), `minor`, or `major`
- Lerna automatically detects all packages that have changed since the last release

**Targeted mode:**

- A specific module name (e.g., "makeup-listbox") AND version type
- Useful when you want to force-release a specific package even if Lerna doesn't detect changes

If no arguments are provided, defaults to `patch` for all changed packages.

# Process

## 1. Verify prerequisites

Before starting the release:

- Ensure all changes are committed (`git status` should be clean)
- Ensure you're on the main branch (`master`)
- Ensure you have the latest tags from remote: `git fetch --tags`
- Verify the user has npm publish permissions

If any prerequisites fail, inform the user and stop.

## 2. Identify affected packages

Run Lerna to preview which packages will be updated:

```bash
lerna changed
```

This shows packages with changes since the last tagged release based on:

- Git commits since the last tagged version
- File modifications in package directories
- Dependency relationships (if package A changed and package B depends on A, both will be released)

**Show the output to the user** and confirm the listed packages match expectations before proceeding.

If no packages have changed, inform the user and stop.

## 3. Run tests

Before releasing, ensure all tests pass:

```bash
npm test
```

If tests fail, report the failures to the user and stop. Do not proceed with a release if tests are failing.

## 4. Version bump

Run Lerna version with the appropriate flags:

```bash
lerna version <version-type> --no-push --no-commit-hooks -m "chore(release): publish"
```

Where `<version-type>` is `patch`, `minor`, or `major` (defaults to `patch` if not specified).

**What this does:**

- Updates version in `package.json` for changed packages
- Updates `package-lock.json` files
- Updates dependent packages to use the new versions
- Creates a local commit with message "chore(release): publish"
- Creates git tags for each released package
- **Does NOT push** to remote (you control when that happens)
- **Does NOT run git hooks** (avoids pre-push hooks that could interfere)

**Verify the commit:**

- Show the user which files were changed
- Show the new version numbers
- Ask for confirmation before publishing

## 5. Publish to npm

**IMPORTANT:** This step requires **interactive user input** and cannot be automated by Claude.

Instruct the user to run:

```bash
npx lerna publish from-git
```

**What this does:**

- Publishes all packages that have tags pointing to the current commit
- Uses the versions from git tags (not package.json)
- Uploads to npm registry
- Asks for confirmation (y/n)
- If 2FA is enabled, prompts for one-time password (OTP)

**User must run this command themselves** because:

- 2FA/OTP requires interactive terminal input
- Confirmation prompt needs user decision

**If publish fails with uncommitted changes:**

If `lerna publish` fails with an error like:

```
EUNCOMMIT Working tree has uncommitted changes
M packages/ui/makeup-*/package.json
```

This happens when a previous `lerna publish` attempt failed (e.g., due to missing OTP) and added `gitHead` fields to package.json files. To fix:

```bash
git restore packages/ui/makeup-*/package.json
```

Then retry `npx lerna publish from-git`.

## 6. Push to remote

After the user confirms npm publish succeeded, push the commit and tags:

```bash
git push --follow-tags
```

**What this does:**

- Pushes the "publish" commit to remote
- Pushes all new git tags

## 7. Verify release

After pushing, verify packages are live:

```bash
npm view makeup-<package-name> version
```

Check that the version matches what was just published.

## 8. Summary

Provide a summary of what was released:

- List of packages published with their new versions
- Commit SHA of the release
- Git tags created
- Confirmation that changes are now on npm and GitHub

# Error Handling

If anything fails during the process:

- **Version command fails:** Check that git tags are up to date (`git fetch --tags`). Run `lerna changed` to see what Lerna thinks has changed.
- **Publish fails:** Verify npm authentication (`npm whoami`) and permissions
- **Push fails:** Check remote access and branch protection rules

# Important Notes

- This uses Lerna's "independent" versioning mode — each package has its own version number
- Lerna automatically updates dependent packages when a dependency is released
- The `--no-commit-hooks` flag is used to avoid interference from git hooks during the version commit
- Always run tests before releasing to catch issues early
- The version commit and tags are created locally first, giving you a chance to verify before pushing

# Examples

**Automatic mode (release all changed packages):**

```bash
/release-module                # patch release for all changed packages
/release-module patch          # same as above (explicit)
/release-module minor          # minor bump for all changed packages
/release-module major          # major bump for all changed packages
```

**Targeted mode (force-release a specific package):**

```bash
/release-module makeup-listbox patch
```

## Workflow

Both modes follow the same steps:

1. ✓ Verify clean git state and pull latest tags
2. ✓ Show which packages Lerna detected as changed
3. ✓ Run full test suite
4. ✓ Bump versions and create local commit
5. ✓ Show git diff and ask for confirmation
6. ✓ Publish to npm
7. ✓ Push commit and tags to GitHub

## Why automatic mode is recommended

Lerna's change detection is smart:

- Tracks git history since last release tag
- Automatically includes downstream dependents
- Prevents accidentally missing packages
- Respects your independent versioning setup

The targeted mode is mainly useful for force-releasing a package that hasn't changed (rare).
