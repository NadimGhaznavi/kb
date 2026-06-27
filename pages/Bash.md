---
title: Bash 
layout: default
---

# Introduction and Scope

This page contains some handy shell script snippets.

# Find all pycache directories

```
find . -type d -name '__pycache__' -prune -print
```

## Delete all pycache dirs

```
find . -type d -name '__pycache__' -prune -exec rm -rf {} +
```