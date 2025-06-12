---
title: Jenkins
layout: default
---

### Introduction and Scope

The leading open source automation server, Jenkins provides hundreds of plugins to support building, deploying and automating any project.

This page documents the processes around installing and configuring Jenkins in a container using [Docker](/NadimGhaznavi/kb/wiki/Docker). This page assumes that Docker is up and running on your system.

Note that the commands shown on this Wiki page are typically preceeded with the hash symbol (#) which implies that the commands are being run as the root user.

### Downloading and Intalling the Jenkins Docker Image

As root issue the command below to pull down the latest, stable Jenkins release in a container.
```
# docker pull jenkins/jenkins:lts-jdk17
```
You should now have a Jenkins image in your Docker environment. You can confirm this using the command below:
```
# docker images
REPOSITORY        TAG         IMAGE ID       CREATED       SIZE
jenkins/jenkins   lts-jdk17   7bf0dfc06ae6   11 days ago   469MB
# 
```
This image does not contain the Docker CLI, and is not bundled with the frequently used Blue Ocean plugins and its features. 



### Links

* [Jenkins Homepage](https://www.jenkins.io/)
* [Jenkins Documentation](https://www.jenkins.io/doc/)
* [Jenkins Container Download Page](https://hub.docker.com/r/jenkins/jenkins)
* [Docker Wiki  Page](/NadimGhaznavi/kb/wiki/Docker)