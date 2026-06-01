---
prev:
  text: Quick Start
  link: /en/linza/quick-start
next: false
---

# MCP Tools

By default, LINZA exposes 7 main MCP tools. The main facade for agents is `agent_workspace`.

The normal user path stays in the default mode: check readiness, index the folder, search, read exact files, inspect counters, and run work through one workflow facade.

In practice, you can ask LINZA in ordinary language: check the folder, show the map, find related material, or prepare a context pack. The names below are a reference for what the MCP client calls during the work.

## Main Tools

| Tool | Purpose |
| --- | --- |
| `guide_next_steps` | Show the next safe step |
| `agent_workspace` | One entry point for map, inbox, review, apply, teach, grow, connect, memory, traces, and context export |
| `index_all` | Update the Markdown-folder index |
| `search` | Search notes through semantic + lexical search |
| `read_file` | Read an exact Markdown file |
| `get_stats` | Show sidecar counters |
| `scan_vault` | Check the folder without writing |

## `agent_workspace` Actions

`agent_workspace` carries the main workflow inside one tool. It can show the map, handle incoming material, return review cards, apply selected IDs, search accepted memory, and export context.

| Action | Purpose |
| --- | --- |
| `doctor` | Check sidecar, index, inbox, review gates, and calibr readiness |
| `map` | Read-only working-folder map |
| `ingest_artifacts` | Import incoming material into the sidecar |
| `analyze_inbox` | Analyze incoming artifacts |
| `review_next` | Show next `aw-*` cards |
| `apply_review_items` | Preview or apply selected `aw-*` IDs |
| `history` | Show accepted and revoked decisions |
| `revoke_approval` | Softly revoke an accepted decision by `approval_id` |
| `teach` | Select seed cards |
| `grow` | Select new cards from accepted examples |
| `connect` | Explain a relation between two nodes |
| `search_memory` | Search artifacts and accepted memory |
| `export_context` | Markdown context packet |
| `record_trace` | Store an agent-work trace |
| `analyze_trace` | Trace metrics |
| `review_calibr` | calibr cards for review |

## How To Ask LINZA

If the path is unknown, ask LINZA to find material on the topic. Under the hood, this usually starts with `search`, then opens an exact file through `read_file`.

If you need the folder state, ask LINZA to check the folder and show the map. This corresponds to `agent_workspace(action="doctor")` and `agent_workspace(action="map")`.

For any sidecar or compact YAML write, ask for review cards and a preview first. Internally, this is `review_next`, then `apply_review_items` with `dry_run=true`. A real write needs exact IDs and explicit `dry_run=false`.

For a handoff to a new session, ask LINZA to prepare a context pack. Context packs are saved in `.linza/context-packs`.

## Additional Mode

For development and audit, enable the full tool list:

```powershell
$env:LINZA_TOOL_SURFACE="advanced"
```

It adds low-level operations: `index_file`, `write_file`, `patch_properties`, search profiles, tag audit, reports, `build_review_apply_queue`, `approve_review_queue_items`, `show_flow`, `create_context_pack`, and diagnostics.

`write_file` in this mode writes Markdown only and requires explicit `allow_overwrite=true` to replace an existing file. The normal LINZA path uses review cards and sidecar records.

If the next step is a dedicated semantic ontology for a knowledge base, open [NOUZ](/en/nouz/).
