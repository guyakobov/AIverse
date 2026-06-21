# AI Project Guide

This folder is the source of truth for AI-assisted work in AIverse.

## Core

- [Project](project.md) — architecture, services, and MCP rules.
- [Database](database.md) — Neon schema and database rules.
- [Changelog Instructions](changelog.md) — rules for recording changes.
- [`CHANGE_LOG.md`](../../CHANGE_LOG.md) — project change history.

## Engineering

- [QA](qa.md) — validation before publishing.
- [Security](security.md) — credential and data safety.
- [Responsive UI](responsive-ui.md) — desktop and mobile UI rules.

## Legal

- [Privacy Policy](privacy-policy.md) — privacy implementation checklist.
- [Terms of Service](terms-of-service.md) — terms implementation checklist.

## Repository Files

Keep these files at the repository root because external tools expect them there:

- `AGENTS.md`
- `README.md`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vercel.json`
- `.gitignore`
- `.node-version`
- `.env`

Agent workflows stay in `.agents/`. Tests stay in `tests/`.
