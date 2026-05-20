---
prev: false
next:
  text: Use Cases
  link: /en/nouz/use-cases
---

# NOUZ

NOUZ turns a folder of Markdown notes into a living, navigable knowledge graph, where links and levels matter as much as the content.

Its job is to give an AI agent verifiable context. The agent sees not only file text, but also the note's place in the base: parent and child nodes, level, domain, neighboring material, and drift signals. It can propose metadata or bridges, and you decide what to accept.

## What NOUZ Does

- gives an agent navigation through the base: a note's graph position, neighboring material, parents, and children;
- keeps a local SQLite index so the whole folder does not need to be reread every time;
- works with YAML metadata, levels, and explicit note relationships;
- in semantic mode, compares texts with etalons, computes `core_mix`, finds bridges, and shows drift;
- fits Obsidian, Markdown folders, and project documentation where long-term structure matters.

## When It Fits

NOUZ is useful when a base has already become working memory: decisions, notes, logs, specs, research, recurring themes, and places where a note's graph position matters for the agent's answer.

If the material is still raw, incoming, and not ready for structural writes, start with LINZA. When structure should already be part of the base and the agent needs graph context, NOUZ fits better.

## Where To Go Next

- [Use Cases](/en/nouz/use-cases) — when to connect NOUZ and how it behaves in new or existing bases.
- [Quick Start](/en/nouz/quick-start) — installation, configuration, and the first MCP run.
- [How It Works](/en/nouz/how-it-works) — graph structure, etalons, mean-centering, `core_mix`, and drift.
- [MCP Tools](/en/nouz/tools) — what the agent can do through NOUZ.
- [Configuration](/en/nouz/configuration) — modes, etalons, thresholds, and environment variables.
- [Safety Boundary](/en/nouz/safety) — how to read, propose, and write changes without unnecessary risk.
- [Etalon Quality](/en/nouz/etalon-quality) — why raw cosines are not enough and how to check separation.

## Links

- [GitHub](https://github.com/Semiotronika/NOUZ-MCP)
- [PyPI](https://pypi.org/project/nouz-mcp/)
- [All Semiotronika products](/en/products)
