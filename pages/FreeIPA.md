---
title: "FreeIPA"
author_profile: true
layout: single
---

FreeIPA runs on Fedora as an installed component. Save yourself some grief and run Fedora if you're going to run FreeIPA. Setting up FreeIPA is a bit complicated. I found an excellent [YouTube tutorial](https://www.youtube.com/watch?v=8ywLsrBwqxA&t=1s) by Dave from [Browse Tech](https://www.youtube.com/@prowsetech) and based most of this documentation on the video.

Dave deploys FreeIPA on CentOS, I'm deploying it on Fedora Server. I'm pretty sure you can adapt this procedure to any Linux distribution that includes FreeIPA.

If you do get stuck, reach out and ask for help! :)

---

# Table of Contents
{:.no_toc}

* TOC
{:toc}

---

# Deploy FreeIPA Server

This assumes you have your Linux OS up and running. I used Fedora Server 45.
Run the server installation commands in a root shell on Kermit unless another
host or account is specified. Later sections use `sudo` where needed.

Example output reflects different stages of the rollout. Versions, assigned
IDs, and timestamps may differ on your installation.

## Get IP and DNS Information

You'll need the IP of your system and the DNS servers that your environment is using.

**Command:**

```bash
nmcli
```

**Example Output:**

```text
eno1: connected to wired connection
        "Intel 82579LM"
        ethernet (e1000e), 24:BE:05:13:44:52, hw, mtu 1500
        ip4 default
        inet4 192.168.0.176/24
        route4 192.168.0.0/24 metric 100
        route4 default via 192.168.0.1 metric 100
        inet6 fe80::415d:af1a:dee0:feda/64
        route6 fe80::/64 metric 1024

lo: connected (externally) to lo
        "lo"
        loopback (unknown), 00:00:00:00:00:00, sw, mtu 65536
        inet4 127.0.0.1/8
        inet6 ::1/128

DNS configuration:
        servers: 206.248.154.22 206.248.154.170
        domains: box
        interface: eno1

Use "nmcli device show" to get complete information about known devices and
"nmcli connection show" to get an overview on active connection profiles.

Consult nmcli(1) and nmcli-examples(7) manual pages for complete usage details.
```

Note the IP (`192.168.0.176`) and the upstream DNS servers (`206.248.154.22 206.248.154.170`).

## Check for a Fully Qualified Hostname

FreeIPA requires that your hostname be fully qualified (`kermit.lab.osoyalce.com` in the example below).

**Command:**

```bash
hostnamectl
```

**Example Output:**

```text
     Static hostname: kermit.lab.osoyalce.com
           Icon name: computer-desktop
             Chassis: desktop 🖥️
          Machine ID: 973c66f380df499ca76ea1fabb351de4
             Boot ID: c777b39013fe4a7e850648d9c33cac47
        Product UUID: 967ff000-cf91-11e1-0000-24be05134452
    Operating System: Fedora Linux 45 (Server Edition)
         CPE OS Name: cpe:/o:fedoraproject:fedora:45
      OS Support End: Wed 2027-12-08
OS Support Remaining: 1y 4w 1d
              Kernel: Linux 7.2.15-300.fc45.x86_64
        Architecture: x86-64
     Hardware Vendor: Hewlett-Packard
      Hardware Model: HP Compaq 8200 Elite SFF PC
     Hardware Serial: 2UA23015C3
        Hardware SKU: H2A01US#ABA
    Firmware Version: J01 v02.15
       Firmware Date: Thu 2011-11-10
        Firmware Age: 14y 11month 4w 1d
```

If it is set to just `kermit`, change it to the fully qualified name:

**Command:**

```bash
hostnamectl hostname kermit.lab.osoyalce.com
```

## Update /etc/hosts

Add a line for your machine in the `/etc/hosts` file:

**Configuration:**

```text
192.168.0.176 kermit.lab.osoyalce.com kermit
```

## Install FreeIPA Server

I am using the built-in DNS server.

**Command:**

```bash
dnf install freeipa-server-dns
```

## Confirm FreeIPA Install

**Command:**

```bash
ipa --version
```

**Example Output:**

```text
VERSION: 4.13.4, API_VERSION: 2.257
```

## Configure FreeIPA

**Command:**

```bash
ipa-server-install \
  --setup-dns \
  --reverse-zone=0.168.192.in-addr.arpa. \
  --ntp-pool=ca.pool.ntp.org
```

**Example Output:**

