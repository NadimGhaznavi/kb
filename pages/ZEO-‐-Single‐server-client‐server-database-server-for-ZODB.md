---
title: ZEO ‐ Single‐server client‐server database server for ZODB
layout: default
---

# Client test

```
from ZEO import ClientStorage
from ZODB import DB
import transaction

# Change next line to connect to your ZEO server
###    The port number MUST be type INT, otherwise  
###    ClientStorage.ClientStorage(addr) will timeout.
addr = 'zeo.osoyalce.com', 51970
storage = ClientStorage.ClientStorage(addr)
db = DB(storage)
conn = db.open()
root = conn.root()

# Store some things in the root
root['list'] = ['a', 'b', 1.0, 3]
root['dict'] = {'a':1, 'b':4}

# Commit the transaction
transaction.commit()
```

# Server configuration

* [Server configuration](https://zeo.readthedocs.io/en/latest/server.html)

# Client configuration

* [Client configuration](https://zeo.readthedocs.io/en/latest/clients.html)
* https://zeo.readthedocs.io/en/stable/introduction.html
# Links

* [ZEO 6.0.0](https://pypi.org/project/ZEO/) - Official documentation
* [ZEO - Single-server client-server database server for ZODB](https://zeo.readthedocs.io/en/latest/#zeo-single-server-client-server-database-server-for-zodb) - Official documentation