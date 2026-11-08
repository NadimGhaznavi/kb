---
title: "Fedora"
author_profile: true
layout: single
---

## Install Fedora 45 Server

### Base image

- **Release:** Fedora 45
- **Base environment:** Fedora Server Edition
- **Add-ons:** Domain Membership, Headless Management, System Tools

### Installation

1. Boot from the [Fedora 45 Server](https://fedoraproject.org/server/download/) installer USB and choose **Install Fedora**. Select **English (United States)**.
2. On **Installation Summary**, confirm the US English keyboard and language support and check the time zone. The lab uses `America/Toronto`.
3. Under **Installation Source**, use the closest mirror. Under **Software Selection**, choose the base environment and add-ons listed above.
4. Under **Installation Destination**, select the blank target drive and use **Automatic** partitioning.
5. Under **Network & Host Name**, select the Ethernet adapter and click **Configure**. Set the connection name to `wired connection`, keep IPv4 on automatic (DHCP), and click **Save**. Enter the fully qualified hostname, click **Apply**, then click **Done**.
6. Under **Root Account**, enable root and set its password. For this lab build, select **Allow root SSH login with password**.
7. Click **Begin Installation**. When it finishes, click **Reboot System**.

---

## Post Install Steps

### Install Additional Software

```
# dnf install vim htop
```

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
