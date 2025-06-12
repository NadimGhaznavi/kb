---
title: Docker
layout: default
---

# Table of Contents 
* [Installing Docker](#installing-docker)
  * [Setup Access to the Docker Software repository](#setup-access-to-the-docker-software-repository)
  * [Install the Docker Engine](#install-the-docker-engine)
* [Pull a Container Image from DockerHub](#pull-a-container-image-from-dockerhub)
* [Create a Docker Image from a Running Container](#create-a-docker-image-from-a-running-container)
* [List All Running Containers](#List-all-running-containers)
* [List All Containers](#list-all-containers)
* [Delete a Container](#delete-a-container)
* [List all Docker Images](#List-all-docker-images)
* [Delete a Docker Image](#delete-a-docker-image)
* [Login to a Running Docker Container](#login-to-a-running-docker-container)
* [Run a Container](#run-a-container)
* [Create a Container from a Dockerfile](#create-a-container-from-a-dockerfile)
  * [Create a Dockerfile](#create-a-dockerfile)
  * [Create a Docker Image from a Dockerfile](#create-a-docker-image-from-a-dockerfile)
* [Push a Docker image to DockerHub](#push-a-docker-image-to-dockerhub)
* [Links](#links)

# Installing Docker
## Setup Access to the Docker Software repository
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

## Install the Docker Engine
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

# Pull a Container Image from DockerHub
```
sudo docker pull debian
```

# Create a Docker Image from a Running Container
```
docker commit [container ID] [new image name]
```
E.g.
```
docker commit busy_wiles nadimdg/xmrig:auto4
```

# List All Running Containers
```
docker ps
```

## List All Containers
```
docker ps -a
```

## Delete a Container
```
docker rm <container-name>
```

## List all Docker Images
```
docker images
```

## Delete a Docker Image
```
docker rmi <image-name>
```
## Login to a Running Docker Container
```
docker exec -it xmrig-dev /bin/sh
```

## Run a Container
This starts the container and detaches the process from it. 
```
docker run -di --name flast101 alpine:latest
```
Where:
```
-d: detach
-i: interactive
```

# Create a Container from a Dockerfile

## Create a Dockerfile

First create a docker file. An example is shown below, let's call it `p2pooldev.Dockerfile`.
```
FROM p2pool:built
WORKDIR /opt/p2pool
CMD ["/opt/p2pool/p2pool"]
```
* The `FROM` keyword indicates which docker image the container is built from.
* The `WORKDIR` keyword sets the *current working directory* for the `CMD`.
* The `CMD` keyword holds the command to be executed. 

Note that if the `CMD` requires arguments, then in the *Dockerfile* you must split the command and it's arguements as shown below:
```
CMD ["/bin/ls", "-l", "-t", "-r"]

```
## Create a Docker Image from a Dockerfile
```
docker build -f p2pooldev.Dockerfile -t sallykolodny/db4e:p2pooldev .
```
Where
* `-f` specifies a Dockerfile (i.e. p2pooldev.Dockerfile)
* `-t` specifies the way to save the image

The odd name is to align with a *Dockerhub* account where the account name is *sallykolodny*, the repository is called *db4e* and the version of the image is *p2pooldev*. By using such a name you can easily upload the image to Dockerhub after authenticating.
Create a container and start it up.

# Push a Docker image to DockerHub
```
docker push nadimdg/xmrig:autostart
```

# Links

* [Official Docker Documentation](https://docs.docker.com/reference/)
  * [Dockerfile Reference](https://docs.docker.com/reference/dockerfile/)
  * [Docker CLI Reference](https://docs.docker.com/reference/cli/docker/)
* [Official Docker Engine Networking Overview](https://docs.docker.com/engine/network/)
* [Root Priviledges and Docker Containers](https://flast101.github.io/docker-privesc/) - Essential reading!
* [Official Docker Images](https://hub.docker.com/search?image_filter=official&_gl=1*1rsl8ng*_ga*MTI2NjYzMTAwNC4xNzI4MzE1NTMx*_ga_XJWPQMJYHQ*MTcyODMxNTUzMC4xLjEuMTcyODMxNTY2MC4zNS4wLjA.)