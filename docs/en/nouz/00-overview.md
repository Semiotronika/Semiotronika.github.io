---
prev: false
next: false
---

# NOUZ

NOUZ is an MCP server for structural memory over Obsidian, Logseq, and any folder of Markdown files. It does not replace your knowledge base or move your notes into a new application: source files remain Markdown with YAML frontmatter, while a local SQLite index keeps the graph, semantic layer, chunks, and agent navigation state.

The core idea is: **structure emerges from content**. An agent should not read a random file from a folder and guess the rest. It needs verifiable context: where the note belongs, which parents and children it has, which domain it describes, which links are explicit, and which links are only suggestions.

## What NOUZ Does

- reads Markdown files and YAML frontmatter;
- builds a local note graph through `parents` and `parents_meta`;
- exposes MCP tools for reading, navigation, safe YAML updates, and indexing;
- keeps computed state in SQLite: metadata, links, embeddings, chunks, `sign_auto`, `sign_source`, `artifact_sign`, and `core_mix`;
- in PRIZMA and SLOI modes, compares notes with domain etalons, suggests semantic bridges, tag bridges, and drift warnings;
- leaves final decisions to the user or to an agent with explicit permission.

NOUZ fits when a knowledge base has become working memory: notes, decisions, logs, specifications, research, repeated topics, and relationships that matter for the agent's answer.

## The Boundary

NOUZ is not an automatic note-body rewriter. It may suggest a `sign`, `artifact_sign`, parents, tag candidates, or bridges, but writing remains a separate action.

`update_metadata` changes YAML only and preserves the note body. `write_file` creates or replaces a file; use it for existing notes only when you really intend to save a new body.

## Core Model

```text
Markdown vault
  -> YAML metadata
  -> SQLite index
  -> graph navigation
  -> semantic layer
  -> MCP context for an agent
```

Your files stay the source of truth. The SQLite index accelerates agent work and stores computed signals that do not need to be written back to Markdown.

## Modes

| Mode | Use It When |
| --- | --- |
| `luca` | You need graph navigation, YAML, parents, children, and indexing without embeddings. This is the safe default without `config.yaml`. |
| `prizma` | You need domains, etalons, embeddings, semantic bridges, chunk search, `core_mix`, and drift. |
| `sloi` | You need PRIZMA plus strict five-level hierarchy validation. |

## Links

- [GitHub](https://github.com/Semiotronika/NOUZ-MCP)
- [PyPI](https://pypi.org/project/nouz-mcp/)
- [Glama MCP Registry](https://glama.ai/mcp/servers/Semiotronika/NOUZ-MCP)
- [All Semiotronika products](/en/products)
