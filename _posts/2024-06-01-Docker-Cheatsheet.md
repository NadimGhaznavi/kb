---
layout: post
title: Docker Cheatsheet
date: 2024-06-01
---

# List all running containers
```
docker ps
```

# List all containers
```
docker ps -a
```

# Delete a container
```
docker rm <container-name>
```

# List all docker images
```
docker images
```

# Delete a docker image
```
docker rmi <image-name>
```
# Login to a running docker container
```
docker exec -it xmrig-dev /bin/sh
```

# Create a new container

## Create a Dockerfile
First create a docker file. An example is shown below:
```
FROM alpine:latest

RUN apk add --no-cache git 

WORKDIR /

CMD ["/bin/sh", "-c", "while true; do sleep 1; done"]
```
Next create an image.
```
mkdir xmrig-run
sudo docker build -t xmrig-run .
```
Create a container and start it up.
```
docker run -d xmrig-run
```

# Push a Docker image to docker.hub
```
docker push nadimdg/xmrig:autostart
```




