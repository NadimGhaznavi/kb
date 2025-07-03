---
title: Git
layout: default
---

# Table of Contents

* [Print a List of Repository Changes](#print-a-list-of-repository-commits)
* [See the Details of a Commit](#see-dthe-details-of-a-commit)
* [Undo a Git Commit](#undo-git-commit)
* [Checkout by Commit Tag](#checkout-by-commit-tag)
* [Clone a repository](#clone-a-repository)
* [Clone the Wiki site for a repository](#clone-the-wiki-site-for-a-repository)
* [Setup SSH Authentication with GitHub](#configure-a-local-repository-to-use-ssh-authentication-with-github)

---

# Print a List of Repository Changes

Changes in git are *commits*, the command below shows the *commit tag* and *commit message*.

```
git log --oneline
```

---

# See the Details of a Commit

Use the Git *commit tag*. See the [Print a List of Repository Changes](#print-a-list-of-repository-commits) section to get a list of commit tags.

```
git show f814dd7
```

---

# Undo a Git Commit

```
git revert f814dd7
```

---

# Create a new Branch

```
git checkout -b textual-snake
```

---

# Change to a Branch

```
git checkout new_branch
```

---

# Checkout by Commit Tag

```
git checkout a1e8fb5
```

# Clone a repository

```
git clone git@github.com:NadimGhaznavi/db4e
```

Another example, cloning the Monero XMR's P2Pool software by SChernykh, but this time we also
clone any *3rd Party* software which the build depends on. A software build may fail without the `--recursive` switch.

```
git clone --recursive https://github.com/SChernykh/p2pool
```

---

# Clone the Wiki site for a repository

```
git clone git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.wiki.git
```

---

# Setup SSH authentication with GitHub

```
git remote set-url origin git@github.com:NadimGhaznavi/kb.wiki.git
```
