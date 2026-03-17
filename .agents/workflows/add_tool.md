---
description: Process to research and add a new AI tool to the AIverse database.
---

# Add AI Tool to AIverse

Follow these steps when adding a new tool to the AIverse database:

1. **Information Retrieval**
   - Extract the tool's name and URL from the request.
   - Use `search_web` to find the tool's description and key features.
   
2. **Database Preparation**
   - Query `SELECT MAX(id) FROM tools;` to find the current highest ID.
   - Use `SELECT DISTINCT category FROM tools;` to ensure the category is valid.

3. **Schema Mapping**
   - **ID**: `max_id + 1`
   - **Icon**: Map functional areas to Lucide icons.
   - **Features**: Convert researched capabilities into a 4-5 item TEXT ARRAY.
   - **Pricing**: Standardize to `Free`, `Paid`, or `Freemium`.

4. **Database Insertion**
   - Use `run_sql_transaction` to insert the tool and its Instagram/social links into `tools` and `tool_links`.

5. **Verification**
   - Query both tables with the new ID to ensure data was persisted.
   - provide a brief summary of the added tool to the user.
