---
title: Sphinx
description: Documentation Generator
layout: default
---

# Sample Sphinx `conf.py`

The `conf.py` shows an example that has sphinx parsing the docstrings from the actual code.

```
# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os
import sys

# -- Path setup --------------------------------------------------------------

# Add your project root (the folder containing "db4e") to sys.path
sys.path.insert(0, os.path.abspath(".."))


# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "Database 4 Everything"
copyright = "2025, Nadim-Daniel Ghaznavi"
author = "Nadim-Daniel Ghaznavi"
release = "0.48.1"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx.ext.napoleon",
    "sphinx.ext.viewcode",
]

autosummary_generate = True  # Automatically generate stub pages for autosummary
autodoc_member_order = "bysource"  # Keep members in the same order as in the source

templates_path = ["_templates"]
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "groundwork"
html_static_path = ["_static"]
```

---

# Genrating the Docs

Run this from your project root (not inside docs/):

```
poetry run sphinx-build -b html docs docs/_build/html
```

---

# Sample Inline Docstrings

Here is a sample inline docstring:

```
def get_random_ingredients(kind=None):
    """
    Return a list of random ingredients as strings.

    :param kind: Optional "kind" of ingredients.
    :type kind: list[str] or None
    :raise lumache.InvalidKindError: If the kind is invalid.
    :return: The ingredients list.
    :rtype: list[str]

    """
    return ["shells", "gorgonzola", "parsley"]

```

---

# GitHub Workflow

The workflow below generates the documentation automatically when a new release is cut.

```
name: "Sphinx: Build Docs on Main"

on:
    push:
        branches: [main]
        paths:
            - "docs/**"
            - "pyproject.toml"
            - ".github/workflows/sphinx-docs.yml"
        tags:
            - "v*.*.*" # optional: trigger on release tags

jobs:
    build:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout repository
              uses: actions/checkout@v4
              with:
                  persist-credentials: true # Needed to push back to main

            - name: Set up Python
              uses: actions/setup-python@v5
              with:
                  python-version: "3.11"

            - name: Ensure Poetry is installed
              run: |
                  if ! command -v poetry &> /dev/null; then
                    curl -sSL https://install.python-poetry.org | python3 -
                    echo "$HOME/.local/bin" >> $GITHUB_PATH

            - name: Install dependencies
              run: poetry install --no-root

            - name: Clean old HTML docs
              run: |
                  rm -rf docs/_build/html/*

            - name: Build Sphinx HTML docs
              run: poetry run sphinx-build -b html docs docs/_build/html

            - name: Commit and push docs
              run: |
                  git config user.name "github-actions[bot]"
                  git config user.email "github-actions[bot]@users.noreply.github.c
```

---

# Links

* [Sphinx Homepage](https://www.sphinx-doc.org/en/master/)
* [Build your first project](https://www.sphinx-doc.org/en/master/tutorial/index.html) - Tutorial
* [reStructuredText](https://www.sphinx-doc.org/en/master/usage/restructuredtext/index.html)
