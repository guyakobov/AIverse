# AIverse

AIverse is a directory for discovering AI tools by category, features, and pricing.

## Requirements

- Node.js 20 or newer
- A Neon Postgres database

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file and add the database connection:

   ```env
   DATABASE_URL=your_neon_postgres_connection_string
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Documentation

Project configuration and AI development instructions are in
[`docs/ai/index.md`](docs/ai/index.md).
