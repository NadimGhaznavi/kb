---
title: NadimGhaznavi
layout: default
---

The following command can be used to list all installed files for a specific package on a Debian-based system:

```
dpkg -L <package-name>
```

For example:
```
dpkg -L lexmark-aey-ppd-files
/.
/usr
/usr/local
/usr/local/Lexmark
/usr/local/Lexmark/ppd
/usr/local/Lexmark/ppd/Lexmark-AEY-PPD-Files
/usr/local/Lexmark/ppd/Lexmark-AEY-PPD-Files/foomatic
/usr/local/Lexmark/ppd/Lexmark-AEY-PPD-Files/foomatic/UTF-8
/usr/local/Lexmark/ppd/Lexmark-AEY-PPD-Files/foomatic/UTF-8/foomatic.tar
/usr/local/Lexmark/ppd/Lexmark-AEY-PPD-Files/foomatic/ISO8859-1
.
.
.
```