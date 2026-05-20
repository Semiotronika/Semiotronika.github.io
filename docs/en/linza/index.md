---
prev: false
next:
  text: Use Cases
  link: /en/linza/use-cases
---

# LINZA

LINZA is a local lens for notes, documents, articles, chats, logs, and drafts. The agent maps topics and relations; you confirm.

The core idea is simple: **you decide, the agent executes**. LINZA shows small review cards with evidence, then stores accepted conclusions next to your files in a local `.linza/linza.db` SQLite database. Source note bodies stay in place.

## What LINZA Does

- indexes a Markdown folder and incoming material;
- builds a map of topics, nodes, relations, and gaps;
- shows proposals as review cards with evidence;
- learns from accepted examples and proposes the next steps in preview;
- stores working conclusions locally in a SQLite database beside the folder.

## Workflow

<div class="pipeline">
  <div class="step" data-n="1">
    <h4>Index</h4>
    <p>LINZA reads the folder and builds a local SQLite index.</p>
  </div>
  <div class="step" data-n="2">
    <h4>Map</h4>
    <p>The agent shows domains, key nodes, and first relation signals.</p>
  </div>
  <div class="step" data-n="3">
    <h4>Review</h4>
    <p>You review a small batch of cards and accept only the useful ones.</p>
  </div>
  <div class="step" data-n="4">
    <h4>Teach</h4>
    <p>Accepted examples become the learning layer for future proposals.</p>
  </div>
  <div class="step" data-n="5">
    <h4>Grow</h4>
    <p>LINZA proposes the next batch from learned rules, starting in preview.</p>
  </div>
</div>

## Next To NOUZ

LINZA fits material that is not ready to be written into structure yet: articles, exports, chats, logs, working drafts, and old folders without a clear map.

NOUZ fits places where structure should already be part of the base: levels, links, metadata, graph context, and regular navigation for an agent.

LINZA and NOUZ cover different stages of the work. LINZA helps inspect and review material; NOUZ helps keep a stable structure.

## Where To Go Next

- [Use Cases](/en/linza/use-cases) — where LINZA is especially useful.
- [Quick Start](/en/linza/quick-start) — installation, embeddings, and MCP configuration.
- [How It Works](/en/linza/how-it-works) — index, map, review, teach, and grow.
- [MCP Tools](/en/linza/tools) — what the agent can do through LINZA.
- [Safety Boundary](/en/linza/safety) — the guardrails around source files.

## Links

- [GitHub](https://github.com/Semiotronika/LINZA-MCP)
- [PyPI](https://pypi.org/project/linza-mcp/)
- [Semiotronika Products](/en/products)
