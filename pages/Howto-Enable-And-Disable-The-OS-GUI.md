---
title: Howto Enable And Disable The OS GUI
layout: default
---

# Runlevels

Linux has the concept of **runlevels**:


Runlevel   | Description
-----------|------------------------------------------------
 0 | Halts or shuts down the system. 
 1 | Single-user mode, used for system maintenance and repair when only the root user has access and non-essential services are stopped. 
 2 | Multi-user mode with network services not yet started. 
 3 | Full multi-user mode with networking enabled, usually booting into a text-based command-line interface (CLI). 
 4 | Defined by the distribution but often remains unused, or used for multi-user graphical mode without a network server. 
 5 | Multi-user mode with a graphical user interface (GUI), booting into a graphical login screen. 
 6 | Reboots the system. 

When you use the `systemctl` command, as shown below, you're changing the default runlevel of the OS.

---

# Print the current default:
```
systemctl get-default
```

---

# Set a new default:
```
systemctl set-default New_Default
```
-where *New_Default* is one of the items in the table below:

|New Default       | Description         |
|------------------|---------------------|
|multi-user.target | Console interface   |
|graphical.target  | Graphical interface |

---

# Manually Switching 

You can use the `init` command to manually switch between runlevels. This is not persistent, so the OS will revert to the default runlevel next time it boots.

Switch to *headhless* or CLI mode:

```
init 3
```

Switch to the default runlevel where there's a GUI:

```
init 5
```

