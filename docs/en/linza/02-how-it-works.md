---
prev:
  text: Use Cases
  link: /en/linza/use-cases
next:
  text: Quick Start
  link: /en/linza/quick-start
---

# How LINZA Works

LINZA consists of an MCP server, a local SQLite sidecar, and review queues. The main agent entry point is `agent_workspace`.

## Sidecar

On startup, LINZA creates `.linza/linza.db` inside the selected folder. The database stores Markdown file records, chunks, embeddings, discovered bridges, imported artifacts, approvals, audit events, traces, and calibr metrics.

If a Markdown file changed after indexing, workflow actions can ask for a fresh index before drawing conclusions.

## Index And Search

`index_all` reads `*.md` from `LINZA_VAULT`, skips service paths, computes hashes, and stores chunks in the sidecar. Semantic search and bridges require an embedding endpoint: `lmstudio`, `ollama`, or an OpenAI-compatible API.

`search` combines semantic and lexical search. `read_file` reads the exact working-folder file before answering or applying anything.

## Incoming Artifacts

`ingest_artifacts` accepts pasted text or a local file inside the working folder. Supported suffixes are `.md`, `.txt`, `.json`, `.docx`, `.xlsx`, and `.pdf`. The current code limit is 500,000 characters per artifact after text extraction.

DOCX and XLSX use local Office XML extraction. PDF needs `pypdf` or `PyPDF2`; otherwise extract the PDF text to `.txt` first.

## Review

LINZA shows proposals as cards with an ID, evidence, and write preview.

- `build_review_apply_queue` creates `rq-*` cards for the folder map.
- `review_next` creates `aw-*` cards for incoming material, memory, and calibr.
- `approve_review_queue_items` and `apply_review_items` apply only the IDs passed in.

With `dry_run=true`, no write is performed. For the `rq-*` queue, a missing ID blocks the whole operation so an outdated set is not partially applied.

## What Can Be Written

After reviewed apply, LINZA can write compact `role` or `domains` YAML into Markdown. The note body is preserved.

Accepted material types, hierarchy links, causal links, memory items, quant candidates, and calibr cards are stored in the sidecar. Reports are restricted to `.linza/reports`; context packs are restricted to `.linza/context-packs`.

The low-level `write_file` tool exists only in the additional mode. It creates Markdown or overwrites a file only with explicit `allow_overwrite=true`.

## Teach And Grow

`teach` selects several review cards as seed examples. It reads and selects cards; it performs no write.

`grow` looks for new cards that match accepted decisions. By default, it returns a dry-run preview with selection reasons. Real apply still goes through reviewed apply.

## Calibr

`record_trace` stores a structured agent-work trace and creates metrics: write without verification, unexpected write scope, completion with errors, missing dry-run before write/apply, context overspend, or a successful verified pattern.

`review_calibr` turns metrics into cards. An accepted card records a sidecar lesson; active rules, skills, code, and notes stay unchanged.
