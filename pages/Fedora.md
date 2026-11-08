---
title: "Fedora"
author_profile: true
layout: single
---

[Fedora](https://fedoraproject.org/) is a tried, trusted, and true Linux distribution. It is fully mature and engineered to enterprise standards. It also ships with [FreeIPA](https://www.freeipa.org/) if you are looking for a security focused *identity, policy, and audit* solution.

---

## Mapping apt to dnf

Debian (apt) | Fedora (dnf)
--- | ---
`apt update` | `dnf check-update`
`apt install package` | `dnf install package`
`apt remove package` | `dnf remove package`
`apt upgrade` | `dnf upgrade`
`apt search package` | `dnf search package`
`apt show package` | `dnf info package`
`apt autoremove` | `dnf autoremove`
`apt list --installed` | `dnf list --installed`

## Links

* [FreeIPA Homepage](https://www.freeipa.org/)
* [Fedora Server Download](https://fedoraproject.org/server/download/)