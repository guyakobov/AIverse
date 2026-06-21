# Project

## Overview

- Name: AIverse
- Type: AI tools directory website
- Frontend: React and Vite
- Hosting: Vercel
- Database: Neon Postgres
- Data ingestion: n8n workflows

## Live Services

- Neon project name: `AIVerse`
- Neon project id: `bitter-morning-13505495`
- Main public tables: `tools`, `tool_links`, `suggestions`

## Service Tools

- Use Neon MCP tools for database checks, schema, data, and connection strings.
- Use Vercel MCP tools for deployments, project checks, domains, and hosting.
- Use n8n MCP tools for workflows and ingestion logic.
- Prefer MCP tools over direct API calls, Docker, gcloud, or dashboard instructions.
- If a required MCP is unavailable, ask the user to restart Codex.

## n8n Rules

When the user asks to use n8n MCP:

- Use only n8n MCP tools.
- Start with workflow list, get, partial update, and validation tools.
- Do not use shell, direct API calls, Docker, or gcloud unless explicitly allowed.
- If the MCP handshake fails, ask the user to restart Codex.