```text
The log file for this installation can be found in /var/log/ipaserver-install.log
==============================================================================
This program will set up the IPA Server.
Version 4.13.4

This includes:
  * Configure a stand-alone CA (dogtag) for certificate management
  * Configure the NTP client (chronyd)
  * Create and configure an instance of Directory Server
  * Create and configure a Kerberos Key Distribution Center (KDC)
  * Configure Apache (httpd)
  * Configure DNS (bind)
  * Configure SID generation
  * Configure the KDC to enable PKINIT

To accept the default shown in brackets, press the Enter key.

Enter the fully qualified domain name of the computer
on which you're setting up server software. Using the form
<hostname>.<domainname>
Example: master.example.com


Server host name [kermit.lab.osoyalce.com]:
```

Press Enter to accept the hostname, then answer the remaining installer
questions. Installation can take about 10 minutes. On completion, the output
should include:

**Example Output:**

```text
Setup complete

Next steps:
	1. You must make sure these network ports are open:
		TCP Ports:
		  * 80, 443: HTTP/HTTPS
		  * 389, 636: LDAP/LDAPS
		  * 88, 464: kerberos
		  * 53: bind
		UDP Ports:
		  * 88, 464: kerberos
		  * 53: bind
		  * 123: ntp

	2. You can now obtain a kerberos ticket using the command: 'kinit admin'
	   This ticket will allow you to use the IPA tools (e.g., ipa user-add)
	   and the web user interface.

Be sure to back up the CA certificates stored in /root/cacert.p12
These files are required to create replicas. The password for these
files is the Directory Manager password
The ipa-server-install command was successful
```

## Back Up cacert.p12

Run this from a root shell on Sally, in the backup destination directory
`/imports/disk1/backups/kermit/root/root`:

**Command:**

```bash
scp kermit:/root/cacert.p12 .
```

**Example Output:**

```text
cacert.p12                                                      100%   14KB   1.5MB/s   00:00
```

## Configure the Firewall

Confirm that the firewall is running before continuing:

**Command:**

```bash
systemctl status firewalld
```

If it is not running, resolve that before opening the required ports.

### Check for Open Ports and Services

**Command:**

```bash
firewall-cmd --list-ports
firewall-cmd --list-services
```

**Example Output:**

```text
cockpit dhcpv6-client ssh
```

### Open Ports

**Command:**

```bash
firewall-cmd --add-port={80,443,389,636,88,464,53}/tcp --permanent
```

**Example Output:**

```text
success
```

**Command:**

```bash
firewall-cmd --add-port={88,464,53,123}/udp --permanent
```

**Example Output:**

```text
success
```

**Command:**

```bash
firewall-cmd --reload
```

**Example Output:**

```text
success
```

## Get a Kerberos Admin Ticket

**Command:**

```bash
kinit admin
```

**Example Output:**

```text
Password for admin@LAB.OSOYALCE.COM:
```

**Command:**

```bash
klist
```

**Example Output:**

```text
Ticket cache: KCM:0
Default principal: admin@LAB.OSOYALCE.COM

Valid starting       Expires              Service principal
11/08/2026 12:35:34  11/09/2026 12:15:10  krbtgt/LAB.OSOYALCE.COM@LAB.OSOYALCE.COM
```

## Add a User

**Command:**

```bash
ipa user-add nadim --password \
  --homedir=/ipahome/nadim \
  --first="Nadim-Daniel" \
  --last="Ghaznavi" \
  --initials="NDG" \
  --email="nghaznavi@gmail.com" \
  --shell /bin/bash
```

**Example Output:**

```text
Password:
Enter Password again to verify:
------------------
Added user "nadim"
------------------
  User login: nadim
  First name: Nadim-Daniel
  Last name: Ghaznavi
  Full name: Nadim-Daniel Ghaznavi
  Display name: Nadim-Daniel Ghaznavi
  Initials: NDG
  Home directory: /ipahome/nadim
  GECOS: Nadim-Daniel Ghaznavi
  Login shell: /bin/bash
  Principal name: nadim@LAB.OSOYALCE.COM
  Principal alias: nadim@LAB.OSOYALCE.COM
  User password expiration: 20261108180945Z
  Email address: nghaznavi@gmail.com
  UID: 1469600006
  GID: 1469600006
  Password: True
  Member of groups: ipausers
  Kerberos keys available: True
```

## Configure Local Automounts on the FreeIPA Server

The FreeIPA server also needs automount client configuration for local user
sessions. Serving the central maps does not automatically make the server
consume them. Run these commands on Kermit:

**Command:**

```bash
sudo ipa-client-automount --location=default
sudo setsebool -P use_nfs_home_dirs on
```

The first command configures SSSD's autofs responder and IPA automount
provider to use the `default` location, restarts SSSD and autofs, and enables
autofs at boot. The second command persistently allows NFS home directories
under SELinux.

