---
title: Howto Disable Suspend and Hibernate
layout: default
---

Edit the `/etc/systemnd/sleep.conf` file as shown below:
```
[Sleep]
AllowSuspend=no
AllowHibernation=no
AllowSuspendThenHibernate=no
AllowHybridSleep=no
#SuspendMode=
#SuspendState=mem standby freeze
#HibernateMode=platform shutdown
#HibernateState=disk
#HybridSleepMode=suspend platform shutdown
#HybridSleepState=disk
#HibernateDelaySec=
#SuspendEstimationSec=60min
```