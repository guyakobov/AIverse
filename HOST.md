# Host And Network

This project uses a remote GCP VM for n8n.

## n8n Host

- Cloud: Google Cloud Platform
- VM name: `n8n-server`
- GCP project: `applications-493306`
- Zone: `us-central1-a`
- Public n8n URL: `https://guygcpn8n.duckdns.org`
- Local n8n URL inside VM: `http://127.0.0.1:5678`
- Runtime: Docker Compose

## Required n8n Public URL Settings

These must be set in the Docker Compose environment for n8n:

```yaml
environment:
  - WEBHOOK_URL=https://guygcpn8n.duckdns.org/
  - N8N_EDITOR_BASE_URL=https://guygcpn8n.duckdns.org/
  - N8N_HOST=guygcpn8n.duckdns.org
  - N8N_PROTOCOL=https
```

After changing these values, restart the n8n Docker Compose stack.

These settings are needed so Telegram can register the webhook with a public host.

## Codex Access Rule

For n8n workflow work, use `mcp__n8n` tools first.
Do not use Docker, gcloud, or direct API calls unless the user explicitly allows it.
