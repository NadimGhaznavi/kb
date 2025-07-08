---
title: Poety
description: Python Packaging and Dependency Management
---

# Run a Single test

```
poetry run pytest tests/Modules/test_Helper.py
```

---

# Run all Tests

```
poetry run pytest
```

---

# Print Individual Tests

Use the `-v` flag. E.g.

```
poetry run pytest -v 
poetry run pytest -v tests/Modules/test_InstallMgr.py
```