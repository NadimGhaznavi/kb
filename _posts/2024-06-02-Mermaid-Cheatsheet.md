---
layout: post
title: Mermaid Cheatsheet
date: 2024-06-02
---

A collection of pointers to various Mermaid documentation sites.

# Links

* [Getting Started](https://mermaid.js.org/intro/getting-started.html)
* [Mermaid Live Editor](https://mermaid.live/)

  <pre class="mermaid">
        graph TD
        A[Client] --> B[Load Balancer]
        B --> C[Server01]
        B --> D[Server02]
  </pre>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true });
  </script>


