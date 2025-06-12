---
title: ZODB ‐ Zope Object Database
layout: default
---

# Introduction and Scope

This page provides links to information about ZODB and also provides code snippets.

# Creating Databases

When a program wants to use the ZODB it has to establish a connection, like any other database. For the ZODB we
need 3 different parts: a storage, a database and finally a connection:

```
import ZODB, ZODB.FileStorage
storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

# CLI Sandbox
import sys
import ZODB, ZODB.FileStorage

project_dirs = [
  "/opt/prod/db4e/src/Infrastructure",
  "/opt/prod/db4e/src/Mining",
  "/opt/prod/db4e/src/Reports"
]
for project_dir in project_dirs:
  sys.path.append(project_dir)

from Db4eTree.Db4eTree import Db4eTree

zodb_file = 'db4e_db'
storage = ZODB.FileStorage.FileStorage(zodb_file)
db = ZODB.DB(storage)
connection = db.open()
root = connection.root
# Define a simple class for demonstration purposes
class TestObject:
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"TestObject(value={self.value})"
```
# Links

* [ZODB Documentation Homepage](https://zodb.org/en/latest/)
* [ZODB Documentation and Articles](https://readthedocs.org/projects/zodborg/downloads/pdf/latest/)