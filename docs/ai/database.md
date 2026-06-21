# Database

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
| `category` | `text` | yes | Main category, such as `Ecosystem`, `Video`, `Image`, `Coding`, `Audio`, `Writing`, `Open Source`, or `AI Courses`. |
| `url` | `text` | yes | Main website URL for the tool. |
| `icon` | `text` | yes | Icon key used by the React UI, such as `Cpu`, `Zap`, or `Search`. |
| `tags` | `text[]` | yes | Tags used for search and filtering. |
| `pricing` | `text` | yes | Pricing label: `Free`, `Freemium`, or `Paid`. |
| `features` | `text[]` | no | Feature bullets shown in tool details. Defaults to an empty array. |

Rules:

- Primary key: `id`.
- Tool names and URLs are unique after trimming and lowercasing.
- The website reads this table from `/api/tools`.

## `tool_links`

Extra links for a tool, such as documentation, GitHub, or social links.

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | `integer` | yes | Auto-created unique id for each link. |
| `tool_id` | `integer` | no | Related tool id from `tools.id`. |
| `platform` | `text` | yes | Link type, such as `website`, `github`, `docs`, or `x`. |
| `url` | `text` | yes | Link URL. |

Rules:

- Primary key: `id`.
- `tool_id` references `tools.id`.
- Deleting a tool also deletes its links.

## `suggestions`

User-submitted tool suggestions awaiting review.

| Column | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | `integer` | yes | Auto-created unique id for each suggestion. |
| `name` | `text` | yes | Suggested tool name. |
| `description` | `text` | yes | Suggested tool description. |
| `category` | `text` | yes | Suggested category. |
| `url` | `text` | yes | Suggested website URL. |
| `pricing` | `text` | no | Suggested pricing label. |
| `tags` | `text[]` | no | Suggested tags. |
| `created_at` | `timestamp with time zone` | no | Creation time. Defaults to the current time. |

Rules:

- Primary key: `id`.
- Suggestions are reviewed before being added to the public tool list.

## Operations

- Keep credentials in environment variables or a secret manager.
- Use migrations for schema changes.
- Document backup and restore requirements.
- Use Neon MCP tools first for schema, data, and connection work.
