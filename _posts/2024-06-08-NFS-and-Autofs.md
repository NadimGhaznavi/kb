---
layout: post
title: NFS and Autofs 
date: 2024-06-08
---

# Introduction and Scope

This page provides an example NFS and Autofs configuation. This page assumes you have both NFS and Autofs installed and that you can control the services with the *systemctl* command.

# /etc/exports

The /etc/exports file tells your NFS server which directories to share, who to share it with and what permissions and controls are associated with the share.

```
# All machines should do this
/home             *.osoyalce.com(rw,no_root_squash,no_subtree_check)

# Kermit hosts these backup archives
/exports/old      *.osoyalce.com(rw,no_root_squash,no_subtree_check)
/exports/new      *.osoyalce.com(rw,no_root_squash,no_subtree_check)
/exports/medium   *.osoyalce.com(rw,no_root_squash,no_subtree_check)

# Brat is hosting the 2 drive LVM backup archive
/exports/jbod3    *.osoyalce.com(rw,no_root_squash,no_subtree_check)
```



# Links

* [Links]("/") go here. 
