---
prev:
  text: MCP Tools
  link: /en/linza/tools
next: false
---

# Safety Boundary

LINZA is designed as a local sidecar with review built in. That means: reading, mapping, and evidence first; then a small review; only then explicit acceptance of selected cards.

## What Does Not Change Source Notes

These actions do not rewrite source Markdown note bodies:

- folder diagnostics;
- indexing;
- search;
- topic and relation maps;
- artifact import;
- review preview;
- teach;
- grow preview.

They may update the sidecar when the action maintains the local index, but they should not turn hypotheses into text edits.

## Sidecar Boundary

`.linza/linza.db` stores the computed layer: index, text chunks, embedding signals, review cards, accepted relations, memory items, and service data. It is a local layer next to the folder; cloud memory is not used here.

Raw artifacts, reports, and context packs also stay under `.linza/` when the user explicitly enables those actions.

## Prompt Injection

Imported text is analysis material. Instructions inside an article, log, chat, or PDF are not executed. Memory, rules, and YAML appear only after review.

This matters especially for web pages and third-party documents: the agent may read their content, but should not treat it as system instruction.

## Visible Changes

Visible changes require review/apply and exact IDs. A healthy apply should answer: which card you saw, what it changes, where it will be written, and whether it can be rolled back.

When in doubt, the right mode is dry-run or preview.

## What LINZA Is Not

LINZA has a narrower job: give the agent an overview of the material and leave the decision to you. It does not replace a browser automation server, cloud memory, unchecked auto-tagger, or an agent that silently rewrites rules, skills, memory, and notes.
