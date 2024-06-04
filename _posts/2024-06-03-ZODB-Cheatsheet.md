---
layout: post
title: ZODB Cheatsheet
date: 2024-06-03
---

# Creating Databases
```
import ZODB, ZODB.FileStorage

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root
```

