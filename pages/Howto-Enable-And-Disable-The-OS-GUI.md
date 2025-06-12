---
title: Howto Enable And Disable The OS GUI
layout: default
---

# Print the current default:
```
systemctl get-default
```

# Set a new default:
```
systemctl set-default New_Default
```
-where *New_Default* is one of the items in the table below:

|New Default       | Description         |
|------------------|---------------------|
|multi-user.target | Console interface   |
|graphical.target  | Graphical interface |