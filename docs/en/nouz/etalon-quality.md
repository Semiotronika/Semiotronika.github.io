---
prev:
  text: Safety Boundary
  link: /en/nouz/safety
next: false
---

# Etalon Quality

Etalons are the foundation of NOUZ classification. If etalons overlap semantically, classification becomes noisy. This page explains how to verify etalon quality using `calibrate_cores`.

## Pairwise Cosine Similarity

After running `calibrate_cores`, NOUZ outputs pairwise cosine between all domain etalons in two variants.

The numbers below are a saved result for the starter S/D/E etalons from `config.template.yaml` using `text-embedding-granite-embedding-278m-multilingual` in LM Studio. The same texts are shown in [Configuration](/en/nouz/configuration). You can use them as an example if your domains are actually similar.

S/D/E are a reusable example of three well-separated areas:

- **S — Systems Analysis:** feedback loops, emergence, cybernetics, complex systems.
- **D — Data & Science:** physics, cosmology, matter, energy, spacetime.
- **E — Engineering:** code, ML, infrastructure, deployment, production systems.

### Raw Cosine

```
=== Pairwise Cosine (raw) ===
S↔D: 0.5894    S↔E: 0.5862    D↔E: 0.6022
```

Raw cosine for transformer embeddings is typically high (0.5–0.75) due to **anisotropy** — the tendency of all vectors to cluster in a narrow cone. This is expected and not a problem by itself.

### Mean-Centered Cosine

```
=== Pairwise Cosine (mean-centered) ===
S↔D: -0.5059   S↔E: -0.5117   D↔E: -0.4822
```

Mean-centering subtracts the average vector from each etalon, removing the anisotropy bias. The result reveals the **true angular separation** between domains.

**Target values:**
- Mean-centered cosine between **different** domains should be **negative** (ideally below -0.3)
- Mean-centered cosine for a domain **with itself** should be close to **1.0**
- The gap between self-similarity and cross-similarity should be large

The values above are good: all cross-domain pairs are around -0.5, meaning the three domains are well-separated in the semantic space.

For note classification the server uses the same idea: it compares a note embedding with mean-centered etalons, then computes spread and normalized percentages. If all domains are too close, NOUZ leaves the result without a confident domain choice: when `spread < sign_spread`, the difference between domains is treated as too weak.

## What Mean-Centering Does Mathematically

Given N etalon vectors v₁, v₂, ..., vₙ:

1. Compute the mean vector: `μ = (v₁ + v₂ + ... + vₙ) / N`
2. Center each vector: `v'_i = v_i - μ`
3. Compute cosine similarity on the centered vectors

This removes the "common direction" that all transformer embeddings share, revealing the actual discriminative information.

## Self-Classification Table

After calibration, NOUZ also shows how well each etalon classifies itself:

| Etalon | S % | D % | E % | Dominant | Spread |
| ------ | --- | --- | --- | -------- | ------ |
| S | 99.4 | 0.6 | 0.0 | S | 0.7889 |
| D | 0.0 | 97.5 | 2.5 | D | 0.7888 |
| E | 0.0 | 3.1 | 96.9 | E | 0.7928 |

**What this means:**
- The S etalon classifies itself as S with 99.4% confidence — nearly perfect
- The D etalon classifies itself as D with 97.5% — strong, with 2.5% leakage to E
- The E etalon classifies itself as E with 96.9% — strong, with 3.1% leakage to D
- **Spread** values around 0.79 indicate good separation (max is 1.0)

These are excellent results. Each etalon strongly dominates its own domain with minimal cross-contamination.

## Bad Example: Overlapping Etalons

Compare with a poorly written set of etalons. This is an illustrative pattern, not a benchmark:

```
=== Pairwise Cosine (mean-centered) ===
S↔D: 0.08    S↔E: -0.03    D↔E: 0.05
```

The exact numbers are not the point. The warning sign is the pattern: after mean-centering, cross-domain values still hover near zero or slightly positive. The domains have not separated enough to give the classifier a stable direction. The etalons likely share too many generic words or describe overlapping concepts.

Self-classification would look like:

| Etalon | S % | D % | E % | Dominant | Spread |
| ------ | --- | --- | --- | -------- | ------ |
| S | 42 | 31 | 27 | S | 0.1500 |
| D | 35 | 40 | 25 | D | 0.1400 |
| E | 30 | 28 | 42 | E | 0.1600 |

Spread near 0.15 means the classifier barely distinguishes domains. Fix this by:
1. Removing words common to all etalons
2. Making each etalon more specific to its domain
3. Adding domain-specific terminology that doesn't appear in other etalons

## How to Improve

1. Run `calibrate_cores`
2. Check mean-centered pairwise cosine — should be negative and distinct between pairs
3. Check self-classification — dominant percentage should be >90%, spread >0.7
4. If results are poor, rewrite etalons to be more domain-specific
5. Re-run `calibrate_cores` and compare

Etalons only need recalibration when `config.yaml` changes.

## Reproducing the Calculation

To reproduce the calculation, use the same S/D/E texts from `config.template.yaml` and the same embedding model. If LM Studio is available at another address:

```bash
set EMBED_API_URL=http://127.0.0.1:1234
set EMBED_MODEL=text-embedding-granite-embedding-278m-multilingual
python scripts/calc_etalons.py
```

If you change etalon texts or the embedding model, recalculate the numbers. Old cosine values do not validate a new etalon set.

<div class="lab-bridge">
  <p class="lab-bridge__eyebrow">Semantic Laboratory</p>
  <h2>From Numbers to a Map</h2>
  <p>To see embedding geometry directly, open the lab: rotate a word cloud, compare neighbors before and after centering, and see the SVD spectrum as the shape of the space.</p>
  <a class="lab-bridge__button" href="/lab/">Open the laboratory</a>
</div>
