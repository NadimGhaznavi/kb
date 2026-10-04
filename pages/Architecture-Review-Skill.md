---
title: "Architecture Review Skill"
author_profile: true
layout: single
description: Where the Architecture Review skill is installed and how to use it in ChatGPT and Codex.
---

# Architecture Review Skill

**Architecture Review** (`review-architecture`) is a reusable skill for reviewing software designs, schema mappings, service boundaries, module structure, and generated code. It captures my approach as the architect overseeing implementation.

A skill is a folder of instructions and supporting references that ChatGPT or Codex reads when performing a task. This one is instruction-based; it does not run a separate review server.

## What it reviews

- Preserve authoritative models, such as CWM, rather than inventing ad-hoc schema.
- Keep transport, domain rules, persistence, orchestration, and presentation responsibilities clear.
- Favor clean distributed patterns where they provide useful ownership and reuse.
- Inspect generated code against the intended architecture, with concrete evidence and bounded recommendations.
- Review ZMQ contracts, socket ownership, timeouts, retries, lifecycle, and pluggable service interfaces.

CWM applies where the project adopts it. The skill does not impose CWM on every application. Reviews remain read-only unless implementation is also requested.

## Where it lives

| Environment | Location | Meaning |
| --- | --- | --- |
| ChatGPT | [Architecture Review in my skill directory](https://chatgpt.com/skills?skill_id=6ac12d7cba4881919f71c849532a07b5) | Installed personal skill. |
| ChatGPT hosted execution environment | `/root/.codex/skills/remote-skills/skill-6ac12d7cba4881919f71c849532a07b5/` | Hosted source folder; this is not a path on Sally or Wintermute. |
| Local Codex / VS Code | `~/.agents/skills/review-architecture/` | User-wide destination when installing the exported skill locally. |
| One repository only | `<repo>/.agents/skills/review-architecture/` | Alternative repository-scoped destination. |

The local destination is the installation path to use; this page does not confirm that the ZIP has been extracted on a particular machine. In VS Code Remote SSH or a container, install it in the environment where Codex executes.

The folder contains:

| File | Purpose |
| --- | --- |
| `SKILL.md` | Review instructions and skill name/description. |
| `references/zmq-patterns.md` | Repository-backed ZMQ patterns and review guidance. |
| `agents/openai.yaml` | Skill presentation and invocation metadata. |
| `assets/icon.svg` | Skill icon. |

## Use it in ChatGPT

Open the installed skill from the directory link above, or type `@` in the composer and select **Architecture Review**.

Example request:

```text
Use Architecture Review to review this proposed design.
Check responsibility boundaries and fidelity to the authoritative model.
Give evidence-backed findings and the smallest useful corrections.
Keep this review read-only.
```

Provide the design, repository, relevant files, or diagram to inspect. Identify the governing specification and version when model conformance matters.

## Install it for local Codex / VS Code

Download the previously exported `review-architecture.zip` from the ChatGPT conversation. The export includes the ZMQ reference.

For a user-wide installation, assuming the ZIP is in Downloads:

```bash
mkdir -p ~/.agents/skills
unzip ~/Downloads/review-architecture.zip -d ~/.agents/skills
test -f ~/.agents/skills/review-architecture/SKILL.md
test -f ~/.agents/skills/review-architecture/references/zmq-patterns.md
```

Check the extracted layout: `SKILL.md` must sit directly inside `review-architecture/`, not inside an extra nested folder. Install the complete folder so relative references remain available.

For a repository-scoped installation instead, run from that repository's root:

```bash
mkdir -p .agents/skills
unzip ~/Downloads/review-architecture.zip -d .agents/skills
```

Choose the user-wide or repository location to avoid duplicate entries with the same skill name.

## Use it in the Codex extension or CLI

Open the project in the Codex extension. Type `$` to select `review-architecture`, or use `/skills` to find it.

### Code-structure review

```text
Use $review-architecture to review this repository's code structure.
Trace a normal operation and a relevant failure path.
Identify mixed responsibilities, hidden coupling, and duplicated policy.
Keep this review read-only and cite the relevant code locations.
```

### ZMQ service review

```text
Use $review-architecture to review this ZMQ service.
Check whether a new service can register handlers and supply configuration
without editing transport code. Review message contracts, correlation,
timeouts, retry ownership, socket lifecycle, and control/event separation.
```

### CWM mapping review

```text
Use $review-architecture to compare this schema with OMG CWM 1.1.
Map implementation entities to metamodel elements and verify inheritance,
associations, derived properties, and cardinalities from the specification.
```

Explicit invocation makes the intended review workflow clear. The skill can also be selected automatically when a task matches its description.

## Expected output

A review should explain what works, prioritize material findings, identify the evidence and practical consequences, and recommend the smallest useful changes. It should distinguish architectural defects from stylistic preferences and state what was verified or remains uncertain.

The ZMQ guidance combines R3el's injected routing, Ax3l/R3el's bounded requests without automatic retries, and Snake Lab's correlated contracts and separate channels. Its pinned examples are historical evidence; current project code should be inspected before applying them.

## Updates and troubleshooting

- If the skill is missing locally, verify `SKILL.md` exists at the expected path and that Codex is running in that same environment.
- Check the skill selector for duplicate installations or disabled skills.
- A local ZIP installation is a separate copy. Re-export and replace that copy when the ChatGPT skill changes; do not assume automatic synchronization.
- If a reference cannot be loaded, check that `references/zmq-patterns.md` was installed alongside `SKILL.md`.

## Links

- [Architecture Review skill](https://chatgpt.com/skills?skill_id=6ac12d7cba4881919f71c849532a07b5)
- [Official OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills)
- [Common Warehouse Metamodel](/pages/Common-Warehouse-Metamodel.html)
- [ZeroMQ](/pages/ZeroMQ.html)

Installation and invocation guidance checked on October 3, 2026.
