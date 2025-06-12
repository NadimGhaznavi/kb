---
title: Building P2Pool in a Docker Container
layout: default
---

# Introduction and Scope

This page provides a step-by-step procedure for building and running P2Pool in a Docker container. I happen to use `/opt/prod/docker` as the directory name on my machine that runs docker. You'll see that directory name throughout this procedure, it's arbitrary. You can use any base directory name you want. Just be consistent! :)

The table below shows the build and deployment directory structure that I used.

| Host        | Directory                   | Description
|-------------|-----------------------------|-------------------
| Docker host |`/opt/prod/docker/p2pool/src`| The P2Poool source code is installed here
| Container   |`/opt/p2pool/src`            | The P2Poool source code is installed here
| Docker host |`/opt/prod/docker/utils`     | Scripts to help configure the container environment
| Container   |`/opt/utils`                 | Scripts to help configure the container environment
| Docker host |`/opt/prod/docker/scriopts   | Scripts to start docker containers

When a container is started, the `-v docker_host_dir:container_dir` switch is used to map the *P2Pool source code* and the *P2Pool runtime binaries* from the Docker host to the Docker container. So the Docker runtime containers will have read/write acccess to that directory.

# Pre-Requisites

* This procedure assumes you have the Docker software up and running and that you are able to create, start, stop and remove containers.
* Create the directory structure shown below
```
mkdir -p /opt/prod/docker
mkdir -p /opt/prod/docker/scripts
```

# Download the Alpine:Linux Docker image
On the Docker host machine:
```
sudo docker pull debian:latest
```

# Download the P2Pool Source Code from GitHub
As the *root* user on the Docker host machine.
```
cd /opt/prod/docker
git clone --recursive git@github.com:SChernykh/p2pool
```
You should see output like this:
```
Cloning into 'p2pool'...
remote: Enumerating objects: 10701, done.
remote: Counting objects: 100% (70/70), done.
remote: Compressing objects: 100% (54/54), done.
remote: Total 10701 (delta 19), reused 47 (delta 14), pack-reused 10631 (from 1)
Receiving objects: 100% (10701/10701), 230.49 MiB | 5.17 MiB/s, done.
Resolving deltas: 100% (6776/6776), done.
```
-Except there will be a *LOT* more, because of all the third party software that the P2Pool software requires to build correctly. 

Once that step is done rename the newly created *p2pool* directory to *src* to reflect the fact that it contains P2Pool source code, **not** runtime P2Pool binaries.
```
mv /opt/prod/docker/p2pool /opt/prod/docker/src
```
Create a `p2pool` directory to hold the P2Pool source code.
```
mkdir /opt/prod/docker/p2pool
```
Move the P2Pool source code into the new directory:
```
mv /opt/prod/docker/src /opt/prod/docker/p2pool
```
# Create a Shell Script to start the P2Pool Dev Container
As the root user, create a shell script called `start-p2pool-dev.sh` in the `/opt/prod/docker/scripts` directory. The contents is shown below:
```
#!/bin/bash
docker run \
	-rm \
	-di \
	--name="p2pooldev" \
        --hostname="p2pooldev" \
        --domainname="osoyalce.com" \
	-v /opt/prod/docker/p2pool:/opt/p2pool \
	-v /opt/prod/docker/utils:/opt/utils \
	debian:latest
```
Mark the script you just created as executible:
```
sudo chmod 0755 /opt/prod/docker/scripts/start-p2pooldev.sh
```
# Start the Container
Execute the command below, as the root user on the Docker host:
```
/opt/prod/docker/scripts/start-p2pooldev.sh
```

# Get a Root Shell in the Container
You can connect to the running container and open a shell by referencing it's name (as set by the `--name` switch of the `docker run...` command).
```
sudo docker exec -it p2pooldev /bin/bash
```
# Software Pre-Requisites for Compiling P2Pool
Get a root shell inside the Docker Container for this step.

You'll need to install additional software to build the P2Pool software. Get an root shell (see previous section on how to do this) within the container and use the apt command to install the required software:
```
sudo apt update
sudp apt -y install vim cmake make gcc g++ build-essential libuv1-dev \
  libzmq3-dev libsodium-dev libpgm-dev libnorm-dev libgss-dev \
  libcurl4-openssl-dev libidn2-0-dev
```
# Create the P2Pool Software Build Environment
As the root user, from within the Docker Container environment (not on the Docker host):
```
cd /opt/p2pool/src
mkdir build
cd build
cmake ..
```
# Compile and Link the P2Pool Software
As the root user, from within the Docker Container environment:
```
cd /opt/p2pool/src/build
make
```
If you have a multi-core machine, you can speed up the compilation process by allocating more threads to the compile using the `-j` switch. The example below shows the same compile command, but includes `-j4` to make the compile use 4 threads whenever possible.
```
cd /opt/p2pool/src/build
make -j4
```
make
```