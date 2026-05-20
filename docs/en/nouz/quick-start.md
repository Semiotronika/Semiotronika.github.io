---
prev:
  text: Use Cases
  link: /en/nouz/use-cases
next:
  text: How NOUZ Works
  link: /en/nouz/how-it-works
---

# Quick Start

Get NOUZ running in 5 minutes.

## Installation

```bash
pip install nouz-mcp
```

## Setup

### 1. Create config.yaml (Optional)

Without `config.yaml`, the server starts in **LUCA** mode (pure graph). For PRIZMA/SLOI, create a local config:

```bash
cp config.template.yaml config.yaml
```

On Windows PowerShell:

```powershell
Copy-Item config.template.yaml config.yaml
```

If your MCP client starts the server outside the project directory, pass the path explicitly through `NOUZ_CONFIG`.

Minimal config:

```yaml
mode: prizma  # luca | prizma | sloi
```

For semantic classification, add domains (etalons) — full examples → [Configuration](/en/nouz/configuration).

In NOUZ terms, a domain, or core, is a broad area of the vault: product, engineering, processes, personal notes, or another frame that fits your material. `sign` is the short domain code, while `artifact_sign` is the short material-type code: note, log, source, specification.

### 2. Point to Your Vault

```bash
export OBSIDIAN_ROOT=/path/to/your/obsidian-vault
```

### 3. Connect an Embedding Provider (For PRIZMA/SLOI)

Any OpenAI-compatible API works: LM Studio, Ollama, or a cloud provider.

```bash
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

### 4. Connect to Your AI Client

Add to your MCP configuration (Claude Desktop, Cursor, OpenCode, etc.):

```json
{
  "mcpServers": {
    "nouz": {
      "command": "nouz-mcp",
      "env": {
        "OBSIDIAN_ROOT": "/path/to/vault",
        "EMBED_API_URL": "http://127.0.0.1:1234/v1"
      }
    }
  }
}
```

## Launch

```bash
nouz-mcp
```

```
[INFO] Indexing database on startup...
[INFO] Indexed: 42 files, errors: 0
[INFO] Core etalons loaded from DB: ['S', 'D', 'E']
[INFO] NOUZ MCP Server v3.0.3 started
```

## First Steps

Once NOUZ is connected, your AI assistant uses the tools directly:

```python
# Classify a new note
suggest_metadata("New Note.md")
# → {sign: "E", artifact_sign: "n", level: 4, bridges: [...]}

# Recalculate signs across the entire knowledge base
recalc_signs()
recalc_core_mix()
```

## Which Mode to Choose

| If you need | Mode |
| ----------- | ---- |
| Graph navigation, parents, children, and indexing without embeddings | **LUCA** |
| Semantic links, drift signals, and related material | **PRIZMA** |
| A strict five-level structure with hierarchy validation | **SLOI** |

## Safe First Run

Start with indexing and reading: `index_all`, `list_files`, `read_file`, `get_parents`, `get_children`. These actions reveal the state of the base without mass edits.

For changes, use suggestions and preview first: `suggest_metadata`, `suggest_parents`, `process_orphans(dry_run=true)`. Once the result is clear, write only YAML metadata with `update_metadata` while preserving the note body.

## Simple Start

Begin with **LUCA mode** — no embeddings required:

```yaml
mode: luca
```

You get the full DAG: hierarchical connections, graph navigation, and local indexing. Add semantics later by switching to PRIZMA or SLOI.

## Requirements

- Python 3.10+
- Obsidian vault (any directory with `.md` files)
- No SQLite server required: Python includes `sqlite3`, and the package installs `aiosqlite`
- LM Studio, Ollama, or OpenAI-compatible API (optional, for PRIZMA/SLOI)
