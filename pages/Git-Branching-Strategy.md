---
title: Db4E Git Branching and Release Workflow
layout: default
---------------

This document outlines the recommended Git branching and release workflow for the **Db4E** project. It ensures that development is organized, the main branch stays production-ready, and releases are clean and well-documented.

![strategy image](/img/git-branch-strategy.svg)

---

# 🔄 Summary

* **`main`**: Always deployable. Tag releases from here.
* **`development`**: Where all active development branches merge.
* **`feature/*`**: One branch per feature. Merge into `development` when complete.
* **`release/*`**: Temporary branches for prepping releases. Merged into `main` and `development`.
* **`hotfix/*`**: Quick fixes to production. Branch off `main`, merge back into both `main` and `development`.

---

Happy Hacking 👨💻👩🖥️ 
