---
prev:
  text: For Agents
  link: /en/nouz/for-agents
next:
  text: MCP Tools
  link: /en/nouz/tools
---

# How NOUZ Works

NOUZ reads YAML frontmatter, builds a DAG, classifies content through etalons, and proposes links between branches. You define the structure and make the decisions; AI helps compute, compare, and notice weak spots in the graph.

## Graph Context

NOUZ builds the graph **top-down**: from domains to artifacts. The graph defines explicit structure, while the semantic layer adds computed signals: domain, bridges, `core_mix`, and drift.

Through MCP, an agent can explicitly request a note's place in the graph:
- parents and children;
- level and `sign`;
- `core_mix`, when PRIZMA or SLOI is enabled.

That gives the agent both the note text and the note's position in the base. Semantic calculations are separate: text is compared with etalons, bridges are found through embeddings, and `core_mix` shows how note content changes the overall picture bottom-up.

### Level 0 (meta_root)

Anchor node for the whole base. Set in `config.yaml` as `meta_root: "My Knowledge Base"`. L1 domains can reference it, while the node itself is excluded from semantic calculations. In graph visualization, it is the center that holds domains in one system without affecting their content classification.

### Material Type (`artifact_sign`)

Sign determined by content heuristics (logs, chats, configs). Used for L5 to separate material type from topic. For L4 it becomes part of a composite sign (artifact + core).

## Sign and artifact_sign

NOUZ has two sign layers:

| Level | How It Is Determined |
| ----- | -------------------- |
| L1-L3 | Domain sign from etalons, unless manually set |
| L4 Note / Quant | Optional composite sign: its own `artifact_sign` + content domain sign |
| L5 Artifact / Raw Material | `artifact_sign` from content-structure heuristic, no domain sign |

Manual markup has priority. If `sign` is already set in YAML, the server does not overwrite it as truth, but it can still compute `sign_auto` for comparison.

`artifact_sign` describes the material type: note, concept, reference, log, update, hypothesis, specification. The public convention uses short lowercase codes for this: `n/c/r/l/u/h/s`. For L4 it can be stored in YAML as part of a composite sign; for L5 it is stored in the database and displayed as the artifact sign.

## Etalon Classification

Domains are defined in `config.yaml` as an `etalons` list. `calibrate_cores` turns those texts into reference vectors and stores them in SQLite.

During classification the server:

1. Takes the note content embedding without YAML frontmatter.
2. Compares it with mean-centered etalons.
3. Computes spread: `max_score - min_score`.
4. If `spread < sign_spread` (`0.05`), the difference between domains is too weak, so the server does not choose a domain.
5. Otherwise converts scores to percentages:

```
adjusted = score - min_score
percent = adjusted / sum(adjusted) * 100
```

Every domain with percentage ≥ `pattern_second_sign_threshold` (`30.0`) enters the composite sign. The dominant domain is confident when its percentage is ≥ `confident_spread` (`60.0`).

## Mean-Centering vs Anisotropy

Transformer embeddings have an awkward property: many texts look "somewhat similar" to each other even when their domains are different. Raw cosine can therefore be misleading.

The server handles this through `_mean_center`: before comparison, it subtracts the shared mean vector from the etalons. After that, NOUZ evaluates the gap between domains: how strongly one etalon wins over the others. That is why `spread`, percentages, and thresholds matter. A single raw cosine remains diagnostic, but it is not the final decision.

## core_mix and Drift

`sign` is intent: how a node is marked or classified. `core_mix` is the actual domain profile aggregated from lower-level content.

<div class="drift-diagram">
<span class="arrow-down">↓ sign:</span>       set manually or computed for one node<br>
<span class="arrow-up">↑ core_mix:</span>   L4 → L3 → L2, aggregated bottom-up
</div>

If a module's `sign` says "Engineering" while `core_mix` increasingly points to "Systems Analysis", that is a drift signal: the module's content has moved away from its original frame.

## Link Types

| Type | Who Creates It | Meaning |
| ---- | -------------- | ------- |
| `hierarchy` | User | Main structural link |
| `temporary` | User or AI | Temporary link for material not yet settled in the graph |
| `semantic` | AI proposes | Texts from different domains share meaning |
| `tag` | AI proposes | Similarity between tags or short concepts |
| `error` | Server | Strict hierarchy violation in SLOI |

All link types remain available in MCP data and in the index. Structural workflows usually start from `hierarchy`; semantic and tag links stay as proposals until you accept them.

## Bridges

**Semantic bridges** compare a whole note against notes from other domains. Default threshold: `semantic_bridge_threshold = 0.55`.

**Tag bridges** compare tags and short concepts. They can reveal shared concepts even when full texts are different.

All bridges are returned as proposals (`proposed: true`). The server shows candidates; you decide what becomes a link.

## Automatic Parent Search

`suggest_parents`, `process_orphans`, and `add_entity` can propose a place for a note without parents.

The server compares the note text with possible parents. Candidates below `parent_link_threshold` (`0.55`) are discarded. If several candidates are close, the parent from the same domain gets priority.

## Pipeline

<div class="pipeline">
  <div class="step" data-n="1">
    <h4>Note</h4>
    <p>Markdown with YAML: type, level, sign, parents, tags. Files without YAML are indexed too, but need markup.</p>
  </div>
  <div class="step" data-n="2">
    <h4>Index</h4>
    <p>The server stores metadata, content, links, and embeddings in SQLite.</p>
  </div>
  <div class="step" data-n="3">
    <h4>Classification</h4>
    <p>Content is compared with etalons; L5 receives artifact_sign, L4 can receive a composite sign.</p>
  </div>
  <div class="step" data-n="4">
    <h4>Aggregation</h4>
    <p>L4 gets a profile from text classification; L3 and L2 aggregate child nodes bottom-up.</p>
  </div>
  <div class="step" data-n="5">
    <h4>Proposals</h4>
    <p>Bridges, parents, tags, and hierarchy errors are returned as candidates for your decision.</p>
  </div>
</div>

## Database

NOUZ stores its index in SQLite (`obsidian_kb.db` in the vault root):

- file metadata;
- graph links;
- embeddings;
- etalon reference vectors;
- `core_mix`, `sign_auto`, `sign_source`, `artifact_sign`.

Notes and the database stay local. If you use a cloud embedding provider, only texts requested for embeddings leave your machine.

SQLite does not require a separate database server: Python includes `sqlite3`, and NOUZ uses `aiosqlite` as an async wrapper. The local index file is created when the vault is indexed.
