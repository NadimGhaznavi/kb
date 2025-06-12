---
title: Replace a Space with a Hyphen for All Files in a Directory
layout: default
---

The command below replaces all the spaces in files ending in .mp4 with a hyphen.

```
find . -type f -name "* *.mp4" -exec rename "s/\s/-/g" {} \;
```