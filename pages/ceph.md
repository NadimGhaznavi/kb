---
title: ceph
layout: default
---

# Table of Contents

* [Introduction and Scope](introduction-and-scope)
* [Installing ceph](#installing-ceph)
* [Cluster Map](#cluster-map)
  * [The Object Storage Device Map](the-object-storage-device-map)
  * [The Placement Group Map](#the-placement-group-map)
  * [The CRUSH Map](#the-crush-map)
  * [The MetaData Service Map](#the-metadata-service-map)
* [Creating a New Storage Cluster](#creating-a-new-storage-cluster)
* [Links](#links)

# Introduction and Scope

This page provides handy information about ceph, a software based distributed, redundant storage solution. Much of the content here is taken directly from the [official ceph documentation](https://docs.ceph.com/en/mimic/)

# Installing ceph-deploy
Check for the latest release on the [Ceph Releases(index)](https://docs.ceph.com/en/latest/releases/) page. As of 11/17/2024 it's *squid*.
```
echo deb https://download.ceph.com/debian-{ceph-stable-release}/ $(lsb_release -sc) main | sudo tee /etc/apt/sources.list.d/ceph.list

echo deb https://download.ceph.com/debian-squid/ $(lsb_release -sc) main | sudo tee /etc/apt/sources.list.d/ceph.list
```

# Installing ceph
As of the writing of this documentation, *squid* is the name of the latest stable ceph release. Be sure to confirm that there isn't a more recent version if you are following this guide.
```
sudo apt install cephadm
cephadm add-repo --release squid
```

# Cluster Map
Ceph depends upon Ceph Clients and Ceph OSD Daemons having knowledge of the cluster topology, which is inclusive of 5 maps collectively referred to as the *Cluster Map*:

## The Monitor Map
The *Monitor Map* contains the cluster fsid, the position, name address and port of each monitor. It also indicates the current epoch, when the map was created, and the last time it changed. To view a monitor map, execute:
```
ceph mon dump
```

## The Object Storage Device Map
The *Object Storage Device* (OSD) map ontains the cluster fsid, when the map was created and last modified, a list of pools, replica sizes, PG numbers, a list of OSDs and their status (e.g., up, in). To view an OSD map, execute:
```
ceph osd dump
```

## The Placement Group Map
The *Placement Group* (PG) map contains the PG version, its time stamp, the last OSD map epoch, the full ratios, and details on each placement group such as the PG ID, the Up Set, the Acting Set, the state of the PG (e.g., active + clean), and data usage statistics for each pool.

## The CRUSH Map
Contains a list of storage devices, the failure domain hierarchy (e.g., device, host, rack, row, room, etc.), and rules for traversing the hierarchy when storing data. To view a CRUSH map, execute:
```
ceph osd getcrushmap -o {filename}
```
Then, decompile it by executing:
```
crushtool -d {comp-crushmap-filename} -o {decomp-crushmap-filename}
```
You can view the decompiled map in a text editor or with cat.

## The MetaData Service Map
Contains the current MDS map epoch, when the map was created, and the last time it changed. It also contains the pool for storing metadata, a list of metadata servers, and which metadata servers are up and in. To view an MDS map, execute:
```
ceph fs dump
```

Each map maintains an iterative history of its operating state changes. Ceph Monitors maintain a master copy of the cluster map including the cluster members, state, changes, and the overall health of the Ceph Storage Cluster.

# Creating a New Storage Cluster

Assuming you have [installed ceph](#installing-ceph), then execute the commands below to create a new storage cluster. The command below specifies the new cluster's admin node.
```
mkdir /opt/prod/ceph
cd /opt/prod/ceph
ceph-deploy new paris.osoyalce.com
```

# Links

* [Official Documentation Homepage](https://docs.ceph.com/en/mimic/)
  * [Architecture](https://docs.ceph.com/en/mimic/architecture/)# Introduction and Scope

This page provides handy information about ceph, a software based distributed, redundant storage solution. Much of the content here is taken directly from the [official ceph documentation](https://docs.ceph.com/en/mimic/)

