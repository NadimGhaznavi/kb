---
layout: post
title: Journalctl Cheatsheet
date: 2024-06-01
---

# Print today's output of journalctl's output
```
journalctl -S today
```

# Print the last 24 hours of journalctl's output
```
journalctl -S -24h
```

# Perform a continuous stream of journalct's output
This option does something similar to a *tail -f LOGFILE*
```
journalctl -f
````