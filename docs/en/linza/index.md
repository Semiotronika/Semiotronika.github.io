---
prev: false
next:
  text: Use Cases
  link: /en/linza/use-cases
---

# LINZA

LINZA is a local MCP server for notes, documents, articles, chats, logs, and drafts. It does not rewrite source files: the agent builds a working map of topics and relations beside them, while you calmly confirm or reject its proposals.

The core idea is simple: **it does not change your data — it changes how you see it**. LINZA shows small review cards with evidence, then stores accepted conclusions in a local `.linza/linza.db` SQLite database. Source note bodies stay in place.

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

## What Is Inside

LINZA is useful when the material exists, but its shape still needs to be seen. It helps the agent rely on text fragments, recurring topics, and examples you have accepted instead of guessing from file names.

A review card answers practical questions: what is being proposed, why the agent thinks so, which fragments count as evidence, and what will change after acceptance. Weak cards can be skipped; that also teaches LINZA what not to repeat.

After a few confirmations, LINZA starts working more precisely: it remembers useful decisions, carefully proposes similar relations, and keeps the next step small.

## Where To Go Next

- [Use Cases](/en/linza/use-cases) — where LINZA is especially useful.
- [Quick Start](/en/linza/quick-start) — installation, embeddings, and MCP configuration.
- [How It Works](/en/linza/how-it-works) — index, map, review, teach, and grow.
- [MCP Tools](/en/linza/tools) — what the agent can do through LINZA.
- [Configuration](/en/linza/configuration) — environment variables, embedding model, and tool set.
- [Safety Boundary](/en/linza/safety) — the guardrails around source files.

## Links

- [GitHub](https://github.com/Semiotronika/LINZA-MCP)
- [PyPI](https://pypi.org/project/linza-mcp/)
- [Semiotronika Products](/en/products)
