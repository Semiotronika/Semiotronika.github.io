---
prev:
  text: MCP Tools
  link: /en/nouz/tools
next:
  text: Safety Boundary
  link: /en/nouz/safety
---

# Configuration

NOUZ looks for `config.yaml` in this order: `NOUZ_CONFIG`, current working directory, then the installed server directory. For LUCA mode the file is optional — the server starts with default settings.

Without `config.yaml`, the server runs in **LUCA** mode (pure graph).

## Minimal Config

From source:

```bash
cp config.template.yaml config.yaml
```

On Windows PowerShell:

```powershell
Copy-Item config.template.yaml config.yaml
```

```yaml
mode: prizma  # luca | prizma | sloi
```

Place this file in the project working directory or pass its absolute path through `NOUZ_CONFIG`. That is enough to enable PRIZMA; for domain classification, add `etalons` from the full example below.

## Full Config

```yaml
# Operating mode: luca | prizma | sloi
mode: prizma

# Meta-root: level 0 anchor note.
# Useful for large bases; leave empty when starting simple.
# Excluded from all semantic operations.
meta_root: ""

# Semantic etalons — domain descriptions for classification.
# Each etalon: 2-3 sentences in the domain's subject language.
# Avoid common words that appear across multiple domains.
etalons:
  - sign: S
    name: Systems Analysis
    text: >
      Methodology for analysing complex objects: feedback loops,
      emergent properties, self-regulation, bifurcation points.
      Cybernetics, synergetics, dissipative structures, catastrophe
      theory, autopoiesis — tools for understanding how the whole
      exceeds the sum of its parts. Not data and not code — a way
      of thinking about how parts form a whole and why systems
      behave non-linearly.
  - sign: D
    name: Data & Science
    text: >
      Physics and cosmology: from subatomic particles to the large-scale
      structure of the Universe. Lagrangians, curvature tensors, scattering
      cross-sections, quarks, bosons, fermions, plasma, vacuum fluctuations,
      cosmic microwave background, cosmological constant, decoherence.
      Pure science about the nature of matter, energy and spacetime.
  - sign: E
    name: Engineering
    text: >
      Software engineering, machine learning and infrastructure: writing
      and debugging code, deployment, containerisation, neural networks,
      inference, tokenisation, data serialisation, microservices, CI/CD,
      automated testing, refactoring, Git, Docker, Kubernetes, APIs.
      The practical discipline of building computational systems from
      architecture to production.

# Hierarchy levels.
# Values are technically configurable, but the standard L1-L5 scale is recommended:
# docs, examples, and SLOI validation assume this layout.
levels:
  core: 1
  pattern: 2
  module: 3
  quant: 4
  artifact: 5

# Classification and bridge thresholds
thresholds:
  # Minimum difference between max and min cosine for sign assignment.
  # If spread < sign_spread → the difference between domains is too weak.
  sign_spread: 0.05

  # Minimum absolute cosine to the nearest domain.
  # If max_cosine >= confident_cosine → sign_source = "auto" (reliable).
  # If max_cosine < confident_cosine → sign_source = "weak_auto" (best guess,
  #   bridges to the same domain are NOT blocked).
  confident_cosine: 0.6

  # Minimum normalized % for a domain to appear in a compound sign.
  # After spread normalization: if adjusted_score / total * 100 >= threshold,
  # the domain is included. Allows compound signs like "SE" when two domains both score ≥ 30%.
  pattern_second_sign_threshold: 30.0

  # Minimum cosine similarity to propose a semantic bridge.
  # Only proposed between notes with different domains (cross-domain).
  semantic_bridge_threshold: 0.55

  # Minimum cosine similarity to auto-link a file to a parent.
  # Used by process_orphans and add_entity when auto_parents=true.
  # Raw cosine only — ensures meaningful proximity.
  parent_link_threshold: 0.55

  # Reliability threshold after spread normalization.
  # If dominant domain >= confident_spread% → sign_source = "auto".
  # Below → sign_source = "weak_auto" (bridges not blocked).
  confident_spread: 60.0

# Artifact signs. This is a sign dictionary, not embedding etalons.
# L5 artifacts get artifact_sign by content heuristics.
# L4 notes/quants can include artifact_sign as part of the composite sign.
# Public convention: domains use uppercase codes (S/D/E),
# material types use lowercase codes (n/c/r/l/u/h/s).
# You can replace them if codes stay short and do not conflict with domains.
# If needed, add keywords to any material type: the server will use
# those words in place of the built-in RU/EN heuristic.
artifact_signs:
  - sign: n
    name: Note
    text: "Short note, observation, marginal thought."
  - sign: c
    name: Concept
    text: "Definition, concept, entity description."
  - sign: r
    name: Reference
    text: "External source, documentation, link, citation."
  - sign: l
    name: Log
    text: "Chronicle of events, session record, dialogue log."
  - sign: u
    name: Update
    text: "Update, release note, changelog entry."
  - sign: h
    name: Hypothesis
    text: "Hypothesis, assumption, speculative idea."
  - sign: s
    name: Specification
    text: "Technical specification, instruction, requirements."

# Extra sign characters for filename parsing (optional).
# Only for extracting signs from names, NOT for classification.
sign_chars: ""
```

