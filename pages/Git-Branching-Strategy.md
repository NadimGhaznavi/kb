---
title: Db4E Git Branching and Release Workflow
layout: default
---------------

<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"></script>

# 📦 Db4E Development to Release Workflow

This document outlines the recommended Git branching and release workflow for the **Db4E** project. It ensures that development is organized, the main branch stays production-ready, and releases are clean and well-documented.

<div class="mermaid">
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
   commit id: "Bump version to 0.16.0"
   checkout main
   merge release/v0.16.0
   tag "v0.16.0"

   checkout development
   merge release/v0.16.0

   branch hotfix/fix-typo
   checkout hotfix/fix-typo
   commit id: "Fix typo in README"
   checkout main
   merge hotfix/fix-typo
   tag "v0.16.1"
   checkout development
   merge hotfix/fix-typo
</div>

---

# 🔄 Summary

* **`main`**: Always deployable. Tag releases from here.
* **`development`**: Where all active development branches merge.
* **`feature/*`**: One branch per feature. Merge into `development` when complete.
* **`release/*`**: Temporary branches for prepping releases. Merged into `main` and `development`.
* **`hotfix/*`**: Quick fixes to production. Branch off `main`, merge back into both `main` and `development`.

---

Happy Hacking 👨💻👩🖥️ 

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
</script>
