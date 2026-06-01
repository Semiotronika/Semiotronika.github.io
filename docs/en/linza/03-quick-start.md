---
prev:
  text: How It Works
  link: /en/linza/how-it-works
next:
  text: MCP Tools
  link: /en/linza/tools
---

# Quick Start

A working setup needs the package, a folder, an MCP client, and an embedding endpoint. The MCP process can start before model availability is checked, but `index_all`, semantic search, and bridges call the embedding API.

## Install

```powershell
python -m pip install linza-mcp
```

For direct PDF reading:

```powershell
python -m pip install "linza-mcp[pdf]"
```

Without the optional PDF dependency, LINZA still reads Markdown, TXT, JSON, DOCX, and XLSX.

## Prepare Embeddings

Local path through LM Studio:

1. Open LM Studio.
2. Download an embedding model.
3. Start Local Server.
4. Check the endpoint: `http://127.0.0.1:1234/v1`.

If you change provider, model, or dimension, run a full reindex.

## Connect MCP

Replace `/absolute/path/to/your-folder` with the working folder. Without `LINZA_VAULT`, the server uses `./vault`; for real work, set the path explicitly.

```json
{
  "mcpServers": {
    "linza": {
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

VS Code / Copilot MCP usually uses the top-level key `servers` and the field `"type": "stdio"`.

## Variables

| Variable | Value |
| --- | --- |
| `LINZA_VAULT` | Working folder; defaults to `./vault` |
| `LINZA_EMBED_PROVIDER` | `lmstudio`, `ollama`, or `openai` |
| `LINZA_EMBED_URL` | Embedding API URL |
| `LINZA_EMBED_MODEL` | Embedding model name |
| `LINZA_EMBED_KEY` | Endpoint key, if needed |
| `LINZA_TOOL_SURFACE` | `default` or `advanced` |

## Check

```powershell
linza-mcp --version
```

After connecting, ask the agent:

```text
Check LINZA through agent_workspace(action="doctor").
Run index_all for the working folder.
Show agent_workspace(action="map") and the first review proposals.
Do not apply anything without a dry-run and exact IDs.
```
