---
title: Git Branching Strategy
layout: default
---

# Diagram

In the example below, the current project release is v1.2.3.

  <pre class="mermaid">
    gitGraph
    commit id: " "
    branch dev
    checkout dev
    commit id: "  "
    branch feature/foo
    checkout feature/foo
    commit id: "Add foo feature"
    commit id: "Add foo tests"
    checkout dev
    merge feature/foo
    commit id: "Merge feature: foo"

    branch release/v1.2.4
    checkout release/v1.2.4
    commit id: "Update toml version"  tag: "v1.2.4"
    checkout dev
    merge release/v1.2.4
    checkout main
    merge release/v1.2.4

    commit id: "   "
    checkout dev
    commit id: "    "
  </pre>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>

---

# Branching Strategy

* **main**: Stable production-ready code only. Every commit here is a release candidate.
* **development**: Integration branch for feature branches before merging into main.
* **feature/xxx**: Short-lived branches created from development or main for individual features or fixes.
* **release/xxx**: Branches created from development when preparing for a release, for final testing and fixes.
* **hotfix/xxx**: Branches created from main to fix critical bugs on production releases.

---

# Basic Flow

1) All work happens within a *development* branch.

Create the dev branch:

```
git checkout -b dev
```

2) A new branch is created off the dev branch for a feature.

```
git checkout -b feature/foo
```

2) Subsequent *feature* work (e.g. on *foo*) is done in the *feature/foo* branch. When the work is complete, the *feature/foo* branch is merged back into the *dev* branch.

```
git checkout dev
git merge feature/foo
```

3) Create a release branch from development when ready:

  * Finalize version bump in pyproject.toml.
  * Perform release candidate testing.
  * Fix bugs on release branch as needed.

4) Merge release branch into main:

  * Tag the release (e.g., v0.17.0).
  * Push to remote.
  * Trigger CI/CD to build and publish the release (PyPI, website, docs, etc).

5) Merge release branch back into development:

  * To sync any last-minute fixes with ongoing development.

6) Hotfixes:

  * For critical issues found on production, create hotfix branches from main.
  * Fix, test, and merge back into both main and development.

---

# CI/CD

  * Tests run on every push to feature branches, development, release, and main.
  * Publishing to Test PyPI on release branches.
  * Publishing to Prod PyPI only on tagged commits in main.
  * Website updated on main releases or manually on demand.