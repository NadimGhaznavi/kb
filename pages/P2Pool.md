---
title: P2Pool
layout: default
---

# Table of Contents

* [Introduction and Scope](#introduction-and-scope)
* [Systemd Service Definitions to run P2Pool as a service](#systemd-service-definitions-to-run-p2pool-as-a-service)
* [Activating and Enabling the P2Pool Service](#activing-and-enabling-the-p2pool-service)
* [Shell Script to Start the P2Pool Daemon](#shell-script-to-start-the-p2pool-daemon)
* [Links](#links)

# Introduction and Scope

This page documents the process of setting up P2Pool as a service with systemd.

I authored the wrapper script to actually start P2Pool, but I found the solution to using a named pipe and P2Pool service definition in this [Reddit post](https://www.reddit.com/r/MoneroMining/comments/12w28m6/comment/jhffnn8/?utm_source=share&utm_medium=web2x&context=3&rdt=38081) by [Krewlar](https://www.reddit.com/user/krewlar/). Kudos to [Krewlar](https://www.reddit.com/user/krewlar/) for doing the heavy lifting for this solution.

# Systemd Service Definitions to run P2Pool as a service

This solution uses two distinct systemd files to start P2Pool.

* A socket service that creates a named pipe that connects the the P2Pool daemon's standard input. This pipe is used to interact with the daemon once it's running. By using this architecture, you can run processes (e.g. a cron script) to send commands to the P2Pool daemon while still running it as a service.
* The actual P2Pool service definition. This definition does not start P2Pool directly, instead it calls a shell script (shown below) that passes in all the options used to start the P2Pool daemon.

## The systemd p2pool.socket definition

This file is installed in */etc/systemd/system* and is called *p2pool.socket*. A full listing of the file is shown below:

```
[Unit]
Description=P2Pool Socket

[Socket]
ListenFIFO=/opt/prod/p2pool/p2pool.stdin
RemoveOnStop=true

[Install]
WantedBy=sockets.target
```

## The systemd p2pool.service definition

This file is installed in */etc/systemd/system* and is called *p2pool.service*. A full listing of the file is shown below:

```
[Unit]
Description=P2Pool Full Node
After=network.target p2pool.socket
#Requires=monerod.service
BindsTo=p2pool.socket

[Service]
StandardInput=socket
Sockets=p2pool.socket
WorkingDirectory=/opt/prod/p2pool/
Type=simple
Restart=always
ExecStartPre=sysctl vm.nr_hugepages=3072
ExecStart=/opt/prod/p2pool/start-p2pool-mini.sh
TimeoutStopSec=60
StandardOutput=file:/opt/prod/p2pool/p2pool.log
StandardError=file:/opt/prod/p2pool/p2pool.err
[Unit]
Description=P2Pool Full Node
After=network.target p2pool.socket
#Requires=monerod.service
BindsTo=p2pool.socket

[Service]
StandardInput=socket
Sockets=p2pool.socket
WorkingDirectory=/opt/prod/p2pool/
Type=simple
Restart=always
ExecStartPre=sysctl vm.nr_hugepages=3072
ExecStart=/opt/prod/p2pool/start-p2pool-mini.sh
TimeoutStopSec=60
StandardOutput=file:/opt/prod/p2pool/p2pool.log
StandardError=file:/opt/prod/p2pool/p2pool.err

[Install]
WantedBy=multi-user.target

[Install]
WantedBy=multi-user.target
```
# Activing and Enabling the P2Pool Service

To refresh systemd's configuration after creating the service and socket definitions use the command below:
```
sudo systemd daemon-reload
```

To have the P2Pool daemon automatically start at boot time use the command below:
```
sudo systemd enable p2pool.service
```

To actually start the service without rebooting use the command below:
```
sudo systemd start p2pool.service
```
chave the P2Pool service run at boot 

# Shell Script to Start the P2Pool Daemon

The shell script below can be used to start the P2Pool daemon. A few points about the startup script:

* **The script is not run directly, it's used by a systemd service**
* It is configured to mine on the mini sidechain
* Substitute your own Monero wallet address for the *WALLET* variable
* The *MONERO_NODE* is the IP of a machine that hosts the Monero Blockchain i.e. runs the *monerod* daemon
* The *ZMQ_PORT* and *RPC_PORT* need to match what the *monerod* daemon's configuration
* The *P2P_DIR* is the directory where you have the P2Pool software installed

```
#!/bin/bash

# Monero daemon settings
MONERO_NODE="192.168.0.176"
ZMQ_PORT="20083"
RPC_PORT="20081"

# P2Pool settings
ANY_IP="0.0.0.0"
STRATUM_PORT=3333
P2P_PORT=37889
P2P_DIR="/opt/prod/p2pool"
WALLET="48wY74LjoNnvT8ZWJFHi6U6G3X5dCtk1YsQNSw7v9zcijE7JN2ucDEG"
LOG_LEVEL=0
IN_PEERS=10
OUT_PEERS=10
DATA_API_DIR="${P2P_DIR}/json"
P2P_LOG="${P2P_DIR}/p2pool.log"

USER=$(whoami)
if [ "$USER" != "root" ]; then
	echo "ERROR: Run the p2pool daemon as root, exiting.."
	exit 1
fi

./p2pool \
	--host ${MONERO_NODE} \
	--wallet ${WALLET} \
	--mini \
	--stratum ${ANY_IP}:${STRATUM_PORT} \
	--p2p ${ANY_IP}:${P2P_PORT} \
	--loglevel ${LOG_LEVEL} \
	--zmq-port ${ZMQ_PORT} \
	--rpc-port ${RPC_PORT} \
	--in-peers ${IN_PEERS} \
	--out-peers ${OUT_PEERS} \
	--data-api ${DATA_API_DIR} | tee -a ${P2P_LOG}
```

# Links

* [P2Pool on GitHub](https://github.com/SChernykh/p2pool)
  * [Build Instructions](https://github.com/SChernykh/p2pool/blob/master/README.md#build-instructions)
* [Krewlar's](https://www.reddit.com/user/krewlar/) [Reddit Post](https://www.reddit.com/r/MoneroMining/comments/12w28m6/comment/jhffnn8/?utm_source=share&utm_medium=web2x&context=3&rdt=38081) on setting the the P2Pool socket and service definitions
* [Source code for P2Pool Observer](https://git.gammaspectra.live/P2Pool/observer)
