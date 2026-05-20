---
prev:
  text: How It Works
  link: /en/linza/how-it-works
next:
  text: Configuration
  link: /en/linza/configuration
---

# MCP Tools

In normal use, you should not need to choose low-level tools by hand. The agent starts with `agent_workspace` or `guide_next_steps`, while LINZA keeps the working route: check the folder, index, show a map, build review cards, learn from accepted examples, and propose the next step in preview.

## Default Tool Set

By default, LINZA exposes a compact MCP tool set of 15 tools.

| Tool | Purpose |
| --- | --- |
| `agent_workspace` | One entry point for diagnostics, import, map, review, teaching, growth, relations, memory search, and context export |
| `guide_next_steps` | Show the next safe step in plain language |
| `index_all` | Index the Markdown folder into `.linza/linza.db` |
| `search` | Semantic and lexical search |
| `read_file` | Read an exact file from the working folder |
| `get_stats` | Quick local database counters |
| `scan_vault` | Read-only folder diagnostic |
| `build_review_apply_queue` | Build review cards with stable `rq-*` IDs |
| `approve_review_queue_items` | Preview or apply selected cards |
| `list_approved_items` | Show accepted local records |
| `explain_node` | Explain one node: links, bridges, context |
| `explain_relationship` | Explain a possible relation between two nodes |
| `who_depends` | Show dependencies and neighbors |
| `show_flow` | Find a route or flow between nodes |
| `create_context_pack` | Build a compact context package for an agent |

## `agent_workspace`

This is the main agent entry point. It contains working actions such as `doctor`, `map`, `review`, `teach`, `grow`, `connect`, and `calibr`. You should see a short status, evidence, next steps, and a clear explanation of what could change; raw JSON stays in the technical layer.

## Review And Apply

LINZA uses stable `rq-*` IDs. That makes application exact: only cards you have seen should be accepted. If IDs do not match, stop and rebuild the preview.

## Advanced Tool Set

For development and debugging, advanced tools can be enabled:

```powershell
$env:LINZA_TOOL_SURFACE="advanced"
```

Normal work does not need this. Keep the path short: diagnostics, index, map, review cards, teaching, and the next preview.
