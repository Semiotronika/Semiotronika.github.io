# AGENTS.md - Semiotronika Site

This repo publishes the Semiotronika site and NOUZ documentation through
VitePress, with static lab engines embedded inside VitePress pages.

## First Read

- Root workspace `AGENTS.md` and `WORKSPACE_MAP.md`
- `package.json`
- `docs/.vitepress/config.mts`
- `docs/.vitepress/theme/custom.css`
- Relevant page under `docs/`

## Source Of Truth

- Homepage: `docs/index.md` and `docs/en/index.md`
- NOUZ docs: `docs/nouz/` and `docs/en/nouz/`
- Lab wrapper pages: `docs/lab/`
- Static lab engines and datasets: `docs/public/lab/`
- VitePress theme components: `docs/.vitepress/theme/`

## Commands

```powershell
npm.cmd run docs:build
npm.cmd run docs:dev
npm.cmd run docs:preview
```

Use the build as the minimum verification after site changes. Use browser
screenshots for visual/layout changes.

## Boundaries

- Keep the homepage as a concise entry point for NOUZ and the semantic
  laboratory, not a heavy product landing page.
- Keep lab pages visually integrated through VitePress wrappers; static HTML
  files under `docs/public/lab/` are engines, not separate public vestibules.
- Do not add dependencies unless there is a clear site need.
- Do not push or publish without Masha's explicit ask.
