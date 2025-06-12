---
title: Enabling Huge Page Support in Grub
layout: default
---

Edit the */etc/default/grub* configuration file and add the *transparent_hugepage=always* to the *GRUB_CMDLINE_LINUX_DEFAULT* line:

Old line:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

New line:
```
GRUB_CMDLINE_LINUX_DEFAULT="quiet transparent_hugepage=always"
```

Rebuild the kernel boot image to include the new settings:
```
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

Finally, you'll need to reboot to pickup the new change.
```
sudo shutdown -r now
```