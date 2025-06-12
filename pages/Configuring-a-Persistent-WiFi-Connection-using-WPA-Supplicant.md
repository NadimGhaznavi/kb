---
title: Configuring a Persistent WiFi Connection using WPA Supplicant
layout: default
---

Create a */etc/wpa_supplicant/wpa_supplicant.conf* file. If the *wpa_supplicant* directory doesn't exist it indicates that the WPA supplicant software is probably not installed. In this case, you can either install it or figure out what network configuraton services are already installed and use them instead (probably a better idea).

The contents of the */etc/wpa_supplicant/wpa_supplicant.conf* file are shown below. Hopefully you know your WiFi network name (SSID) and the WiFi password.
```
network={
   ssid="YOUR_SSID_NAME"
   psk"YOUR_WIFI_PASSWORD"
}
```

Next you'll want to determine the name of your WiFi adapter using the *ip link* command shown below:
```
ip link
```
Here's some sample output of the *ip link* command:
```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: wlp0s20f3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
    link/ether 70:a8:d3:59:ea:cf brd ff:ff:ff:ff:ff:ff
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default 
    link/ether 02:42:b3:b6:ec:c8 brd ff:ff:ff:ff:ff:ff
```
From the output above, I can see that my WiFi network interface name is *wlp0s20f3*. You'll need that information for the next step.

Next you'll need to edit the */etc/network/interfaces* file and add or modify some lines. If lines already exist for your WiFi interface, then modify those lines. Do not modify the nework configuration settings for other network interfaces that may have configuration options in your *interfaces* file.

Here's my */etc/network/interfaces* file using my *wlp0s20f3* WiFi interface name:
```
allow-hotplug wlp0s20f3
iface wlp0s20f3 inet dhcp
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

That's it! To test, just reboot your system. It should automatically connect and authenticate to your WiFi network without you having to login.