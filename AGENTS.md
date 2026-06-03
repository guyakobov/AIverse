answer short and in simple words

Project live services:

- Database: Neon Postgres.
- Neon project name: `AIVerse`.
- Neon project id: `bitter-morning-13505495`.
- Main public tables: `tools`, `tool_links`, `suggestions`.
- Website hosting: Vercel.
- Data ingestion: n8n workflows.

For this project, prefer MCP tools for live service work:

- Use `mcp__neon` tools for database checks, schema, data, and connection strings.
- Use Vercel MCP tools for deployments, project checks, domains, and website hosting.
- Use `mcp__n8n` tools for n8n workflows and ingestion logic.
- Do not use direct API calls, Docker, gcloud, or manual dashboard instructions first when an MCP tool is available.
- If an MCP tool is missing, say which MCP is unavailable and ask the user to restart Codex.

When the user says to use n8n MCP, use only the `mcp__n8n` tools.
Start with `n8n_list_workflows`, `n8n_get_workflow`, `n8n_update_partial_workflow`, and `n8n_validate_workflow`.
Do not use shell, direct API calls, Docker, or gcloud for n8n MCP tasks unless the user explicitly allows it.
If n8n MCP tools are missing or fail to handshake, say the MCP is unavailable in this session and ask the user to restart Codex.