Mount definitions remain in FreeIPA. Create the central maps described in
[Setting Up Automounter Maps](#setting-up-automounter-maps) and
[Setting Up Automounted Home Directories](#setting-up-automounted-home-directories)
before expecting `/imports/disk1` and `/ipahome/<username>` to mount. Those
maps use `sec=sys`; Kerberized NFS is not required.

Check the local configuration after the central maps are available:

**Command:**

```bash
sudo automount -m
systemctl is-enabled autofs
getsebool use_nfs_home_dirs
```

The map dump should include `/imports` and `/ipahome`, autofs should report
`enabled`, and `use_nfs_home_dirs` should report `on`.

---

# Reset a User's Password

On an enrolled host, obtain an administrator ticket and reset the user's
password. Replace `nadim` with the required IPA username:

**Command:**

```bash
kinit admin
ipa passwd nadim
```

If you already have a valid administrator ticket, only the `ipa passwd`
command is needed. It prompts for the new password twice; the user's old
password is not required. Enter the password at the prompts rather than
putting it on the command line. Local root access is not required when you
have the IPA administrator ticket.

## Default Behavior: Change Password at Next Login

An administrator reset marks the password as expired, requiring the user
to choose a password at their next password-based login. This still happens
with the lab's global `maxlife=0` (no periodic expiry) and `history=0`
(password reuse allowed) settings.

The user can complete that change from their own terminal session:

**Command:**

```bash
kinit nadim
```

They enter the administrator-set password, then follow the new-password
prompts. The resulting password follows the user's effective password
policy. The lab's global policy does not schedule periodic expiration.

## Keep the Administrator-Set Password

For a lab account where the password you set should remain usable without
another password change, clear the expiration immediately after the reset,
while you still have the administrator ticket:

**Command:**

```bash
ipa passwd nadim
ipa user-mod nadim --password-expiration=''
ipa user-show nadim --all
```

This is an alternative to the default reset procedure above. The empty
expiration value removes the stored password expiration date. Confirm that
`User password expiration` is absent from the output. It does not change
the password again or disable the account.

FreeIPA's [password reset documentation](https://www.freeipa.org/page/New_Passwords_Expired)
explains the default requirement to change an administrator-set password.

---

# Add a Fedora Machine to the FreeIPA Domain

Run the installation commands in a root shell on Paris. The login test
switches to the `nadim` account.

## Get the IP Address

We need the IP address (`192.168.0.27`).

**Command:**

```bash
nmcli
```

**Example Output:**

```text
enp3s0: connected to wired connection
        "Realtek RTL8111/8168/8211/8411"
        ethernet (r8169), 30:85:A9:A9:48:5C, hw, mtu 1500
        ip4 default
        inet4 192.168.0.27/24
        route4 192.168.0.0/24 metric 100
        route4 default via 192.168.0.1 metric 100
        inet6 fe80::789a:ab19:c2de:8a18/64
        route6 fe80::/64 metric 1024

lo: connected (externally) to lo
        "lo"
        loopback (unknown), 00:00:00:00:00:00, sw, mtu 65536
        inet4 127.0.0.1/8
        inet6 ::1/128

DNS configuration:
        servers: 192.168.0.176
        interface: enp3s0

Use "nmcli device show" to get complete information about known devices and
"nmcli connection show" to get an overview on active connection profiles.

Consult nmcli(1) and nmcli-examples(7) manual pages for complete usage details.
```

## Confirm a Fully Qualified Hostname

Confirm that the hostname is fully qualified (i.e. `paris.lab.osoyalce.com`, not `paris`).

**Command:**

```bash
hostnamectl
```

**Example Output:**

```text
     Static hostname: paris.lab.osoyalce.com
           Icon name: computer-desktop
             Chassis: desktop 🖥️
   Chassis Asset Tag: Asset-1234567890
          Machine ID: 9d85236fdba94e04ab10c291549ac31f
             Boot ID: dee222ddd91140a680f30a27009ec454
        Product UUID: 1feaa860-157d-11e0-8e41-3085a9a9485c
    Operating System: Fedora Linux 45 (Server Edition)
         CPE OS Name: cpe:/o:fedoraproject:fedora:45
      OS Support End: Wed 2027-12-08
OS Support Remaining: 1y 4w
              Kernel: Linux 7.2.15-300.fc45.x86_64
        Architecture: x86-64
     Hardware Vendor: ASUSTeK COMPUTER INC.
      Hardware Model: CM1745
     Hardware Serial: CAPDCG001333
        Hardware SKU: SKU
    Hardware Version: System Version
    Firmware Version: 5101
       Firmware Date: Mon 2012-09-17
        Firmware Age: 14y 1month 3w
```

## Install the FreeIPA Client

It's already installed here.

**Command:**

```bash
dnf install freeipa-client
```

**Example Output:**

```text
Updating and loading repositories:
Last metadata expiration check: 3:15:50 ago on 2026-11-08 15:07:10.
Repositories loaded.
Package "freeipa-client-4.13.4-4.fc45.x86_64" is already installed.

Nothing to do.
```

## Configure DNS to Use Your IPA Server

I have FreeIPA deployed on `kermit.lab.osoyalce.com` which has an IP of `192.168.0.176`:

**Command:**

```bash
nmcli c m "wired connection" ipv4.dns 192.168.0.176
nmcli c u "wired connection"
host kermit.lab.osoyalce.com
```

**Example Output:**

```text
kermit.lab.osoyalce.com has address 192.168.0.176
```

**Command:**

```bash
host 192.168.0.176
```

**Example Output:**

```text
176.0.168.192.in-addr.arpa domain name pointer kermit.lab.osoyalce.com.
176.0.168.192.in-addr.arpa domain name pointer kermit.
```

**Command:**

```bash
host www.google.hk
```

**Example Output:**

```text
www.google.hk has address 142.250.137.94
www.google.hk has IPv6 address 2607:f8b0:4023:1807::5e
```

These lookups check that:

- Paris can resolve names through Kermit.
- Kermit serves forward and reverse records for `lab.osoyalce.com`.
- Kermit resolves Internet DNS queries using its configured forwarders.

The captured reverse lookup includes an extra short-name record. The client
installer output below also records a reverse-DNS warning from that rollout.

## Configure the FreeIPA Client

**Command:**

```bash
ipa-client-install --enable-dns-updates --ntp-pool=ca.pool.ntp.org
```

**Example Output:**

```text
This program will set up IPA client.
Version 4.13.4

Discovery was successful!
Client hostname: paris.lab.osoyalce.com
Realm: LAB.OSOYALCE.COM
DNS Domain: lab.osoyalce.com
IPA Server: kermit.lab.osoyalce.com
BaseDN: dc=lab,dc=osoyalce,dc=com
NTP pool: ca.pool.ntp.org

Continue to configure the system with these values? [no]: yes
Synchronizing time
Configuration of chrony was changed by installer.
Attempting to sync time with chronyc.
Time synchronization was successful.
User authorized to enroll computers: admin
Password for admin@LAB.OSOYALCE.COM:
Successfully retrieved CA cert
    Subject:     CN=Certificate Authority,O=LAB.OSOYALCE.COM
    Issuer:      CN=Certificate Authority,O=LAB.OSOYALCE.COM
    Valid From:  2026-11-08 17:07:19+00:00
    Valid Until: 2046-11-08 17:07:19+00:00

Enrolled in IPA realm LAB.OSOYALCE.COM
Created /etc/ipa/default.conf
Configured /etc/sssd/sssd.conf
Systemwide CA database updated.
Incorrect reverse record(s):
192.168.0.27 is pointing to paris. instead of paris.lab.osoyalce.com.
Adding SSH public key from /etc/ssh/ssh_host_ed25519_key.pub
Adding SSH public key from /etc/ssh/ssh_host_ecdsa_key.pub
Adding SSH public key from /etc/ssh/ssh_host_rsa_key.pub
SSSD enabled
Configured /etc/openldap/ldap.conf
Configured /etc/ssh/ssh_config
Configured /etc/ssh/sshd_config.d/04-ipa.conf
Configuring lab.osoyalce.com as NIS domain.
Configured /etc/krb5.conf for IPA realm LAB.OSOYALCE.COM
Client configuration complete.
The ipa-client-install command was successful
```

## Test the Client

See if you can now use a FreeIPA domain account (e.g. `nadim`) on the newly added machine.

**Command:**

```bash
su - nadim
```

**Example Output:**

```text
Creating home directory for nadim.
```

**Command:**

```bash
kinit nadim
```

**Example Output:**

```text
Password for nadim@LAB.OSOYALCE.COM:
Password expired.  You must change it now.
Enter new password: ********
Enter it again: ********
```

Check for Kerberos tickets:

**Command:**

```bash
klist
```

**Example Output:**

```text
Ticket cache: KCM:1469600006
Default principal: nadim@LAB.OSOYALCE.COM

Valid starting       Expires              Service principal
11/08/2026 14:31:18  11/09/2026 13:42:47  krbtgt/LAB.OSOYALCE.COM@LAB.OSOYALCE.COM
```

BINGO! 🐧

---

# Setting Up Automounter Maps

This procedure was verified on Sally, an enrolled Debian client. It mounts
`wintermute.lab.osoyalce.com:/exports/disk1` at `/imports/disk1`, with the
mount definitions stored in FreeIPA and retrieved through SSSD.

This is an **indirect map**: `/imports` is the parent mount point and `disk1`
is a key beneath it. A direct map would use the full path `/imports/disk1`
as its key in `auto.direct`.

The NFS server already exports `/exports/disk1` to the lab network. We use
ordinary NFS with `sec=sys`; Kerberos authentication to manage FreeIPA does
not require Kerberized NFS.

## Use the Default Location

FreeIPA already provides a location named `default`. SSSD uses it when
`ipa_automount_location` is unset in the client's domain configuration in
`/etc/sssd/sssd.conf`. No additional location is needed for this setup.

The client must select the location containing the maps. Our earlier maps
were in `delta`, while Sally was reading `default`, so Sally could not see
them.

## Create the Map and Mount Entry

Run these commands with a Kerberos ticket for an IPA administrator or an
account delegated the **Automount Administrators** privilege. Local root
access alone does not grant permission to edit FreeIPA maps.

Create the map, add the share, and then link the map into `auto.master`:

**Command:**

```bash
ipa automountmap-add default auto.imports
ipa automountkey-add default auto.imports \
  --key=disk1 \
  --info='-fstype=nfs4,rw,hard,sec=sys wintermute.lab.osoyalce.com:/exports/disk1'
ipa automountkey-add default auto.master --key=/imports --info=auto.imports
```

These are creation commands; run them once. To inspect the resulting entries:

**Command:**

```bash
ipa automountkey-find default auto.imports
ipa automountkey-find default auto.master
```

The resulting mapping is:

**Map Layout:**

```text
default
  auto.master:  /imports -> auto.imports
  auto.imports: disk1 -> wintermute.lab.osoyalce.com:/exports/disk1
```

## Check the Client's Map Source

On Sally, `/etc/nsswitch.conf` already contains:

**Configuration:**

```text
automount: sss
```

The local `/etc/auto.master` includes the central master map:

**Configuration:**

```text
+auto.master
```

When migrating, remove the old `/imports /etc/auto.imports` entry and any
other active local definitions for `/imports`. The share definition now
lives in FreeIPA. Keep the client configuration that connects autofs to SSSD.

Sally already had `autofs`, `sssd`, and `sssd-autofs.socket` active and enabled:

**Command:**

```bash
systemctl is-active autofs sssd sssd-autofs.socket
systemctl is-enabled autofs sssd sssd-autofs.socket
```

This procedure assumes that client integration is already in place.

## Refresh the Client's Map Cache

On Sally, expire all automount maps using `-A` in the
[SSSD cache reference](#refreshing-sssd-caches), then inspect what autofs reads:

**Command:**

```bash
sudo -n timeout 20 automount -m
```

The output should include this section. The `sss` source confirms that the
map is being retrieved through SSSD:

**Example Output:**

```text
Mount point: /imports

source(s):

  instance type(s): sss
  map: auto.imports

  disk1 | -fstype=nfs4,rw,hard,sec=sys wintermute.lab.osoyalce.com:/exports/disk1
```

If only an empty `auto.direct` appears, check the selected IPA location and
its `auto.master` entries before proceeding.

## Replace the Old Local Mount

Removing the local map definition does not necessarily remove its existing
mount. On Sally, Nautilus and VLC held the old share open, leaving a stale
`/imports` autofs mount after a service restart.

Close applications using the share and check for remaining processes:

**Command:**

```bash
sudo -n fuser -vm /imports/disk1
findmnt -rn -t nfs,nfs4,autofs -o TARGET,SOURCE,FSTYPE,OPTIONS
```

Once applications have released the share, stop autofs, unmount any remaining
old mounts, and start autofs again. The following uses normal unmounts and
restarts autofs on exit if a command fails. The subshell keeps the error
handling local to this block:

**Command:**

```bash
(
  set -e
  sudo -n systemctl stop autofs
  trap 'sudo -n systemctl start autofs' EXIT
  if findmnt -rn -M /imports/disk1 >/dev/null; then
    sudo -n umount /imports/disk1
  fi
  if findmnt -rn -M /imports >/dev/null; then
    sudo -n umount /imports
  fi
  sudo -n systemctl start autofs
  trap - EXIT
)
```

## Verify the Automount

Check the service and mount state before accessing the share:

**Command:**

```bash
systemctl is-active autofs
findmnt -rn -t nfs,nfs4,autofs -o TARGET,SOURCE,FSTYPE,OPTIONS
```

At this point Sally showed `/imports` as an autofs mount sourced from
`auto.imports`, with `/imports/disk1` not yet mounted. Access the path to
trigger the NFS mount, then inspect it:

**Command:**

```bash
timeout 20 stat -c '%n mode=%a uid=%u gid=%g type=%F' /imports/disk1
findmnt -rn -M /imports/disk1 -o TARGET,SOURCE,FSTYPE,OPTIONS
sudo -n journalctl -u autofs --since '3 minutes ago' -n 50 --no-pager
```

On Sally, access succeeded and the new mount had:

- Target: `/imports/disk1`
- Source: `wintermute.lab.osoyalce.com:/exports/disk1`
- Filesystem: `nfs4`, negotiated as NFSv4.2
- Options including `rw`, `hard`, and `sec=sys`

---

# Setting Up Automounted Home Directories

This setup was verified on Sally for both `nadim` and `codex`. It uses an
indirect wildcard map in FreeIPA's `default` location, retrieved through
SSSD, with ordinary NFS (`sec=sys`).

The client and server paths have different names:

| Purpose | Path |
| --- | --- |
| User's home path in IPA and on clients | `/ipahome/<user>` |
| Home directory stored on Wintermute | `/exports/disk1/homeipa/<user>` |
| FreeIPA map | `default` / `auto.ipahome` |

For example, `/ipahome/nadim` mounts
`wintermute.lab.osoyalce.com:/exports/disk1/homeipa/nadim`.

## Check the User's Home Path and Ownership

The client integration from the preceding section must already be working:
SSSD selects `default`, `automount: sss` is configured, and autofs reads the
central `auto.master` map. Check the account information on the client:

**Command:**

```bash
getent passwd nadim codex
```

The verified account values were:

| Account | UID | GID | Home directory |
| --- | --- | --- | --- |
| `nadim` | `1469600007` | `1469600007` | `/ipahome/nadim` |
| `codex` | `1469600008` | `1469600008` | `/ipahome/codex` |

Use the actual UID and GID for each account. With `sec=sys`, the ownership
of the server-side directory must match the numeric IDs used by the client.
The IPA home path must match the `/ipahome` mount point below.

Before enabling the map, check for existing local homes beneath `/ipahome`;
resolve any local data that would be hidden by the new automount.

## Provision Home Directories on the NFS Server

Wintermute already exports `/exports/disk1` to the lab network. The verified
home mounts use subdirectories of that export; no additional export was
needed for this setup.

The wildcard map mounts existing directories. It does not create a home on
the NFS server when a new IPA account is added.

For a new `codex` home, the following commands can be run on **Wintermute**
using the UID and GID checked above. Run the creation command only when that
home does not already exist:

**Command:**

```bash
sudo install -d -m 0700 -o 1469600008 -g 1469600008 /exports/disk1/homeipa/codex
sudo stat -c '%n mode=%a uid=%u gid=%g type=%F' /exports/disk1/homeipa/codex
```

During this rollout, the same directory was created through Sally's existing
`/imports/disk1/homeipa/codex` NFS path. It has mode `0700` and ownership
`1469600008:1469600008`. The existing `nadim` directory already had the
correct ownership and was left unchanged.

## Create the Wildcard Map in FreeIPA

Run the IPA commands on an enrolled host with a Kerberos ticket for an IPA
administrator or an account delegated the **Automount Administrators**
privilege. For example, authenticate as the administrator with:

**Command:**

```bash
kinit admin
```

Create the map, add the wildcard entry, and link it into `auto.master`:

**Command:**

```bash
ipa automountmap-add default auto.ipahome
ipa automountkey-add default auto.ipahome \
  --key='*' \
  --info='-fstype=nfs4,rw,hard,sec=sys wintermute.lab.osoyalce.com:/exports/disk1/homeipa/&'
ipa automountkey-add default auto.master --key=/ipahome --info=auto.ipahome
```

Keep the quotes around `*` and the mount information. Autofs substitutes the
requested key for `&`, so accessing `/ipahome/codex` selects the server's
`homeipa/codex` directory. The shell must pass those characters literally.

These creation commands are run once; they have already been applied in
this lab. Inspect the entries with:

**Command:**

```bash
ipa automountkey-find default auto.ipahome
ipa automountkey-find default auto.master
```

The master map should contain `/ipahome -> auto.ipahome`, and `auto.ipahome`
should contain the `*` entry shown above.

## Refresh and Reload the Client

On Sally, expire all automount maps using `-A` in the
[SSSD cache reference](#refreshing-sssd-caches), then inspect the map from SSSD:

**Command:**

```bash
sudo -n timeout 20 automount -m
```

The output should include:

**Example Output:**

```text
Mount point: /ipahome

source(s):

  instance type(s): sss
  map: auto.ipahome

  * | -fstype=nfs4,rw,hard,sec=sys wintermute.lab.osoyalce.com:/exports/disk1/homeipa/&
```

Reload autofs to add the new mount point. The reload signals the daemon and
can return before `/ipahome` is ready, so wait for the autofs mount before
accessing a user's home:

**Command:**

```bash
sudo -n systemctl reload autofs
timeout 15 bash -c 'until findmnt -rn -M /ipahome -t autofs >/dev/null; do sleep 0.2; done'
findmnt -rn -M /ipahome -o TARGET,SOURCE,FSTYPE
```

The last command should show `/ipahome`, `auto.ipahome`, and `autofs`.
If the wait times out, inspect the service logs in the verification step
before attempting a login. No local home-map definitions are required.

## Verify Mounting and Home Directory Access

On Sally, access the home paths and inspect their resulting mounts:

**Command:**

```bash
timeout 25 stat -c '%n mode=%a uid=%u gid=%g type=%F' /ipahome/nadim /ipahome/codex
findmnt -rn -M /ipahome/nadim -o TARGET,SOURCE,FSTYPE,OPTIONS
findmnt -rn -M /ipahome/codex -o TARGET,SOURCE,FSTYPE,OPTIONS
```

The sources should be Wintermute's `/exports/disk1/homeipa/nadim` and
`/exports/disk1/homeipa/codex`. Both verified mounts negotiated NFSv4.2 with
`rw`, `hard`, and `sec=sys`.

Check that a login shell starts in the user's home and that the account can
write, read back, and remove a temporary file there. This is the check used
for `codex` on Sally:

**Command:**

```bash
sudo -n -i -u codex python3 - <<'PYTHON'
import os
import pwd
import tempfile

account = pwd.getpwuid(os.getuid())
assert os.getcwd() == account.pw_dir, (os.getcwd(), account.pw_dir)
assert os.environ['HOME'] == account.pw_dir
print(f'Login home verified: user={account.pw_name} HOME={os.environ["HOME"]} cwd={os.getcwd()}')
payload = 'automount home-directory read/write verification\n'
with tempfile.NamedTemporaryFile(mode='w+', prefix='.automount-check-', dir='.') as check:
    check.write(payload)
    check.flush()
    os.fsync(check.fileno())
    check.seek(0)
    assert check.read() == payload
print('Read/write verification passed; temporary test file removed.')
PYTHON
```

The test succeeded with `HOME` and the working directory both set to
`/ipahome/codex`. A separate read/write test as `nadim` also succeeded.
This verifies filesystem access as the account; it does not test SSH
password authentication.

For troubleshooting, check the services, the effective maps, and recent logs:

**Command:**

```bash
systemctl is-active autofs sssd sssd-autofs.socket
sudo -n timeout 15 automount -m
sudo -n journalctl -u autofs --since '5 minutes ago' -n 50 --no-pager
```

---

# Managing Sudo Access with FreeIPA

This procedure creates the `lab-admin` user group with `nadim` and `codex`
as its initial members. A FreeIPA sudo rule of the same name grants members
permission to run any command as any user or group on clients that consume
sudo policy from the `LAB.OSOYALCE.COM` IPA domain.

The rule grants passwordless sudo to members of `lab-admin`.
Both group membership and the sudo policy are managed in FreeIPA.

## Authenticate as an IPA Administrator

Run these commands on an enrolled host with an IPA administrator ticket:

**Command:**

```bash
kinit admin
```

The account needs permission to manage both user groups and sudo rules.
The earlier `codex-automount` role only permits automount administration;
it does not grant those directory-management permissions or Linux sudo
access. Local root access is also separate from IPA administrative rights.

## Create the Group and Add Members

**Command:**

```bash
ipa group-add lab-admin \
  --desc='Administrators with sudo access on LAB.OSOYALCE.COM clients'
ipa group-add-member lab-admin --users=nadim --users=codex
```

The group is a normal IPA POSIX group with an IPA-assigned GID. Its members
retain their existing UIDs, primary GIDs, and home directories.

## Create the Central Sudo Rule

Create the rule, disable password prompting, and assign the group:

**Command:**

```bash
ipa sudorule-add lab-admin \
  --desc='Full sudo access for lab-admin on IPA domain clients' \
  --hostcat=all \
  --cmdcat=all \
  --runasusercat=all \
  --runasgroupcat=all
ipa sudorule-add-option lab-admin --sudooption='!authenticate'
ipa sudorule-add-user lab-admin --groups=lab-admin
```

The settings mean:

| Setting | Effect |
| --- | --- |
| User group `lab-admin` | Only members of this group receive access through this rule |
| Host category `all` | Applies on all clients using this IPA domain's sudo policy, including future clients |
| Command category `all` | Allows all commands |
| RunAs user and group categories `all` | Allows execution as root or another user/group |
| Sudo option `!authenticate` | Allows sudo without a password prompt |

Do not set `--usercat=all`: access is assigned through the `lab-admin` group.
These are creation commands, so run them once. Inspect the result with:

**Command:**

```bash
ipa group-show lab-admin
ipa sudorule-show lab-admin
```

Confirm that the group lists `nadim` and `codex`, and that the rule is enabled
with the categories, group, and option described above.

## Change an Existing Rule to Passwordless Sudo

If the rule was created with the earlier `authenticate` option, replace it
using an IPA administrator ticket:

**Command:**

```bash
ipa sudorule-remove-option lab-admin --sudooption=authenticate
ipa sudorule-add-option lab-admin --sudooption='!authenticate'
ipa sudorule-show lab-admin
```

Confirm that the displayed sudo option is `!authenticate`. Keep the single
quotes around `!authenticate` to avoid history expansion in interactive Bash.
Clients apply the change after SSSD refreshes its cached sudo policy.

## Configure Clients to Retrieve Central Policy

Each client needs working IPA enrollment and SSSD sudo integration. The
client's `/etc/nsswitch.conf` includes:

**Configuration:**

```text
sudoers: files sss
```

SSSD must also have its sudo provider and responder configured for the IPA
domain. On Fedora, `authselect current` can show the `sssd` profile and its
`with-sudo` feature. Check the effective policy rather than assuming the
NSS entry alone proves the integration works.

No per-group entry in `/etc/sudoers.d` is needed for `lab-admin`. The `files`
source continues to honor existing local sudo rules, which can grant
additional access independently of the IPA rule.

## Verify Access on Each Client

Confirm that the client sees the central group membership:

**Command:**

```bash
getent group lab-admin
id nadim
id codex
```

In a fresh login as each member, list the effective permissions and test a
harmless command without using a cached authentication timestamp:

**Command:**

```bash
sudo -l
sudo -k -n /usr/bin/id -u
```

The permissions should include `(ALL : ALL) NOPASSWD: ALL` and the test
should print `0` without prompting. The `-k` option ignores cached
authentication for this command, and `-n` fails instead of asking for a
password. A matching group in `id` confirms identity lookup; `sudo -l`
confirms that the sudo rule is effective on that particular client.

SSSD caches group membership and sudo policy. See the
[SSSD cache reference](#refreshing-sssd-caches) for user, group, and sudo-rule
selectors. Use a fresh login for updated session group membership and verify
each client before relying on the new policy.

## Manage Membership Centrally

After the initial setup, manage access by changing group membership in
FreeIPA. For example, to grant access to `codex` if it is not already a member:

**Command:**

```bash
ipa group-add-member lab-admin --users=codex
```

To remove that access instead:

**Command:**

```bash
ipa group-remove-member lab-admin --users=codex
```

Removing a member removes the grant from this rule after clients refresh.
Other matching local or IPA sudo rules still apply.

---

# Refreshing SSSD Caches

Run `sss_cache` on the machine whose cached data needs refreshing, including
Kermit when troubleshooting its local logins or mounts. It expires cached
records for retrieval from IPA; it does not delete IPA objects or flush other
machines. No `kinit admin` ticket is needed.

For example, expire the cached `nadim` user in the lab domain:

**Command:**

```bash
sudo /usr/sbin/sss_cache -d lab.osoyalce.com -u nadim
```

Keep the command prefix through `-d lab.osoyalce.com` and replace `-u nadim`
with a selector from this table. Uppercase selectors take no object name.

| Object | One named object | All objects of this type | Name/reference |
| --- | --- | --- | --- |
| User | `-u nadim` | `-U` | IPA username |
| Group | `-g lab-admin` | `-G` | IPA group name |
| Automount map | `-a auto.ipahome` | `-A` | Map name: `auto.master`, `auto.imports`, `auto.ipahome`, or `auto.direct`; not a mount path or map key |
| Sudo rule | `-r lab-admin` | `-R` | IPA sudo rule name |
| Netgroup | `-n NETGROUP` | `-N` | Replace `NETGROUP` with the netgroup name |
| Network service | `-s SERVICE` | `-S` | Replace `SERVICE` with a cached network-service name; not a systemd unit |
| SSH host public keys | `-h kermit.lab.osoyalce.com` | `-H` | Host FQDN; not DNS records or a user's `known_hosts` file |
| Everything supported above | — | `-E` | All supported cached object types in the selected domain |

After expiring automount maps, also reload autofs to reread its master map:

**Command:**

```bash
sudo systemctl reload autofs
```

Allow a few seconds for the reload. Existing active NFS mounts can retain
their old settings until autofs expires them. Cache invalidation also does
not update group membership in existing login sessions; log in again.

Restarting SSSD does not erase its persistent cache. A named invalidation
that reports `No cache object matched` means there was no matching cached
entry to expire; new sudo rules may require the provider's discovery refresh.
These selectors are verified against Sally's installed `sss_cache --help`
and `sss_cache(8)` manual. Use `/usr/sbin/sss_cache --help` on another host to
check its supported options.

--

# Links

- [Excellent CLI Reference](https://ipa.show/reference/)