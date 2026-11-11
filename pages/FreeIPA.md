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

## Get IP and DNS Information

You'll need the IP of your system and the DNS servers that your environment is using.

```
# nmcli
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

Note the IP (`192.168.0.176`) and the upstream DNS servers (`206.248.154.22 206.248.154.170`)

---

## Check for Fully Qualified Hostname

FreeIPA requires that your hostname be fully qualified (`kermit.lab.osoyalce.com` in the example below).

```
root@kermit:~ # hostnamectl
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
root@kermit:~ # 
```

If it is set to just `kermit`, then you'll need to change it (E.g. `hostnamectl hostname kermit.lab.osoyalce.com`).

---

## Update /etc/hosts

Add a line for your machine in the `/etc/hosts` file:

For example:

```
192.168.0.176 kermit.lab.osoyalce.com kermit
```

---

## Install FreeIPA Server

I am using the built in DNS server. 

```
# dnf install freeipa-server-dns
```

---

## Confirm FreeIPA Install

```
root@kermit:~ # ipa --version
VERSION: 4.13.4, API_VERSION: 2.257
```

---

## Configure FreeIPA

```
root@kermit:~ # ipa-server-install \
   --setup-dns \
   --reverse-zone=0.168.192.in-addr.arpa. \
   --ntp-pool=ca.pool.ntp.org

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

Just hit enter. The process will probably take 10 minutes or so to complete. At the end you should see output like this:

```
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

---

## Backup cacert.p12

The `/root/cacert.p12` file is backed up to a remote location...

```
root@sally:/imports/disk1/backups/kermit/root/root # scp kermit:/root/cacert.p12 .
cacert.p12                                                      100%   14KB   1.5MB/s   00:00    
root@sally:/imports/disk1/backups/kermit/root/root # 
```

---

## Configure the Firewall

Confirm that the firewall is running with a `systemctl status firewalld`. If not, then stop. Fixing that is outside of scope for this document.

### Check for Open Ports and Services

```
root@kermit:~ # firewall-cmd --list-ports 
root@kermit:~ # firewall-cmd --list-services 
cockpit dhcpv6-client ssh
root@kermit:~ # 
```

### Open Ports

```
root@kermit:~ # firewall-cmd --add-port={80,443,389,636,88,464,53}/tcp --permanent 
success
root@kermit:~ # firewall-cmd --add-port={88,464,53,123}/udp --permanent 
success
root@kermit:~ # firewall-cmd --reload
success
root@kermit:~ # 
```

---

## Get a Kerberos Admin Ticket

```
root@kermit:~ # kinit admin
Password for admin@LAB.OSOYALCE.COM: 
root@kermit:~ # klist
Ticket cache: KCM:0
Default principal: admin@LAB.OSOYALCE.COM

Valid starting       Expires              Service principal
11/08/2026 12:35:34  11/09/2026 12:15:10  krbtgt/LAB.OSOYALCE.COM@LAB.OSOYALCE.COM
root@kermit:~ # 
```

---

## Add A User

Example command:

```
ipa user-add nadim --password \
  --homedir=/ipahome/nadim \
  --first="Nadim-Daniel" \
  --last="Ghaznavi" \
  --initials="NDG" \
  --email="nghaznavi@gmail.com" \
  --shell /bin/bash
```

Expected output:

```
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
  Home directory: /home/nadim
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

---

# Add a Fedora Machine to the FreeIPA Domain

## Get the IP Address

We need the IP address (`192.168.0.27`).

```
root@paris:~ # nmcli
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

```
root@paris:~ # hostnamectl
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
root@paris:~ # 
```

## Install the FreeIPA Client

It's already installed here.

```
root@paris:~ # dnf install freeipa-client
Updating and loading repositories:
Last metadata expiration check: 3:15:50 ago on 2026-11-08 15:07:10.
Repositories loaded.
Package "freeipa-client-4.13.4-4.fc45.x86_64" is already installed.

Nothing to do.
root@paris:~ # 
```

## Configure DNS to use your IPA Server

I have FreeIPA deployed on `kermit.lab.osoyalce.com` which has an IP of `192.168.0.176`:

```
root@paris:~ # nmcli c m "wired connection" ipv4.dns 192.168.0.176
root@paris:~ # nmcli c u "wired connection"
root@paris:~ # host kermit.lab.osoyalce.com
kermit.lab.osoyalce.com has address 192.168.0.176
root@paris:~ # host 192.168.0.176
176.0.168.192.in-addr.arpa domain name pointer kermit.lab.osoyalce.com.
176.0.168.192.in-addr.arpa domain name pointer kermit.
root@paris:~ # 7root@paris:~ # host www.google.hk
www.google.hk has address 142.250.137.94
www.google.hk has IPv6 address 2607:f8b0:4023:1807::5e
root@paris:~ # 
```

This confirms that:

- DNS is being properly routed from paris to kermit
- Kermit is serving the lab.osoyalce.com DNS zone records
  - Including reverse mappings
- Kermit is resolving Internet DNS queries (using a forwarders configuration)

## Configure the FreeIPA Client

```
root@paris:~ # ipa-client-install --enable-dns-updates --ntp-pool=ca.pool.ntp.org
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
root@paris:~ # 
```

## Test

See if you can now use a FreeIPA domain account  (e.g. `nadim`) on the newly added machine.

```
root@paris:~ # su - nadim
Creating home directory for nadim.
nadim@paris:~$ kinit nadim
Password for nadim@LAB.OSOYALCE.COM: 
Password expired.  You must change it now.
Enter new password: ********
Enter it again: ********
```

Check for Kerboros tickets:

```
nadim@paris:~$ klist
Ticket cache: KCM:1469600006
Default principal: nadim@LAB.OSOYALCE.COM

