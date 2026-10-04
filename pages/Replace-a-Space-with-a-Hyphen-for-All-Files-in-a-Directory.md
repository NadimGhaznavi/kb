---
title: "Replace a Space with a Hyphen for All Files in a Directory"
author_profile: true
layout: single
---

The command below replaces all the spaces in files ending in .mp4 with a hyphen.

```
find . -type f -name "* *.mp4" -exec rename "s/\s/-/g" {} \;
```