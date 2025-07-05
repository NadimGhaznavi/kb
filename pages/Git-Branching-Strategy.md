---
title: Git Branching Strategy
layout: default
---

# Diagram

  <pre class="mermaid">
    gitGraph
    commit id: "Initial commit"
    branch development
    checkout development
    commit id: "Start development"
    branch feature/install-mgr
    checkout feature/install-mgr
    commit id: "Add InstallMgr module"
    commit id: "Write tests"
    checkout development
    merge feature/install-mgr
    commit id: "Merge feature: InstallMgr"

    branch feature/pane-mgr
    checkout feature/pane-mgr
    commit id: "Add PaneMgr"
    checkout development
    merge feature/pane-mgr
    commit id: "Merge feature: PaneMgr"

    branch release/v0.16.0
    checkout release/v0.16.0
    commit id: "Prepare release v0.16.0"
    commit id: "Bump version to 0.16.0" tag: "v0.16.0"
    checkout main
    merge release/v0.16.0
    

    checkout development
    merge release/v0.16.0

    branch hotfix/fix-typo
    checkout hotfix/fix-typo
    commit id: "Fix typo in README" tag: "v0.16.1"
    checkout main
    merge hotfix/fix-typo
    checkout development
    merge hotfix/fix-typo    
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

1) Create feature branches from development (or main if no development branch):

  * Work on features or bug fixes.
  * Write tests for your code.
  * Keep commits atomic and focused.

2) Merge feature branches into development:

  * Run full test suite.
  * Review code via Pull Requests.
  * Fix any issues.

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