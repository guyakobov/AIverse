# Change Log

Project change history. Formatting rules are defined in
[`docs/ai/changelog.md`](docs/ai/changelog.md).

## 2026-04-24

### Data freshness and visibility fixes

- Updated `api/tools.js` to disable API caching with `Cache-Control: no-store` so new database rows are less likely to be hidden by cached responses.
- Updated `api/tools.js` to normalize tool rows before returning them to the frontend.
- Added fallback handling for missing or invalid `category`, `icon`, `pricing`, `tags`, `features`, and `links` values.
- Updated `api/tools.js` to order non-search results by `id DESC` so newly added rows appear earlier.

### Frontend refresh behavior

- Updated `App.tsx` so `/api/tools` requests use `fetch(..., { cache: 'no-store' })`.
- Updated `App.tsx` to clear stale error state before refetching tools.
- Updated `App.tsx` to refresh tool data when the window regains focus or the tab becomes visible again.
- Updated `App.tsx` to guard tag usage so rows with missing arrays do not break filtering logic.

### Dynamic categories

- Updated `App.tsx` to build the visible category list from both the hardcoded categories and categories discovered in database rows.
- Updated grouped category rendering in `App.tsx` so tools with new categories can still appear on the home page.
- Relaxed the category type in `types.ts` from a fixed union to `string` so database-driven categories are allowed.

### Verification status

- The original build verification was blocked by the sandbox.
