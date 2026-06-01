---
prev:
  text: Overview
  link: /en/linza/
next:
  text: How It Works
  link: /en/linza/how-it-works
---

# LINZA Use Cases

LINZA helps when an agent has material to read and verify, but there is no safe basis for writing conclusions into notes, rules, or memory immediately.

## Project Folder

A project folder usually contains README files, plans, decisions, error logs, release drafts, and technical discussions. LINZA indexes Markdown, shows a workspace map, finds close fragments, and explains relations through `connect`.

This lets the agent answer from concrete files and show the local context behind the answer.

## Incoming Material

Through `agent_workspace(action="ingest_artifacts")`, an agent can pass articles, logs, chats, JSON, DOCX, XLSX, and extracted PDF text. LINZA stores them as local artifacts, chunks them, and prepares review candidates through `analyze_inbox` and `review_next`.

Text inside an artifact is stored as data. It does not become an instruction for the agent.

## Context For A New Session

`search_memory` searches stored artifacts and accepted memory. `export_context` builds a short Markdown packet with matching fragments. The packet can go to another model, another agent, or the next session.

## Agent Work Review

`record_trace` accepts a structured work trace: task, result, tools, changed files, checks, errors, and context spend. `analyze_trace` computes metrics, and `review_calibr` returns cards for process learning.

calibr cards record sidecar decisions only after review/apply. They do not edit active skills, rules, code, or notes directly.
