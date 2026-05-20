---
prev:
  text: Quick Start
  link: /en/linza/quick-start
next:
  text: MCP Tools
  link: /en/linza/tools
---

# How LINZA Works

LINZA builds a local working layer around a folder. Source files remain the source of truth; computed conclusions, indexes, and approvals live next to them in `.linza/linza.db`.

## Local SQLite Sidecar

The sidecar is a separate SQLite database beside your files. LINZA stores the index, text chunks, embedding signals, review cards, accepted relations, memory items, calibration lessons, and counters there.

This lets the agent learn from the base without immediate YAML writes or text edits. Visible changes remain a separate, explicit step.

## Pipeline

<div class="pipeline">
  <div class="step" data-n="1">
    <h4>Doctor</h4>
    <p>Check the path, folder access, file count, and sidecar state.</p>
  </div>
  <div class="step" data-n="2">
    <h4>Index</h4>
    <p>Read material, build chunks, compute embeddings, and update the local index.</p>
  </div>
  <div class="step" data-n="3">
    <h4>Map</h4>
    <p>Show areas, key nodes, bridges, gaps, and first relation signals.</p>
  </div>
  <div class="step" data-n="4">
    <h4>Review</h4>
    <p>Build a small batch of review cards with evidence and stable `rq-*` IDs.</p>
  </div>
  <div class="step" data-n="5">
    <h4>Grow</h4>
    <p>After accepted examples, propose the next batch in preview.</p>
  </div>
</div>

## Review Cards

A card should answer your questions:

- what is being proposed;
- why LINZA thinks so;
- which files or snippets are evidence;
- what will change if accepted;
- whether it is safe to skip.

Accepted cards become learning material for future proposals. Weak cards should be skipped; that also improves the quality of future proposals.

## Embeddings

Embeddings power semantic search, topic maps, and semantic bridges. LINZA does not mix embedding spaces: if you change provider, model, or dimension, run a full reindex.

The local LM Studio setup is usually the calmest path: data stays nearby, while the agent gets enough signal for maps and review.

## Teach And Grow

`teach` selects seed cards that help LINZA learn which relations and memory items the user considers useful. `grow` uses accepted examples, but starts with a preview and explains the selection rules.

This boundary matters: LINZA may continue the work, but growth always starts with a small batch and confirmation.
