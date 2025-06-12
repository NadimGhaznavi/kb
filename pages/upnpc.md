---
title: upnpc
layout: default
---

# Installing the upnpc Utility
```
sudo apt install miniupnpc
```
# Triggering a Port Forwarding Rule on your Router

Use the upnpc command to get your router to forward inbound traffic to a particular machine and port number without having to configure your router. 

**NOTE:** You need to run this on the machine that will receive the packets. In the example below, you'll need to run the `upnpc` comand on 192.168.1.2.

```
upnpc -a 192.168.1.2 3333 3333 TCP
```

The example above forward traffic on port 3333 to 192.168.1.2