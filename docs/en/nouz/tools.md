# MCP Tools

Tools are the main interface of NOUZ. Through them an AI agent reads files together with the structure of the base: nodes, links, levels, domains, bridge candidates, and drift signals.

The principle is simple: every action should be explicit. One tool reads a note, another shows its graph position, another suggests metadata, and another recalculates the composition of the base. Automation proposes; you, or an agent following your rules, decide.

NOUZ provides up to 15 tools through the Model Context Protocol. Availability depends on the mode:

| # | Tool | Meaning | LUCA | PRIZMA | SLOI |
| - | ---- | ------- | ---- | ------ | ---- |
| 1 | `read_file` | read a note with YAML and refresh it in the index | ✓ | ✓ | ✓ |
| 2 | `write_file` | write a note with cycle checks and synchronized links | ✓ | ✓ | ✓ |
| 3 | `update_metadata` | update YAML only while preserving note body | ✓ | ✓ | ✓ |
| 4 | `list_files` | inspect the file map without loading full text | ✓ | ✓ | ✓ |
| 5 | `get_children` | traverse down the graph: what this node contains | ✓ | ✓ | ✓ |
| 6 | `get_parents` | traverse up the graph: where this note belongs | ✓ | ✓ | ✓ |
| 7 | `index_all` | build the local index of files, YAML, and links | ✓ | ✓ | ✓ |
| 8 | `suggest_metadata` | propose domain, level, tags, bridges, and warnings | — | ✓ | ✓ |
| 9 | `suggest_parents` | find possible parents by semantic similarity | — | ✓ | ✓ |
| 10 | `embed` | test an embedding for arbitrary text | — | ✓ | ✓ |
| 11 | `calibrate_cores` | build reference vectors for semantic domains | — | ✓ | ✓ |
| 12 | `recalc_signs` | recalculate automatic classification for the base | — | ✓ | ✓ |
| 13 | `recalc_core_mix` | aggregate domain composition bottom-up and reveal drift | — | ✓ | ✓ |
| 14 | `process_orphans` | process files without metadata and propose fills | — | ✓ | ✓ |
| 15 | `add_entity` | create a new entity with initial metadata | — | ✓ | ✓ |

---

## Reading and Writing

### `read_file`

Read a Markdown file and return YAML frontmatter together with content. The YAML fields include `type`, `level`, `sign`, `artifact_sign`, `parents`, and `tags`. Reading also re-indexes the file in the database, so later suggestions use fresh state.

### `write_file`

Create or update a note with YAML frontmatter. Checks the graph for cycles before writing and syncs simple parent links `parents` with detailed link metadata `parents_meta`. This is the final-action tool: read and suggest first, then write.

### `update_metadata`

Update only the YAML frontmatter of an existing note. The Markdown body after frontmatter is preserved exactly. Use it for safe changes to `type`, `level`, `sign`, `artifact_sign`, `tags`, `parents`, and `parents_meta` when the note content must stay untouched.

### `list_files`

List indexed files with filters by `level`, `sign`, `subfolder`, or `no_metadata`.

---

## Graph Navigation

### `get_children`

Get descendants of a node from the DAG index: direct and transitive.

### `get_parents`

Get parent links for a file. Returns `entity` and `link_type` for each connection.

## Semantics <Badge type="tip" text="PRIZMA / SLOI" />

### `suggest_metadata`

Analyzes a file and suggests sign, `artifact_sign`, level, tags, bridges, and hierarchy errors. Suggestions return `proposed: true`: the decision stays with you.

### `suggest_parents`

Finds parent candidates for orphan notes by cosine similarity. Candidates below `parent_link_threshold` are discarded; candidates from the same domain win ties.

### `embed`

Generate an embedding for arbitrary text. Useful for debugging similarity and manual checks.

---

## Database Maintenance <Badge type="tip" text="PRIZMA / SLOI" />

### `index_all`

Re-index all markdown files. With `with_embeddings=true`, also recomputes embeddings.

### `calibrate_cores`

Recompute reference vectors from `config.yaml`. Returns raw and mean-centered pairwise cosine values to check domain separation.

### `recalc_signs`

Reclassify files against current etalons. Updates domain sign `sign`, automatic sign `sign_auto`, sign source `sign_source`, and material type `artifact_sign` in the database. YAML files are not changed. Use `dry_run=true` to preview.

### `recalc_core_mix`

Recalculate `core_mix` bottom-up: L4 gets a profile from text classification, while L3 and L2 aggregate child nodes. Updates the database only.

---

## Automation <Badge type="tip" text="PRIZMA / SLOI" />

### `process_orphans`

Finds files with missing signs or missing parents and suggests sign/artifact_sign, tags, and possible parents. Can run as `dry_run` or write YAML.

### `add_entity`

Creates an entity in one step: writes the file, determines sign/artifact_sign, tags, and with `auto_parents=true` adds the best parent above threshold.