Valid starting       Expires              Service principal
11/08/2026 14:31:18  11/09/2026 13:42:47  krbtgt/LAB.OSOYALCE.COM@LAB.OSOYALCE.COM
nadim@paris:~$ 
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

```bash
ipa automountmap-add default auto.imports
ipa automountkey-add default auto.imports --key=disk1 --info='-fstype=nfs4,rw,hard,sec=sys wintermute.lab.osoyalce.com:/exports/disk1'
ipa automountkey-add default auto.master --key=/imports --info=auto.imports
```

These are creation commands; run them once. To inspect the resulting entries:

```bash
ipa automountkey-find default auto.imports
ipa automountkey-find default auto.master
```

The resulting mapping is:

```text
default
  auto.master:  /imports -> auto.imports
  auto.imports: disk1 -> wintermute.lab.osoyalce.com:/exports/disk1
```

## Check the Client's Map Source

On Sally, `/etc/nsswitch.conf` already contains:

```text
automount: sss
```

The local `/etc/auto.master` includes the central master map:

```text
+auto.master
```

When migrating, remove the old `/imports /etc/auto.imports` entry and any
other active local definitions for `/imports`. The share definition now
lives in FreeIPA. Keep the client configuration that connects autofs to SSSD.

Sally already had `autofs`, `sssd`, and `sssd-autofs.socket` active and enabled:

```bash
systemctl is-active autofs sssd sssd-autofs.socket
systemctl is-enabled autofs sssd sssd-autofs.socket
```

This procedure assumes that client integration is already in place.

## Refresh the Client's Map Cache

On Sally, invalidate the cached automount maps and inspect what autofs reads:

```bash
sudo -n /usr/sbin/sss_cache -A -d lab.osoyalce.com
sudo -n timeout 20 automount -m
```

The output should include this section. The `sss` source confirms that the
map is being retrieved through SSSD:

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

```bash
sudo -n fuser -vm /imports/disk1
findmnt -rn -t nfs,nfs4,autofs -o TARGET,SOURCE,FSTYPE,OPTIONS
```

Once applications have released the share, stop autofs, unmount any remaining
old mounts, and start autofs again. The following uses normal unmounts and
restarts autofs on exit if a command fails. The subshell keeps the error
handling local to this block:

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

```bash
systemctl is-active autofs
findmnt -rn -t nfs,nfs4,autofs -o TARGET,SOURCE,FSTYPE,OPTIONS
```

At this point Sally showed `/imports` as an autofs mount sourced from
`auto.imports`, with `/imports/disk1` not yet mounted. Access the path to
trigger the NFS mount, then inspect it:

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

# Setting up Automounted Home Directories

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

```bash
kinit admin
```

Create the map, add the wildcard entry, and link it into `auto.master`:

```bash
ipa automountmap-add default auto.ipahome
ipa automountkey-add default auto.ipahome --key='*' --info='-fstype=nfs4,rw,hard,sec=sys wintermute.lab.osoyalce.com:/exports/disk1/homeipa/&'
ipa automountkey-add default auto.master --key=/ipahome --info=auto.ipahome
```

Keep the quotes around `*` and the mount information. Autofs substitutes the
requested key for `&`, so accessing `/ipahome/codex` selects the server's
`homeipa/codex` directory. The shell must pass those characters literally.

These creation commands are run once; they have already been applied in
this lab. Inspect the entries with:

```bash
ipa automountkey-find default auto.ipahome
ipa automountkey-find default auto.master
```

The master map should contain `/ipahome -> auto.ipahome`, and `auto.ipahome`
should contain the `*` entry shown above.

## Refresh and Reload the Client

On Sally, invalidate the cached automount maps and inspect the map from SSSD:

```bash
sudo -n /usr/sbin/sss_cache -A -d lab.osoyalce.com
sudo -n timeout 20 automount -m
```

The output should include:

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

```bash
systemctl is-active autofs sssd sssd-autofs.socket
sudo -n timeout 15 automount -m
sudo -n journalctl -u autofs --since '5 minutes ago' -n 50 --no-pager
```
