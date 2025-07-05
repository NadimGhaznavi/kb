---
title: Git
layout: default
---

# List of Repository Changes

Changes in git are *commits*, the command below shows the *commit tag* and *commit message*.

```
git log --oneline
```

---

# Retrieve Past Commit Info

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

# Merging a Branch 

Assuming you are on the *project_webite_updates* branch:

```
$ git branch
db4e-os
main
* project_website_updates
```

Then:

```
git checkout main
git merge project_website_updates
git push origin main
```

---

# Delete a Branch

To delete a branch you have in your local repo:

```
git branch -d project_website_updates
```

To delete a branch you *don't* have in your local repo, but is in the remote repo:

```
git push origin --delete project_website_updates
```

---

# Doing a Release

```
git add .
git commit -m "Your commit message"
git tag -a v0.15.8 -m "Release v0.15.8"
git push origin main --tags
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

# Clone a Repo Wiki Site

```
git clone git@github.com:YOUR_USERNAME/YOUR_REPOSITORY.wiki.git
```

---

# Setup SSH Authentication 

```
git remote set-url origin git@github.com:NadimGhaznavi/kb.wiki.git
```
