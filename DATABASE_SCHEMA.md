# Database Schema

Project database:

- Provider: Neon Postgres
- Neon project name: `AIVerse`
- Neon project id: `bitter-morning-13505495`
- Main schema: `public`

## `tools`

Main table for AI tools shown on the website.

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | `integer` | yes | Auto-created unique id for each tool. |
| `name` | `text` | yes | Tool name shown in the UI. |
| `description` | `text` | yes | Short text shown in the tool card/details. |
| `category` | `text` | yes | Main category, like `Ecosystem`, `Video`, `Image`, `Coding`, `Audio`, `Writing`, `Open Source`, or `AI Courses`. |
| `url` | `text` | yes | Main website URL for the tool. |
| `icon` | `text` | yes | Icon key used by the React UI, like `Cpu`, `Zap`, or `Search`. |
| `tags` | `text[]` | yes | Tags used for search and filtering. |
| `pricing` | `text` | yes | Pricing label. The API expects `Free`, `Freemium`, or `Paid`. |
| `features` | `text[]` | no | Feature bullets shown in tool details. Defaults to an empty array. |

Rules:

- Primary key: `id`.
- Unique tool name: lowercased and trimmed `name`.
- Unique tool URL: lowercased and trimmed `url`.
- The website reads this table from `/api/tools`.

## `tool_links`

Extra links for a tool, such as docs, GitHub, social links, or other platforms.

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | `integer` | yes | Auto-created unique id for each link. |
| `tool_id` | `integer` | no | Related tool id from `tools.id`. |
| `platform` | `text` | yes | Link type, like `website`, `github`, `docs`, or `x`. |
| `url` | `text` | yes | Link URL. |

Rules:

- Primary key: `id`.
- Foreign key: `tool_id` references `tools.id`.
- If a tool is deleted, its links are deleted too.

## `suggestions`

User-submitted tool suggestions from the website form.

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | `integer` | yes | Auto-created unique id for each suggestion. |
| `name` | `text` | yes | Suggested tool name. |
| `description` | `text` | yes | Suggested tool description. |
| `category` | `text` | yes | Suggested category. |
| `url` | `text` | yes | Suggested website URL. |
| `pricing` | `text` | no | Suggested pricing label. |
| `tags` | `text[]` | no | Suggested tags. |
| `created_at` | `timestamp with time zone` | no | Time the suggestion was created. Defaults to current time. |

Rules:

- Primary key: `id`.
- This table is for review, not direct website listing.

## Data Flow

- Website: hosted on Vercel.
- Website API reads from Neon using `DATABASE_URL`.
- Data ingestion uses n8n workflows.
- Use MCP tools first:
  - `mcp__neon` for database work.
  - Vercel MCP for website/deploy work.
  - `mcp__n8n` for ingestion workflows.
