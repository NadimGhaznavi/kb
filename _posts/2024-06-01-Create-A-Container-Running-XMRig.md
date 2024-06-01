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

RUN if [ ! -d /xmrig/build ]; then mkdir /xmrig/build; fi 
WORKDIR /xmrig/build
RUN cmake ..
RUN make

CMD ["./xmrig"]
```

Next, create a symlink called *Docker* that points at the *Dockerfile-to-build-XMRIG-from-source*.
```
ln -s Dockerfile-to-build-XMRIG-from-source Dockerfile
```

# Create the Container that Builds XMRig from Source

```
sudo docker build -t xmrig-src-container .
```

# Create and Start the Container

```
sudo docker run -dit --name xmrig-src-container xmrig-src-container
```
# 
