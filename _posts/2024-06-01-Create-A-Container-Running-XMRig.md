---
layout: post
title: Create a Container Running XMRig
date: 2024-06-01
---

# Introduction and Scope

This page documents the process of creating a container that runs XMRig. The focus is on creating the smallest possible container. This page assumes you have docker installed and running.

# Create a Project Directory

```
mkdir /opt/prod/xmrig-container
```

# Create a Dockerfile to Build XMRig from Source

We'll first create a Dockerfile called *Dockerfile-to-build-XMRig-from-source*, the contents are listed below.
```
FROM alpine:latest

RUN apk add --no-cache git build-base autoconf automake libtool \
    libmicrohttpd-dev curl-dev gmp-dev jansson-dev openssl-dev \
    libffi-dev cmake hwloc-dev libuv-dev

RUN git clone https://github.com/xmrig/xmrig.git /xmrig

WORKDIR /xmrig

CMD ["/bin/sh", "-c", "while true; do sleep 1; done"]

```

Next, create a symlink called *Docker* that points at the *Dockerfile-to-build-XMRIG-from-source*.
```
ln -s Dockerfile-to-build-XMRIG-from-source Dockerfile
```

# Create the Container that Builds XMRig from Source

```
sudo docker build -t xmrig-dev .
```

# Create and Start the Container

```
sudo docker create --name xmrig-dev xmrig-dev
sudo docker start xmrig-dev
```
# Start an Interactive Shell in the Container
```
sudo docker exec -it xmrig-dev /bin/sh
```
You should find yourself at a root prompt:
```
/xmrig #
```

# Remove the 1% donation hard-coded into XMRig source code

Start an interactive shell in the xmrig-dev container, navigate to the *src* directory and edit the *donate.h* file:
```
/xmrig # cd src
/xmrig/src # vi donate.h
```

Change the 1 to a 0.

Old lines:
```
constexpr const int kDefaultDonateLevel = 1;
constexpr const int kMinimumDonateLevel = 1;
```

New lines:
```
constexpr const int kDefaultDonateLevel = 0;
constexpr const int kMinimumDonateLevel = 0;
```

# Create a XMRig configuation file

Assuming you are logged into the container, use the *vi* editor to create the XMRig configuration file, *config.json*.
```
/xmrig/build # vi config.json
```
Here is a complete *config.json* file:
```
{
    "api": {
        "id": "xmrig-dev",
        "worker-id": "xmrig-dev"
    },
    "http": {
        "enabled": true,
        "host": "0.0.0.0",
        "port": 8888,
        "access-token": null,
        "restricted": true
    },
    "autosave": true,
    "background": false,
    "colors": true,
    "title": true,
    "randomx": {
        "init": -1,
        "init-avx2": -1,
        "mode": "auto",
        "1gb-pages": false,
        "rdmsr": true,
        "wrmsr": true,
        "cache_qos": false,
        "numa": true,
        "scratchpad_prefetch_mode": 1
    },
    "cpu": {
        "enabled": true,
        "huge-pages": true,
        "huge-pages-jit": false,
        "hw-aes": null,
        "priority": null,
        "memory-pool": false,
        "yield": true,
        "asm": true,
        "argon2-impl": null,
        "argon2": [0, 1, 2, 3],
        "cn": [
            [1, 0],
            [1, 1]
        ],
        "cn-heavy": [
            [1, 0]
        ],
        "cn-lite": [
            [1, 0],
            [1, 1],
            [1, 3]
        ],
        "cn-pico": [
            [2, 0],
            [2, 2],
            [2, 1],
            [2, 3]
        ],
        "cn/upx2": [
            [2, 0],
            [2, 2],
            [2, 1],
            [2, 3]
        ],
        "ghostrider": [
            [8, 0],
            [8, 1]
        ],
        "rx": [
    [5, 0]
  ],
        "rx/arq": [
    [5, 0]
  ],
        "rx/wow": [
    [5, 0]
  ],
        "cn-lite/0": false,
        "cn/0": false,
        "rx/keva": "rx/wow"
    },
    "opencl": {
        "enabled": false,
        "cache": true,
        "loader": null,
        "platform": "AMD",
        "adl": true
    },
    "cuda": {
        "enabled": false,
        "loader": null,
        "nvml": true
    },
    "log-file": null,
    "donate-level": 0,
    "donate-over-proxy": 1,
    "pools": [
        {
            "algo": "rx/0",
            "coin": "XMR",
            "url": "kermit.osoyalce.com:3333",
            "user": "48wY7nYBsQNSw7v4LjoNnvCtk1Y6GLNVmePGrW82gVhYhQtWJFHi6U6G3X5d7JN2ucajU9SeBcijET8ZzKWYwC3z3Y6fDEG",
            "pass": "sally",
            "rig-id": "sally",
            "nicehash": false,
            "keepalive": false,
            "enabled": true,
            "tls": false,
            "sni": false,
            "tls-fingerprint": null,
            "daemon": false,
            "socks5": null,
            "self-select": null,
            "submit-to-origin": false
        }
    ],
    "retries": 5,
    "retry-pause": 5,
    "print-time": 60,
    "health-print-time": 60,
    "dmi": true,
    "syslog": false,
    "tls": {
        "enabled": false,
        "protocols": null,
        "cert": null,
        "cert_key": null,
        "ciphers": null,
        "ciphersuites": null,
        "dhparam": null
    },
    "dns": {
        "ipv6": false,
        "ttl": 30
    },
    "user-agent": null,
    "verbose": 0,
    "watch": true,
    "pause-on-battery": false,
    "pause-on-active": false
}
```

# Test that XMRig runs properly

Login to the container, navigate to the */xmrig/build* directory and start xmrig:

```
~ # cd /xmrig/build
/xmrig/build # ./xmrig
```

Once you've confirmed that XMRig runs properly, you can kill it with a Control-C and exit out of the interactive shell.

# Commit the container changes

The changes made with an interactive shell are not persistent. You will lose them when the container is stopped (e.g. if the computer running docker is rebooted). To keep these changes you need to commit them to a new image and then create a container based on that image.

```
docker commit xmrig-dev xmrig-dev:qa
```

 
