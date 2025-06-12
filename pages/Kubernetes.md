---
title: Kubernetes
layout: default
---

# Table of Contents

* [Deploying a K8 Cluster](#deploying-a-k8-cluster)
  * [Pre-Requisites](#pre-requisites)
    * [Enable IPv4 Packet Forwarding](#enable-ipv4-packet-forwarding)
* [Clusters](#clusters)
  * [View Cluster Configuration](#view-cluster-configuration)
  * [View Cluster Events](#view-cluster-events)
* [Deployments](#deployments)
  * [Create a New Deployment](#create-a-new-deployment)
  * [View Deployments](#view-deployments)
  * [Delete a Deployment](#delete-a-deployment)
* [Pods](#pods)
  * [View Pods](#view-pods)
* [Containers](#containers)
  * [View Application Logs for a Container](#view-application-logs-for-a-container)
  * [View Container Details](#view-container-details)
  * [Run a Command in a Container](#run-a-command-in-a-container)
* [Services](#services)
  * [Expose a Pod Service](#expose-a-pod-service)
  * [View Existing Services](#view-existing-services)
  * [Delete a Pod Service](#delete-a-pod-service)
* [Links](#links)
  * [Official Kubernetes Documentation](#official-kubernetes-documentation)
  * [Third Party Kubernetes Resources](#third-party-kubernetes-resources)

# Deploying a K8 Cluster

## Pre-Requisites

### Enable IPv4 Packet Forwarding

Issue the commands below to enable IPv4 packet forwarding:
```
# sysctl params required by setup, params persist across reboots
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.ipv4.ip_forward = 1
EOF

# Apply sysctl params without reboot
sudo sysctl --system
```


# Clusters

## View Cluster Configuration
```
kubectl config view
```

## View Cluster Events
```
kubectl get events
```
Sample output is shown below:
```
LAST SEEN   TYPE     REASON              OBJECT                             MESSAGE
16m         Normal   Scheduled           pod/hello-node-66d457cb86-s4kcw    Successfully assigned default/hello-node-66d457cb86-s4kcw to minikube
16m         Normal   Pulling             pod/hello-node-66d457cb86-s4kcw    Pulling image "registry.k8s.io/e2e-test-images/agnhost:2.39"
16m         Normal   Pulled              pod/hello-node-66d457cb86-s4kcw    Successfully pulled image "registry.k8s.io/e2e-test-images/agnhost:2.39" in 14.459s (14.459s including waiting). Image size: 126872991 bytes.
16m         Normal   Created             pod/hello-node-66d457cb86-s4kcw    Created container agnhost
16m         Normal   Started             pod/hello-node-66d457cb86-s4kcw    Started container agnhost
16m         Normal   SuccessfulCreate    replicaset/hello-node-66d457cb86   Created pod: hello-node-66d457cb86-s4kcw
16m         Normal   ScalingReplicaSet   deployment/hello-node              Scaled up replica set hello-node-66d457cb86 to 1
```
# Deployments

## Create a New Deployment
The command below shows how to run a test container image that includes a web server.
```
kubectl create deployment hello-node --image=registry.k8s.io/e2e-test-images/agnhost:2.39 -- /agnhost netexec --http-port=8080
```

## View Deployments
```
kubectl get deployments
```
Sample output is shown below:
```
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
hello-node   1/1     1            1           1m
```
## Delete a Deployment
```
kubectl delete deployment hello-node
```

# Pods

## View Pods
```
kubectl get pods
```
Sample output is shown below:
```
NAME                          READY   STATUS    RESTARTS   AGE
hello-node-66d457cb86-s4kcw   1/1     Running   0          14m
```

# Containers

## View Application Logs for a Container
```
kubectl logs <pod-name>
```
E.g.
```
$ kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
hello-node-66d457cb86-s4kcw   1/1     Running   0          23m

$ kubectl logs hello-node-66d457cb86-s4kcw
I1226 09:27:52.095289       1 log.go:195] Started HTTP server on port 8080
I1226 09:27:52.096278       1 log.go:195] Started UDP server on port  8081
$ 
```

## View Container Details
```
kubectl describe <pod>
```
Sample output is shown below:
```
Name:             kubernetes-bootcamp-68cfbdbb99-vzvbg
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Thu, 26 Dec 2024 19:43:12 -0500
Labels:           app=kubernetes-bootcamp
                  pod-template-hash=68cfbdbb99
Annotations:      <none>
Status:           Running
IP:               10.244.0.9
IPs:
  IP:           10.244.0.9
Controlled By:  ReplicaSet/kubernetes-bootcamp-68cfbdbb99
Containers:
  kubernetes-bootcamp:
    Container ID:   docker://bbe0842ba9b76b7db471675004f5b25cd8bde66469ff6be8f5ddf063d2dd5e4e
    Image:          gcr.io/google-samples/kubernetes-bootcamp:v1
    Image ID:       docker-pullable://gcr.io/google-samples/kubernetes-bootcamp@sha256:0d6b8ee63bb57c5f5b6156f446b3bc3b3c143d233037f3a2f00e279c8fcc64af
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Fri, 27 Dec 2024 02:49:15 -0500
    Last State:     Terminated
      Reason:       Error
      Exit Code:    143
      Started:      Thu, 26 Dec 2024 19:43:42 -0500
      Finished:     Thu, 26 Dec 2024 20:57:54 -0500
    Ready:          True
    Restart Count:  1
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-h2lwr (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       True 
  ContainersReady             True 
  PodScheduled                True 
Volumes:
  kube-api-access-h2lwr:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:                      <none>
```

## Run a Command in a Container
```
kubectl exec "$POD_NAME" -- <command>
```

# Services

## Expose a Pod Service

By default, a Pod is only accessible by its internal IP address within the Kubernetes cluster. To make a container accessible from outside the Kubernetes virtual network, you have to expose the Pod as a Kubernetes [service](https://kubernetes.io/docs/concepts/services-networking/service/).

E.g.
```
kubectl expose deployment hello-node --type=LoadBalancer --port=8080
```
The `--type=LoadBalancer` flag indicates that you want to expose your service outside of the cluster.

In the example above, the application code inside the test image listens on TCP port 8080.

## View Existing Services
```
kubectl get services
```
Sample output is shown below:
```
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
hello-node   LoadBalancer   10.97.165.202   <pending>     8080:30713/TCP   47s
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          10h
```
On cloud providers that support load balancers, an external IP address would be provisioned to access the Service. On minikube, the LoadBalancer type makes the Service accessible through the minikube service command.

Run the following command:
```
minikube service hello-node
```
This opens up a browser window that serves your app and shows the app's response.

## Delete a Pod Service
```
kubectl delete service hello-node
```

# Links

## Official Kubernetes Documentation

* [Official Kubernetes Documentation Homepage](https://kubernetes.io/docs/home/)

* [Bootstrapping clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)
  * [Installing kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

* [Glossary](https://kubernetes.io/docs/reference/glossary)

* Setup
  * [Configuring each kubelet in your cluster using kubeadm](https://kubernetes.io/docs/setup/production-
environment/tools/kubeadm/kubelet-integration/)

* Tasks
  * [Set Kubelet Parameters Via A Configuration File](https://kubernetes.io/docs/tasks/administer-cluster/kubelet-config-file/)
  * Configure Pods and Containers
    * [Pull an Image from a Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
  * Managing Secrets
    * [Managing Secrets using kubectl](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl)
  * Run Application
    * [Run a Single-Instance Stateful Application](https://kubernetes.io/docs/tasks/run-application/run-single-instance-stateful-application/)
  * [Getting started](https://kubernetes.io/docs/setup/)
    * [Production environment](https://kubernetes.io/docs/setup/production-environment/)
      * [Installing Kubernetes with deployment tools](https://kubernetes.io/docs/setup/production-environment/tools/)
        * [Bootstrapping clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/)
          * [Creating Highly Available Clusters with kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)

* Reference
  * [Command line tool (kubectl)](https://kubernetes.io/docs/reference/kubectl/)

* [Tutorials](https://kubernetes.io/docs/tutorials/)
  * [Hello MiniKube](https://kubernetes.io/docs/tutorials/hello-minikube/)

## Third Party Kubernetes Resources

* [Kubernetes Networking Explained – Guide for Beginners](https://spacelift.io/blog/kubernetes-networking)