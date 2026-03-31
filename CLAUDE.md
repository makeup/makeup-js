# Claude Code

## Skills

The following slash commands are available for common development tasks. Run them with `/skill-name <module-name>`:

- `/refactor-module` — modernize a module's source and tests to current JavaScript patterns while preserving the public API
- `/test-coverage` — audit unit test coverage for a module and produce a prioritized gap report
- `/add-unit-tests` — write missing unit tests based on coverage gaps; can accept a gap report from `/test-coverage` to skip re-running coverage
- `/revamp-demo` — rewrite a module's demo page with consistent style, structure, and on-page output

Skills are defined in `.claude/skills/`.
