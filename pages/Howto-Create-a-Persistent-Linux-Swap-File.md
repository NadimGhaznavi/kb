---
title: Howto Create a Persistent Linux Swap File
layout: default
---

Check your current swap configuration:
```
free -m
```

Create the file:

```
sudo dd if=/dev/zero of=/swapfile bs=1MB count=10240
```

This will create a 10 Gb file on your filesystem.

Lock down the file permissions:

```
sudo chmod 600 /swapfile
```

Flag the file as a *swapfile* to the OS:

```
sudo mkswap /swapfile
```

Activate the new swapfile:

```
sudo swapon /swapfile
```

To make the swapfile persistent, you need to edit the `/etc/fstab` file. Add the following line to the bottom of the file:

```
/swapfile swap swap defaults 0 0
```

That's it! You're done!!! 



