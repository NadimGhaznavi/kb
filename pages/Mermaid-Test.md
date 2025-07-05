---
title: Mermaid Test
layout: default
---

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

# Links

* [Mermaid KB Page](/pages/Mermaid.html")
* [Getting Started](https://mermaid.js.org/intro/getting-started.html)
* [Mermaid Live Editor](https://mermaid.live/)