## Profiles (Optional)

For switching between etalon sets via `PROFILE`:

```yaml
mode: prizma
profiles:
  default:
    mode: prizma
    etalons: []
  team:
    mode: prizma
    etalons:
      - sign: P
        name: Product
        text: >
          Product decisions, roadmap notes, user feedback,
          requirements, release planning...
```

```bash
export PROFILE=team
```

## Parameters

### `mode`

| Value | Description |
| ----- | ----------- |
| `luca` | Pure graph. YAML frontmatter and connections only. No embeddings needed. Default mode. |
| `prizma` | Semantics + graph. Embeddings classify notes by domain. Flexible hierarchy. |
| `sloi` | Strict 5-level hierarchy with validation. Requires embeddings. Skipping a level = error. |

### `etalons`

A list of domains. Each etalon contains:

- **`sign`** — short domain code. The example uses `S`, `D`, `E`, but you can choose other letters or symbols if they are used consistently in config and do not conflict with `artifact_signs`.
- **`name`** — name
- **`text`** — descriptive text of 2–3 sentences. The basis of classification. Write in the subject language of your domain, use domain-specific jargon. Avoid words that appear across multiple domains.

<div class="etalon-note">
  <strong>Etalon Quality</strong>
  <p>The S/D/E etalons above are only a starting example of three well-separated domains. The domains themselves should match your base: most setups need 2–4 domains with dense subject language and clear boundaries between neighboring areas.</p>
  <p>After changing etalons, run <code>calibrate_cores</code> and check pairwise cosine. Raw cosine for transformer models is usually high (0.6-0.75) because of anisotropy; mean-centered values should be noticeably lower than raw and differ between pairs. If all pairs look almost the same, strengthen domain specificity and remove common words. Details: <a href="/en/nouz/etalon-quality">Etalon Quality</a>.</p>
</div>

### `artifact_signs`

A dictionary of material types for L5 artifacts. These are not embedding etalons: the server chooses `artifact_sign` with content-structure heuristics. For example, a log gets `l`, a specification gets `s`, a hypothesis gets `h`. When starting out, you can usually leave this dictionary unchanged. If you change the codes, keep them short and do not reuse domain signs. For your own languages and formats, add `keywords` to the relevant material type.

### `thresholds`

| Parameter | Default | Description |
| --------- | ------- | ----------- |
| `sign_spread` | 0.05 | Min max/min cosine difference for classification |
| `confident_cosine` | 0.6 | Absolute cosine threshold to nearest domain |
| `pattern_second_sign_threshold` | 30.0 | Min % for compound sign inclusion |
| `semantic_bridge_threshold` | 0.55 | Semantic bridge threshold |
| `parent_link_threshold` | 0.55 | Auto-parent linking threshold |
| `confident_spread` | 60.0 | Classification reliability threshold (%) |

## Environment Variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `OBSIDIAN_ROOT` | Yes | Absolute path to the vault |
| `NOUZ_CONFIG` | No | Absolute path to `config.yaml`; if omitted, the server looks in the current working directory |
| `PROFILE` | No | Profile name from config.yaml (default: `default`) |
| `EMBED_PROVIDER` | No | `openai`-compatible or `ollama` (default: `openai`) |
| `EMBED_ENABLED` | No | `true` or `false` (default: `true`) |
| `EMBED_API_URL` | For prizma/sloi | URL of an OpenAI-compatible embedding API |
| `EMBED_MODEL` | No | Embedding model name |
| `EMBED_API_KEY` | No | API key for cloud providers |
| `LLM_API_URL` | No | URL for LLM (tag extraction) |
| `LLM_MODEL` | No | LLM model name |

```bash
export OBSIDIAN_ROOT=/path/to/vault
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

## Compatible Embedding Providers

| Provider | URL | Note |
| -------- | --- | ---- |
| LM Studio | `http://127.0.0.1:1234/v1` | Recommended for local use |
| Ollama | `http://127.0.0.1:11434` | Uses `/api/embeddings` endpoint |
| OpenAI | `https://api.openai.com/v1` | Add `EMBED_API_KEY` |
| Any OpenAI-compatible | — | Standard `/v1/embeddings` endpoint |
