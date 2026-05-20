---
prev:
  text: MCP Tools
  link: /en/linza/tools
next:
  text: Safety Boundary
  link: /en/linza/safety
---

# Configuration

LINZA is configured through environment variables in your MCP client. There is no separate YAML config: point it to a folder, choose an embedding provider, and optionally choose the tool set.

## Core Variables

| Variable | Meaning |
| -------- | ------- |
| `LINZA_VAULT` | Absolute path to the working folder or Markdown vault. Required. |
| `LINZA_EMBED_PROVIDER` | Embedding provider: `lmstudio`, `ollama`, or `openai`. |
| `LINZA_EMBED_URL` | Local or remote embedding endpoint. |
| `LINZA_EMBED_MODEL` | Embedding model name. |
| `LINZA_EMBED_KEY` | API key, if the provider needs one. |
| `LINZA_TOOL_SURFACE` | Tool set: `default` for normal use, `advanced` for debugging. |

## Tool Set

For normal work, keep `LINZA_TOOL_SURFACE=default`. The agent sees a compact tool set: diagnostics, index, search, map, review cards, teaching, growth, relationship explanation, and context export.

`advanced` is for development and diagnostics. It exposes lower-level actions for inspecting local database state, and is usually unnecessary for user workflows.

## MCP Configuration Example

```json
{
  "mcpServers": {
    "linza": {
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/your-folder",
        "LINZA_EMBED_PROVIDER": "lmstudio",
        "LINZA_EMBED_URL": "http://127.0.0.1:1234/v1",
        "LINZA_EMBED_MODEL": "your-embedding-model-name",
        "LINZA_TOOL_SURFACE": "default"
      }
    }
  }
}
```

For VS Code / Copilot MCP the shape is almost the same, but the key is `servers`:

```json
{
  "servers": {
    "linza": {
      "type": "stdio",
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/your-folder",
        "LINZA_EMBED_PROVIDER": "lmstudio",
        "LINZA_EMBED_URL": "http://127.0.0.1:1234/v1",
        "LINZA_EMBED_MODEL": "your-embedding-model-name"
      }
    }
  }
}
```

## Embeddings

For local work, LM Studio is usually the simplest path: data stays on your machine, while LINZA gets vectors for search, topic maps, and review cards.

If you change provider, model, or embedding dimension, run a full reindex. Vectors from different spaces cannot be compared reliably.
