---
title: "FreeIPA"
author_profile: true
layout: single
---

FreeIPA runs on Fedora as an installed component. Save yourself some grief and run Fedora if you're going to run FreeIPA.

---

## Installation

FreeIPA is a default component when you install Fedora Server 45. You select it when you install the OS. It's a checkbox. You can do this! :)

---

## Initial Configuration

### /etc/hosts

There must be a mapping in your /etc/hosts:

```
192.168.0.176 kermit.osoyalce.com kermit
```

### Firewall Configuration

As root:

```sh
root@kermit:~# firewall-cmd --add-service=freeipa-ldap --add-service=freeipa-ldaps --permanent
success
```

### Install FreeIPA

If you haven't already, you'll need to install FreeIPA:

```sh
root@kermit:~# dnf install freeipa-server
Updating and loading repositories:
Repositories loaded.
Package "freeipa-server-4.13.4-3.2.fc45.x86_64" is already installed.

Nothing to do.
root@kermit:~# 
```

### Configure FreeIPA

```sh
ipa-server-install
```

Follow the instructions.

## Additional Documentation

```sh
$ man ipa
$ ipa help topics
$ ipa help user
```

## Adding the First User

```sh
$ ipa user-add --first=Nadim --last=Ghaznavi --password nadim
```

## Links

* [FreeIPA Homepage](https://www.freeipa.org/)
* [Fedora Server Download](https://fedoraproject.org/server/download/)