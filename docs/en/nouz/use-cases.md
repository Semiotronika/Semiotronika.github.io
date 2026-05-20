# Use Cases

NOUZ is useful in two different situations: when a knowledge base is just beginning, and when it already exists, has history, and contains mixed conventions. These need different workflows.

## Who It Is For

NOUZ makes sense when a base needs structure for an agent: levels, links, YAML metadata, navigation, and a local index. The size of the base is not the main criterion.

Good fit:

- a new base from day one, if you want to keep it structured in LUCA mode: Markdown, YAML, parents, children, and navigation without embeddings;
- developers and teams who need MCP access to living project memory;
- Obsidian users whose vault already has some links, while many relationships still live only in their head;
- large or uneven bases where etalons, drift, semantic bridges, and the gap between metadata and content matter.

May be unnecessary:

- a folder that will stay small and simple: 20-30 notes, no graph, no agent workflow, no expected growth;
- if all you need is full-text search over text;
- if YAML, links, and minimal structure are not part of the workflow.

## New Knowledge Base

**Situation:** you are starting a vault from scratch or importing a small material set. The structure has not accumulated accidental links yet, so NOUZ can be introduced gently: the graph grows with the base.

**How to work:**

1. Start with LUCA: YAML, parents, graph navigation.
2. Add new notes normally.
3. For new notes, call `suggest_metadata` or `suggest_parents`.
4. When enough material has accumulated, enable PRIZMA: etalons, embeddings, bridges, `core_mix`.

Minimal note:

```yaml
---
type: note
level: 4
parents:
  - "[[Module Name]]"
parents_meta:
  - entity: Module Name
    link_type: hierarchy
tags:
  - topic
---
```

What the agent can do:

```text
suggest_metadata("New Note.md")
→ {
    sign: "E",
    level: 4,
    suggested_parents: ["Project/Architecture.md"],
    bridges: [
      {type: "semantic", target: "Project/Decisions/ADR-001.md", cosine: 0.74, proposed: true}
    ]
  }
```

**Idea:** you shape the structure as the base grows, while NOUZ proposes placement, domain, tags, and bridges. The decision stays with you.

---

## Existing Knowledge Base

**Situation:** you already have a large vault: hundreds of notes, old folders, different writing styles, partially filled YAML. Here it is risky to turn on automation and trust it all at once. Settings depend heavily on the actual data.

**How to work:**

1. Index the base first, without mass rewrites.
2. Inspect real domains, note types, levels, and the gap between folders and content.
3. Write etalons for this base, using its real topics and vocabulary.
4. Run `calibrate_cores` and check raw / mean-centered cosines.
5. Tune thresholds: `sign_spread`, `pattern_second_sign_threshold`, `semantic_bridge_threshold`, `parent_link_threshold`.
6. Run `recalc_signs`, `suggest_metadata`, and `process_orphans` in batches, reviewing results.

Example:

```bash
index_all()
calibrate_cores()
recalc_signs()
suggest_metadata("New Monitoring Runbook.md")
```

```text
bridges:
  - semantic: "Project/Monitoring.md" (cosine: 0.71)
  - semantic: "Project/Incidents/2026-04.md" (cosine: 0.63)
```

**Idea:** NOUZ shows the state of an existing base: lost links, unmarked notes, weak parents, drift between `sign` and `core_mix`. New structure appears through your decisions and is written only where you choose.

---

## Drift: When Structure Diverges from Reality

**Situation:** the "Monitoring" module started as technical instructions, but later accumulated incident notes, on-call rules, and process decisions. The name and YAML say one thing; the content has become broader.

```python
recalc_core_mix(dry_run=True)
# → sign: E (Engineering), core_mix: {S: 61%, E: 39%}
# → DRIFT WARNING: sign=E, core_mix says S dominates
```

`core_drift` is a signal: the module has moved away from its original intent. You can rename it, split it, move some notes, or accept the evolution.

---

## AI Agent: Structured Memory

**Situation:** an agent needs more than similar-text search. It needs to know where a note sits in the graph and what connects to it.

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

```text
User: "Tell me about the monitoring architecture"

Agent uses NOUZ:
1. list_files(subfolder="infrastructure") → 12 files
2. get_children("Infrastructure/Monitoring.md") → [Prometheus.md, Grafana.md, Alerting.md]
3. get_parents("Infrastructure/Prometheus.md") → [Monitoring.md]
4. read_file each child → full context
```

The agent answers from the structure of your knowledge base: hierarchy, neighboring nodes, child materials, and close embedding matches.

---

## Living Project Documentation

**Situation:** a project has architecture notes, decisions, bugs, retrospectives, instructions, and logs. These often live near each other, but not always connected.

```text
Project/
├── Architecture.md       # L3 module
├── Decisions/
│   ├── ADR-001.md        # L4 note
│   ├── ADR-002.md
├── Bugs/
│   ├── Bug-tracker.md    # L3 module
│   ├── Issue-42.md       # L4 note
└── Retrospectives/
    └── 2026-Q1.md        # L5 artifact
```

`get_children("Project/Architecture.md")` gives the agent the hierarchy. `suggest_parents("New bug.md")` finds similar past incidents. `list_files(level=4)` shows the key notes that make up the project.

## What Stays Yours

NOUZ computes, compares, and proposes, but the structure of the base remains your decision. This matters for living archives: the server makes levels, links, domains, and drift visible, while you choose what to accept, split, or keep as a bridge in the graph.

The usual next steps are simple: tune etalons for your base, check their quality with `calibrate_cores`, then connect an MCP client and give the agent graph context.

## If Your Base Is Not in Obsidian

Obsidian is the easiest way to try NOUZ. The same approach can also move into other working environments: Notion, Confluence, Google Docs, GitHub, or an internal portal. Through MCP connectors or custom adapters, NOUZ works beside the current base as a structural layer while the familiar tool stays in place.

In working bases, the task is usually broader than a one-time install. Start with a small part of the base and inspect duplicates, outdated pages, weak links, disconnected sections, and places where the agent lacks enough context. Then define domains, metadata rules, a local index, and a review process for proposed changes.

Semiotronika can help make that stage calm and practical: inspect the existing base, shape an agent-ready structure, and leave a workflow where the agent suggests changes and you decide what to accept.

If you want to discuss where to start with your own base, contact Semiotronika on [Telegram](https://t.me/Masha_Belkina) or by [email](mailto:belkinamariaigorevna@yandex.ru). A short note about where the material lives and what the agent should be able to do is enough.
