---
prev:
  text: Configuration
  link: /en/nouz/configuration
next:
  text: Etalon Quality
  link: /en/nouz/etalon-quality
---

# Safety Boundary

NOUZ works with a live Markdown base, so the main rule is simple: read and propose freely; write only after a clear, narrow decision.

## Read First

For the first pass, use actions that show the state of the base:

- `list_files` — inspect files and filters by level, sign, or folder;
- `read_file` — read a note with its YAML block;
- `get_parents` and `get_children` — check the note's place in the graph;
- `suggest_metadata` and `suggest_parents` — get proposals without writing.

This gives the agent structure without letting it change note text or make decisions for you.

## Write After Review

For safe edits, use `update_metadata`: it changes the YAML block and preserves the note body. This is the main path for `type`, `level`, `sign`, `artifact_sign`, `tags`, `parents`, and `parents_meta`.

Use `write_file` only when you really want to create or replace a file. The server checks the graph for cycles and synchronizes links, but the write decision remains yours.

## Read-Only Mode

If the base should be available for analysis but all writes must be blocked, enable:

```bash
NOUZ_READ_ONLY=true
```

In this mode, reading, navigation, search, and proposals remain available. Write tools, mass indexing, and recalculation are hidden or blocked.

If a cache is needed in read-only mode, allow it separately:

```bash
NOUZ_CACHE_WRITE=true
```

## Index Boundary

NOUZ stores a service index in SQLite: metadata, graph links, embeddings, etalon vectors, `core_mix`, and automatic signals. This computed layer sits beside the base; it does not replace your Markdown files.

YAML stays the explicit part of the base. Semantic bridges, tag candidates, and possible parents are returned as proposals first.

## A Good Working Order

1. Connect the folder and check the path.
2. Read a few key notes.
3. Inspect parents, children, and files without metadata.
4. Ask for proposals on a small batch.
5. Write only the changes you actually accept.

That way NOUZ helps the agent navigate the base without becoming an automatic structure rewriter.
