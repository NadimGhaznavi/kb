---
layout: post
title: ZODB Cheatsheet
date: 2024-06-03
---

# Creating Databases
```
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
```

```
# Define a simple class for demonstration purposes
class TestObject:
    def __init__(self, value):
        self.value = value

    def __repr__(self):
        return f"TestObject(value={self.value})"
```