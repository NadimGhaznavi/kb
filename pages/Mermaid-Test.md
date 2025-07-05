---
title: Mermaid Test
layout: default
---

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
</pre>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>

# Links

* [Mermaid KB Page](/pages/Mermaid.html")
* [Getting Started](https://mermaid.js.org/intro/getting-started.html)
* [Mermaid Live Editor](https://mermaid.live/)

