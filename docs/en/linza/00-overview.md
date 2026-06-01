---
prev: false
next:
  text: Use Cases
  link: /en/linza/use-cases
---

# LINZA

LINZA is a local MCP server for agent work with a Markdown folder and incoming text material. The server creates a SQLite sidecar beside the working folder: `.linza/linza.db`.

The sidecar stores the index, text chunks, imported artifacts, review proposals, accepted decisions, traces, and context packs. Source files remain the primary material.

## Workflow

1. Connect a working folder through `LINZA_VAULT`.
2. Index Markdown files or ingest incoming artifacts.
3. Ask for a map, search, relation explanation, or review proposals.
4. Check evidence and dry-run output.
5. Apply only selected IDs.

## Supported Now

- Indexing Markdown files from the working folder.
- Ingesting pasted text and local `.md`, `.txt`, `.json`, `.docx`, `.xlsx`, `.pdf` files.
- Semantic and lexical search over indexed notes.
- Review queues with stable IDs: `rq-*` for folder maps and `aw-*` for artifacts, memory, and calibr.
- Local memory, relation explanations, context packs, and trace review for agent work.

PDF extraction needs `pypdf` or `PyPDF2`. LINZA does not fetch web pages itself: an agent should extract readable text with a browser/web-fetch tool and pass it as an artifact.

## Write Boundaries

Indexing, search, maps, relation explanations, and context packs do not edit source note bodies.

Visible changes go through review/apply. Apply actions return preview by default. A real write needs an exact ID and `dry_run=false`.

The normal reviewed apply path can write compact YAML for accepted `role` or `domains`. Hierarchy, causal links, memory, trace lessons, and incoming artifacts stay in the sidecar. Reports are written under `.linza/reports`; context packs are written under `.linza/context-packs`.

## Next

- [Use Cases](/en/linza/use-cases) - where LINZA helps.
- [How It Works](/en/linza/how-it-works) - what is stored and applied.
- [Quick Start](/en/linza/quick-start) - installation and MCP setup.
- [MCP Tools](/en/linza/tools) - public tools and `agent_workspace`.

## Links

- [GitHub](https://github.com/Semiotronika/LINZA-MCP)
- [PyPI](https://pypi.org/project/linza-mcp/)
- [Semiotronika Products](/en/products)
