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

---

# Upgrading a Dependency

This example shows how to upgrade from Textual 4.0.0 to 6.0.0.

Edit the `pyproject.toml` file and change the `textual = "^4.0.0"` to `textual = "^6.0.0"`.

Then run `poetry update textual`

Verify with a `poetry show textual`