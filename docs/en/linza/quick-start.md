# Quick Start

Starting LINZA needs three things: the package, a folder, and an embedding model.

## Install

```powershell
python -m pip install linza-mcp
```

If you want LINZA to extract PDF text directly:

```powershell
python -m pip install "linza-mcp[pdf]"
```

The normal install is enough for Markdown, TXT, JSON, DOCX, and XLSX. `[pdf]` adds a local PDF extractor.

## Folder

LINZA works with any Markdown folder: an Obsidian vault, project documentation, a research folder, or a standalone working directory.

In the examples below, replace `/absolute/path/to/workspace-or-vault` with your own path.

## Embeddings

Semantic search and topic maps need an embedding model. The simplest local path is LM Studio:

1. Open LM Studio.
2. Download an embedding model, for example `text-embedding-granite-embedding-278m-multilingual`, `nomic-embed-text-v1.5`, or another multilingual embedding model.
3. Start Local Server.
4. Make sure the endpoint is available at `http://127.0.0.1:1234/v1`.

## MCP Configuration

Claude Desktop, Cursor, OpenCode, and other MCP clients usually use `mcpServers`:

```json
{
  "mcpServers": {
    "linza": {
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/workspace-or-vault",
        "LINZA_EMBED_PROVIDER": "lmstudio",
        "LINZA_EMBED_URL": "http://127.0.0.1:1234/v1",
        "LINZA_EMBED_MODEL": "your-embedding-model-name",
        "LINZA_TOOL_SURFACE": "default"
      }
    }
  }
}
```

VS Code / Copilot MCP uses `servers`:

```json
{
  "servers": {
    "linza": {
      "type": "stdio",
      "command": "linza-mcp",
      "env": {
        "LINZA_VAULT": "/absolute/path/to/workspace-or-vault",
        "LINZA_EMBED_PROVIDER": "lmstudio",
        "LINZA_EMBED_URL": "http://127.0.0.1:1234/v1",
        "LINZA_EMBED_MODEL": "your-embedding-model-name"
      }
    }
  }
}
```

## Check

```powershell
linza-mcp --version
```

Then ask the agent:

```text
Check LINZA with agent_workspace(action="doctor").
Index the folder and show the first 3-5 review cards.
```

A good first run should stay small: diagnostic, index, map, a few cards. Do not start with mass apply.
