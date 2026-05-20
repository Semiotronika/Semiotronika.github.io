# MCP Tools

In normal use, you should not need to choose low-level tools by hand. The agent starts with `agent_workspace` or `guide_next_steps`, while LINZA keeps the working route: check the folder, index, show a map, build review cards, learn from accepted examples, and propose the next preview.

## Default Surface

By default, LINZA exposes a compact MCP surface of 15 tools.

| Tool | Purpose |
| --- | --- |
| `agent_workspace` | One facade for map, ingest, review, teach, grow, connect, memory search, context export, calibr, and doctor |
| `guide_next_steps` | Show the next safe step in plain language |
| `index_all` | Index the Markdown folder into `.linza/linza.db` |
| `search` | Semantic and lexical search |
| `read_file` | Read an exact file from the vault |
| `get_stats` | Quick sidecar counters |
| `scan_vault` | Read-only folder diagnostic |
| `build_review_apply_queue` | Build review cards with stable `rq-*` IDs |
| `approve_review_queue_items` | Dry-run or apply selected cards |
| `list_approved_items` | Show accepted local sidecar records |
| `explain_node` | Explain one node: links, bridges, context |
| `explain_relationship` | Explain a possible relation between two nodes |
| `who_depends` | Show dependencies and neighbors |
| `show_flow` | Find a route or flow between nodes |
| `create_context_pack` | Build a compact context pack for an agent |

## `agent_workspace`

This is the main agent entry point. It contains working actions such as `doctor`, `map`, `review`, `teach`, `grow`, `connect`, and `calibr`. The user should see a short status, evidence, next steps, and a clear explanation of what could change; raw JSON stays in the technical layer.

## Review And Apply

LINZA uses stable `rq-*` IDs. That makes apply exact: only cards you have seen should be accepted. If IDs do not match, stop and rebuild the preview.

## Advanced Surface

For development and debugging, advanced tools can be enabled:

```powershell
$env:LINZA_TOOL_SURFACE="advanced"
```

Normal user work does not need this. Keep the path short: `doctor -> index -> map -> review -> teach -> grow preview`.
